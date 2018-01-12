var conn = $.db.getConnection();
var pstmt = conn.prepareStatement(
    "SELECT NEW ST_LineString('LineString (0 0, 3 4, 0 4, 0 0, 2 2, 6 3)').ST_asSVG() as SVG FROM dummy;" );
var rs = pstmt.executeQuery();
if (!rs.next()) {
    $.response.contentType = "text/plain";
	$.response.setBody( "Failed to retrieve data" );
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
}
else { 
	var svg =  rs.getString(1);
    $.response.contentType = "image/svg+xml";
    $.response.setBody(svg);
}
