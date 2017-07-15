var Login = $.import("de.linuxdozent.gittest.test.lib", "Login");
var OData = $.import("de.linuxdozent.gittest.test.lib", "OData");

var loginResult;
var EMail = "john.doe@test.com";
var FirstName = "John";
var UserName = "BSCUSTOMER";
var LoginUserName = UserName;
var LastName = "Doe";
var customerURI;
var header;

describe("Customer actions", function() {

    it("should login BSCUSTOMER and get csrfToken", function() {
        loginResult = Login.getCSRFtokenAndLogin(LoginUserName, Login.newpwd);
        header = OData.prepareRequestHeader(loginResult.csrf);
    });
    
    it("should register BSCUSTOMER as a customer", function() {
        var create = {
            "UserName": UserName,
            "FirstName": FirstName,
            "LastName": LastName,
            "EMail": EMail
        };
        var service = "/de/linuxdozent/gittest/odatapublic/service.xsodata/Customer";
        var response = jasmine.callHTTPService(
            service, 
            $.net.http.POST, 
            JSON.stringify(create), 
            header, 
            loginResult.cookies
        );
        expect(response.status).toBe($.net.http.CREATED);
    });
    
    it("should read customer details", function() {
        var service = "/de/linuxdozent/gittest/odatapublic/service.xsodata/Customer";
        var response = jasmine.callHTTPService(service, $.net.http.GET, undefined, header, loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);

		var responseBody = OData.getResponseBody(response);
        expect(responseBody.d.results[0].EMail).toBe(EMail);
        expect(responseBody.d.results[0].FirstName).toBe(FirstName);
        customerURI = responseBody.d.results[0].__metadata.uri;
    });

    it("should change FirstName", function() {
        FirstName = "Johnny";
        var update = {
            "FirstName": FirstName
        };
        var response = jasmine.callHTTPService(
                customerURI, 
                $.net.http.PATCH, 
                JSON.stringify(update), 
                header, 
                loginResult.cookies
        );
        expect(response.status).toBe(204);
    });
    
    it("should check changed FirstName", function() {
        var response = jasmine.callHTTPService(
                customerURI, 
                $.net.http.GET, 
                undefined, 
                header, 
                loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);

		var responseBody = OData.getResponseBody(response);
        expect(responseBody.d.FirstName).toBe(FirstName);
    });    

    it("should change UserName", function() {
        UserName = "SOMEUSER";
        LastName = "Doer";
        var update = {
            "UserName": UserName,
            "LastName": LastName
        };
        var response = jasmine.callHTTPService(
                customerURI, 
                $.net.http.PATCH, 
                JSON.stringify(update), 
                header, 
                loginResult.cookies
        );
        expect(response.status).toBe(204);
    });
    
    it("should check changed LastName and unchanged UserName", function() {
        var response = jasmine.callHTTPService(
                customerURI, 
                $.net.http.GET, 
                undefined, 
                header, 
                loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);

		var responseBody = OData.getResponseBody(response);
		jasmine.log(response.body.asString());
        expect(responseBody.d.LastName).toBe(LastName);
        expect(responseBody.d.UserName).toBe(LoginUserName);
    });
    
    it("should logout BSCUSTOMER", function() {
        Login.logout(loginResult.csrf, loginResult.cookies);
        Login.checkSession();
    });
});