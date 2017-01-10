var OData = $.import("de.linuxdozent.gittest.test.lib", "OData");

describe("Setup Integration Test", function() {

	it("should setup the tests", function() {
		var response = jasmine.callHTTPService("/de/linuxdozent/gittest/test/setup.xsjs");

		expect(response.status).toBe($.net.http.OK);

		var responseBody = OData.getResponseBody(response);
		expect(responseBody.setup).toBe(true);
	});

});