

$(function(){
    var jQuiz = {	
        init: function(){
		quizScore = 0;
		currentQues = 1;
		quesNum = 1;
		$whites = $('.whites');	
		
		//Images	
		theImages=['none',
		'images/one.jpg',
		'images/two.jpg',
		'images/three.jpg',
		'images/four.jpg',
		'images/five.jpg']
		currentImage = theImages[quesNum];
		theGreyImages=['none',
		'images/oneWrong.jpg',
		'images/twoWrong.jpg',
		'images/threeWrong.jpg',
		'images/fourWrong.jpg',
		'images/fiveWrong.jpg']
		greyImage = theGreyImages[quesNum];	
		perfectScore = 'images/correct.jpg'
		
		$whites.fadeIn(1500);	
		//Submit answer
        $('.btnNext').click(function(){
			curAnswer = $('input[type=radio]:checked:visible').attr('id');
				if ($('input[type=radio]:checked:visible').length == 0) {        
						return false;
					}	
				rad = $('input[type=radio]:checked:visible');	
	            dAnswer = $('input[type=radio]:checked:visible').attr('class');
				
              		
				$.when($whites.fadeOut(500))
                        .done(function() {
    							if (curAnswer == 'correct'){
									$('.rightAnswer').show();
									setTimeout(function(){runScore()},2000);
									$('.nxtQues').show();
								}
								if (curAnswer == 'wrong'){
									$('.questionContainer img').attr('src',greyImage);
									$('.wrongAnswer').show();
									$('.nxtQues').show();
								}	
								else {
										if (quizScore == 100){
											$('.scoreTxt').text('You got a perfect score!');
											$('.questionContainer img').attr('src',perfectScore);	
                                            $('.attribution').text('Peter Chadwick / WWF-Canon');											
										}
										else{
											$('.scoreTxt').text('You scored ' + quizScore + ' out of 100');	
										}
										var lastRad = $('input[type=radio]:checked:visible');
											lastAnsText = lastRad.next('.ans').text(); 	
										if (curAnswer == 'bonus'){
										//Fire this for bonus question answer 1
											$('.rightAnswer').show();	
										}
										if (curAnswer == 'noBonus'){
										//Fire this for bonus question answer 1
											$('.wrongAnswer').show();		
										}   
										if (curAnswer == 'midBonus'){
										//Fire this for bonus question answer 1
											$('.midAnswer').show();	
										} 
										if (quizScore == 60){
											//Fire this if user scored 3/5
										}
										if (quizScore == 80){
											//Fire this if user scored 4/5
										}
										if (quizScore == 100){
											//Fire this if user scored 5/5
										}	
								}  
    			$('.answerContainer').slideDown();  
			});	
		});		
		
		//Next Question
			$('.nxtQues').click(function(){
				quesNum = quesNum + 1;
				$('#quesTarget').text(quesNum);
					$(this).parents('.questionContainer').fadeOut(500, function(){
						$('.answerContainer').hide();
						currentImage = theImages[quesNum];
						greyImage = theGreyImages[quesNum];
						$('.questionContainer img').attr('src',currentImage);
						$('.rightAnswer').hide();
						$('.wrongAnswer').hide();
						if(quesNum < 11){
						$('#quesTarget').text(quesNum);
						}
						else{
						$('#quesLine').text('Bonus Question');
						}
						$('.scoreTwo').css('color', '#ffffff');
						
                    $(this).next('.questionContainer').fadeIn(500, function(){
							$whites.fadeIn(1500);
					});
					});
				});

			$('.btnLst').click(function(){
				$quesLine = $('#quesLine');
					if (quizScore > 60){   
						$quesLine.text('You\'re a genius!');											
					}
					if (quizScore <= 60){ 
						$quesLine.text('Thanks for taking the quiz.');
					}
			});
	
			function runScore(){
				$('.scoreTwo').css('color', '#6cc028');
				createCounter("counterTarget",quizScore,quizScore + 10,500,function(){
				quizScore = quizScore + 20;	
			});
			}
          }
    };
    jQuiz.init();
})

//UNCHECK RADIO BUTTONS WHEN MULTIPLE ONES CLICKED
$radios =  $('.ans [type=radio]');
$radios.on('change',function(){
		$radios.not(this).prop('checked',false);
});

//RUN THE COUNTER WHEN USER SCORES POINTS			
function createCounter(elementId,start,end,totalTime,callback){
      var jTarget=jQuery("#"+elementId);
      var interval=totalTime/(end-start);
      var intervalId;
      var current=start;
      var f=function(){
           jTarget.text(current);
           if(current==end){
                clearInterval(intervalId);
                    if(callback){
                        callback();
                         }
            }
            ++current;
      }
      intervalId=setInterval(f,interval);
      f();
}             
