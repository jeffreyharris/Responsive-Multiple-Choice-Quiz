# Responsive-Multiple-Choice-Quiz

<h2>What's This?</h2>
An application that creates a multiple choice quiz featuring interactive questions, animations and different outcomes depending on score. The application is also responsive, so the quiz will work well on all screen sizes.

<a href="http://jeffreyharris.net/quiz/index.html">A demo can be seen here.</a>

<h2>Requirements</h2>
Jquery 1.11.2 +
Graphics for the backgrounds of each question. The backgrounds can also change depending on the user getting each question correct.

<h2>Usage:</h2>
Replace the images and questions in the demo with your own. Make sure to mark the correct answer in each question's html code.

Example:

```
<div class="question">What is 3 plus 2?</div>
<div class="answers">
<div class="ans"><label><input id="wrong" class="1" type="radio">1</label></div>
<div class="ans"><label><input id="correct" class="5" type="radio">5</label></div><! -- This one marked correct -->
<div class="ans"><label><input id="wrong" class="100" type="radio">100</label></div>
<div class="ans"><label><input id="wrong" class="2000" type="radio">2000</label></div>
```

The quiz can have any number of questions, just make sure thier worth adds up to 100. To edit the worth of each correct answer, edit the "quizScore + ##" in line 150 of the Javascript file:

Example:

```
createCounter("counterTarget",quizScore,quizScore + 10,500,function(){ 
```

There's an option for a bonus question at the end too. So for the final screen, you can have different content display depending on how the user answered the bonus question, and what their total score is. Look for line 66 in the JS file for these triggers.
