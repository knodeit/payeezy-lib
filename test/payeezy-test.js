/**
 * (c) Copyright LPG Labs
 * The content of this file is protected by copyright laws and NOT free to distribute in any form
 */
var expect = require('chai').expect;

var PayeezyLib = require('../index');
//gatewayId,password,hmacKey,hmacKeyId, transarmorCode,testMode
var payeezy = new PayeezyLib('IC0697-99', 'IS43PjMcfB340Twp9C1mYArvMR2AoV9p', '2wldrMDBqC2H9N_xUfQ3QUzxNOpeZv4f', '349613', '3108', true);
describe('valid scenarios', function () {

	describe('When a purchase is approved', function () {
		var valid;
		this.timeout(10000);
		beforeEach(function (done) {
			payeezy.makePurchase('Peter', '4111111111111111', '20', '12', '123', 1.99)
				.then(function (payment) {
					console.log('payment', payment);
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
		it('Then it should pass', function () {
			expect(valid).to.be.true;
		});
	});

	describe('When a pre-authorization is approved by tansarmorToken', function () {
		var valid;
		this.timeout(10000);
		beforeEach(function (done) {
			payeezy.preAuthorize('Peter', '4111111111111111', '20', '12', '123')
				.then(function (payment) {
					console.log('payment', payment);
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
		it('Then it should pass', function () {
			expect(valid).to.be.true;
		});
	});

	describe('When a purchase is approved by tansormorToken', function () {
		var valid;
		this.timeout(10000);
		beforeEach(function (done) {
			payeezy.makePurchaseByToken('Peter', '7961639207631111', '20', '12', '123', 'Visa', 8.99)
				.then(function (payment) {
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
		it('Then it should pass', function () {
			expect(valid).to.be.true;
		});
	});
});