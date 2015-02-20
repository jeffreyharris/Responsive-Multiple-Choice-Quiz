$(function(){
    var jQuiz = {	
        init: function(){
		quizScore = 0;
		currentQues = 1;
		quesNum = 1;	
		$whites = $('.whites');	
		$containerImg = $('.questionContainer img');
		$next = $('.btnNext');
		$scoreTwo = $('.scoreTwo');
		$scoreText = $('.scoreTxt');
		$quesLine = $('#quesLine');
		$rightAns = $('.rightAnswer');
		$wrongAns = $('.wrongAnswer');
		$ansCont = $('.answerContainer');
		$nextQues = $('.nxtQues');
		$midAns = $('.midAnswer');
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
		
//START QUIZ
$whites.fadeIn(1500);	
				
//SUBMIT ANSWER FUNCTION
        $next.click(function(){
			$checked = $('input[type=radio]:checked:visible');
			$curAnswer = $checked.attr('id');
			//Check if radio button is checked
			if ($checked.length == 0) {        
					return false;
			}		
			//Fadeout white box and then show correct or incorrect
				$.when($whites.fadeOut(500))
                        .done(function() {
    							if ($curAnswer == 'correct'){
									$rightAns.show();
									setTimeout(function(){runScore()},2000);
									$nextQues.show();
								}
								if ($curAnswer == 'wrong'){
									$containerImg.attr('src',greyImage);
									$wrongAns.show();
									$nextQues.show();
								}	
								else {
										if (quizScore == 100){
											$scoreText.text('You got a perfect score!');
											$containerImg.attr('src',perfectScore);	 											
										}
										else{
											$scoreText.text('You scored ' + quizScore + ' out of 100');	
										}
										
										if ($curAnswer == 'bonus'){
										//Fire this for bonus question answer 1
											$rightAns.show();	
										}
										if ($curAnswer == 'noBonus'){
										//Fire this for bonus question answer 1
											$wrongAns.show();		
										}   
										if ($curAnswer == 'midBonus'){
										//Fire this for bonus question answer 1
											$midAns.show();	
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
    			$ansCont.slideDown();  
			});	
		});		
		
//NEXT QUESTION CLICK FUNCTION
			$nextQues.click(function(){	
				quesNum = quesNum + 1;
				$('#quesTarget').text(quesNum);
					$(this).parents('.questionContainer').fadeOut(500, function(){
						$ansCont.hide();
						currentImage = theImages[quesNum];
						greyImage = theGreyImages[quesNum];
						$('.questionContainer img').attr('src',currentImage);
						$rightAns.hide();
						$wrongAns.hide();
						if(quesNum < 11){
						$('#quesTarget').text(quesNum);
						}
						else{
						$quesLine.text('Bonus Question');
						}
						$scoreTwo.css('color', '#ffffff');
						
                    $(this).next('.questionContainer').fadeIn(500, function(){
							$whites.fadeIn(1500);
					});
					});
				});

			$('.btnLst').click(function(){
					if (quizScore > 60){   
						$quesLine.text('You\'re a genius!');											
					}
					if (quizScore <= 60){ 
						$quesLine.text('Thanks for taking the quiz.');
					}
			});
			
//RUN THE COUNTER WHEN USER SCORES POINTS FUNCTION			
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

//INCREASE SCORE WITH TALLY EFFECT FUNCTION
			function runScore(){
				$scoreTwo.css('color', '#6cc028');
				createCounter("counterTarget",quizScore,quizScore + 10,500,function(){
				quizScore = quizScore + 20;	
			});
			}
			
//UNCHECK RADIO BUTTONS WHEN MULTIPLE ONES CHECKED FUNCTION
			$radios =  $('.ans [type=radio]');
			$radios.on('change',function(){
				$radios.not(this).prop('checked',false);
			});

      } //END INIT
    }; //CLOSE VAR
	
//FIRE QUIZ
jQuiz.init();
})
