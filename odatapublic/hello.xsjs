$.response.contentType = "text/html";
var output = "Username from '$.session.getUsername()': <b>" + $.session.getUsername() + ",</b><br><br>";
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
rs.close();
pstmt.close();
conn.close();
$.response.setBody(output);