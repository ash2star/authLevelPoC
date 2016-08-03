var destination_package = "de.linuxdozent.gittest.odatapublic";
var destination_name = "openweather";

try {
       var dest = $.net.http.readDestination(destination_package, destination_name);
       var client = new $.net.http.Client();
       var req = new $.web.WebRequest($.net.http.GET, "q=Munich,de"); 
       client.request(req, dest);
       var response = client.getResponse();  
       
    $.response.contentType = "application/json";
       $.response.setBody(response.body.asString());
       $.response.status = $.net.http.OK;
} catch (e) {
       $.response.contentType = "text/plain";
       $.response.setBody(e.message);
}