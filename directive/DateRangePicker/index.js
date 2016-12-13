//https://github.com/dangrossman/bootstrap-daterangepicker
import template from './template.html'
export default function Button(app) {
	app.directive('iceDateRangePicker', function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				startDate: '=',
				endDate: '=',
				format: '@',
				minDate: '@',
				maxDate: '@',
				single: '@',
				dateLimit: '@',
				timePicker:'@'
			},
			template: template,
			controller: function($scope, $element, $attrs) {
				var _format = $scope.format
				if (!_format) {
					if( $scope.timePicker == 'true'){
						_format = 'YYYY-MM-DD hh:mm'
					}else{
						_format = 'YYYY-MM-DD'
					}
				}
				if($scope.startDate!=""){
					$scope.startDate = new Date($scope.startDate).format(_format)
				}
				if($scope.endDate!=""){
					$scope.endDate = new Date($scope.endDate).format(_format)
				}
				$scope.defaultValue = $scope.startDate + ' -- ' + $scope.endDate
				var config = initConfig(_format, $scope.minDate, $scope.maxDate, $scope.single, $scope.dateLimit, $scope.timePicker)
				$($element).daterangepicker(copy(config), function(start, end) {
						$scope.startDate = start.format(_format)
						$scope.endDate = end.format(_format)
				});
			}
		}
	})
}

function copy(obj) {
	return JSON.parse(JSON.stringify(obj))
}

function initConfig(format, minDate, maxDate, single, dateLimit, timePicker) {
	var _locale_zh = copy(locale_zh)
	var config = {
		autoApply:true,
		timePicker: false,
		timePickerIncrement: 1
	}
	_locale_zh.format = format
	config.locale = _locale_zh
	if (timePicker == 'true') {
		config.timePicker = true
	}
	if (single == 'true') {
		config.singleDatePicker = true
		return copy(config)
	}
	if (!!minDate) {
		config.minDate = minDate
	}
	if (!!maxDate) {
		config.maxDate = maxDate
	}
	if (dateLimit) {
		config.dateLimit = {
			"days": dateLimit
		}
	}
	return copy(config)

}

var locale_zh = {
	"format": "YYYY-MM-DD hh:mm",
	"separator": " -- ",
	"applyLabel": "确定",
	"cancelLabel": "取消",
	"fromLabel": "开始",
	"toLabel": "截止",
	"customRangeLabel": "自定义",
	"daysOfWeek": [
		"日",
		"一",
		"二",
		"三",
		"四",
		"五",
		"六"
	],
	"monthNames": [
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月"
	],
	"firstDay": 1
}

var locale = {
	"format": "YYYY/MM/DD hh:mm",
	"separator": " - ",
	"applyLabel": "Apply",
	"cancelLabel": "Cancel",
	"fromLabel": "From",
	"toLabel": "To",
	"customRangeLabel": "Custom",
	"daysOfWeek": [
		"Su",
		"Mo",
		"Tu",
		"We",
		"Th",
		"Fr",
		"Sa"
	],
	"monthNames": [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	"firstDay": 1
}
