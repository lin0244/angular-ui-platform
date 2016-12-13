export default function clearSpace(app) {
	app.filter('clearSpace',function() {
		return function(input) {
			if (input) {
				var r = input.replace(" ", '')
				return r
			}
		};
	})
}