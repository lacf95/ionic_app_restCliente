angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('myCtrl', function($scope, $http, $ionicLoading) {
  $scope.Listado = function() {
    $http.get("http://lacf95.96.lt/clientes/").then(function(response) {
      $scope.myData = response.data;
    });
  };

  $scope.Eliminar = function(id) {
    $ionicLoading.show();
    $http({
      url: "http://lacf95.96.lt/clientes/",
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: Object.toparams({
        id: id
      }),
    }).success(function() {
      $scope.Listado();
      $scope.nombre="";
      $scope.direccion="";
      $scope.telefono="";
      $scope.correo="";
    });
    $ionicLoading.hide();
  };

  $scope.Agregar = function() {
    $ionicLoading.show();
    $http({
      url: "http://lacf95.96.lt/clientes/",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: Object.toparams({
        nombre: $scope.nombre,
        direccion: $scope.direccion,
        telefono: $scope.telefono,
        correo: $scope.correo
      }),
    }).success(function() {
      $scope.Listado();
      $scope.nombre="";
      $scope.direccion="";
      $scope.telefono="";
      $scope.correo="";
    });
    $ionicLoading.hide();
  };

  $scope.Listado();
});

Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
};
