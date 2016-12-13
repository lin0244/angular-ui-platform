import template from './template.html'
import './style.less'
export default function Button(app){
	app.directive('iceButton',function(){
		return {
			restrict: 'E',
			replace: true,
			scope: {
		      hanleClick: "&",
		      text:'@'
		    },
		    template: template
		}
	})
}
