import template from './template.html'
export default function Select(app){
	app.directive('iceSelect',function(){
		return {
			restrict: 'E',
			replace: true,
			scope: {
				value: '=',
				option: '='
			},
			template: template
		}
	})
}

