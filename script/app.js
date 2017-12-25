/**
 * Created by Leej on 2017/12/18.
 */
var Todays = angular.module("Todays",['ngRoute','Controllers','Directives']);

//内容路由
Todays.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when('/today', {
        templateUrl: './views/today.html',
        controller: 'TodayController'
    })
        .when('/older', {
            templateUrl: './views/older.html',
            controller: 'OlderController'
        })
        .when('/author',{
            templateUrl:'./views/author.html',
            controller: 'AuthorController'
        })
        .when('/category',{
            templateUrl:'./views/category.html',
            controller: 'CategoryController'

        })
        .when('/favourite',{
            templateUrl:'./views/favourite.html',
            controller: 'FavouriteController'

        })
        .when('/settings',{
            templateUrl:'./views/settings.html',
            controller: 'SettingsController'

        })
        .otherwise({
            redirectTo: '/today'
        });

}]);

//侧边导航栏移动
Todays.run(['$rootScope',function ($rootScope) {
    //侧边栏初始隐藏；
    $rootScope.collapsed = false;

    $rootScope.toggle = function () {
        //获取标签
        // var viewport = document.querySelector('.viewport');
        // var nav = document.querySelector('.nav');
        // var width = nav.offsetWidth;
        // console.log(width+"宽度");
        var ddNavs = document.querySelectorAll('.nav dd');
        // viewport.style.transform = 'translate('+width+')';
        // nav.style.backgroundColor = 'red';
        // console.log(nav);    transition: all 1s 0.1s;

        if ($rootScope.collapsed){
            console.log('关闭');
            $rootScope.collapsed = !$rootScope.collapsed;
            for (var i=0; i < ddNavs.length; i++){
                ddNavs[i].style.transform = 'translate(-100%)';
                ddNavs[i].style.transitionDelay = '0.2s';
                var len = ddNavs.length;
                ddNavs[i].style.transitionDuration = (len-i)*0.15+'s';
            }
        }else {
            $rootScope.collapsed = !$rootScope.collapsed;
            for (var i= 0; i<ddNavs.length; i++){
                ddNavs[i].style.transform = 'translate(0)';
                ddNavs[i].style.transitionDelay = '0.2s';
                ddNavs[i].style.transitionDuration = (i+1)*0.15+'s';
            }

        }

    }
}]);
