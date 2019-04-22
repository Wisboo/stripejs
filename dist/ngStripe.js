'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function StripeProvider() {
  var _this = this;

  var stripePromise;
  this.apiKey = null;

  this.setApiKey = function (apiKey) {
    _this.apiKey = apiKey;
  };

  var loadStripeScript = function loadStripeScript($q) {
    if (!!_this.stripe) {
      return $q.resolve(_this.stripe);
    }

    if (!window.$StripeLoading) {
      window.$StripeLoading = true;
      var deferred = $q.defer();
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://js.stripe.com/v3';

      script.onload = function () {
        _this.stripe = window.Stripe(_this.apiKey);
        window.$StripeLoading = false;
        deferred.resolve(_this.stripe);
      };

      script.onerror = function () {
        window.$StripeLoading = false;
        deferred.reject();
      };

      document.body.appendChild(script);
      return stripePromise = deferred.promise;
    }

    return $q.when(stripePromise);
  };

  this.$get = ['$q', function ($q) {
    return {
      createCard: function createCard(options) {
        return loadStripeScript($q).then(function (Stripe) {
          return $q.resolve(Stripe.elements().create('card', options));
        }, function () {
          return $q.reject();
        });
      },
      createToken: function createToken(cardElement, options) {
        return loadStripeScript($q).then(function (Stripe) {
          return Stripe.createToken(cardElement, options);
        }, function () {
          return $q.reject();
        });
      }
    };
  }];
}

var stripeCreditCardComponent = {
  bindings: {
    instance: '<'
  },
  controller: ['$element', function ($element) {
    var _this2 = this;

    this.$onInit = function () {
      _this2.instance.mount($element[0]);
    };

    this.$onDestroy = function () {
      _this2.instance.destroy();
    };
  }]
};
var wisbooStripe = angular.module('wisboo.stripejs-wrapper', []).provider('stripe', StripeProvider).component('stripeCreditCardInput', stripeCreditCardComponent);

exports.stripeCreditCardComponent = stripeCreditCardComponent;
