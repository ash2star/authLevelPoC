var destination_package = "de.linuxdozent.gittest.odatapublic";
var destination_name = "hcpiotmms";
var message;
var he;
 
 
try {
  var dest = $.net.http.readDestination(destination_package, destination_name);
  var client = new $.net.http.Client();
 
  var req = new $.web.WebRequest($.net.http.POST, "3549d56f-3552-4d6a-bcec-57b61aedb6f1");
  req.headers.set('Content-Type', encodeURIComponent("application/json"));
  var bodyJSON = {
      "messageType":"e831c7faaf5cd1091161",
      "messages":[
          {
            "timestamp":12345,
            "ID":1,
            "EventID":1,
            "FirstName":"Gregor",
            "LastName":"Wolf",
            "Twitter":"@wolf_gregor"
          }
      ],
      "method":"ws","sender":"IoT App"
  };
  req.setBody(JSON.stringify(bodyJSON));
 
  client.request(req, dest);
  var response = client.getResponse();
 
 
  $.response.contentType = "text/html";
  $.response.setBody(response.body.asString());
  $.response.status = $.net.http.OK;
} catch (e) {
  $.response.contentType = "text/plain";
  $.response.setBody(e.message);
}