(function () {
    'use strict';
    var crypto = require('crypto');

    function calculateSha1HexDigest(message) {
        var shasum = crypto.createHash('sha1');
        shasum.update(message);
        return shasum.digest('hex');
    }

    function RequestBuilder(sha1HmacBuilder) {
        this.sha1HmacBuilder = sha1HmacBuilder;
    }

    RequestBuilder.prototype.withHmacKeyId = function (hmacKeyId) {
        this.hmacKeyId = hmacKeyId;
        return this;
    };

    RequestBuilder.prototype.withHost = function (host) {
        this.host = host;
        return this;
    };

    RequestBuilder.prototype.withTimeStamp = function (timeStamp) {
        this.timeStamp = timeStamp;
        return this;
    };

    RequestBuilder.prototype.withPort = function (port) {
        this.port = port;
        return this;
    };

    RequestBuilder.prototype.withUri = function (uri) {
        this.uri = uri;
        return this;
    };

    RequestBuilder.prototype.withMethod = function (method) {
        this.method = method;
        return this;
    };

    RequestBuilder.prototype.withMessage = function (message) {
        this.message = message;
        this.withHeader('Content-Length', message.length);
        return this;
    };

    RequestBuilder.prototype.withHeader = function (key, value) {
        this.headers = this.headers || {};
        this.headers[key] = value;
        return this;
    };

    RequestBuilder.prototype.build = function () {

        var timeStamp = this.timeStamp.toISOString();
        var messageDigest = calculateSha1HexDigest(this.message);

        var sha1Hmac = this.sha1HmacBuilder
            .withContentType(this.headers['Content-Type'])
            .withRequestMethod(this.method)
            .withContentDigest(messageDigest)
            .withSendingTime(timeStamp)
            .withRequestUrl(this.uri)
            .build();

        this.withHeader('authorization', 'GGE4_API ' + this.hmacKeyId + ':' + sha1Hmac);
        this.withHeader('x-gge4-date', timeStamp);
        this.withHeader('x-gge4-content-sha1', messageDigest);

        return {
            host: this.host,
            path: this.uri,
            port: this.port,
            method: this.method,
            headers: this.headers
        };
    };

    module.exports = RequestBuilder;

})();