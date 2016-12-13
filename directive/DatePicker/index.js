import template from './template.html'
import './style.less'

export default function DatePicker(app) {
  app.directive('iceDatePicker', function() {
    return {
      restrict: 'EAC',
      replace: true,
      scope: {
        startDate: "=",
        endDate: "=",
        id: "@",
        format: '@',
        timePicker: '@',
        maxDate: '@',
        minDate: '@',
        dateLimit: '@',
        single: '@',
        checkDate:'='
      },
      template: template,
      transclude: true,
      controller: ['$rootScope', '$scope', '$element', '$attrs', 'datePicker',function($rootScope, $scope, $element, $attrs,datePicker) {
        $scope.id = $scope.id ? $scope.id : '_datePicker_' + Math.floor(Math.random() * 100000);
        $scope.config = {
          start: {
            dropdownSelector: "#" + $scope.id + "start",
            startView: 'day',
            minView: $scope.timePicker == true || $scope.timePicker == 'true' ? 'minute' : 'day'
          },
          end: {
            dropdownSelector: "#" + $scope.id + "end",
            startView: 'day',
            minView: $scope.timePicker == true || $scope.timePicker == 'true' ? 'minute' : 'day'
          },
          single: $scope.single == 'true' || $scope.single == true ? true : false
        }
        var formatStr = $scope.format ? $scope.format : (($scope.timePicker && $scope.timePicker == true) ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd');
       
        $scope.beforeRenderStartDate = function($view, $dates, $leftDate, $upDate, $rightDate) {
          var date = $scope.startDate;
          if (date !== undefined && date.Format) {
            
            var start = $scope.startDate.Format(formatStr);
            if(!$scope.config.single && $scope.endDate !== undefined && $scope.endDate !== '' && new Date($scope.endDate).Format){
              var end = new Date($scope.endDate).Format(formatStr);
            }

            $scope.checkDate=datePicker.checkDate(start, 
                                                  end, 
                                                  $scope.minDate,
                                                  $scope.maxDate,
                                                  $scope.dateLimit);
            $scope.startDate = date.Format(formatStr);
          }
        };
        $scope.beforeRenderEndDate = function($view, $dates, $leftDate, $upDate, $rightDate) {
          var date = $scope.endDate;
          if (date !== undefined && date.Format) {
            var start = new Date($scope.startDate).Format(formatStr);
            var end = $scope.endDate.Format(formatStr);
            $scope.checkDate=datePicker.checkDate(start, 
                                                  end, 
                                                  $scope.minDate,
                                                  $scope.maxDate,
                                                  $scope.dateLimit);
            $scope.endDate = date.Format(formatStr);
          }
        };



        //format when init
        if($scope.startDate !== undefined && $scope.startDate !== '' && new Date($scope.startDate).Format){
          $scope.startDate = new Date($scope.startDate).Format(formatStr);
        }
        if(!$scope.config.single && $scope.endDate !== undefined && $scope.endDate !== '' && new Date($scope.endDate).Format){
          $scope.endDate = new Date($scope.endDate).Format(formatStr);
        }
      }],
      compile: function(tElem, tAttrs) {
      }
    };
  });
}

        
        Date.prototype.Format = function(fmt) {
          if (fmt == "" || fmt == undefined || fmt == null) {
            return "";
          }
          var o = {
            "M+": this.getMonth() + 1,
            //月份 
            "d+": this.getDate(),
            //日 
            "h+": this.getHours(),
            //小时 
            "m+": this.getMinutes(),
            //分 
            "s+": this.getSeconds(),
            //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3),
            //季度 
            "S": this.getMilliseconds() //毫秒 
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        }