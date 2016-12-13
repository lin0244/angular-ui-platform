import template from './template.html'
import './style.less'
export default function Mask(app) {
	app.directive('icsMask', function() {
		return {
			restrict: 'EAC',
			replace: true,
			scope: {
				conf: "=",
			},
			template: template,
			transclude: true,
			link: function postLink(scope, element, attr) {
				console.log(scope.conf)
			}
		};
	})
}