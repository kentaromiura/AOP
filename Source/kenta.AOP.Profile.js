/*
---
name: kenta.AOP.Profile
description: Profiling for MooTools 1.3.x
version: 1.0
authors: Cristian Carlesso http://mykenta.blogspot.com
copyright: Cristian Carlesso
license: MIT-style license.
version: 1.2
requires: [Events, Class.PatternMutators, kenta.AOP]
provides: [AOP.Profile]
...
*/

var Profile = new (new Class({
	Implements:[Events],
	_profilation:{},
	initialize:function(){
		var me = this;
		if(typeof(AOP)=='undefined'){
			alert('Profile requires kenta.AOP');
			return;
		}

		AOP.addEvent('pre',function(params){
			var Profilation = me._profilation;
			var callID = params.uniqueID + '_' + params.name;
			var data = Profilation[callID]||(Profilation[callID] = []);
			data.push(Date.now());
		});

		AOP.addEvent('post', function(params){
			var Profilation = me._profilation;
			var stop_time = Date.now();
			var callID=params.uniqueID + '_' + params.name;
			var data = Profilation[callID];
			var start_time = data.pop();
			if(data.length == 0){
				delete Profilation[callID];
			}
			params.executionTime = stop_time - start_time;
			me.fireEvent('trace', params);
		});
	}
}))();