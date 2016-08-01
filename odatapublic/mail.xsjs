var mail = new $.net.Mail({
    sender: {address: "gregor.wolf@gmail.com"},
    to: [{ name: "Gregor Wolf", address: "wolf.gregor@web.de", nameEncoding: "UTF-8"}],
    subject: "Request Organizer authorization",
    subjectEncoding: "UTF-8",
    parts: [ new $.net.Mail.Part({
        type: $.net.Mail.Part.TYPE_TEXT,
        text: "Dear Admistrator, \n" + 
"please provide my user " + $.session.getUsername() + " access as an organizer.",
        contentType: "text/plain",
        encoding: "UTF-8"
    })]
});
var returnValue = mail.send();
var response = JSON.stringify(returnValue);
$.response.status = $.net.http.OK;
$.response.contentType = "application/json";
$.response.setBody(response);