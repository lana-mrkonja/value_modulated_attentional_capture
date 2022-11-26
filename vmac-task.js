/* create timeline */
var timeline = [];

/* init connection with pavlovia.org */
var pavlovia_init = {
  type: "pavlovia",
  command: "init",
// Store info received by Pavlovia init into the global variable `pavloviaInfo`
setPavloviaInfo: function (info) {
console.log(info);
pavloviaInfo = info;
}
};
timeline.push();


//*** background colours ***//
    //move to CSS?
    
    lightnessVal = 2;
    document.body.style.backgroundColor = "hsl(0,0%,"+lightnessVal+"%)";
    document.body.style.color = "white";


//*** declare variables 
	
var today = new Date(); //helpful to have in the data file
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var subject_id = jsPsych.randomization.randomID(10); // generate a random subject ID with 5 characters 
var colourBalance;
var colorset;
var colorpairs;

var urlsession = jsPsych.data.urlVariables();
console.log(urlsession.session);

var urlID = jsPsych.data.getURLVariable('ResponseID');

colorset = jsPsych.randomization.sampleWithoutReplacement([1,2], 1);
  if (colorset == 1) {
    colorpairs = jsPsych.randomization.sampleWithoutReplacement([1, 2, 3, 4, 5, 6, 7, 8], 1);
    if (colorpairs == 1) {
      colourBalance = ['blue','orange','green','pink'];
    } else if (colorpairs == 2) {
      colourBalance = ['orange','blue','green','pink'];
    } else if (colorpairs == 3) {
      colourBalance = ['blue','orange','pink','green'];
    } else if (colorpairs == 4) {
      colourBalance = ['orange','blue','pink','green'];
    } else if (colorpairs == 5) {
      colourBalance = ['green','pink','blue','orange'];
    } else if (colorpairs == 6) {
      colourBalance = ['pink','green','blue','orange'];
    } else if (colorpairs == 7) {
      colourBalance = ['green','pink','orange','blue'];
    } else if (colorpairs == 8) {
      colourBalance = ['pink','green','orange','blue'];
    }
  } else if (colorset == 2) {
    colorpairs = jsPsych.randomization.sampleWithoutReplacement([1, 2, 3, 4, 5, 6, 7, 8], 1);
    if (colorpairs == 1) {
      colourBalance = ['cyan','red','yellow','purple'];
    } else if (colorpairs == 2) {
      colourBalance = ['red','cyan','yellow','purple'];
    } else if (colorpairs == 3) {
      colourBalance = ['cyan','red','purple','yellow'];
    } else if (colorpairs == 4) {
      colourBalance = ['red','cyan','purple','yellow'];
    } else if (colorpairs == 5) {
      colourBalance = ['yellow','purple','cyan','red'];
    } else if (colorpairs == 6) {
      colourBalance = ['purple','yellow','cyan','red'];
    } else if (colorpairs == 7) {
      colourBalance = ['yellow','purple','red','cyan'];
    } else if (colorpairs == 8) {
      colourBalance = ['purple','yellow','red','cyan'];
    }
  }


var realVersion = true;

    if (realVersion == true) {
        var trialTypeArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];     //fill with num low- and high-value distractor trials
        var numPracticeTrials = 12;          
        var maxTrainingBlockNum = 16;
        var breaksEvery = 2;
    } else {    // debugging mode
        var trialTypeArray = [0,1,0,1];
        var numPracticeTrials = 1;    
        var maxTrainingBlockNum = 2;
        var breaksEvery = 1;
    }      

var trialNum = 0;
var blockNum = 1;
var currentPhase = 1; //1 for training
var trialOrder = jsPsych.randomization.shuffle(trialTypeArray);     //start off with a shuffled trial order
console.log(trialOrder);
var TargetTypeArray = jsPsych.randomization.shuffle(trialTypeArray); //to counterbalance target type(horiz/vertical)
console.log(TargetTypeArray);
var LocArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]; //to balance locations of targ/dist
TargetLocArray = jsPsych.randomization.shuffle(LocArray);
console.log(TargetLocArray);
var Locations = [
  [0,1],
  [0,2],
  [0,3],
  [0,4],
  [0,5],
  [1,0],
  [1,2],
  [1,3],
  [1,4],
  [1,5],
  [2,1],
  [2,0],
  [2,3],
  [2,4],
  [2,5],
  [3,1],
  [3,2],
  [3,0],
  [3,4],
  [3,5],
  [4,1],
  [4,2],
  [4,3],
  [4,0],
  [4,5],
  [5,1],
  [5,2],
  [5,3],
  [5,4],
  [5,0],
]

var numTrainingTrials = trialTypeArray.length;
var blocksSinceBreak = 0;
var numSearchLocs = 6;
var trialDistractLoc;
var trialDistractType;
var trialTargetLoc;
var trialTargetType;
var trialCorrect;
var trialFeedbackText;
var trialReward;
var totalPoints = 0;
var breakStr;
var timeOut = 1000;

// Not sure what the purpose:
var cashAmount = 0;
var cashMax = 5;
var cashMin = 2;
var maxPoints = ((numTrainingTrials*maxTrainingBlockNum)*((timeOut*0.1 + timeOut)/2));
console.log(maxPoints);
    
// record the subject Num and the counterbalance condition in the jsPsych data object (adds property to every trial)

	jsPsych.data.addProperties({
	  uniqueSubID: subject_id,
    qualtricsID: urlID,
	  DateTime: dateTime,
	  colourbalancing: colourBalance,
	});

//*** preload images ***//

var ts = 'img/';
var imageNames = [ts+'purple_L.png', ts+'purple_R.png', ts+'green_L.png', ts+'green_R.png', ts+'yellow_L.png', ts+'yellow_R.png', ts + 'blue_L.png', ts + 'blue_R.png', ts + 'orange_L.png', ts + 'orange_R.png', ts+'pink_L.png', ts+'pink_R.png', ts+'red_L.png', ts+'red_R.png', ts+'cyan_L.png', ts+'cyan_R.png', ts+'brown_R.png', ts+'brown_L.png', ts + 'Distractor_L.png', ts + 'Distractor_R.png', ts + 'Target_H.png', ts + 'Target_V.png', ts + 'fixationCross.png', ts + 'fixation_example.png', ts + 'horizontal_example.png', ts + 'vertical_example.png', ts + 'horizontal_example_grey.png', ts + 'vertical_example_grey.png', ts+'orange_example.png', ts+'blue_example.png', ts+'purple_example.png', ts+'green_example.png', ts+'pink_example.png', ts+'red_example.png', ts+'cyan_example.png', ts+'yellow_example.png'];
var fixationExample = ts+'fixation_example.png';
var horizontalExample = ts+'horizontal_example_grey.png';
var verticalExample = ts+'vertical_example_grey.png';
var colourExample = ts+'vertical_example.png';
var fixationCross = ts+ 'fixationCross.png';
var targetName = [];
    targetName[0] = ts+'Target_H.png';
    targetName[1] = ts+'Target_V.png';
var greyType = [];
    greyType[0] = ts+'Distractor_L.png';
    greyType[1] = ts+'Distractor_R.png';
var practiceType = [];
    practiceType[0] = ts+'brown_L.png';
    practiceType[1] = ts+'brown_R.png';
var highRewardType = [];
var lowRewardType = [];
var highPunishType = [];
var lowPunishType = [];
	
	highRewardType[0] = ts+colourBalance[0]+'_L.png';
	highRewardType[1] = ts+colourBalance[0]+'_R.png';
	lowRewardType[0] = ts+colourBalance[1]+'_L.png';
	lowRewardType[1] = ts+colourBalance[1]+'_R.png';
	highPunishType[0] = ts+colourBalance[2]+'_L.png';
	highPunishType[1] = ts+colourBalance[2]+'_R.png';
	lowPunishType[0] = ts+colourBalance[3]+'_L.png';
	lowPunishType[1] = ts+colourBalance[3]+'_R.png';
	
var highRewardColour = colourBalance[0];    
var lowRewardColour = colourBalance[1];
var highPunishColour = colourBalance[2];    
var lowPunishColour = colourBalance[3];
  
var rgbArray = {blue: '41, 141, 165', orange: '193, 95, 30', green: '14, 209, 69', purple: '184, 61, 186', cyan: '0, 255, 255', yellow: '255, 255, 0', red: '255, 0, 0', pink: '255, 192, 203'};
var highRewardRGB = rgbArray[colourBalance[0]]
var lowRewardRGB = rgbArray[colourBalance[1]]
var highPunishRGB = rgbArray[colourBalance[2]]
var lowPunishRGB = rgbArray[colourBalance[3]]  

var highRewardImg = ts+colourBalance[0]+'_example.png'
var lowRewardImg = ts+colourBalance[1]+'_example.png'
var highPunishImg = ts+colourBalance[2]+'_example.png'
var lowPunishImg = ts+colourBalance[3]+'_example.png'
	



//*** practice instructions ***//

    var intro = 'Now you will begin the reaction time task. During this task you will be looking at sets of shapes and responding as fast as you can.<br><br><br>';
    var pracInstr1 = '<br><br>At the beginning of each trial, a cross will appear in the middle of the screen.<br>' +
    'Please focus your eyes on the cross.<p><img src="'+fixationExample+'"></img></p><br>';
    var pracInstr2 = '<br><br>After a short time, a set of shapes will appear on the screen.<br>Your task is to search for the ' +
    '<b><u>diamond</u></b> and respond to the line inside the diamond.<p><img src="'+horizontalExample+'"></img></p><br>';
    var pracInstr3 = '<br><br>If the line inside the diamond is <b><u>horizontal</u></b> (like below), press the "<b><u>L</u></b>" key  (<b>L</b> for <b>L</b>ying down).<br><br>' +
    '<p><img src="'+horizontalExample+'"></img></p><br>';
    var pracInstr4 = '<br><br>If the line inside the diamond is <b><u>vertical</u></b> (like below), press the "<b><u>S</u></b>" key  (<b>S</b> for <b>S</b>tanding up).<br><br>' +
    '<p><img src="'+verticalExample+'"></img></p><br>';
    var pracInstr5 = '<br><br>In all trials, there is also a colored circle. During practice, the circle will be <p style= "color: rgb(139, 69, 19); display:inline"><b> brown </b></p> (like below), but the colors will change for the actual task. However, your task is still to <b><u>respond to the line in the diamond</b></u>.<br><br>' +
    '<p><img src="'+colourExample+'"></img></p><br>';
   
        
    var practiceInstructions = {
        type: 'instructions',
        pages:[intro, pracInstr1, pracInstr2, pracInstr3, pracInstr4, pracInstr5],
        show_clickable_nav: true,
        post_trial_gap: 1000
    }
	 // check questions 
	 
var initial_Q0_answers;
var initial_Q1_answers;

initial_Q0_answers = ["Respond to orientation of the line within the coloured circle", "Respond to orientation of the line within the diamond"];
initial_Q1_answers = [" I should press 'S' if the line is vertical and 'L' if the line is horizontal", " I should press 'S' if the line is horizontal and 'L' if the line is vertical"];

var initial_correctstring = '{"Q0":"' + initial_Q0_answers[1] + '","Q1":"' + initial_Q1_answers[0]+ '"}';

var initial_repeatInstructions = true;

var initial_instruction_check = {
    type: "survey-multi-choice",
    preamble: ["<p style='text-align:center;'><b>Please check your knowledge before you continue!</b></p>"],
    questions: [{prompt: 'On each trial of this task, you respond to the orientation of the line within which shape? ', options: initial_Q0_answers, required: true}, {prompt: 'How should you respond on each trial?', options: initial_Q1_answers, required: true}],
    post_trial_gap: 0,
    on_finish: function(data) {
        if( data.responses == initial_correctstring) {
            initial_repeatInstructions = false;
        };

        jsPsych.data.addDataToLastTrial({
            instruct_qs: 1
        });
    }
};

var initial_check_failed_display = {
    type: "html-button-response",
    stimulus: '<p><b>Unfortunately, at least one of your answers was incorrect.</b></p>',
    choices: ['<p>Click here to read the instructions again</p>'],
    button_html: '<button class="fancyButtonRed" style="vertical-align:middle"><span>%choice%</span></button><br><br>',
    post_trial_gap: 100
};


var initial_check_failed_conditional = {
    timeline: [initial_check_failed_display],
    conditional_function: function(){
        return initial_repeatInstructions;      // If this is true, it will execute timeline (show failure screen)
    }
};


var loop_initial_instructions = {
    timeline: [practiceInstructions, initial_instruction_check, initial_check_failed_conditional],
    loop_function: function() {
        return initial_repeatInstructions;  // If initial_repeatInstructions remains true, this will keep looping; if it becomes false, it will move on.
    }
};

var pracStart = {
		type: 'html-keyboard-response',
		stimulus: 'You will now have a chance to practise this task. <br><br> Remember, if the line inside the diamond shape is ' + 
		'<b>horizontal</b>, press the "<b>L</b>" key (<b>L</b> for <b>L</b>ying down).<br>If the line inside the diamond shape is <b>vertical</b>, ' +
		'press the "<b>S</b>" key (<b>S</b> for <b>S</b>tanding up).<br><br>Please place your fingers over the keys and press space bar when you are ready to begin.<br><br>',
		};
	
	
///*** practice trials ***//

var practiceSearchDisplay = {
		type: 'visual-search-vmac',
		set_size: numSearchLocs,
    trial_duration: 3000,       //give them a long time to respond to practice trials
		fixation_duration: 300,
		fixation_image: fixationCross,    
    search_stimuli: function() {
			var searchArray = [];
			var randNum = Math.round(Math.random());

        //grey circles
        for (ii=0; ii < numSearchLocs; ii++) { //[start of the loop; condition; counter]
				randNum = Math.round(Math.random());    //for each of the searchlocs, generate 0 or 1
				searchArray[ii] = greyType[randNum];
		  	}
			
        //distractor
        trialDistractLoc = Math.floor(Math.random() * numSearchLocs); //from location 0 to 5
        searchArray[trialDistractLoc] = practiceType[randNum];   //horizontal or vertical
			
       //target
       trialTargetType = Math.round(Math.random());
            do
				trialTargetLoc = Math.floor(Math.random() * numSearchLocs); //random number bw 0 and 1, times 6, rounding down
			while (trialTargetLoc == trialDistractLoc) //executes command first, then checks if condition is true, keep looping around until the target loc =/= distractor loc
            searchArray[trialTargetLoc] = targetName[trialTargetType];
			return searchArray; 
		},
		
		target_type: function() {
			return trialTargetType;     //must have this for plugin to know what the correct response is for FB
		},

		on_finish: function(data){      //on_finish allows for dynamic updating of data on each trial 
            trialCorrect = data.correct;
			if (trialCorrect == 99) {
				trialFeedbackText = '<p style="font-size: 38px;">Too slow<br><br>You must respond faster';
			} else if (trialCorrect == 0) {
				trialFeedbackText = '<p style="font-size: 40px;">Error</p>';
			} else if (trialCorrect == 1) {
				trialFeedbackText = '<p style="font-size: 40px;">Correct</p>';
			}
    }
}

var practiceFeedback = {
      type: 'html-keyboard-response',
      stimulus: function() {
          return trialFeedbackText;
      },
      trial_duration: 700,
      response_ends_trial: false,
}   
    
var practiceTrials = {
      timeline: [practiceSearchDisplay, practiceFeedback]
}

//*** training instructions reward ***//

    var trainingInstr1Reward = 'The rest of the experiment is similar to the trials you have just completed.<br>'+
    'You should still respond to the line inside the diamond shape.<br><br>' +
    'However, from now on, there are blocks of trials where you will be able to earn points for correct and quick responses.<br> There will also be blocks of trials where you will lose points for incorrect and slow responses. <br>' +
    'You will now first start with trials where you can only earn points. <br>' +
    'Based on how many points you score, you will receive lottery tickets (every 250 points is one ticket). <br>' +
    'Among all participants, we raffle a total of five <b>€50,- </b> vouchers using these lottery tickets. <br>' +
    'So try and earn as many points as you possibly can!<br>';
    var trainingInstr2Reward = 'On each trial, there will be a coloured circle on the screen.<br><br>' +
    'If a <b>'+lowRewardColour+'</b> circle is on the screen, and you respond correctly to the line inside the diamond,' +
    '<br>then you will earn a <b>small amount of points</b>.<br>' +
    '<p><img src="'+lowRewardImg+'"></img></p><br>'+
    'This is known as a normal prize trial. Importantly, <b>the faster you respond, the more points you will earn.</b><br><br><br>';
    var trainingInstr3Reward = 'On each trial, there will be a coloured circle on the screen.<br><br>' + 
    'If a <b>'+highRewardColour+'</b> circle is on the screen, and you respond correctly to the line inside the diamond,' +
    '<br><b>the number of points you would normally earn will be multiplied by 10</b>.<br>' +
    '<p><img src="'+highRewardImg+'"></img></p>' +
    '<b>This is known as a <p style="color:yellow; display:inline">10x BONUS TRIAL</p>.</b><br><br>Again, the faster you respond, the more points you will earn.<br><br>';
    var trainingInstr4Reward = 'You should still be responding to the orientation of the line inside the diamond:<br>'+
    'If the line inside the diamond is horizontal, press the "L" key.<br>' +
    'If the line inside the diamond is vertical, press the "S" key.<br><br>' +
    'If you make an incorrect response, then you will earn <b><u>NO points</u></b>.<br><br>' +
    'If you take more than '+timeOut+' milliseconds to make a response,<br>then you will earn <b><u>NO points</u></b>, ' +
    'so you should respond as fast as possible!<br><br>';
    

  var trainingInstructionsReward = {
        type: 'instructions',
        pages:[trainingInstr1Reward, trainingInstr2Reward, trainingInstr3Reward, trainingInstr4Reward],
        show_clickable_nav: true,
        post_trial_gap: 1000,
    }

	 // check questions for training  
var exp_Q0_answers_reward;
var exp_Q1_answers_reward;


exp_Q0_answers_reward = ["The more points I earn the more chance I have of winning", "Participants will be totally randomly chosen to win"];
exp_Q1_answers_reward = ["When the " +lowRewardColour+ " circle is in the display I can earn more points than when the " +highRewardColour+ " circle is in the display", "When the " +highRewardColour+ " circle is in the display I can earn more points than when the " +lowRewardColour+ " circle is in the display"];

var exp_correctstring_reward = '{"Q0":"' + exp_Q0_answers_reward[0] + '","Q1":"' + exp_Q1_answers_reward[1]+ '"}'; //condition 0:  orange=HV,

var exp_repeatInstructions_reward = true;

var exp_instruction_check_reward = {
    type: "survey-multi-choice",
    preamble: ["<p style='text-align:center;'><b>Please check your knowledge before you continue!</b></p>"],
    questions: [{prompt: 'How can you win a €50,- voucher in this experiment?', options: exp_Q0_answers_reward, required: true}, {prompt: 'Do you earn more points when the '+highRewardColour+' circle or the '+lowRewardColour+' circle is in the display?', options: exp_Q1_answers_reward, required: true}],
    post_trial_gap: 0,
    on_finish: function(data) {
        if(data.responses == exp_correctstring_reward) {
            exp_repeatInstructions_reward = false;
        };
        jsPsych.data.addDataToLastTrial({
            instruct_qs: 1
        });
    }
};

var exp_check_failed_display = {
    type: "html-button-response",
    stimulus: '<p><b>Unfortunately, at least one of your answers was incorrect.</b></p>',
    choices: ['<p>Click here to read the instructions again</p>'],
    button_html: '<button class="fancyButtonRed" style="vertical-align:middle"><span>%choice%</span></button><br><br>',
    post_trial_gap: 100
};


var exp_check_failed_conditional_reward = {
    timeline: [exp_check_failed_display],
    conditional_function: function(){
        return exp_repeatInstructions_reward;      // If this is true, it will execute timeline (show failure screen)
    }
};

var cursor_off = {
  type: 'call-function',
  func: function() {
      document.body.style.cursor= "none";
  }
}

var cursor_on = {
  type: 'call-function',
  func: function() {
      document.body.style.cursor= "auto";
  }
}

var loop_exp_instructions_reward = {
    timeline: [cursor_on, trainingInstructionsReward, exp_instruction_check_reward, exp_check_failed_conditional_reward, cursor_off],
    loop_function: function() {
        return exp_repeatInstructions_reward;  // If exp_repeatInstructions remains true, this will keep looping; if it becomes false, it will move on.
    }
};

var trainingBegin = {
	type: 'html-keyboard-response',
	stimulus: 'You are ready to begin! <br><br>Remember, the more points you earn, the more likely that you will receive one of the €50,- vouchers at the end of the experiment.<br><br>' +
    'Please place your fingers over the keys and press space bar when you are ready to begin',
};
 
///*** training trials reward ***//
    
    var points_right_now = function() {
      points_before_block = totalPoints
    return ;}

    var count_points_before_block = {
        type: 'call-function',
        func: points_right_now
    }
    
    var points_earned_during_block = function() {
      points_earned = totalPoints - points_before_block
    return ;}
    
    var count_points_earned = {
        type: 'call-function',
        func: points_earned_during_block
    }

var trainingSearchDisplayReward = {
		type: 'visual-search-vmac',
		set_size: numSearchLocs,
    trial_duration: timeOut,
		fixation_duration: function(){
		return jsPsych.randomization.sampleWithReplacement([300, 400, 500], 1)[0];
		},
		fixation_image: fixationCross,
    search_stimuli: function() {
			var searchArray = [];
			var randNum = Math.round(Math.random());

      //grey circles
      for (ii=0; ii < numSearchLocs; ii++) { 
			randNum = Math.round(Math.random());    
			searchArray[ii] = greyType[randNum];
			}
			
      //distractor
      randomloc = TargetLocArray[trialNum];
      trialDistractLoc = Locations[randomloc][0]; 
      trialDistractType = trialOrder[trialNum];
        if (trialDistractType == 0) {   // low-reward trial
          searchArray[trialDistractLoc] = lowRewardType[randNum];   //horizontal or vertical
			  } else {	// high-reward trial
          searchArray[trialDistractLoc] = highRewardType[randNum];
			  }
			
      //target
      trialTargetType = TargetTypeArray[trialNum];
      trialTargetLoc = Locations[randomloc][1];
      searchArray[trialTargetLoc] = targetName[trialTargetType];
		return searchArray; 
		},
		
		target_type: function() {
			return trialTargetType;
		},

		on_finish: function(data){      //on_finish allows for dynamic updating of data on each trial 
      trialCorrect = data.correct;
      rt = data.rt;
            
      if (trialDistractType == 0){
        if (trialCorrect == 99) {
          trialReward = 0;
  				trialFeedbackText = '<p style="font-size: 40px;"><b>Too slow</b><br><br>0 points';
        } else if (trialCorrect == 0) {
			  	trialReward = 0;
				  trialFeedbackText = '<p style="font-size: 40px;"><b>Error</b><br><br>0 points';
        } else if (trialCorrect == 1) {
          trialReward = Math.round((timeOut-rt)*0.1);
					trialFeedbackText = '<p style="font-size: 40px;"><b>Correct</b><br><br> '+trialReward+' points';  
        }
      } else if (trialDistractType == 1) {
        if (trialCorrect == 99) {
          trialReward = 0;
  				trialFeedbackText = '<p style="font-size: 40px;"><b>Too slow on a 10x BONUS TRIAL</b><br><br>0 points';
        } else if (trialCorrect == 0) {
			  	trialReward = 0;
				  trialFeedbackText = '<p style="font-size: 40px;"><b>Error on a 10x BONUS TRIAL</b><br><br>0 points';
        } else if (trialCorrect == 1) {
          trialReward = 10*(Math.round((timeOut-rt)*0.1));    //10x bonus trial
					trialFeedbackText = '<p style="font-size: 50px;color:yellow;"><b>10x BONUS TRIAL</b><br><p style="font-size: 40px;"> '+trialReward +' points'; 
        }
      }

      jsPsych.data.addDataToLastTrial({    // everything extra that we want to record
        phase: currentPhase, //1 for training 
        block: blockNum,
        trialNumber: trialNum+1, //plus 1 because the trial numbers start from 0 and I want it to look pretty in my datafile.
        distractorType: trialDistractType,
        trialDistractorLocation: trialDistractLoc,
        trialTargetLocation: trialTargetLoc,
        trialPoints: trialReward,
        totalPoints: totalPoints,
        punish_or_reward: 'reward' 
      })

      trialNum++;         // super important!!

      if (trialNum == numTrainingTrials) {     //after the last trial of the block
        trialNum = 0;          //reset the trial counter
				blockNum++;			   //increase the block numbers
      }

      if (trialNum == 0) {
        trialOrder = jsPsych.randomization.shuffle(trialTypeArray);     //reshuffle the trial order at the beginning of the block
        console.log(trialOrder);
        TargetLocArray = jsPsych.randomization.shuffle(LocArray);
        console.log(TargetLocArray);
        TargetTypeArray = jsPsych.randomization.shuffle(trialTypeArray);
        console.log(TargetTypeArray);
      }

      totalPoints = totalPoints + trialReward;
      console.log(totalPoints);
            
            
      }
}
    
//*** training instructions punish ***//

    var trainingInstr1Punish = 'The rest of the experiment is similar to the trials you have just completed.<br>'+
    'You should still respond to the line inside the diamond shape.<br><br>' +
    'However, from now on, there will be <b>minus</b> blocks too, where your task is to prevent losing points.<br><br>';
    var trainingInstr2Punish = 'On each trial, there will be a coloured circle on the screen again.<br><br>' +
    'If a <b>'+lowPunishColour+'</b> circle is on the screen, the slower you respond the more points you will lose (a small amount).' +
    '<br>if you make an error or answer too slow you will receive a penalty too</b>.<br>' +
    '<p><img src="'+lowPunishImg+'"></img></p><br>'+
    'This is known as a normal minus trials. So importantly, <b> the slower you respond, the more points you will lose.</b><br><br><br>';
    var trainingInstr3Punish = '<br><br>' + 
    'If a <b>'+highPunishColour+'</b> circle is on the screen, the slower you respond the more points you will lose, however' +
    '<br><b>the number of points you would normally lose will be multiplied by 10 on these trials - also when you respond too late or incorrect </b>.<br>' +
    '<p><img src="'+highPunishImg+'"></img></p>' +
    '<b>This is known as a <p style="color:yellow; display:inline">10x PENALTY TRIAL</p>.</b><br><br>Again, the slower you respond, the more points you will lose.<br><br>';
    var trainingInstr4Punish = 'You should still be responding to the orientation of the line inside the diamond:<br>'+
    'If the line inside the diamond is horizontal, press the "L" key.<br>' +
    'If the line inside the diamond is vertical, press the "S" key.<br><br>' +
    'If you make an incorrect response, then you will lose <b><u>a lot of points</u></b>.<br><br>' +
    'If you take more than '+timeOut+' milliseconds to make a response,<br>then you will lose <b><u>a lot of points</u></b>, ' +
    'so you should respond as fast as possible!<br><br>';
    

    var trainingInstructionsPunish = {
        type: 'instructions',
        pages:[trainingInstr1Punish, trainingInstr2Punish, trainingInstr3Punish, trainingInstr4Punish],
        show_clickable_nav: true,
        post_trial_gap: 1000,
    }

	 // check questions for training  
var exp_Q0_answers_punish;
var exp_Q1_answers_punish;


exp_Q0_answers_punish = ["The more points I earn the more chance I have of winning", "Participants will be totally randomly chosen to win"];
exp_Q1_answers_punish = ["When the " +lowPunishColour+ " circle is in the display I can lose more points than when the " +highPunishColour+ " circle is in the display", "When the " +highPunishColour+ " circle is in the display I can lose more points than when the " +lowPunishColour+ " circle is in the display"];

var exp_correctstring_punish = '{"Q0":"' + exp_Q0_answers_punish[0] + '","Q1":"' + exp_Q1_answers_punish[1]+ '"}'; //condition 0:  orange=HV,
//var exp_correctstring_punish_cond1 = '{"Q0":"' + exp_Q0_answers_punish[0] + '","Q1":"' + exp_Q1_answers_punish[0]+ '"}'; // condition 1: blue=HV,  

var exp_repeatInstructions_punish = true;

var exp_instruction_check_punish = {
    type: "survey-multi-choice",
    preamble: ["<p style='text-align:center;'><b>Please check your knowledge before you continue!</b></p>"],
    questions: [{prompt: 'How can you win a €50,- voucher in this experiment?', options: exp_Q0_answers_punish, required: true}, {prompt: 'Can you lose more points when the '+highPunishColour+' circle or the '+lowPunishColour+' circle is in the display?', options: exp_Q1_answers_punish, required: true}],
    post_trial_gap: 0,
    on_finish: function(data) {
        if(data.responses == exp_correctstring_punish) {
            exp_repeatInstructions_punish = false;
        };
		//if (colourBalance==1 & data.responses == exp_correctstring_cond1) {
    //        exp_repeatInstructions = false;
    //    };

        jsPsych.data.addDataToLastTrial({
            instruct_qs: 1
        });
    }
};


var exp_check_failed_conditional_punish = {
    timeline: [exp_check_failed_display],
    conditional_function: function(){
        return exp_repeatInstructions_punish;      // If this is true, it will execute timeline (show failure screen)
    }
};


var loop_exp_instructions_punish = {
    timeline: [cursor_on, trainingInstructionsPunish, exp_instruction_check_punish, exp_check_failed_conditional_punish, cursor_off],
    loop_function: function() {
        return exp_repeatInstructions_punish;  // If exp_repeatInstructions remains true, this will keep looping; if it becomes false, it will move on.
    }
};
    
///*** training trials punishment ***//

var trainingSearchDisplayPunish = {
		type: 'visual-search-vmac',
		set_size: numSearchLocs,
    trial_duration: timeOut,
		fixation_duration: function(){
		return jsPsych.randomization.sampleWithReplacement([300, 400, 500], 1)[0];
		},
		fixation_image: fixationCross,
    search_stimuli: function() {
			var searchArray = [];
			var randNum = Math.round(Math.random());

      //grey circles
      for (ii=0; ii < numSearchLocs; ii++) { 
				randNum = Math.round(Math.random());    
				searchArray[ii] = greyType[randNum];
			}
			
      //distractor
      randomloc = TargetLocArray[trialNum];
      trialDistractLoc = Locations[randomloc][0];
      trialDistractType = trialOrder[trialNum];
      if (trialDistractType == 0) {   // low-Punish trial
          searchArray[trialDistractLoc] = lowPunishType[randNum];   //horizontal or vertical
			} else {	// high-Punish trial
          searchArray[trialDistractLoc] = highPunishType[randNum];
			}
			
      //target
      trialTargetType = TargetTypeArray[trialNum];
      trialTargetLoc = Locations[randomloc][1];
      searchArray[trialTargetLoc] = targetName[trialTargetType];
    return searchArray; 
		},
		
		target_type: function() {
			return trialTargetType;
		},

		on_finish: function(data){      //on_finish allows for dynamic updating of data on each trial 
      trialCorrect = data.correct;
      rt = data.rt;
      max_punish = -1 * Math.round(points_earned / (numTrainingTrials/2 + 0.1 * numTrainingTrials/2)) // ASSUMPTION: as many small- as large trials. You can max. lose how much you earned during last reward block
      
      if (trialDistractType == 0){
        if (trialCorrect == 99) {
          trialPunish = Math.round(max_punish*0.1);
  				trialFeedbackText = '<p style="font-size: 40px;"><b>Too slow</b><br><br>'+trialPunish+' points';
        } else if (trialCorrect == 0) {
			  	trialPunish = Math.round(max_punish*0.1);
				  trialFeedbackText = '<p style="font-size: 40px;"><b>Error</b><br><br>'+trialPunish+' points';
        } else if (trialCorrect == 1) {
          trialPunish = Math.round(max_punish*(rt/timeOut)*0.1);
					trialFeedbackText = '<p style="font-size: 40px;"><b>Correct</b><br><br> '+trialPunish+' points';  
        }
      } else if (trialDistractType == 1) {
        if (trialCorrect == 99) {
          trialPunish = max_punish;
  				trialFeedbackText = '<p style="font-size: 40px;"><b>Too slow on a 10x PENALTY TRIAL</b><br><br>'+trialPunish+' points';
        } else if (trialCorrect == 0) {
			  	trialPunish = max_punish;
				  trialFeedbackText = '<p style="font-size: 40px;"><b>Error on a 10x PENALTY TRIAL</b><br><br>'+trialPunish+' points';
        } else if (trialCorrect == 1) {
          trialPunish = Math.round(max_punish*(rt/timeOut));
					trialFeedbackText = '<p style="font-size: 50px;color:yellow;"><b>10x PENALTY TRIAL</b><br><p style="font-size: 40px;"> '+trialPunish +' points'; 
        }
      }
      
      
		

    jsPsych.data.addDataToLastTrial({    // everything extra that we want to record				
				phase: currentPhase, //1 for training 
				block: blockNum,
				trialNumber: trialNum+1, //plus 1 because the trial numbers start from 0 and I want it to look pretty in my datafile.
				distractorType: trialDistractType,
        trialDistractorLocation: trialDistractLoc,
        trialTargetLocation: trialTargetLoc,
				trialPoints: trialPunish,
        totalPoints: totalPoints,
        punish_or_reward: 'punish'
    })

    trialNum++;         // super important!!
            
    if (trialNum == numTrainingTrials) {     //after the last trial of the block
      trialNum = 0;          //reset the trial counter
      blockNum++;			   //increase the block numbers
    }

    if (trialNum == 0) {
      trialOrder = jsPsych.randomization.shuffle(trialTypeArray);     //reshuffle the trial order at the beginning of the block
      console.log(trialOrder);
      TargetLocArray = jsPsych.randomization.shuffle(LocArray);
      console.log(TargetLocArray);
      TargetTypeArray = jsPsych.randomization.shuffle(trialTypeArray);
      console.log(TargetTypeArray); 
    }

    totalPoints = totalPoints + trialPunish;
    console.log(totalPoints);

      }
}



//*** feedback and break screens ***//

var feedbackDisplay = {
    type: 'html-keyboard-response',
    stimulus: function() {
        return trialFeedbackText;
    },
    trial_duration: 700,
    response_ends_trial: false,
}   

var breakDisplay = {
    type: 'html-keyboard-response',
    stimulus: function() {
      breakStr = 'Take a break.<br><br>Total so far = '+totalPoints+' points.<br><br>'+
        'Remember, the faster you respond, the more points you will earn!<br><br>Press space when you are ready to continue.'
        return breakStr;
    },
    choices: [32],
    post_trial_gap: 1000
}
    
var breakNextReward = {
    type: 'html-keyboard-response',
    stimulus: function() {
      breakStr = 'Take a short break. Total score for lottery tickets so far = '+totalPoints+' points.<br><br>'+
        'Next up we will have a <b>reward</b> block. This means that the faster you respond, the more points you will earn!<br><br>' +
        ' <br>Remember, the <p style= "color: rgb('+lowRewardRGB+'); display:inline"><b>'+lowRewardColour+'</b></p>  colour means it is a <p style= "color: rgb('+lowRewardRGB+'); display:inline"><b>normal</b></p> reward trial<br>' +
        '<p><img src="'+lowRewardType[1]+'" width=40></img></p> ' +
        ' <br>and the <p style= "color: rgb('+highRewardRGB+'); display:inline"><b>'+highRewardColour+'</b></p>  colour means it is a <p style= "color: rgb('+highRewardRGB+'); display:inline"><b>10x BONUS</b></p> reward trial.<br>' +
        '<p><img src="'+highRewardType[1]+'" width=40></img></p><br> '+ 
        'Press space when you are ready to continue. Be ready to focus your eyes on the cross again' 
        return breakStr;
    },
    choices: [32],
    post_trial_gap: 1000
}
    
var breakNextPunish = {
    type: 'html-keyboard-response',
    stimulus: function() {
      breakStr = 'Take a short break. Total score for lottery tickets so far = '+totalPoints+' points.<br><br>'+
        'Next up we will have a <b>minus</b> block. This means that the slower you respond, the more points you will lose!<br><br>' +
        ' <br>Remember, the <p style= "color: rgb('+lowPunishRGB+'); display:inline"><b>'+lowPunishColour+'</b></p>  colour means it is a <p style= "color: rgb('+lowPunishRGB+'); display:inline"><b>normal</b></p> minus trial<br>' +
        '<p><img src="'+lowPunishType[1]+'" width=40></img></p> ' +
        ' <br>and the <p style= "color: rgb('+highPunishRGB+'); display:inline"><b>'+highPunishColour+'</b></p>  colour means it is a <p style= "color: rgb('+highPunishRGB+'); display:inline"><b>10x MINUS</b></p> trial.<br>' +
        '<p><img src="'+highPunishType[1]+'" width=40></img></p><br> '+ 
        'Press space when you are ready to continue. Be ready to focus your eyes on the cross again.' 
        return breakStr;
    },
    choices: [32],
    post_trial_gap: 1000
}
  

var trainingTrialsReward = {
    timeline: [trainingSearchDisplayReward, feedbackDisplay]
}

var trainingTrialsPunish = {
    timeline: [trainingSearchDisplayPunish, feedbackDisplay]
}


var VMACfinished = {
    type: 'html-keyboard-response',
    stimulus: function() {
  return 'Well done! You have finished the attention task.<br><br>Your final score is ' +totalPoints+ ' points.<br><br>' +
  ' <br><br>Please press the spacebar to continue.';   
  },
};
   
   
var finalcheckHighReward = {
		type: 'image-button-response',
		stimulus: highRewardImg,
		choices: ["10x Bonus trial", "Normal prize trial", "10x Penalty trial", "Normal minus trial"],
		prompt: " <br><br>If you saw this coloured circle in the display, what kind of trial was it?",
		on_finish: function(data) {
				jsPsych.data.addDataToLastTrial({
				highRewardAware: data.button_pressed,
				})
				}
}

var finalcheckLowReward = {
		type: 'image-button-response',
		stimulus: lowRewardImg,
		choices: ["10x Bonus trial", "Normal prize trial", "10x Penalty trial", "Normal minus trial"],
		prompt: " <br><br>If you saw this coloured circle in the display, what kind of trial was it?",
		on_finish: function(data) {
				jsPsych.data.addDataToLastTrial({
				lowRewardAware: data.button_pressed,
				})
				}
}
		
var finalcheckHighPunish = {
		type: 'image-button-response',
		stimulus: highPunishImg,
		choices: ["10x Bonus trial", "Normal prize trial", "10x Penalty trial", "Normal minus trial"],
		prompt: " <br><br>If you saw this coloured circle in the display, what kind of trial was it?",
		on_finish: function(data) {
				jsPsych.data.addDataToLastTrial({
				highPunishAware: data.button_pressed,
				})
				}
}

var finalcheckLowPunish = {
		type: 'image-button-response',
		stimulus: lowPunishImg,
		choices: ["10x Bonus trial", "Normal prize trial", "10x Penalty trial", "Normal minus trial"],
		prompt: " <br><br>If you saw this coloured circle in the display, what kind of trial was it?",
		on_finish: function(data) {
				jsPsych.data.addDataToLastTrial({
				lowPunishAware: data.button_pressed,
				})
				}
}

/* define welcome message trial */
var preWelcome = {
      type: "html-keyboard-response",
      stimulus: 'Welcome to the study. <br> Press the Spacebar to continue.',
};
	
var welcome = {
	  type: "html-keyboard-response",
      stimulus: '',
};
		
// Debriefing 
var debrief = {
    type: "html-keyboard-response",
    stimulus:function(){
      return 'This is the end of the current task. You earned '+totalPoints+' points. Please press the space bar to be redirected to the next part'
    }
};
	
var fullscreen_trial  = {
		type: "fullscreen",
  		fullscreen_mode: true
};
	
var preload_trial = {
    type: 'preload',
    auto_preload: true,
    error_message: 'The experiment failed to load. Please contact the researcher.',
    show_detailed_errors: true
} 

var debug = {
        type: "html-keyboard-response",
        stimulus: function(){
          return points_earned
        }
};
		
//*** run the experiment ***//
    
  var runExperiment = [];
  
  // Instructions and practice
  
  //DIT ONTCOMMENTEN
  runExperiment.push(pavlovia_init);
	runExperiment.push(preWelcome);
  runExperiment.push(fullscreen_trial);
  runExperiment.push(loop_initial_instructions);
	runExperiment.push(pracStart);
	for (pp=0; pp<numPracticeTrials; pp++) {
        runExperiment.push(practiceTrials);
  }
  runExperiment.push(loop_exp_instructions_reward);
  
  
  // First reward block
  runExperiment.push(count_points_before_block)
	runExperiment.push(trainingBegin);
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsReward);       //run trials
  }		
  runExperiment.push(count_points_earned)
  //runExperiment.push(debug);
  
  // Punish trials instruction
  runExperiment.push(loop_exp_instructions_punish);
  
  // First punish block
	runExperiment.push(trainingBegin);
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsPunish);       //run trials
  }		
  
  // Reminder of reward block coming up
  runExperiment.push(breakNextReward)
  
  // Second reward block
  runExperiment.push(count_points_before_block)
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsReward);       //run trials
  }		
  runExperiment.push(count_points_earned)
  //runExperiment.push(debug);

  // Reminder of punish block coming up
  runExperiment.push(breakNextPunish)
  
  // Second punish block
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsPunish);       //run trials
  }		
  
  // Reminder of reward block coming up
  runExperiment.push(breakNextReward)
  
  // Third reward block
  runExperiment.push(count_points_before_block)
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsReward);       //run trials
  }		
  runExperiment.push(count_points_earned)
  //runExperiment.push(debug);

  // Reminder of punish block coming up
  runExperiment.push(breakNextPunish)
  
  // Third punish block
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsPunish);       //run trials
  }		
  
  // Reminder of reward block coming up
  runExperiment.push(breakNextReward)
  
  // Fourth reward block
  runExperiment.push(count_points_before_block)
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsReward);       //run trials
  }		
  runExperiment.push(count_points_earned)
  //runExperiment.push(debug);

  // Reminder of punish block coming up
  runExperiment.push(breakNextPunish)
  
  // Fourth punish block
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsPunish);       //run trials
  }		
  // Reminder of reward block coming up
  runExperiment.push(breakNextReward)

  // Fifth reward block
  runExperiment.push(count_points_before_block)
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsReward);       //run trials
  }		
  runExperiment.push(count_points_earned)
  //runExperiment.push(debug);

  // Reminder of punish block coming up
  runExperiment.push(breakNextPunish)
  
  // Fifth punish block
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsPunish);       //run trials
  }		
  
  // Reminder of reward block coming up
  runExperiment.push(breakNextReward)

  // Sixth reward block
  runExperiment.push(count_points_before_block)
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsReward);       //run trials
  }		
  runExperiment.push(count_points_earned)
  //runExperiment.push(debug);

  // Reminder of punish block coming up
  runExperiment.push(breakNextPunish)
  
  // Sixth punish block
  for (tt=0; tt<numTrainingTrials; tt++) {       // for trials per block
    runExperiment.push(trainingTrialsPunish);       //run trials
  }		

		
  runExperiment.push(VMACfinished);
  runExperiment.push(cursor_on);
	runExperiment.push(finalcheckHighReward);
	runExperiment.push(finalcheckLowReward);
	runExperiment.push(finalcheckHighPunish);
	runExperiment.push(finalcheckLowPunish);
	runExperiment.push(debrief);	
    runExperiment.push({
        type: 'fullscreen',
        fullscreen_mode: false
    });


/* finish connection with pavlovia.org */
var pavlovia_finish = {
    type: "pavlovia",
    command: "finish",
    participantId: "JSPSYCH-DEMO",
    // Thomas Pronk; your filter function here
  dataFilter: function(data) {
    // Printing the data received from jsPsych.data.get().csv(); a CSV data structure
    console.log(data);
    // You can also access the data directly, for instance getting it as JSON
    console.log(jsPsych.data.get().json());
    // Return whatever data you'd like to store
    return data;
  },

  completedCallback: function() {
    alert('data successfully submitted!');
    location.href="https://uva.fra1.qualtrics.com/jfe/form/SV_bjTc27r7ixM6m90?qualtricsid="+urlID // Real link would go here
}
};
timeline.push(pavlovia_finish);
runExperiment.push(pavlovia_finish);

/* start the experiment without jatos wrapping (for debugging) */
    jsPsych.init({
    preload_images: imageNames,
    timeline: runExperiment,   //create timeline array beforehand (not here)
    });