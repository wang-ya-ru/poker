$(function(){
	function makePoker(){
		var poker=[];
		var colors=['s','h','c','d'];
		var table={};
		while(poker.length!=52){
			var c=colors[Math.floor(Math.random()*4)];
			var n=Math.ceil(Math.random()*13);
			var v={
				color:c,
				number:n
			}
			if(!table[c+n]){
				poker.push(v);
				table[c+n]=true;
			}
			
		}
		return poker;
	}
	// var poker=makePoker();
	
    function setPoker(poker){
    	var dict={1:'A',2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:'T',11:'J',12:'Q',13:'K'}
    // $(poker).each(function(i,v){
    	var index=0;
        for (var i = 0,poke; i <7; i++) {
        	for (var j = 0; j < i+1; j++) {
        		poke=poker[index];
        		index +=1;
	        	$('<div>')
	        		.attr('id',i+'_'+j)
	        		.attr('data-number',poke.number)
					.addClass('pai')
					.css('background-image','url(./image/'+dict[poke.number]+poke.color+'.png)')
					.delay(index*40)
					.appendTo('.sence')
					.animate({
						top:i*40+10,
						left:(6-i)*70+j*140+20,
						opacity:1
					})
        	};
        	
        };

        for(;index<poker.length;index++){
        // for(;index<32;index++){
        	var a=poker[index];
        	$('<div>').attr('data-number',a.number)
        			  .addClass('pai left')
        	          .css('background-image','url(./image/'+dict[a.number]+a.color+'.png)')
        	          .appendTo('.sence')
        	          .delay(index*40)
        	          .animate({
        	          	top:430,
        	          	left:230,
        	          	opacity:1
        	          })

        }
    	
    // })
    }
	// setPoker(makePoker())
	var moveright=$('.sence .moveright');
    moveright.click((function(){
    		var zIndex=1;
        	return function(){
    	       $('.left')
    	       		.last()
    	       		.css('z-index',zIndex++)
    	       		.animate({
    	       			left:650
    	       }).queue(function(){
    	       	$(this)
    	       	.removeClass('left')
    	       	.addClass('right')
    	       	.dequeue()
    	       })
       	 	}
        })())

    var moveleft=$('.sence .moveleft');
   		var num=0;
    moveleft.click((function(){
    	return function(){
	    	if ($('.left').length>0) { return;};
	    	num++;
	    	if(num>3){
	    		alert('只能返回3次');
	    		return;}
	    	$('.right').each(function(i){
	    		$(this)
		    		.css('z-index',0)
		    		.delay(i*50)
		    		.animate({
		    			left:230
		    		}).queue(function(){
		    			$(this)
		    			.removeClass('right')
		    			.addClass('left')
		    			.dequeue()
		    		})
	    	})
	    }
    })())
    // $('zi').slideUp("slow")
    // $('<div>').addClass('zi').fadeIn(slow);
    function iscanClick(el){
    	var x=parseInt($(el).attr('id').split('_')[0]);
    	var y=parseInt($(el).attr('id').split('_')[1]);
    	if ($('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length) {
    		return false;
    	}else{
    		return true;
    	}

    }
    function getNumber(el){
    	return parseInt($(el).attr('data-number'))
    }
	var prev=null;
    var scores=0;
    $('.sence').on('click','.pai',function(){
    	if ($(this).attr('id')&& !iscanClick(this)) {
    		return ;
    	};
    	$(this).animate({marginTop:-20})
    	var number=getNumber($(this));
    	if(number===13){
    		scores+=10;
    		$('.score').text(scores)
            $(this).animate({
            	top:0,
            	left:900
            }).queue(function(){
            	$(this).detach().dequeue();
            })
            prev=null;
            return;
    	}
    	if (prev) {
    		if (getNumber(prev)+getNumber(this)===13) {
    			scores+=10;
    			$('.score').text(scores)
    			prev.add(this).animate({
    				top:0,
    				left:900
    			}).queue(function(){
    				$(this).detach().dequeue();
    			})
	    	}else{
	    		prev.add(this).animate({marginTop:0})
	    	}
    		prev=null;
    	}else{
    		if((getNumber(prev)+getNumber(this)===13)&&getNumber(this)===13){
    				// alert(1)
    			$(this).animate({
    				marginTop:0
    			}).queue(function(){
    				$(this).dequeue();
    			})
    		}
    		prev=$(this)
    	}
    	
    })
    var start=$('.sence .start');
    start.click(function(e){
    	// if ($(this).attr('class')){
    	// 	return;
    	// };
    	$('.pai').remove()
    	setPoker(makePoker());
    	scores=0;
    	$('.score').text(scores);
    	num=0;
    	$('.zi').fadeOut();
    })

    var end=$('.end').click(function(){
    	$('.pai').remove();
    	scores=0;
    	$('.score').text(scores);
    	num=0;
    	$('.zi').text('重新开始').fadeToggle('slow');
    	// alert(1)
    })

    var reset=$('.box .reset');
    reset.click(function(){
    	$('.pai').remove();
    	scores=0;
    	$('.score').text(scores)
    	num=0;
    	setPoker(makePoker());
    	$('.zi').fadeOut()
    	// $('.score').remove();
    	// $('<div>').addClass('score').appendTo('.btn').text(scores)
    	// .text(scores).text(0)
    })

})