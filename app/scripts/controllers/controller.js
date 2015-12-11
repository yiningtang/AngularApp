'use strict';

// the storeController contains two objects:
// - store: contains the product list
// - cart: the shopping cart object
// - detailsprod: contains the details product


app.controller('storeController', function ($scope, DataService,GetData,$filter,$stateParams) {
 
    // get store and cart from service
    $scope.cart=DataService.cart;
    $scope.store=DataService.store;

$scope.store.currentPage = 0;
    $scope.store.pageSize = 3;
    
    $scope.store.filteredItems = [];
    $scope.store.groupedItems = [];
    $scope.store.pagedItems = [];
    var i;
    DataService.store.products_sound=GetData.query();
    DataService.store.products_sound.$promise.then(function(data){
 $scope.store.numberOfPages = Math.ceil(data.length / $scope.store.pageSize);
  groupPages(data);
function groupPages (data){for ( i = 0; i < data.length; i++) {
            if (i % $scope.store.pageSize === 0) {
               $scope.store.pagedItems[Math.floor(i / $scope.store.pageSize)]=[data[i]];
            } else {
                $scope.store.pagedItems[Math.floor(i / $scope.store.pageSize)].push(data[i]);
            }
            $scope.store.numberOfPages=Math.ceil(data.length/$scope.store.pageSize);
        }}

var searchMatch = function (haystack, needle) {
        if (!needle) {

            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };
    $scope.store.myFilter = function (column, category) {
     
        $scope.store.filteredItems = $filter('filter')(data, function (product) {
            for (var attr in product) {
                if (searchMatch(product[column], category))
                    return true;
            }
            return false;
        });
        $scope.store.currentPage = 0;
       
        groupPages($scope.store.filteredItems);
    };
    $scope.store.search = function (name) {
     
        $scope.store.filteredItems = $filter('filter')(data, function (product) {
            for (var attr in product) {
                if (searchMatch(product[name], $scope.store.query))
                
                    return true;
            }
            return false;
        });

        

        $scope.store.currentPage = 0;
        
       groupPages($scope.store.filteredItems);
    };


    });

   

    
});

app.controller('storeController_sound', function ($scope, DataService,GetData,$stateParams) {

console.log($stateParams.id);
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl; 
    };

    // get store and cart from service
    $scope.detailsprod = DataService.detailsprod;
    $scope.store = DataService.store;
    $scope.cart = DataService.cart;
DataService.store.product=GetData.get({phoneId:$stateParams.id},function (phone){
  $scope.mainImageUrl = phone.images[0];
});
    if ($stateParams.productCode != null) {
        $scope.product = $scope.store.getProduct_sound($stateParams.productCode);
        $scope.detail = $scope.detailsprod.getDetail_sound($stateParams.productCode);
    }
});



          