var Login = $.import("de.linuxdozent.gittest.test.lib", "Login");
var OData = $.import("de.linuxdozent.gittest.test.lib", "OData");

var loginResult;
var header;
var discountCodeCreate = {
    "ID": "1",
    "UserName": "BSCUSTOMER",
    "DiscountValue": 10,
    "SHA256HASH": "",
    "Redeemed": "N"
};
var discountCodeService = "/de/linuxdozent/gittest/odata/service.xsodata/DiscountCode";

describe("Admin actions", function() {

    it("should login BSADMIN and get csrfToken", function() {
        loginResult = Login.getCSRFtokenAndLogin("BSADMIN", Login.newpwd);
        header = OData.prepareRequestHeader(loginResult.csrf);
    });
    
    it("should create discount code for BSCUSTOMER", function() {
        var response = jasmine.callHTTPService(discountCodeService, $.net.http.POST, JSON.stringify(discountCodeCreate), header, loginResult.cookies);
        if (response.status === 400) {
            expect(response.toString()).toBeNull();
        }
        expect(response.status).toBe($.net.http.CREATED);
    });
    
    it("should create discount code for other user", function() {
        // Read which additional customer exist
        var service = encodeURI("/de/linuxdozent/gittest/odata/service.xsodata/Customer?$filter=UserName ne '" + discountCodeCreate.UserName + "'");
        var response = jasmine.callHTTPService(service, $.net.http.GET, undefined, header, loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);
		var responseBody = OData.getResponseBody(response);
		if (responseBody.d.results.length > 0) {
            discountCodeCreate.ID = "3";
            discountCodeCreate.UserName = responseBody.d.results[0].UserName;
            response = jasmine.callHTTPService(discountCodeService, $.net.http.POST, JSON.stringify(discountCodeCreate), header, loginResult.cookies);
            expect(response.status).toBe($.net.http.CREATED);
		}
    });

    it("should get a list of discounts but not the code", function() {
        var DiscountCodeURL = encodeURI( discountCodeService + "?$filter=UserName eq '" + discountCodeCreate.UserName + "'" );
        var response = jasmine.callHTTPService(DiscountCodeURL, $.net.http.GET, undefined, header, loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);
		var responseBody = OData.getResponseBody(response);
        expect(responseBody.d.results[0].UserName).toBe(discountCodeCreate.UserName);
    });

    it("should logout BSADMIN", function() {
        Login.logout(loginResult.csrf, loginResult.cookies);
        Login.checkSession();
    });
});