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

function checkDiscountCode() {
    var body;
    var conn;
    var pStmt;
    var json = "";
    $.response.status = $.net.http.OK;
    $.response.contentType = "application/json";
    try {
        var SHA256HASH = "";
        if($.request.method === $.net.http.GET) {
            SHA256HASH = decodeURIComponent($.request.parameters.get("SHA256HASH"));
        } else {
            var content = $.request.body.asString();
            var check = JSON.parse(content);
            SHA256HASH = check.SHA256HASH;
        }
        var SHA256HASHbin = $.util.codec.decodeBase64(SHA256HASH);

        conn = $.hdb.getConnection();
        var discountCodeCheck = conn.loadProcedure("CSWGITTEST", "de.linuxdozent.gittest.odata.procedures::DiscountCodeCheck");
        var inhash = [];
        inhash.push(SHA256HASHbin);
        var count = discountCodeCheck(SHA256HASHbin);
        body = JSON.stringify(count);
    } catch (e) {
        body = "Error: exception caught: <br />" + e.toString();
        $.response.status = $.net.http.BAD_REQUEST;
    }
    if (conn) {
        conn.close();
    }
    $.response.setBody( body );
}
checkDiscountCode();