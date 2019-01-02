const wisbooStripe = angular.module('wisboo.stripejs-wrapper', [])
  .provider('stripe', function () {
    this.loadStripeScript = () => {
      if (!this.stripe) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://js.stripe.com/v3';
        script.onload = () => {
          this.stripe = window.Stripe;
        };
        document.body.appendChild(script);
      }
    };

    this.apiKey = null;

    this.setApiKey = (apiKey) => {
      this.apiKey = apiKey;
    };

    this.$get = () => {
      if (this.stripe) {
        return this.stripe(this.apiKey);
      }
      return Stripe(this.apiKey);
    };
  })
  .component('stripeCreditCardInput', {
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
