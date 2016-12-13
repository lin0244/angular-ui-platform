export default function http(app){
	app.factory('httpRylai', ['$http',function($http) {
		// var SEVRER_RUL = 'https://admin.vip.vpal.com'
		var SEVRER_RUL = '';
		var ajaxCount = 0;
		return {
			get: function(url,param,successFn,errorFn){
				NProgress.start();
				$('.loadingMask').removeClass('hide');
				ajaxCount++;
				var req = {
				 	method: 'GET',
					url: SEVRER_RUL + url,
					headers: {
					    'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: param,
				 	cache: false
				}
				return $.ajax(req)
				.error(function(response){
					ajaxCount--;
					if (ajaxCount === 0) {
						NProgress.done();
						$('.loadingMask').addClass('hide');
					}
					if(typeof errorFn==='function'){
						errorFn(response)
					}
				})
				.success(function(response){
					ajaxCount--;
					if (ajaxCount === 0) {
						NProgress.done();
						$('.loadingMask').addClass('hide');
					}
					if(typeof response.error!=='undefined'){
						$trace(response.error.message)
						return false
					}
					if(typeof successFn==='function'){
						successFn(response)
					}
				})
			},
			post: function(url,param,successFn,errorFn){
				NProgress.start();
				$('.loadingMask').removeClass('hide');
				ajaxCount++;
				var req = {
				 	method: 'POST',
					url: SEVRER_RUL + url,
					headers: {
					    'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				 	data: param,
				 	cache: false
				}
				return $.ajax(req)
				.error(function(response){
					ajaxCount--;
					if (ajaxCount === 0) {
						NProgress.done();
						$('.loadingMask').addClass('hide');
					}
					if(typeof errorFn==='function'){
						errorFn(response)
					}
				})
				.success(function(response){
					ajaxCount--;
					if (ajaxCount === 0) {
						NProgress.done();
						$('.loadingMask').addClass('hide');
					}
					if(typeof response.error!=='undefined'){
						$trace(response.error.message)
						return false
					}
					if(typeof successFn==='function'){
						successFn(response)
					}
				})
			}
		}
	}]);
}


