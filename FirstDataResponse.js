(function () {
    'use strict';

    function FirstDataResponse(httpResponse) {
        this.statusCode = httpResponse.statusCode,
            this.headers = httpResponse.headers,
            this.payload = httpResponse.payload
    }

    FirstDataResponse.prototype.ok = function () {
        var success = (this.statusCode >= 200 && this.statusCode < 300);

        return success && this.approved();
    };

    FirstDataResponse.prototype.approved = function () {
        return this.payload.exact_resp_code === '00' &&
            this.payload.transaction_error === 0 &&
            this.payload.transaction_approved === 1;
    };

    FirstDataResponse.prototype.getError = function () {
        if (this.ok())
            return {};

        var payload = this.payload;
        var isBankFailure = payload.bank_message !== 'Approved';
        var code = isBankFailure ? payload.bank_resp_code : payload.exact_resp_code;
        var defaultMessage = isBankFailure ? payload.bank_message : payload.exact_message;

        return {
            reason: ResponseCodes[code] || defaultMessage,
            code: code
        };
    };

    FirstDataResponse.prototype.getTransaction = function () {
        return {
            authorizationNumber: this.payload.authorization_num,
            transactionTag: this.payload.transaction_tag,
            sequenceNumber: this.payload.sequence_no,
            customerTransactionRecord: this.payload.ctr,
            clientIP: this.payload.client_ip,
            amount: this.payload.amount,
            creditCardNumber: this.payload.cc_number,
            creditCardType: this.payload.credit_card_type,
            creditCardExpirationDate: this.payload.cc_expiry,
            cardholderName: this.payload.cardholder_name,
            currencyCode: this.payload.currency_code,
            rawData: this.payload
        };
    };

    var ResponseCodes = {
        '605': 'Your credit card has an expired an or bad date sent. Confirm the correct date.',
        '08': 'Your credit card security code is invalid or missing.'
    };

    module.exports = FirstDataResponse;

})();