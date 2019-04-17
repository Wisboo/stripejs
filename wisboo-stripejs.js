function StripeProvider () {
  let stripePromise;

  const loadStripeScript = ($window, $document, $q) => {
    if (!!this.stripe) {
      return $q.resolve(this.stripe);
    }

    if (!window.$StripeLoading) {
      window.$StripeLoading = true;
      const deferred = $q.defer();
      const script = $document[0].createElement('script');
      script.async = true;
      script.src = 'https://js.stripe.com/v3';
      script.onload = () => {
        this.stripe = $window.Stripe;
        $window.$StripeLoading = false;
        deferred.resolve(this.stripe);
      };
      script.onerror = () => {
        $window.$StripeLoading = false;
      };
      $document[0].body.appendChild(script);
      return stripePromise = deferred.promise;
    }
    return $q.when(stripePromise);
  };

  this.apiKey = null;

  this.setApiKey = (apiKey) => {
    this.apiKey = apiKey;
  };

  this.$get = ['$window', '$document', '$q', ($window, $document, $q) => {
    return loadStripeScript($window, $document, $q).then(Stripe => {
      return Stripe(this.key);
    }, () => {
      return {};
    });
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
