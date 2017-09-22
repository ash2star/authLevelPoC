/*

   Copyright 2017 Gregor Wolf

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

function readBooks() {
    var body;
    var conn;
    var firstResult = true;
    conn = $.db.getConnection("de.linuxdozent.gittest.anonymous::anonymous");
    var pStmt = conn.prepareStatement('SELECT "Author", "BookTitle" FROM "de.linuxdozent.gittest.data::Bookstore.Book"');
    var rs = pStmt.executeQuery();
    body = "[";
    while (rs.next()) {
        if(firstResult){
            firstResult = false;
        } else {
            body += ',';
        }
        body += '{ '
                + '"Author": "' + rs.getNString(1) + '", '
                + '"BookTitle": "' + rs.getNString(2) + '"'
                + '}';
    }
    body += "]";
    rs.close();
    pStmt.close();
    if (conn) {
        conn.close();
    }
    return JSON.parse( body );
}