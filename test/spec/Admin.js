/*

   Copyright 2016 Gregor Wolf

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/
var UserName = "BSCUSTOMER";
var DiscountCodeBaseURL = "/de/linuxdozent/gittest/odata/service.xsodata/DiscountCode";

describe("Login BSADMIN", function() {
    it("should login BSADMIN and get csrfToken", function() {
        csrfToken = getCSRFtokenAndLogin("BSADMIN", password);
    });
});

describe("Create discount code for BSCUSTOMER", function() {
    it("should create discount code", function() {
        var create = {
            "ID": "1",
            "UserName": UserName,
            "DiscountValue": 10,
            "SHA256HASH": "",
            "Redeemed": "N"
        };
        var xhr = prepareRequest("POST", "/de/linuxdozent/gittest/odata/service.xsodata/DiscountCode");
        xhr.send(JSON.stringify(create));
        expect(xhr.status).toBe(201);
        expect(xhr.statusText).toBe("Created");
        // Create additional Code
        create.ID = "2";
        create.DiscountValue = 5;
        xhr = prepareRequest("POST", "/de/linuxdozent/gittest/odata/service.xsodata/DiscountCode");
        xhr.send(JSON.stringify(create));
        expect(xhr.status).toBe(201);
    });
});

describe("Read Discounts for user", function() {
    it("should get a list of discounts but not the code", function() {
        var DiscountCodeURL = DiscountCodeBaseURL + "?$filter=UserName eq '" + UserName + "'";
        var xhr = prepareRequest("GET", DiscountCodeURL);
        xhr.send();
        expect(xhr.status).toBe(200);
        var body = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        expect(body.d.results[0].UserName).toBe(UserName);
        DiscountCodeUri = body.d.results[0].__metadata.uri;
    });
});

describe("Logout BSADMIN", function() {
    it("should logout BSADMIN", function() {
        logout(csrfToken);
        checkSession();
    });
});
