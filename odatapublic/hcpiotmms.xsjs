var destination_package = "de.linuxdozent.gittest.odatapublic";
var destination_name = "hcpiotmms";
var message;
var he;
 
 
try {
  var dest = $.net.http.readDestination(destination_package, destination_name);
  var client = new $.net.http.Client();
 
  var req = new $.web.WebRequest($.net.http.POST, "");
  req.headers.set('Content-Type', encodeURIComponent("application/json"));
  req.setBody('{"messageType":"6734ef848a94ed05e019","messages":[{"FirstName":"Gregor","LastName":"Wolf","timestamp":12345}],"method":"ws","sender":"IoT App"}');
 
  client.request(req, dest);
  var response = client.getResponse();
 
 
  $.response.contentType = "text/html";
  $.response.setBody(response.body.asString());
  $.response.status = $.net.http.OK;
} catch (e) {
  $.response.contentType = "text/plain";
  $.response.setBody(e.message);
}