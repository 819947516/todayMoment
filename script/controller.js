/**
 * Created by Leej on 2017/12/18.
 */
angular.module('Controllers',[])
    .controller('NavController',['$scope',function ($scope) {
        $scope.navs = [
            {link:'#/today',icon:'icon-home',text:'今日一刻'},
            {link:'#/older',icon:'icon-file-empty',text:'往期内容'},
            {link:'#/author',icon:'icon-pencil',text:'热门作者'},
            {link:'#/category',icon:'icon-menu',text:'栏目浏览'},
            {link:'#/favourite',icon:'icon-heart',text:'我喜欢的'},
            {link:'#/settings',icon:'icon-cog',text:'设置'}
        ];
        // console.log($scope.navs);
    }])
    //today控制器
    .controller('TodayController',['$scope','$http','$filter','$rootScope',function ($scope, $http, $filter,$rootScope) {
        var today = new Date();
        $rootScope.index = 0;
        $rootScope.loaded  = false;
        today = $filter('date')(today,'yyyy-MM-dd');
        $http({
            url:'./api/today.php',
            method: 'get',
            params:{ today: today}
        }).then(function successCallback(info) {
            // console.log(info);
            $scope.datas = info.data.posts;
            $scope.time = info.data.date;
            // console.log($scope.datas);
            $rootScope.loaded  = true;
            // console.log($scope.time);
        });
    }])
    //older控制器
    .controller('OlderController',['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
        $rootScope.index = 1;
        $rootScope.loaded  = false;
        $http({
            url:'./api/older.php',
            method:'get'

        }).then(function successCallback(response) {
            $scope.datas = response.data.posts;
            $scope.time = response.data.date;
            // console.log($scope.datas);
            $rootScope.loaded  = true;

        })
    }])
    //热门作者控制器
    .controller('AuthorController',['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
        $rootScope.index = 2;
        $http({
            url:'./api/re_author.php',
            method:'get'
        }).then(function successCallback(response) {
            $scope.re_authors = response.data.authors;
            // console.log($scope.re_authors);
            $rootScope.loaded  = true;

        });
        $http({
           url: './api/all_author.php',
            method: 'get'
        }).then(function successCallback(response) {
            $scope.all_authors = response.data.authors;
            // console.log($scope.all_authors);
            $rootScope.loaded  = true;
        });

        // var btn = document.querySelector('.author button');
        $scope.need = false;
        $scope.btn = function () {
            $http({
                url: './api/more_author.php',
                method: 'get'
            }).then(function successCallback(response) {
                $scope.more_authors = response.data.authors;
                // console.log($scope.all_authors);
                $scope.need  = true;
            });
        }
    }])
    //栏目浏览
    .controller('CategoryController',['$scope','$http','$rootScope',function ($scope, $http,$rootScope) {
        $rootScope.index = 3;
        $rootScope.loaded  = false;
        $http({
            url:'./api/category.php',
            method:'get'

        }).then(function successCallback(response) {
            $scope.datas = response.data.columns;
            // $scope.time = response.data.date;
            console.log($scope.datas);
            $rootScope.loaded  = true;

        })
    }])
    .controller('FavouriteController',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope.index = 4;

    }])
    .controller('SettingsController',['$scope','$rootScope',function ($scope,$rootScope) {
        $rootScope.index = 5;

    }]);
