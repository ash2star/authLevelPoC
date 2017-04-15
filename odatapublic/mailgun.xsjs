var destinationPackage = "de.linuxdozent.gittest.odatapublic";
var destinationName = "mailgun";
var message;

try {
  var dest = $.net.http.readDestination(destinationPackage, destinationName);
  var client = new $.net.http.Client();
 
  var req = new $.web.WebRequest($.net.http.POST, "/messages");
  req.headers.set('Content-Type', encodeURIComponent("application/x-www-form-urlencoded"));
 
  // req.parameters.set("domain","sandbox864bff1527b245f583ea2373c52f0cc3.mailgun.org");
  req.parameters.set("from","gregor@sandbox864bff1527b245f583ea2373c52f0cc3.mailgun.org");
  req.parameters.set("to","gregor.wolf@gmail.com");
  req.parameters.set("subject","Test subject");
  req.parameters.set("text","Test text");
 
  client.request(req, dest);
  var response = client.getResponse();
 
 
  $.response.contentType = "text/html";
  $.response.setBody(response.body.asString());
  $.response.status = $.net.http.OK;
} catch (e) {
  $.response.contentType = "text/plain";
  $.response.setBody(e.message);
}