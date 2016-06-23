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