var module = angular.module('app', []);

module.factory('env', ['$http', function ($http) {

    this.envs = [
        {
            name: 'test',
            url: 'http://testurl/rev.txt',
        }
    ];

    this.result = [];

    this.findAll = function() {
        for (var i = 0;  i < this.envs.length; i++) {

            request = {
                method: 'GET',
                url: this.envs[i].url,
                env: this.envs[i],
                result: this.result
            };

            $http(request).then(function successCallback(response) {
                console.log(response);
                data = response.data;
                regexp = new RegExp("(/[a-zA-Z0-9-_]*)");
                branch = regexp.exec(data)[0].substr(1);


                env = {
                    name: response.config.env.name,
                    branch: branch
                };

                response.config.result.push(env);
                
            }, function errorCallback(response) {
                console.log("deu errado");
            });
        }

        return this.result;
    }

    return this;
}]);

module.controller('EnvController', ['$scope', 'env', function ($scope, env) {
    $scope.texto = "maluco";

    $scope.envs = env.findAll();
}])