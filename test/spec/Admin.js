/*

   Copyright 2016 SAP Mentors

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
var DiscountCodeUri = "";
var SHA256HASH = "";
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
    });
});

describe("Read Discount Codes of the user", function() {
    it("should get a list of discount codes", function() {
        var DiscountCodeURL = DiscountCodeBaseURL + "?$filter=UserName eq '" + UserName + "'";
        var xhr = prepareRequest("GET", DiscountCodeURL);
        xhr.send();
        expect(xhr.status).toBe(200);
        var body = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        expect(body.d.results[0].UserName).toBe(UserName);
        DiscountCodeUri = body.d.results[0].__metadata.uri;
        SHA256HASH = body.d.results[0].SHA256HASH;
    });
});

describe("Redeem Discount Codes of the user", function() {
    it("should redeem discount codes", function() {
        var xhr = prepareRequest("PATCH", DiscountCodeUri);
        var change = {
            "SHA256HASH": SHA256HASH
        };
        xhr.send(JSON.stringify(change));
        expect(xhr.status).toBe(204);
    });
});


describe("Logout BSADMIN", function() {
    it("should logout BSADMIN", function() {
        logout(csrfToken);
        checkSession();
    });
});
