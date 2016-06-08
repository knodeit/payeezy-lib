/**
 * (c) Copyright LPG Labs
 * The content of this file is protected by copyright laws and NOT free to distribute in any form
 */
'use strict';

var Q = require('q');
var https = require('https');


var testEndPoint = 'api.demo.globalgatewaye4.firstdata.com';
var productionEndPoint = 'api.globalgatewaye4.firstdata.com';
var serviceURI = '/transaction/v19';


//IC0697-99
//IS43PjMcfB340Twp9C1mYArvMR2AoV9p

var Sha1HmacBuilder = require('./Sha1HmacBuilder');
var RequestBuilder = require('./RequestBuilder');
var FirstDataResponse = require('./FirstDataResponse');


var PURCHASE_TRANSACTION_TYPE = '00';

function Payeezy(gatewayId,password,hmacKey,hmacKeyId, testMode) {
    this.gatewayId = gatewayId;
    this.password = password;
    this.hmacKey = hmacKey;
    this.hmacKeyId = hmacKeyId;
    this.testMode = testMode;

    this.requestBuilder = new RequestBuilder(new Sha1HmacBuilder(hmacKey))
        .withHmacKeyId(hmacKeyId)
        .withHost(this.testMode ? testEndPoint : productionEndPoint)
        .withPort(443)
        .withUri(serviceURI)
        .withMethod('POST')
        .withHeader('Content-Type','application/json')
        .withHeader('Accept','application/json');
}

Payeezy.prototype.sendRequest = function (message) {
    var deferred = Q.defer();
    var requestOptions = this.requestBuilder.withMessage(message).withTimeStamp(new Date()).build();
    var self = this;

    var callback = function(res) {
        var payload = ''

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            payload += chunk;
        });

        res.on('end', function () {
            try {
                var text = payload && payload.replace(/^\s*|\s*$/g, '');
                res.payload = text && JSON.parse(text);
            } catch(e) {
                console.log(e);
            }

            var firstDataResponse = new FirstDataResponse(res);

            if(firstDataResponse.ok()){
                deferred.resolve(firstDataResponse.getTransaction());
            }else{
                deferred.reject(firstDataResponse.getError());
            }
        });
    };

    var req = https.request(requestOptions, callback);

    req.setTimeout(5000, function(){
        req.abort();
    });

    req.on('error', function(e) {
        console.log(e);
        deferred.reject(this._adaptError(e));
    }.bind(this));

    req.write(message);
    req.end();


    return deferred.promise;
};

/**
 *
 * @param cardHolderName    full name as mentioned on the credit card
 * @param cardNumber        full card number no spaces
 * @param expirtationYear   two digit format  so YY
 * @param expirationMonth   two digit format so MM
 * @param cvv               three digit
 * @param amount            number format like 12.99
 */
Payeezy.prototype.makePurchase = function(cardHolderName, cardNumber,expirtationYear,expirationMonth,cvv,amount){
    var message = JSON.stringify({
        gateway_id: this.gatewayId,
        password: this.password,
        transaction_type: PURCHASE_TRANSACTION_TYPE,
        amount: amount,
        cc_number: cardNumber,
        cc_expiry: expirationMonth + expirtationYear,
        cardholder_name: cardHolderName,
        cc_verification_str2: cvv,
        cvd_presence_ind: '1'

    });

    return this.sendRequest(message);
}




// export the class
module.exports = Payeezy;