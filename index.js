const Stripe = require('./stripe.js');

const stripeWrapper = angular.module('wisboo.stripejs-wrapper')
  .provider('stripe', function () {
    this.apiKey = null;

    this.setApiKey = (apiKey) => {
      this.apiKey = apiKey;
    };

    this.$get = () => {
      return Stripe(this.apiKey);
    };
  }).component('stripeCreditCardInput', {
    bindings: {
      instance: '<'
    },
    controller: ['$element', function ($element) {
      this.$onInit = () => {
        this.instance.mount($element[0]);
      };

      this.$onDestroy = () => {
        this.instance.destroy();
      };
    }]
  });
