function test() {
    var body;
    var conn;
    var firstResult = true;
    $.response.status = $.net.http.OK;
    $.response.contentType = "application/json";
    try {
        conn = $.db.getConnection("de.linuxdozent.gittest.anonymous::anonymous");
        var pStmt = conn.prepareStatement('SELECT "Author", "BookTitle" FROM "de.linuxdozent.gittest.data::BOOK"');
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
    } catch (e) {
        body = "Error: exception caught: <br />" + e.toString();
        $.response.status = $.net.http.BAD_REQUEST;
    }
    if (conn) {
        conn.close();
    }
    $.response.setBody( body );
}
test();