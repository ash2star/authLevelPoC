var OData = $.import("de.linuxdozent.gittest.test.lib", "OData");

describe("Anonymous User", function() {

    it("should send api.ai request to service", function() {
        var listbooks = {
          "id": "eda471a3-67bf-43cf-bc37-afb56d54ac9d",
          "timestamp": "2017-09-22T21:37:20.36Z",
          "lang": "de",
          "result": {
            "source": "agent",
            "resolvedQuery": "welche Bücher gibt es",
            "action": "ListBooks",
            "actionIncomplete": false,
            "parameters": {},
            "contexts": [],
            "metadata": {
              "intentId": "1c7cee5b-0e97-4d8d-9ea9-8b2f54e59538",
              "webhookUsed": "false",
              "webhookForSlotFillingUsed": "false",
              "intentName": "Bookstore"
            },
            "fulfillment": {
            },
            "score": 1
          },
          "status": {
            "code": 200,
            "errorType": "success"
          },
          "sessionId": "3c1a8012-d580-4aa5-b029-0d73d09152a2"
        };
        var discountCodeCheckService = "/de/linuxdozent/gittest/anonymous/api.ai.xsjs";
        var response = jasmine.callHTTPService(
                discountCodeCheckService, 
                $.net.http.POST, 
                JSON.stringify(listbooks)
        );
        expect(response.status).toBe($.net.http.OK);
		var responseBody = OData.getResponseBody(response);
        expect(responseBody.speech).toContain("Wir führen:");
    });
});