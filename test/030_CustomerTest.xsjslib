var Login = $.import("de.linuxdozent.gittest.test.lib", "Login");
var OData = $.import("de.linuxdozent.gittest.test.lib", "OData");

var loginResult;
var EMail = "john.doe@test.com";
var header;

describe("Customer actions", function() {

    it("should login BSCUSTOMER and get csrfToken", function() {
        loginResult = Login.getCSRFtokenAndLogin("BSCUSTOMER", Login.newpwd);
        header = OData.prepareRequestHeader(loginResult.csrf);
    });
    
    it("should register BSCUSTOMER as a customer", function() {
        var create = {
            "UserName": "BSCUSTOMER",
            "FirstName": "John",
            "LastName": "Doe",
            "EMail": EMail
        };
        var service = "/de/linuxdozent/gittest/odatapublic/service.xsodata/Customer";
        var response = jasmine.callHTTPService(service, $.net.http.POST, JSON.stringify(create), header, loginResult.cookies);
        expect(response.status).toBe($.net.http.CREATED);
    });
    
    it("should read customer details", function() {
        var service = "/de/linuxdozent/gittest/odatapublic/service.xsodata/Customer";
        var response = jasmine.callHTTPService(service, $.net.http.GET, undefined, header, loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);

		var responseBody = OData.getResponseBody(response);
        expect(responseBody.d.results[0].EMail).toBe(EMail);
    });
    
    it("should logout BSCUSTOMER", function() {
        Login.logout(loginResult.csrf, loginResult.cookies);
        Login.checkSession();
    });    
});