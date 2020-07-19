var HttpRequest = (function (method, url) {
    // Create the XHR object.
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    }
    // Make the actual CORS request.
    function makeCorsRequest() {
        // This is a sample server that supports CORS.

        var xhr = createCORSRequest(method, url);
        // xhr.setRequestHeader("Access-Control-Request-Origin", "http://localhost");
        xhr.setRequestHeader("Access-Control-Request-Origin", "http://127.0.0.1:8887");
        // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        if (!xhr) {
            alert('CORS not supported');
            return;
        }
        return xhr;
    }

    return makeCorsRequest(); 
})("get", "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-CA");
// })("get", "https://www.sojson.com/open/api/lunar/json.shtml");