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
var EMail = "john.doe@test.com";

describe("Login BSCUSTOMER", function() {
    it("should login BSCUSTOMER and get csrfToken", function() {
        csrfToken = getCSRFtokenAndLogin("BSCUSTOMER", password);
    });
});

describe("Register as customer", function() {
    it("should register BSCUSTOMER as a customer", function() {
        var create = {
            "UserName": "BSCUSTOMER",
            "FirstName": "John",
            "LastName": "Doe",
            "EMail": EMail
        };
        var xhr = prepareRequest("POST", "/de/linuxdozent/gittest/odatapublic/service.xsodata/Customer");
        xhr.send(JSON.stringify(create));
        expect(xhr.status).toBe(201);
        expect(xhr.statusText).toBe("Created");
    });
});

describe("Read customer details", function() {
    it("should read customer details", function() {
        var xhr = prepareRequest("GET", "/de/linuxdozent/gittest/odatapublic/service.xsodata/Customer");
        xhr.send();
        expect(xhr.status).toBe(200);
        var body = xhr.responseText ? JSON.parse(xhr.responseText) : "";
        expect(body.d.results[0].EMail).toBe(EMail);
    });
});

describe("Logout BSCUSTOMER", function() {
    it("should logout BSCUSTOMER", function() {
        logout(csrfToken);
        checkSession();
    });
});
