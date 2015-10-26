/**
 * Created by Farzan on 10/24/2015.
 * the question layer question format os as
 * config:{
 *      timeInSeconds:{ Question:'', <-- Question to be asked at the given time
 *                      answers: [{0:'firstAnswer',1:'secondAnswer'}], <-- Array of answers
 *                      correct:1, <-- correct answer in aswers array
 *                      seen:true <-- pragmatically added as the question has been seen
 *                      }
 */
var QuenLayer = {
    parent: {},
    config: {
        2: {
            question: 'who is this?',
            answers: [{
                0: 'pharzan',
                1: 'you',
                2: 'Big Bunny',
                3: 'little Bunny'
            }],
            correct: 1
        },
        3: {
            question: 'where is this?',
            answers: [{
                0: 'me',
                1: '***',
                2: 'Bunny'
            }],
            correct: 1
        },
        6: {
            question: 'who are you?',
            answers: [{
                0: 'not you',
                1: 'probably you'

            }],
            correct: 0
        }
    },

    question: m.prop(),
    answers: m.prop([]),
    time: 0,

    getQuestion: function (time, parent) {

        var self = this,
            t = Math.round(time);

        self.time = t;
        console.log(self.answers(), time);

        if (self.config[t] && parent.state.playing != false && !self.config[t].seen) {
            QuenLayer.parent.playIt();
            self.question(self.config[t].question);

            //iterate through the answers in the config object
            for (var ansNumber in self.config[t].answers[0]) {
                self.answers().push(self.config[t].answers[0][ansNumber])
            }
            self.config[t].seen = true;
        }
    },

    checkAnswer: function (ans) {

        var answerClicked = ans,
            self = this,
            answerId = parseInt(answerClicked.getAttribute('answerId')),
            correctAnswer = self.config[self.time].correct;

        if (answerId == correctAnswer) {
            /* do something when the answer is right*/
            console.log('hoooooray');
            console.warn(self.time)
        } else {
            /* do something when the answer is wrong*/
            console.log('wrong answer')
        }

        self.clearContinue()

    },

    clearContinue: function () {
      var self=this;
        self.answers([]);
        self.question('');
        self.parent.playIt();
    },

    controller: function (parent) {
        PubSub.subscribe('timeChange', function (time) {
            QuenLayer.getQuestion(time, parent)
        });
    },

    view: function (ctrl, parent) {
        this.parent = parent;
        var self = this;
        return m('div', self.question(), m('div', self.answers().map(function (answer, idx) {
                return m('div', {
                    answerId: idx,
                    onclick: function () {
                        var answerClicked = this;
                        self.checkAnswer(answerClicked)
                    }
                }, answer)
            })
        ))
    }
};