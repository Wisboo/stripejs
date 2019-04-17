'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function StripeProvider() {
  var _this = this;

  var stripePromise;

  var loadStripeScript = function loadStripeScript($window, $document, $q) {
    if (!!_this.stripe) {
      return $q.resolve(_this.stripe);
    }

    if (!window.$StripeLoading) {
      window.$StripeLoading = true;
      var deferred = $q.defer();
      var script = $document[0].createElement('script');
      script.async = true;
      script.src = 'https://js.stripe.com/v3';

      script.onload = function () {
        _this.stripe = $window.Stripe;
        $window.$StripeLoading = false;
        deferred.resolve(_this.stripe);
      };

      script.onerror = function () {
        $window.$StripeLoading = false;
      };

      $document[0].body.appendChild(script);
      return stripePromise = deferred.promise;
    }

    return $q.when(stripePromise);
  };

  this.apiKey = null;

  this.setApiKey = function (apiKey) {
    _this.apiKey = apiKey;
  };

  this.$get = ['$window', '$document', '$q', function ($window, $document, $q) {
    return loadStripeScript($window, $document, $q).then(function (Stripe) {
      return Stripe(_this.key);
    }, function () {
      return {};
    });
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
