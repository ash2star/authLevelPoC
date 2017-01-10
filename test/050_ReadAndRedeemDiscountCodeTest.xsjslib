var Login = $.import("de.linuxdozent.gittest.test.lib", "Login");
var OData = $.import("de.linuxdozent.gittest.test.lib", "OData");

var loginResult;
var header;
var SHA256HASH;
var discountValue;
var userName;

describe("Read and redeem discount code actions", function() {

    it("should Login user and read discount codes", function() {
        loginResult = Login.getCSRFtokenAndLogin("BSCUSTOMER", Login.newpwd);
        header = OData.prepareRequestHeader(loginResult.csrf);
        
        var service = "/de/linuxdozent/gittest/odatapublic/service.xsodata/DiscountCode";
        var response = jasmine.callHTTPService(service, $.net.http.GET, undefined, header, loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);
		var responseBody = OData.getResponseBody(response);
        SHA256HASH = responseBody.d.results[0].SHA256HASH;

        Login.logout(loginResult.csrf, loginResult.cookies);
        Login.checkSession();
    });

    it("should login BSADMIN and get csrfToken", function() {
        loginResult = Login.getCSRFtokenAndLogin("BSADMIN", Login.newpwd);
        header = OData.prepareRequestHeader(loginResult.csrf);
    });
    
    it("should return discount value via POST", function() {
        var check = {
            "SHA256HASH": SHA256HASH
        };
        var discountCodeCheckService = "/de/linuxdozent/gittest/odata/checkDiscountCode.xsjs";
        var response = jasmine.callHTTPService(discountCodeCheckService, $.net.http.POST, JSON.stringify(check), header, loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);
		var responseBody = OData.getResponseBody(response);
        expect(responseBody.OUTC[0].DiscountValue).toBe(10);
    });
    
    it("should return discount value via GET", function() {
        var discountCodeCheckService = "/de/linuxdozent/gittest/odata/checkDiscountCode.xsjs" + "?SHA256HASH=" + encodeURIComponent(SHA256HASH);
        var response = jasmine.callHTTPService(discountCodeCheckService, $.net.http.GET, undefined, header, loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);
		var responseBody = OData.getResponseBody(response);
        expect(responseBody.OUTC[0].DiscountValue).toBe(10);
        expect(responseBody.OUTC[0].UserName).not.toBeNull();
        discountValue = responseBody.OUTC[0].DiscountValue;
        userName = responseBody.OUTC[0].UserName;
    });
    it("should redeem discount codes", function() {
        // Read URL of dicount code entity
        var service = encodeURI("/de/linuxdozent/gittest/odata/service.xsodata/DiscountCode?$filter=UserName eq '" 
            + userName + "' and DiscountValue eq " + discountValue);
        expect(service).not.toBeNull();
        var response = jasmine.callHTTPService(service, $.net.http.GET, undefined, header, loginResult.cookies);
        expect(response.status).toBe($.net.http.OK);
		var responseBody = OData.getResponseBody(response);
		var DiscountCodeUri = responseBody.d.results[0].__metadata.uri;  
		// Redeem discount code
        var change = {
            "SHA256HASH": SHA256HASH
        };
        response = jasmine.callHTTPService(DiscountCodeUri, $.net.http.PATCH, JSON.stringify(change), header, loginResult.cookies);
        expect(response.status).toBe(204); // No Content
    });

    it("should logout BSADMIN", function() {
        Login.logout(loginResult.csrf, loginResult.cookies);
        Login.checkSession();
    });
});