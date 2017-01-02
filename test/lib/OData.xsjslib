function prepareRequestHeader(csrfToken) {
    var requestHeader = {
        "X-CSRF-Token": csrfToken,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    return requestHeader;
}