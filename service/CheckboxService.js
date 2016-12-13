export default function CheckboxService(app){
	app.factory('CheckboxService', ['$http',function($http) {
	    var CheckboxService = {
	    	setCheckListOpt : function(inputs, checked) {
		    	var len = inputs.length;
		    	for(let i=0; i< len; i++){
					var $input = inputs[i];
					if(!$input.disabled){
						$input.checked=checked;
					}
				}
				
		    },
		    getAllSelectedItems : function(inputs, checked) {
		    	var selectedItems = [];
		    	if(checked){
		    		angular.forEach(inputs, function(item, index){
						selectedItems.push(index);
					});
		    	}
		    	
				return selectedItems;
		    },
		    getSelectedItems : function(inputs) {
		    	var selectedItems = [];
		    	var len = inputs.length;
		    	for(let i=0; i< len; i++){
					var $input = inputs[i];
					var _checked = $input.checked;
					if(_checked){
						selectedItems.push(i);
					}
				}
				return selectedItems;
		    }
	    }

	    
		return {
			onSelect: function(name, index){
				var selectedItems = [];
				var $inputAll = document.querySelectorAll("[name='"+ name +"'][chk='1']");
				var $inputList = document.querySelectorAll("[name='"+ name +"'][chk='0']");

				if(index == null || typeof index == 'undefined'){
					//click check all
					var _checked = $inputAll[0].checked;
					CheckboxService.setCheckListOpt($inputList, _checked);
					selectedItems = CheckboxService.getSelectedItems($inputList);
					
				}else{
					selectedItems = CheckboxService.getSelectedItems($inputList);
					if(selectedItems.length == $inputList.length){
						$inputAll[0].checked = true;
					}else{
						$inputAll[0].checked = false;
					}
				}
				return selectedItems;
			},
			setSelected: function(name, indexs){
				var selectedItems = new Set(indexs);
				var $inputAll = document.querySelectorAll("[name='"+ name +"'][chk='1']");
				var $inputList = document.querySelectorAll("[name='"+ name +"'][chk='0']");

				selectedItems.forEach(function(key, value){
					$inputList[value].checked = true;
				})
				if(selectedItems.size >= $inputList.length){
					$inputAll[0].checked = true;
				}
				return Array.from(selectedItems);
			}
		}
	}]);
}


