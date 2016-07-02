/**
 * (c) Copyright LPG Labs
 * You can use this library without any restrictions unless you keep the above copyright mention in place
 */
var expect = require('chai').expect;

var PayeezyLib = require('../index');

var payeezy = new PayeezyLib('xxxx', 'xxxx', 'xxxx', 'xxxx', 'xxx', true);

describe('valid scenarios', function () {

	describe('When a purchase is approved', function () {
		var valid;
		this.timeout(10000);
		beforeEach(function (done) {
			payeezy.makePurchase('Peter', '4111111111111111', '20', '12', '123', 1.99)
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

	describe('When a purchase with CVVis approved', function () {
		var valid;
		this.timeout(10000);
		beforeEach(function (done) {
			payeezy.makePurchaseWithoutCVV('Peter', '4111111111111111', '20', '12',  1.99)
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
	describe('When a pre-authorization is approved by tansarmorToken', function () {
		var valid;
		this.timeout(10000);
		beforeEach(function (done) {
			payeezy.preAuthorize('Peter', '4111111111111111', '20', '12', '123')
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