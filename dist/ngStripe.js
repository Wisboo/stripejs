'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var stripeJs = require('@stripe/stripe-js');

function StripeService() {
  this.loadStripe = stripeJs.loadStripe;
}

var stripeCreditCardComponent = {
  bindings: {
    instance: '<'
  },
  controller: ['$element', function ($element) {
    var _this = this;

    this.$onInit = function () {
      _this.instance.mount($element[0]);
    };

    this.$onDestroy = function () {
      _this.instance.destroy();
    };
  }]
};
var wisbooStripe = angular.module('wisboo.stripejs-wrapper', []).service('Stripe', StripeService).component('stripeCreditCardInput', stripeCreditCardComponent);

exports.stripeCreditCardComponent = stripeCreditCardComponent;
exports.wisbooStripe = wisbooStripe;
