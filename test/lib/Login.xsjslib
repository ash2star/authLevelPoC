function checkSession() {
    var service = '/sap/hana/xs/formLogin/checkSession.xsjs';
    var contentTypeHeader = {
        "Content-Type": "application/json"
    };
    var response = jasmine.callHTTPService(service, $.net.http.GET, "", contentTypeHeader);

    expect(response.status).toBe($.net.http.OK);

    var body = JSON.parse( response.body ? response.body.asString() : "" );
    expect(body.login).toBe(false);
}