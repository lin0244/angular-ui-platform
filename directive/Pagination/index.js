/**
	pagination 
 **/
import template from './template.html'
import './style.less'
export default function Pagination(app){
	app.directive('icePagination',function(){
		return {
			restrict: 'EAC',
			replace: true,
			scope: {
				conf: '='
			},
			template: template,
			transclude: true,
			link: function postLink(scope, element, attr) {
				var conf = scope.conf;
				conf.size = conf.size|| 10
				conf.perPageOptions = conf.perPageOptions || [10, 15, 20, 30, 50, 100, 1000, 2000]
				conf.pageList = []
				conf.totalPage = Math.ceil(conf.count / conf.size) || 0
				var showNumber = conf.showNumber || 5
				conf.vpalClass = 'disabled-click'
				function getPagination(num) {
					conf.totalPage = Math.ceil(conf.count / conf.size) || 0
					var pageList = []
					var min = conf.totalPage > num ? num : conf.totalPage
					if (conf.totalPage <= num) {
						for (var i = 1; i <= min; i++) {
							pageList.push(i)
						}
					} else {
						var offset = (num - 1) / 2;
						if (conf.currentPage <= offset) {
							// 左边没有...
							for (i = 1; i <= num; i++) {
								pageList.push(i);
							}
						} else if (conf.currentPage > conf.totalPage - offset) {
							// 右边没有...
							for (i = num - 1; i >= 0; i--) {
								pageList.push(conf.totalPage - i);
							}
						} else {
							// 最后一种情况，两边都有...
							for (i = offset; i >= 1; i--) {
								pageList.push(conf.currentPage - i);
							}
							pageList.push(conf.currentPage);
							for (i = 1; i <= offset; i++) {
								pageList.push(conf.currentPage + i);
							}
						}
					}
					conf.pageList = pageList;
				}
				// 修改每页展示的条数
				scope.changeItemsPerPage = function() {
					// 一发展示条数变更，当前页将重置为1
					conf.currentPage = 1;
					getPagination(showNumber);
					if (conf.onChange) {
						conf.onChange();
					}
				};

				// prevPage
				scope.prevPage = function() {
					if (conf.currentPage > 1) {
						conf.currentPage -= 1;
					} else if (conf.currentPage == 1) {
						return false
					}
					getPagination(showNumber)
					if (conf.onChange) {
						conf.onChange();
					}
				};

				// nextPage
				scope.nextPage = function() {
					if (conf.currentPage < conf.totalPage) {
						conf.currentPage += 1;
					} else if (conf.currentPage == conf.totalPage) {
						return false
					}
					getPagination(showNumber)
					if (conf.onChange) {
						conf.onChange();
					}
				};

				// 变更当前页
				scope.changeCurrentPage = function(item) {
					if(item>conf.totalPage || item<=0 || item == undefined || item == ''){
						return false
					}
					if (conf.currentPage != item) {
						conf.currentPage = item;
						getPagination(showNumber);
						if (conf.onChange) {
							conf.onChange();
						}
					}
				};

				scope.$watch('conf.count', function(value, oldValue) {
					if(value!=0){
						conf.vpalClass = ''
					}
					else{
						 conf.vpalClass = 'disabled-click'
					}
					// 在无值或值相等的时候，去执行onChange事件
					if (!value || value == oldValue) {
						if (conf.onChange) {
							//conf.onChange();
						}
					}
					getPagination(showNumber);
				});
				scope.$watch('conf.currentPage', function(value, oldValue) {
					// 在无值或值相等的时候，去执行onChange事件
					if (value != oldValue && value ==1) {
						getPagination(showNumber);
					}
				});

			}
		};
	})
}
