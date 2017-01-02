var Login = $.import("de.linuxdozent.gittest.test.lib", "Login");
var OData = $.import("de.linuxdozent.gittest.test.lib", "OData");

var loginResult;
var EMail = "john.doe@test.com";

describe("Customer actions", function() {

    it("should login BSCUSTOMER and get csrfToken", function() {
        loginResult = Login.getCSRFtokenAndLogin("BSCUSTOMER", Login.newpwd);
    });
    
    it("should register BSCUSTOMER as a customer", function() {
        var create = {
            "UserName": "BSCUSTOMER",
            "FirstName": "John",
            "LastName": "Doe",
            "EMail": EMail
        };
        var header = OData.prepareRequestHeader(loginResult.csrf);
        var service = "/de/linuxdozent/gittest/odatapublic/service.xsodata/Customer";
        var response = jasmine.callHTTPService(service, $.net.http.POST, JSON.stringify(create), header, loginResult.cookies);
        expect(response.status).toBe($.net.http.CREATED);
    });
});