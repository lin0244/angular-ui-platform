import template from './template.html'
export default function Input(app){
	app.directive('iceInput',function(){
		return {
			restrict: 'E',
			replace: true,
			scope : {
				value: '=',
				palceholder: '@'
			},
			template: template
		}
	})
}


