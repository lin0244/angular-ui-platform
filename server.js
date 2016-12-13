var express = require('express');
var app = express();


app.use(express.static(__dirname + '/'));

app.get('/userinfo', function(req, res){
	var data = {};
  res.send(data);
});

app.get('/list',function(req,res){
	var date = new Date()
	var data = {
		"value": {
		    "count": 22,
		    "current": 1,
		    "pageSize": 2,
		    "totalPage": 11,
		    "results": [
		        {
		            "detail": "登录",
		            "id": 10008,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        },
		        {
		            "detail": "登录",
		            "id": 10009,
		            "ip": "127.0.0.1",
		            "result": 0,
		            "system": "common",
		            "time": "2016-01-08 16:25:21",
		            "type": "login",
		            "username": "frankie.gao",
		            'date':date
		        }
		        
		    ]
		}
	}
	res.send(data);
})

app.listen(3000);

console.info('server start on port 3000, http://loaclhost:3000');