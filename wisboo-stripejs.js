import { loadStripe } from '@stripe/stripe-js';

function StripeService () {
  this.loadStripe = loadStripe;
}

const stripeCreditCardComponent = {
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
};

const wisbooStripe = angular.module('wisboo.stripejs-wrapper', [])
                            .service('Stripe', StripeService)
                            .component('stripeCreditCardInput', stripeCreditCardComponent);
export { wisbooStripe, stripeCreditCardComponent };
