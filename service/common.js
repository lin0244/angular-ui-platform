export default function rylaiCommon(app) {
	app.factory('rylaiCommon', ['$http', function($http) {
		return {
			getLevelMenu(menuTreeData, name) {
				var levelMenu = [],
					length = menuTreeData.length,
					flag = 0;
				for (var i = 0; i < length; i++) {
					levelMenu = []
					var currentFirst = menuTreeData[i];
					levelMenu[0] = currentFirst.name
					var lengthFirst = currentFirst.sub.length;
					for (var j = 0; j < lengthFirst; j++) {
						var currentSecond = currentFirst.sub[j];
						levelMenu[1] = currentSecond.name;
						var lengthSecond = currentSecond.sub.length;
						for (var k = 0; k < lengthSecond; k++) {
							var currentThird = currentSecond.sub[k];
							if (!currentThird.url) {
								break;
							}
							if (currentThird.url.indexOf(name) >= 0) {
								levelMenu[2] = currentThird.name;
								flag = 1;
								break;
							}
						}
						if (flag == 1) {
							flag = 1;
							break;
						}
					}
					if (flag == 1) {
						flag = 1;
						break;
					}
				}
				if (flag == 1) {
					return levelMenu;
				} else {
					return []
				}
			}
		}

	}]);
}