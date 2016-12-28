describe("Setup Integration Test", function() {

	function getResponseBody(response) {
		var body = response.body ? response.body.asString() : "";
		return JSON.parse(body);
	}

	it("should setup the tests", function() {
		var response = jasmine.callHTTPService("/de/linuxdozent/gittest/test/setup.xsjs");

		expect(response.status).toBe($.net.http.OK);

		var responseBody = getResponseBody(response);
		expect(responseBody.setup).toBe(true);
	});

});