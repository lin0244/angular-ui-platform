export default function RadioboxService(app){
	app.factory('RadioboxService', ['$http',function($http) {
		var hasDefaultSelected = {status: false, index: -1};
	    var RadioboxService = {
	    	setRadioListOpt : function(inputs, checked) {
		    	var len = inputs.length;
		    	for(let i=0; i< len; i++){
					var $input = inputs[i];
					$input.checked=checked;
				}
		    },
		    checkRadioboxStatus : function(inputs){
		    	var len = inputs.length;
		    	for(let i=0; i< len; i++){
					var $input = inputs[i];
					if($input.disabled && $input.checked){
						hasDefaultSelected.status = true;
						hasDefaultSelected.index = i;
					}
				}
		    }
	    }

	    
		return {
			onSelect: function(e, name, index){
				var $inputList = document.querySelectorAll("[name='"+ name +"']");
				if(hasDefaultSelected.status){
					e.preventDefault();
					e.stopPropagation();
					return hasDefaultSelected.index;
				}else{
					RadioboxService.setRadioListOpt($inputList, false);
					$inputList[index].checked = true;
					return index;
				}
			},
			setSelected: function(name, index){
				var selectedItem = index;
				var $inputList = document.querySelectorAll("[name='"+ name +"']");

				RadioboxService.setRadioListOpt($inputList, false);
				$inputList[selectedItem].checked = true;
				RadioboxService.checkRadioboxStatus($inputList);
				return selectedItem;
			}
		}
	}]);
}


