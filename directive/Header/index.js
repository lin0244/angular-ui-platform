import template from './template.html'
export default function Header(app){
	app.directive('iceHead',function(){
		return {
			restrict: 'AE',
			replace: true,
			scope : {
				title: '@'
			},
			template: template
		}
	})
}


