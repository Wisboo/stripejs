function StripeProvider () {
  let stripePromise;
  this.apiKey = null;

  this.setApiKey = (apiKey) => {
    this.apiKey = apiKey;
  };

  const loadStripeScript = ($q) => {
    if (!!window.Stripe) {
      return $q.resolve(window.Stripe);
    }

    if (!window.$StripeLoading) {
      window.$StripeLoading = true;
      const deferred = $q.defer();
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://js.stripe.com/v3';
      script.onload = () => {
        window.$StripeLoading = false;
        deferred.resolve(window.Stripe);
      };
      script.onerror = () => {
        delete window.$StripeLoading;
        deferred.reject();
      };
      document.body.appendChild(script);
      return stripePromise = deferred.promise;
    }
    return $q.when(stripePromise);
  };

  this.$get = ['$q', function ($q) {
    return {
      instance: () => {
        return loadStripeScript($q);
      },
      createCard: (options) => {
        return loadStripeScript($q).then(Stripe => {
          return $q.resolve(Stripe(this.apiKey).elements().create('card', options));
        }, function () {
          return $q.reject();
        });
      },
      createToken: (cardElement, options) => {
        return loadStripeScript($q).then(Stripe => {
          return Stripe(this.apiKey).createToken(cardElement, options);
        }, () => $q.reject());
      },
      redirectToCheckout: (accountId, sessionId) => {
        return loadStripeScript($q).then(Stripe => {
          return Stripe(this.apiKey, { stripeAccount: accountId }).redirectToCheckout({ sessionId });
        }, () => $q.reject());
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
export { wisbooStripe, stripeCreditCardComponent };
