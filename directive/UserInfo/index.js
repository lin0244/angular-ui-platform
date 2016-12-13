import template from './template.html'
import './style.less'
export default function UserInfo(app) {
	app.directive('icsUserInfo', function() {
		return {
			restrict: 'EAC',
			replace: true,
			scope: {
				conf: "="
			},
			template: template,
			transclude: true,
			link: function postLink(scope, element, attr) {

			}
		};
	})
}