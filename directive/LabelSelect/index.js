import template from './template.html'
import '../LabelInput/style.less'
export default function LabelSelect(app){
	app.directive('iceLabelSelect',function(){
		return {
			restrict: 'E',
			replace: true,
			scope : {
				value: '=',
				option: '=',
				label:'@'
			},
			template: template
		}
	})
}





