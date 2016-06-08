/**
 * (c) Copyright LPG Labs
 * The content of this file is protected by copyright laws and NOT free to distribute in any form
 */
var expect = require('chai').expect;

var PayeezyLib = require('../index');
//gatewayId,password,hmacKey,hmacKeyId, testMode
var payeezy = new PayeezyLib('IC0697-99','IS43PjMcfB340Twp9C1mYArvMR2AoV9p','2wldrMDBqC2H9N_xUfQ3QUzxNOpeZv4f','349613', true);
describe('valid scenarios', function() {

    describe('When a purchase is approved', function() {
        var valid;


        this.timeout(10000);
        beforeEach(function(done) {
            payeezy.makePurchase('Peter', '4111111111111111','20','12','123',0.99)
                .then(function (payment) {
                    console.log('payment',payment);
                    //do something with the payment reciept
                    valid = true;
                    done();
                })
                .fail(function (err) {
                    //do something with the payment failure
                    console.log(err);
                    valid = false;
                    done();
                });
        })





        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });



    /*
    describe('When the card is approved', function() {
        var valid;
        var GGe4Proxy = require('firstdata-global-gateway');

        var gge4Configuration = {
            hmacKey: '2wldrMDBqC2H9N_xUfQ3QUzxNOpeZv4f',
            hmacKeyId: '349613',
            serviceUri: '/transaction/v14',
            serviceEndPoint: 'api.demo.globalgatewaye4.firstdata.com',
            gatewayId: 'IC0697-99',
            password: 'IS43PjMcfB340Twp9C1mYArvMR2AoV9p'
        };

        var gge4Proxy = new GGe4Proxy(gge4Configuration);

        var payload = {
            amount:1.99,
            creditCard: {
                name: 'John Doe',
                number: '4111111111111111',
                expirationMonth: '01',
                expirationYear: '20',
                securityCode: '123'
            }
        };


        this.timeout(10000);
        beforeEach(function(done) {
            gge4Proxy.purchase(payload)
                .then(function (payment) {
                    console.log('payment',payment);
                    //do something with the payment reciept
                    valid = true;
                    done();
                })
                .fail(function (err) {
                    //do something with the payment failure
                    console.log(err);
                    done();
                });
        })





        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });
*/






});