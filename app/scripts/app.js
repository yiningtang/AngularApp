'use strict';

/**
 * @ngdoc overview
 * @name angularAppApp
 * @description
 * # angularAppApp
 *
 * Main module of the application.
 */
var app=angular
  .module('angularAppApp', [
    'ngAnimate',
    'ui.router',
    'ngResource',
    'filter' 
  ]);




  app.config(function ($stateProvider,$urlRouterProvider) {
   $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
      url: "/",
      views: {
            // the main template will be placed here (relatively named)
            '': { templateUrl: 'templates/layout.html' },
            'slider@home': { 
            template:'<slider images="images"/>',
            controller: 'SliderController' },

            // the child views will be defined here (absolutely named)
            'store@home': { templateUrl: 'views/store.html',
            controller: 'storeController' }
        }
    
      
    }).
      state('home.details',{
       url:"phone/{id}",
       views:{
        '': { templateUrl: 'templates/layout.html' },
        'slider@home': { 
              templateUrl:'templates/productBanner.html'
            },

        'store@home':{
          templateUrl:'views/product.html',
          controller:'storeController_sound'
        }
       }
     }).
       state('home.cart',{
        url:"/cart",
        views:{
          '':{
            templateUrl:'templates/layout.html'
          },
          'slider@home':{template:''}
        ,
        'store@home':{
          templateUrl:'views/shoppingCart.html',
          controller:'storeController'
        }
       }
      });

      
  });


app.factory('GetData', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);


// create a data service that provides a store and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
app.factory("DataService", function () {

    // create store
    var myStore = new store();
    var storeDetails = new detailsprod();
    // create shopping cart
    var myCart = new shoppingCart("AngularStore");

    // enable PayPal checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with PayPal, you have to create a merchant account with 
    // PayPal. You can do that here:
    // https://www.paypal.com/webapps/mpp/merchant
    myCart.addCheckoutParameters("PayPal", "yiningcherry@gmail.com");

    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart,
        detailsprod: storeDetails
    };
});


 