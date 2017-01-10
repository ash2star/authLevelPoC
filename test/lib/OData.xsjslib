function prepareRequestHeader(csrfToken) {
    var requestHeader = {
        "X-CSRF-Token": csrfToken,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    return requestHeader;
}

function getResponseBody(response) {
	var body = response.body ? response.body.asString() : "";
	return JSON.parse(body);
}

