import template from './template.html'
export default function Table(app){
	app.directive('iceTable',function(){
		return {
			restrict: 'AE',
			replace: true,
			scope : {
				source: '=',
				columns: '=',
				bordered:'=',
				responsive:'=',
				rowSelectable:'=',
				handleSelectRow: '=',
				handleSelectAll: '=',
				selectedItems: '=',
				disabledItems: '=',
				optType:'@'
			},
			template: template,
			transclude: true,
			link: function postLink(scope, element, attr) {
				//如果不设置optType默认多选框
				scope.optType = scope.optType ? scope.optType : 'checkbox';
				//若单选框设置默认选中项为多个，取第一个，若不设为一个都为选中
				scope.selectedItems = scope.selectedItems ? (scope.optType == 'checkbox' ? scope.selectedItems : [scope.selectedItems[0]]) : [];
				scope.selectedRowKeys = scope.selectedItems ? mapRowKeys(scope.selectedItems) : [];
				scope.disabledRowKeys = scope.disabledItems ? mapRowKeys(scope.disabledItems) : [];
				scope.checkAllModel = checkAllChecked();

				scope.onSelect = function($event,ele) { 
					var _index = ele.$index;
					var $input  = document.getElementById('row_'+_index);
					var checked = $input.checked;
					//单选框：当前不可操作的项为选中项，不可更改整个单选框组
					if(scope.optType != 'checkbox'){
						if(scope.disabledRowKeys.length > 0 && scope.disabledRowKeys.includes(scope.selectedRowKeys[0])){
							$event.preventDefault();
							return false;
						}
						scope.selectedRowKeys = [_index];
						scope.selectedItems = [scope.source[_index]];
					}else{
						if(checked){
							scope.selectedRowKeys.push(_index);
							scope.selectedItems.push(scope.source[_index]);
						}else{
							var i = scope.selectedRowKeys.indexOf(_index);
							scope.selectedRowKeys.splice(i,1);
							scope.selectedItems.splice(i,1);
						}
						if(checked && checkAllChecked()){
							scope.checkAllModel = true;
						}else{
							scope.checkAllModel =  false;
						}
					}
					if(scope.handleSelectRow){scope.handleSelectRow(ele.row, checked);}
				};
				//只用于多选框
				scope.onSelectAll = function(){
					var hasDisabled = scope.disabledItems.length > 0;
				    if(scope.checkAllModel){
				    	//全选中
				    	//不可操作的项是未选中项，选中项里要减去这个项
				    	findDisabledUnchecked();
				    }else{
				    	//全不选
				    	//不可操作的项是选中项，选中项里要含有这个项
				    	findDisabledChecked();
				    }
				    if(scope.handleSelectAll){scope.handleSelectAll(scope.selectedItems , scope.checkAllModel);}
				};
				function mapRowKeys(arr){
					var temp = [];
					scope.source.forEach(function(ele,index,array){
						for(var i =0;i<arr.length;i++){
							if(isEquivalent(ele, arr[i])){
								temp.push(index);
							}
						}
						
					});
					return temp;
				};
				function isEquivalent(a, b) {
				    var aProps = Object.getOwnPropertyNames(a);
				    var bProps = Object.getOwnPropertyNames(b);
				    if (aProps.length != bProps.length) {
				        return false;
				    }
				    for (var i = 0, len = aProps.length; i < len; i++) {
				        var propName = aProps[i];
				        if (a[propName] !== b[propName]) {
				            return false;
				        }
				    }
				    return true;
				};
				function findDisabledUnchecked(){
					var temp = [];
					var tempIndex = [];
					let intersection = scope.disabledRowKeys.filter(v => scope.selectedRowKeys.includes(v));
					let minus = scope.disabledRowKeys.filter(v => !intersection.includes(v));
					tempIndex = [...scope.source.keys()].filter(v => !minus.includes(v));
					temp = [...scope.source].filter((ele,v) => !minus.includes(v));
					scope.selectedRowKeys = tempIndex;
					scope.selectedItems = temp;
				};
				function findDisabledChecked(){
					var temp = [];
					var tempIndex = [];
					tempIndex = scope.disabledRowKeys.filter(v => scope.selectedRowKeys.includes(v));
					temp = [...scope.source].filter((ele,v) => tempIndex.includes(v));
					scope.selectedItems = temp;
					scope.selectedRowKeys = tempIndex;
				};
				function checkAllChecked(){
				    return scope.selectedItems.length === scope.source.length;
				};
				scope.$watch(scope.source, function(value, oldValue){
					if(value != oldValue ){
						scope.checkAllModel = checkAllChecked();
					}
				});
			}
		}
	})		
}

