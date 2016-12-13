import './less/common.less'
import './less/table.less'
import './less/layout.less'
import Header from './directive/Header'
import Row from './directive/Row'
import Input from './directive/Input'
import Select from './directive/Select'
import Button from './directive/Button'
import LabelInput from './directive/LabelInput'
import LabelSelect from './directive/LabelSelect'
import DatePicker from './directive/DatePicker'
import Navigation from './directive/Navigation'
import LevelMenu from './directive/LevelMenu'
import http from './service/http'
import rylaiCommon from './service/common'
import datePicker from './service/datePicker'
import CheckboxService from './service/CheckboxService'
import RadioboxService from './service/RadioboxService'
import Pagination from './directive/Pagination'
import Table from './directive/Table'
import UserInfo from './directive/UserInfo'
import Layout from './directive/Layout'
import Mask from './directive/Mask'
import DateRangePicker from './directive/DateRangePicker'
import Switcher from './directive/Switcher'
import Modal from './directive/Modal'
import clearSpace from './filter/clearSpace'
//import filterMap from './filter/filterMap'

// import './less/rylai.less'
(function(){
	window.Rylai = function(app){
		//service
		http(app)
		CheckboxService(app)
		RadioboxService(app)
		//directive
		Header(app)
		Row(app)
		Input(app)
		Select(app)
		Button(app)
		LabelInput(app)
		LabelSelect(app)
		Pagination(app)

		//old
		DatePicker(app)
		//new

		Table(app)

		DateRangePicker(app)
		Navigation(app)
		LevelMenu(app)
		UserInfo(app)
		Layout(app)
		Mask(app)
		rylaiCommon(app)
		datePicker(app)
		Switcher(app)
		Modal(app)
		clearSpace(app)
		//filterMap(app)
	}

})()
Date.prototype.format = function (fmt) { //author: meizz 
	
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "D+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
