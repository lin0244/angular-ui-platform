import template from './template.html'
import './style.less'
import {getQueryStringByName} from '../../modules/queryString.js'
export default function Layout(app) {
	app.directive('icsLayoutBlock', function() {
		return {
			restrict: 'EAC',
			replace: true,
			scope: {
				conf: "=",
				logoUrl:'@'
			},
			template: template,
			transclude: true,
			link: function postLink(scope, element, attr) {
				var conf = scope.conf
				conf.navShow = false
				if(getQueryStringByName('targetName') == 'beifu'){
					conf.navShow = false
				}else{
					conf.navShow = true
				}
			}
		};
	})
}