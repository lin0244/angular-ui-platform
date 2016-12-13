import template from './template.html'
export default function Row(app){
	app.directive('iceRow',function(){
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			scope: {},
			template: template

		}
	})
	
}