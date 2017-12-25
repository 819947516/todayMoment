/**
 * Created by Leej on 2017/12/18.
 */
angular.module('Directives',[])
    //自定义指令
.directive('loading',function () {
    return{
        restrict: 'A',
        replace: true,
        template: '<img src="" alt="">'
    }
})
