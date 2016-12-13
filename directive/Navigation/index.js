/**
    vpalNavigation
 **/

import template from './template.html'
import './style.less'
export default function Navigation(app) {
    app.directive('icsNavigation', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                conf: '=',
                levelMenu: '='
            },
            controller: ['$scope', '$element', '$attrs', 'rylaiCommon', function($scope, $element, $attrs,rylaiCommon) {
                var conf = $scope.conf;
                $scope.isShow = false
                $scope.$watch('conf.data', function(value, oldValue) {
                    if (conf.data != undefined && conf.data.length > 0) {
                        $scope.globalNavigation = _getIconData(conf.data)
                        var name = location.hash.substring(2, location.hash.length)
                        //导航栏初始化，自动生成水平栏
                        $scope.levelMenu.data = rylaiCommon.getLevelMenu($scope.globalNavigation, name)
                    }
                });

                function _getIconData(data) {
                    var length = data.length;
                    for (var i = 0; i < length; i++) {
                        var current = data[i];
                        var name = current["name"];
                        switch (name) {
                            case "公共基础":
                                current["icon"] = "base";
                                break;
                            case "消息中心":
                                current["icon"] = "message";
                                break;
                            case "商户管理":
                                current["icon"] = "user";
                                break;
                            case "远程消费":
                                current["icon"] = "cost";
                                break;
                            case "清结算管理":
                                current["icon"] = "calculate";
                                break;
                            case "交易管理":
                                current["icon"] = "merchandise";
                                break;
                            case "唯多利":
                                current["icon"] = "li";
                                break;
                            case "账户管理":
                                current["icon"] = "account";
                                break;
                            case "风控管理":
                                current["icon"] = "risk";
                                break;
                            case "备付金监控":
                                current["icon"] = "money";
                                break;
                            case "账务指令操作":
                                current["icon"] = "finance";
                                break;
                            case "日终处理":
                                current["icon"] = "control";
                                break;
                            default:
                                current["icon"] = "base";
                        }
                    }
                    return data;
                }
                $scope.mouseEnter = function($event) {
                    $($event.target).find(".nav-detail").removeClass("hide");
                    $scope.isShow = true
                }

                $scope.mouseLeave = function($event) {
                    if ($($event.target).find(".nav-detail").length) {
                        $($event.target).find(".nav-detail").addClass("hide");
                        $scope.isShow = false
                    } else {
                        $($event.target).closest(".nav-detail").addClass("hide");
                        $scope.isShow = false
                    }
                }

                $scope.targetClick = function($event) {
                    var $target = $($event.target);
                    if ($target.is("a")) {
                        $target.closest(".nav-detail").addClass('hide');
                        var url = $target.attr("href");
                        if ($target.attr("target") != "_blank") {
                            $event.preventDefault();
                            $event.stopPropagation();
                        }
                        if (url != undefined && url.substring(0, url.indexOf("?")).indexOf("iframe") == 0) {
                            location.href = "/layout.html#/iframe?" + url.substring(url.indexOf("?") + 1, url.length);
                        } else if (url != undefined && $target.attr("target") == "_blank") {
                        } else if (url != undefined) {
                            location.hash = url;
                            var name = url.substring(2, url.length)
                            //$scope.levelMenu.data = rylaiCommon.getLevelMenu($scope.globalNavigation, name)
                        }
                    }
                }
            }],

            template: template
        };
    });
}