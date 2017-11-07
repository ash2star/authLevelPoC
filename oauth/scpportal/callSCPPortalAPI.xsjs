var requestAccessToken = function(url) {
    $.response.headers.set('Content-Type', "application/json");
    $.response.setBody(JSON.stringify({
        error: false,
        errorDescription: "There are no tokens (access or refresh) for this application/user context available",
        solution: "Authorize yourself via the following authorization URL",
        authorizationURL: url
    }));
};
var callSCPPortalAPI = function() {
    var response;
    // the HTTP client to send requests
    var oHttpClient = new $.net.http.Client();
    // load the library handling the OAuth protocol
    var oAuthClientLib = $.import("sap.hana.xs.oAuth.lib", "oAuthClient");
    // SCP Portal API specific endpoints
    var suffix = "/fiori/api/oauth2/v1/services/contentprovider/catalogs/";
    // where we want to go
    var request = new $.net.http.Request($.net.http.GET, suffix);
    // initialize the HTTP destination and OAuth client
    var myDestObj = $.net.http.readDestination("de.linuxdozent.gittest.oauth.scpportal", "scpportalAPIdestination");
    var oaC = new oAuthClientLib.OAuthClient("de.linuxdozent.gittest.oauth.scpportal", "scpportalAPIdestination");
    // SCOPES -> configure via XS Admin in the OAuth configuration package
    //read
    // if you want to start from scratch, just set a breakpoint here and call this method
    // oaC.userRevokeAccess();
    // initialize the OAuth authorization code flow (and trace a debug message)
    // do you know what happens if you call this URL via your Browser?
    var url = oaC.userAuthorizeUri("https://hanamdcs0001142741trial.hanatrial.ondemand.com/de/linuxdozent/gittest/oauth/scpportal/callSCPPortalAPI.xsjs");
    $.trace.debug("Auth URL is: " + url);
    // if you called the URL via your browser paste the authorization code response into the 'code' variable (after uncommenting of course)
    // var code;
    // this is an alternative way to get the access tokens
    // oaC.userGrantAccess(code);
    // is our access token still valid, do we need to refresh it or didn't we receive anyone at all?
    var validAT = oaC.hasValidAccessToken();
    if (validAT) {
        // call the API
        response = oaC.processData(oHttpClient, request, myDestObj);
    } else {
        var validRT = oaC.hasValidRefreshToken();
        if (validRT) {
            var refreshStatus = oaC.userRefreshAccess();
            if (refreshStatus === 200) {
                // call the API
                response = oaC.processData(oHttpClient, request, myDestObj);
            }
        } else {
            requestAccessToken(url);
            return;
        }
    }
    if (response) {
        if(response.status === 200) {
            // display googles response
            var myBody;
            if (response.body) {
                try {
                    myBody = JSON.parse(response.body.asString());
                } catch (e) {
                    myBody = response.body.asString();
                }
            }
            $.response.contentType = "application/json";
            $.response.status = 200;
            $.response.setBody(JSON.stringify({
                "status": response.status,
                "body": myBody
            }));
        } else {
            requestAccessToken(url);
            return;
        }
    }
};
try {
    callSCPPortalAPI();
} catch (err) {
    $.response.setBody("Failed to execute action: " + err.toString());
}