var app = angular.module('myApp', ['ui.router', 'ui.bootstrap.datetimepicker','switcher'])

//app 启动时允许
app.run(function($rootScope,$state, $stateParams,rylaiCommon) {
	$rootScope.message = 'hello world';
	$rootScope.$on('$stateChangeStart', function(evt, next, curr) {
		$rootScope.layout.levelMenu.data = rylaiCommon.getLevelMenu($rootScope.layout.tree.data, next.name)
	});
});

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			cache: true,
			templateUrl: './home.html',
			controller: 'homeController'
		})
		.state('index', {
			url: '/',
			cache: true,
			templateUrl: './home.html',
			controller: 'homeController'
		})
		.state('error', {
			url: '/error',
			cache: true,
			templateUrl: './error.html',
			controller: 'errorController'
		})
		.state('deny', {
			url: '/deny',
			cache: true,
			templateUrl: './deny.html',
			controller: 'errorController'
		})
})

Rylai(app)
	//directiveController

app.controller('homeController', function($scope, httpRylai, CheckboxService, RadioboxService) {
	$scope.datetime10=''
	$scope.datetime11=''
	$scope.datetime20='2016/01/01'
	$scope.datetime21='2016/02/01'
	$scope.datetime3=''
	function setStartTime() {
        var date = new Date();
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        return date;

    }
	
	$scope.start003 = setStartTime()
	$scope.end003 = setStartTime()
	$scope.maskData = {
		title: '标题',
		body: '内容',
		show: false,
		ok: function() {
			console.log(111)
		},
		cancel: function() {
			console.log(2)
		}
	}

	$scope.switcher= {
		value:true,
		change:function(n,o){
			console.log(n) ; console.log(o)
			$scope.modal.btnDisabled = !$scope.modal.btnDisabled
		}
	}

	$scope.name = 'jack'
	$scope.email = 'jack@vip.com'
	$scope.select2 = {
		model: '1',
		option: [{
			value: '1',
			name: 'Option A'
		}, {
			value: '2',
			name: 'Option B'
		}, {
			value: '3',
			name: 'Option C'
		}],
		change:function(value){
			console.log(value)
		}
	};
	$scope.modal = {
		title:'this is modal',
		ok:function(){
			$scope.modal.isShow = false
		},
		isShow:false,
		btnDisabled:true,
		size:"lg", //sm
		buttonShow:{
			ok: true,
			cancel: false,
		},
	}
	$scope.showModal = function(){
		$scope.modal.isShow = true
	}

	$scope.btnQuery = function(){
		$scope.pagination.currentPage =  1
		$scope.queryFn()
	}

	$scope.queryFn = queryFn

	function queryFn() {
		httpRylai.get('/list', {
			p: $scope.pagination.currentPage,
			s: $scope.pagination.size,
			start: $scope.pagination.start,
			end: $scope.pagination.end,
			selecte:$scope.select2.model
		}, function(argument) {
			$scope.pagination.count = argument.value.count
			$scope.pagination.result = argument.value.results
			
			$scope.$digest();
			//设置多选选项的默认选中
			$scope.selectedTableIndex = CheckboxService.setSelected('chk', [0,1,0,2,3,4,5,6,7,8,9]);
			//设置单选选项的默认选中
			$scope.selectedTableIndex_single = RadioboxService.setSelected('radiobox', 0);
		});
	}

	$scope.pagination = {
		count: 0, //总数目
		currentPage: 1,
		result: [],
		showNumber: 5, // 可选
		size: 10, //可选
		onChange: queryFn,
		start:'2016-08-01 20:19:30',
		end:'2016/08/01 20:19:30',
		perPageOptions:[1,2,10, 15, 20, 30, 50, 100, 1000, 2000]
	}
	$scope.queryFn();

	$scope.tableDatas = {
		source:[{
					  key: '1',
					  name: '胡彦斌',
					  age: 32,
					  address: '西湖区湖底公园1号',
					}, {
					  key: '2',
					  name: '胡彦祖',
					  age: 42,
					  address: '西湖区湖底公园1号',
					}, {
					  key: '3',
					  name: '李大嘴',
					  age: 32,
					  address: '西湖区湖底公园1号',
					}],

		columns: [{
							  title: '姓名',
							  dataIndex: 'name'
							}, {
							  title: '年龄',
							  dataIndex: 'age',
							}, {
							  title: '住址',
							  dataIndex: 'address',
							}],
		selectedItems: 	[{key: "2", name: "胡彦祖", age: 42, address: "西湖区湖底公园1号"},{key: "3", name: "李大嘴", age: 32, address: "西湖区湖底公园1号"}],
		selectedItemsRadiobox: 	[{key: "2", name: "胡彦祖", age: 42, address: "西湖区湖底公园1号"},{key: "3", name: "李大嘴", age: 32, address: "西湖区湖底公园1号"}],
		disabledItems:  [{
					  key: '1',
					  name: '胡彦斌',
					  age: 32,
					  address: '西湖区湖底公园1号',
					},{key: "2", name: "胡彦祖", age: 42, address: "西湖区湖底公园1号"}]
	}
	$scope.tableOnSelect = function(item, val){
		console.log('item:', item, val);
	}
	$scope.tableOnSelectAll = function(item, val){
		console.log('all:', item, val);
	}

	$scope.handleCheckbox = function(name, index){
		$scope.selectedTableIndex = CheckboxService.onSelect(name, index);
	}
	
	$scope.handleRadiobox = function(e, name, index){
		$scope.selectedTableIndex_single = RadioboxService.onSelect(e, name, index);
	}

    $scope.start001 = '2016/08/01';
    $scope.end002 = '2016/09/01';

});


app.controller('layoutController', function($rootScope, $scope, httpRylai, $timeout) {
	$rootScope.layout = {
		tree: {
			data: []
		},
		levelMenu: {
			data: []
		},
		userInfo: {
			data: []
		}
	}

	$timeout(function(argument) {
		//$rootScope.layout.levelMenu.data = ['系统管理', '消息模块', '消息详情']
		$rootScope.layout.tree.data = [{
			"id": 1,
			"name": "系统管理",
			"sub": [{
				"id": 2,
				"name": "用户管理",
				"sub": [{
					"id": 3,
					"name": "error",
					"url": "error"
				}, {
					"id": 3,
					"name": "deny",
					"url": "deny"
				}]
			}, {
				"id": 4,
				"name": "权限管理",
				"sub": [{
					"id": 6,
					"name": "权限管理",
					"url": "/vpal-oss/permission/permission.html"
				}, {
					"id": 5,
					"name": "角色管理",
					"url": "/vpal-oss/role/role.html"
				}]
			}]
		}, {
			"id": 2,
			"name": "消息管理",
			"sub": [{
				"id": 2,
				"name": "用户管理",
				"sub": [{
					"id": 3,
					"name": "用户管理",
					"url": "/vpal-oss/user/user.html"
				}, {
					"id": 3,
					"name": "用户管理",
					"url": "/vpal-oss/user/user.html"
				}]
			}, {
				"id": 4,
				"name": "权限管理",
				"sub": [{
					"id": 6,
					"name": "权限管理",
					"url": "/vpal-oss/permission/permission.html"
				}, {
					"id": 5,
					"name": "角色管理",
					"url": "/vpal-oss/role/role.html"
				}]
			}]
		}]
	}, 1000)

	$rootScope.layout.userInfo.data = {
		name: 'tristan',
		detail: [{
			title: 'test1',
			event: function(argument) {
				console.log(111111111111)
			}
		}, {
			title: 'test2',
			event: function(argument) {
				console.log(22222222222222)
			}
		}, {
			title: 'test3',
			event: function(argument) {
				console.log(3333333333)
			}
		}]
	}


});

app.controller('errorController', function($rootScope, $scope, httpRylai) {

})
