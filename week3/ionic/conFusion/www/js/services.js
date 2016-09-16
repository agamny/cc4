'use strict';

//angular.module('confusionApp')
angular.module('conFusion.services', ['ngResource'])
        .constant("baseURL","http://localhost:3000/")

        .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
                    console.log ("Menu Factory invoked.. "+$resource + baseURL);
                    return $resource(baseURL + "dishes/:id", null, {
                        'update': {
                            method: 'PUT'
                        }
                    });

        }])

        .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            return $resource(baseURL + "promotions/:id");

        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"leadership/:id");
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"feedback/:id");
        }])

        .factory('favoriteFactory', ['$resource', '$localStorage', 'baseURL', function ($resource, $localStorage, baseURL) {
            var favFac = {};
            //var favorites = [];
            var favorites = $localStorage.getObject('favoriteStringIDs','{}');;
            
            favFac.addToFavorites = function (index) {
                
                console.log("FavoriteFactory, addToFavorites invoked with: " + index);
                favorites = $localStorage.getObject('favoriteStringIDs','{}');
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index)
                        return;
                }
                console.log("FavoriteFactory, addToFavorites starting to push: " + index);
                favorites.push({id: index});
                console.log("FavoriteFactory, addToFavorites successfully pushed: " + index);
                //favoriteStringIDs = $localStorage.getObject('favoriteStringIDs','{}');
                $localStorage.storeObject('favoriteStringIDs',favorites);
                //console.log(favoriteIDs);
            };
            
            favFac.deleteFromFavorites = function (index) {
                for (var i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == index) {
                        favorites.splice(i, 1);
                    }
                }
            }

            favFac.getFavorites = function () {
                favorites = $localStorage.getObject('favoriteStringIDs','{}');
                return favorites;
            };
            
            return favFac;
            
        }])

        .factory('$localStorage', ['$window', function($window) {
          return {
            store: function(key, value) {
              $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
              return $window.localStorage[key] || defaultValue;
            },
            storeObject: function(key, value) {
              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key,defaultValue) {
              return JSON.parse($window.localStorage[key] || defaultValue);
            }
          }
        }])



;
