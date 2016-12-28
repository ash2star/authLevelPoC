describe("Teardown Integration Test", function() {

	function getResponseBody(response) {
		var body = response.body ? response.body.asString() : "";
		return JSON.parse(body);
	}

	it("should teardown tests", function() {
		var response = jasmine.callHTTPService("/de/linuxdozent/gittest/test/teardown.xsjs");
		expect(response.status).toBe($.net.http.OK);

		var responseBody = getResponseBody(response);
		expect(responseBody.teardown).toBe(true);
	});

});