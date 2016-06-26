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

$.response.contentType = "text/html";
var output = "Username from '$.session.getUsername()': <b>" + $.session.getUsername() + ",</b><br />";
var conn = $.db.getConnection();
var pstmt = conn.prepareStatement( "SELECT CURRENT_USER FROM DUMMY" );
var rs = pstmt.executeQuery();
if (!rs.next()) {
	$.response.setBody( "Failed to retrieve data" );
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
}
else { 
	output = output + "Username from SQL 'SELECT CURRENT_USER FROM DUMMY': <b>" + rs.getString(1) + "</b>";
}

if($.session.samlUserInfo.lastname){
    var displayName = "<br />" + $.session.samlUserInfo.firstname + " " + $.session.samlUserInfo.lastname; 
    output = output + displayName;
}

rs.close();
pstmt.close();
conn.close();
$.response.setBody(output);