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
    if (!!window.Stripe) {
      return $q.resolve(window.Stripe);
    }

    if (!window.$StripeLoading) {
      window.$StripeLoading = true;
      var deferred = $q.defer();
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://js.stripe.com/v3';

      script.onload = function () {
        window.$StripeLoading = false;
        deferred.resolve(window.Stripe);
      };

      script.onerror = function () {
        delete window.$StripeLoading;
        deferred.reject();
      };

      document.body.appendChild(script);
      return stripePromise = deferred.promise;
    }

    return $q.when(stripePromise);
  };

  this.$get = ['$q', function ($q) {
    var _this2 = this;

    return {
      instance: function instance(options) {
        return loadStripeScript($q)(_this2.apiKey, options);
      },
      createCard: function createCard(options) {
        return loadStripeScript($q).then(function (Stripe) {
          return $q.resolve(Stripe(_this2.apiKey).elements().create('card', options));
        }, function () {
          return $q.reject();
        });
      },
      createToken: function createToken(cardElement, options) {
        return loadStripeScript($q).then(function (Stripe) {
          return Stripe(_this2.apiKey).createToken(cardElement, options);
        }, function () {
          return $q.reject();
        });
      },
      redirectToCheckout: function redirectToCheckout(accountId, sessionId) {
        return loadStripeScript($q).then(function (Stripe) {
          return Stripe(_this2.apiKey, {
            stripeAccount: accountId
          }).redirectToCheckout({
            sessionId: sessionId
          });
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
    var _this3 = this;

    this.$onInit = function () {
      _this3.instance.mount($element[0]);
    };

    this.$onDestroy = function () {
      _this3.instance.destroy();
    };
  }]
};
var wisbooStripe = angular.module('wisboo.stripejs-wrapper', []).provider('stripe', StripeProvider).component('stripeCreditCardInput', stripeCreditCardComponent);

exports.stripeCreditCardComponent = stripeCreditCardComponent;
exports.wisbooStripe = wisbooStripe;
