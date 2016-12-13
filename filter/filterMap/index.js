export default function filterMap(app) {
	 app.filter('filterMap', function(){
	    var filter = function(input){
	      return input + '...';
	    };
	    return filter;
	 });
}