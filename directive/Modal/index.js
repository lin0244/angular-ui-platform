import template from './template.html'
export default function Modal(app) {
	app.directive('iceModal', function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				id:'@',
				modal:"=",
			},
			template: template,
			transclude: true,
			link: function postLink($scope, element, attr, clearSpace) {

				var id = $scope.id.replace(" ", "")
				var conf = {
					title:$scope.modal.title || '无标题',
					ok:$scope.modal.ok || function(){},
					cancel: function(){
						$scope.modal.isShow = false
					},
					btnDisabled: $scope.modal.btnDisabled==false?false:true,
					buttonShow:{
						ok: $scope.modal.buttonShow&&$scope.modal.buttonShow.ok == false?false:true,
						cancel: $scope.modal.buttonShow&&$scope.modal.buttonShow.cancel== false?false:true,
					},
					isShow:$scope.modal.isShow || false,
					size: $scope.modal.size == 'sm' ? "modal-sm" : "modal-lg" 
				}
				$scope.modal = conf
                $scope.$watch('modal.isShow', function(value, oldValue) {
                   	if(value == true){
                   		$("#" + id).modal('show')
                   	}else{
						$("#" + id).modal('hide')
                   	}
                });
				$("#" + id).modal({backdrop: 'static', keyboard: false,show:false})
			}
		};
	})
}