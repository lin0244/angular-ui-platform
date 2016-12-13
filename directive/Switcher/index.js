import './style.less'
import template from './template.html'
export default function Switcher(app){
	app.directive('iceSwitcher',function(){
		return {
			restrict: 'E',
			replace: true,
			scope: {
				value: '=',
				disabled: '@',
				labelOn:'@',
				labelOff:'@',
				change:"="
			},
			template: template
		}
	})
}