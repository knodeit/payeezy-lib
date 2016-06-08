(function () {
    'use strict';

    var crypto = require('crypto');

    function Sha1HmacBuilder(hmacKey) {
        this.hmacKey = hmacKey;
    }

    Sha1HmacBuilder.prototype.withContentType = function (contentType) {
        this.contentType = contentType;
        return this;
    };

    Sha1HmacBuilder.prototype.withRequestMethod = function (requestMethod) {
        this.requestMethod = requestMethod;
        return this;
    };

    Sha1HmacBuilder.prototype.withContentDigest = function (contentDigest) {
        this.contentDigest = contentDigest;
        return this;
    };

    Sha1HmacBuilder.prototype.withSendingTime = function (sendingTime) {
        this.sendingTime = sendingTime;
        return this;
    };

    Sha1HmacBuilder.prototype.withRequestUrl = function (requestUrl) {
        this.requestUrl = requestUrl;
        return this;
    };

    Sha1HmacBuilder.prototype.build = function () {
        var message = this.requestMethod +
            '\n' +
            this.contentType +
            '\n' +
            this.contentDigest +
            '\n' +
            this.sendingTime +
            '\n' +
            this.requestUrl;

        var digestBuffer = crypto
            .createHmac('sha1', this.hmacKey)
            .update(message)
            .digest();

        return new Buffer(digestBuffer).toString('base64');
    };

    module.exports = Sha1HmacBuilder;

})();