describe("AOP.Profile.js", function(){
	/*prep*/

	it("can be used to profile things", function(){
		var Test = new Class({
			Aspect:'Test',
			initialize:function(cycle){

				for(var c=0;c<cycle;c++)
					for(var i=0,max=10000; i<max; i++){
						//donothing
					}
			}
		});

		Profile.addEvent('trace', function(x){
			expect(x.description).to.be('Test')
			expect(x.name).to.be('initialize')
			if(x.callno==1){
				expect(x.params["0"]).to.be(1)
			}else{
				expect(x.callno).to.be(2)
				expect(x.params["0"]).to.be(1000)

			}

		})

		var x = new Test(1);
		//{"description":"Test","uniqueID":4,"name":"initialize","params":{"0":1},"callno":1,"executionTime":1}

		var y = new Test(1000);
		//{"description":"Test","uniqueID":5,"name":"initialize","params":{"0":1000},"callno":2,"executionTime":34}
	})


})