/**
	vpalMenu
 **/
import template from './template.html'
import './style.less'
export default function LevelMenu(app) {
	app.directive('icsLevelMenu', function() {
		return {
			restrict: 'EAC',
			replace: true,
			scope: {
				levelMenu: "=",
				userInfo:'='
			},
			template: template,
			link: function postLink(scope, element, attr) {
				scope.goHome = function(){
					scope.levelMenu.data =[]
				}
			}
		};
	});
}
