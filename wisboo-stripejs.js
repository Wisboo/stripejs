function StripeProvider () {
  let stripePromise;
  this.apiKey = null;

  this.setApiKey = (apiKey) => {
    this.apiKey = apiKey;
  };

  const loadStripeScript = ($q) => {
    if (!!this.stripe) {
      return $q.resolve(this.stripe);
    }

    if (!window.$StripeLoading) {
      window.$StripeLoading = true;
      const deferred = $q.defer();
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://js.stripe.com/v3';
      script.onload = () => {
        this.stripe = window.Stripe(this.apiKey);
        window.$StripeLoading = false;
        deferred.resolve(this.stripe);
      };
      script.onerror = () => {
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
      createCard: (options) => {
        return loadStripeScript($q).then(Stripe => {
          return $q.resolve(Stripe.elements().create('card', options));
        }, function () {
          return $q.reject();
        });
      }
    };
  }];
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
                            .provider('stripe', StripeProvider)
                            .component('stripeCreditCardInput', stripeCreditCardComponent);
export { stripeCreditCardComponent };
