var conn = $.db.getConnection();
var wks = "";
// Line
// wks = "LineString (0 0, 3 4, 0 4, 0 0, 2 2, 6 3)";
// Circle with a gap
// wks = "CircularString (0 0, 3 4, 0 4)";
// Two Circles closed
// wks = "CircularString (0 0, 3 4, 0 4, -3 4, 0 0)";
//
// wks = "LineString (0 0, 1 1, 0 1, 1 0)";
// Circle
// wks = "CircularString (0 0, 3 4, 0 0)";
// Polygon
wks = 'Polygon ((0 0, 4 0, 0 3, 0 0), (0.5 0.5, 0.5 1.5, 1.5 1.5, 1 0.5, 0.5 0.5))';

var select = "SELECT ST_GeomFromText('" + wks + "').ST_asSVG() as SVG FROM dummy;";

var pstmt = conn.prepareStatement( select );
var rs = pstmt.executeQuery();
if (!rs.next()) {
    $.response.contentType = "text/plain";
	$.response.setBody( "Failed to retrieve data" );
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
}
else { 
	var svg =  rs.getString(1);
	svg.replace('fill="none"', 'fill="yellow"');
    $.response.contentType = "image/svg+xml";
    $.response.setBody(svg);
}
