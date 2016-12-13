import template from './template.html'
import './style.less'
export default function LableInput(app){
	app.directive('iceLabelInput',function(){
		return {
			restrict: 'E',
			replace: true,
			scope : {
				value: '=',
				palceholder: '@',
				label:'@'
			},
			template: template
		}
	})
}





