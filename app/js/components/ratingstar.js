angular.module('quicklocation').component('ratingstar',{
	template: [
'<span ng-repeat="star in $ctrl.stars" >',
'<md-icon md-colors="{color: \'primary\'}">{{star.value}}</md-icon>',
'<span>',
	].join(''),
	bindings: {rating: '<'},
	controller: function(){
		var ctrl = this;
		ctrl.asignar = function(){
			ctrl.stars = [];
			ctrl.mitad= 0.5
		for(i = 0; i < 5; i++){
/*			console.log(ctrl.rating);
*/			if (ctrl.rating > i){
				if ((ctrl.rating - i) >= 1){
					ctrl.stars.push({id:i , value:"star"});
				}
				else {
					if ((ctrl.rating - i) >= ctrl.mitad){
						ctrl.stars.push({id:i , value:"star_half"});
					}
					else {
						ctrl.stars.push({id:i , value:"star_border"});
					}
				}
			}
			else {
				ctrl.stars.push({id:i , value:"star_border"});
			}
		}
/*		console.log(ctrl.stars);
*/		};
		
		ctrl.$onChanges = function(obj){
/*			console.log('asignamos', obj);
*/           ctrl.asignar();
        };
	
	}


});