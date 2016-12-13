export default function datePicker(app) {
	app.factory('datePicker', ['$http', function($http) {
		return {
			isValid: function(date) {
				var reg = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/;
				if (date != "" && date != undefined) {
					if (reg.test(date)) {
						var r = new Date(date)
						if (r == 'Invalid Date') {
							return false
						} else {
							return true
						}
					} else {
						return false
					}
				}
				return true
			},
			//格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
			StringToDate: function(DateStr)  
			{   
			    var converted = Date.parse(DateStr);  
			    var myDate = new Date(converted);  
			    if (isNaN(myDate))  
			    {   
			        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
			        var arys= DateStr.split('-');  
			        myDate = new Date(arys[0],--arys[1],arys[2]);  
			    }  
			    return myDate;  
			},
			//是否有小时分钟的时间string，若没有，min最小时间的为设置的时间外加00：00：00：0，max最大时间为设置的时间外加23：59：59：999
			isTimePart: function(timeStr){
			  var parts;

			  parts = timeStr.split(':');

			  if(parts.length < 2){
			    return false;
			  }

			  for(var i = 0 ;i < parts.length; i ++){
			    if(isNaN(parts[i])){
			      return false;
			    }
			  }

			  h = parts[0];//年
			  m = parts[1];//月

			  if( h < 0 || h > 23){
			    return false;
			  }
			  if( m < 0 || h > 59){
			    return false;
			  }

			  if(parts.length > 2){
			    s = parts[2];//日

			    if( s < 0 || s > 59){
			      return false;
			    }
			  }

			  return true;
			},
			checkAll: function(start, end, min, max, limit){

				var dateStart = new Date(start);
				var dateEnd = new Date(end);
				var only = isNaN(dateEnd.getTime());
				dateEnd = only ? dateStart : dateEnd;
				//1. check start <= end
				if(dateStart > dateEnd){
					return 1;
				}

				//2. check min <= start
				if(min != undefined){
					var dateMin = new Date(min);
					if(!this.isTimePart(min)){
						dateMin.setHours(0,0,0,0);
					}
					if(dateStart < dateMin){
						return 2;
					}
				}
				//3. check max >= end
				if(max != undefined){
					var dateMax = new Date(max)
					if(!this.isTimePart(max)){
						dateMax.setHours(23,59,59,999);
					}
					if (dateEnd > dateMax) {
						return 3;
					}
				}
				//4. check limit
				if(!only){
					if(!this.checkLimit(dateStart, dateEnd, limit)){
						return 4;
					}
				}
				return 0;
			},
			checkLimit: function(dateS, dateE, limit){
				if (limit != '' && limit != undefined && dateS != '' && dateE != '' && dateS != undefined && dateE != undefined) {
					dateE.setDate(dateE.getDate() - limit);
					if (dateS < dateE) {
						return false;
					} 
				} 
				return true;
			},
			checkDate: function(dateS, dateE, minDate, maxDate, dateLimit) {
				var status = true;
				var message = '';
				var code = 0;

				if (this.isValid(dateS) && this.isValid(dateE)) {
					var valid = this.checkAll(dateS, dateE, minDate, maxDate, dateLimit);

					if(valid == 1){
						status = false;
						message = '起始日期必须小于结束日期';
						code = 1;
					}
					if(valid == 2){
						status = false;
						message = '日期必须大于等于设定的最小日期';
						code = 2;
					}
					if(valid == 3){
						status = false;
						message = '日期必须小于等于设定的最大日期';
						code = 3;
					}
					if(valid == 4){
						status = false;
						message = '日期必须小于设定的间隔时间';
						code = 4;
					}
					return {'result': status, 'message': message, 'code':code};
					

				} else {
					return {
						'result': false,
						'message': '日期格式非法',
						'code':-1
					}
				}
			}
		}

	}]);
}