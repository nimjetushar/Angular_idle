(function (angular, document) {
    'use strict';
    var config = {
        idleTime: 1800000
    };
    angular.module('ngIdleDemo', ['ngIdle'])
        .config(["idleProvider", function (idleProvider) {
            idleProvider.idle(config.idleTime);
        }])
        .controller('idleDemoCtrl', ['$scope', 'idle', '$rootScope', function ($scope, idle, $rootScope) {

            $scope.idleTime = config.idleTime;
            //watch for idle
            $scope.watch = function () {
                idle.watch();
            };

            //unwatch idle
            $scope.unwatch = function () {
                idle.unwatch();
            };

            //destory idle timer
            $scope.destroy = function () {
                idle.destroy();
            };

            //listener for idle complete event
            $rootScope.$on('idleComplete', function () {
                $scope.idleCompleteMessage = "Application was idle for long time";
            });
        }]);


    angular.element(document).ready(function () {
        angular.bootstrap(document, ["ngIdleDemo"]);
    });
}(window.angular, document));
