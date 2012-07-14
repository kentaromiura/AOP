describe("AOP.js", function(){
	/*prep*/

	it("can be used to hijack method results", function(){
		var Test = new Class({
			'Aspect':'Class returns wrong data',
			returnFour:function(){
				return 3; // HEY! This is an error!
			}
		});

		AOP.addEvent('post', function(e){
			if(e.name=='returnFour'){
				e.returnthis = 4;
			}
		});

		var a = new Test();
		expect(a.returnFour()).to.be(4);//4
	})

	it("can be used to cancel method execution", function(){
		var Test = new Class({
			'Aspect':'We want to cancel this method execution',
			this_method_is_heavy_and_turns_out_to_be_not_required:function(){
				//for(i=0,max=1000000000;i<max;i++) ...
				return("This Method is as useful as using confetti to clean your ass.")
			}
		});

		var a = new Test();

		AOP.addEvent('pre', function(e){
			//Here you see how you can use regex to filter the methods to hijack
			if(/not_required$/.test(e.name)){
				e.cancel=true;
			}
		})

		expect(a.this_method_is_heavy_and_turns_out_to_be_not_required()).to.be(undefined);
	})


})