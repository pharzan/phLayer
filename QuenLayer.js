/**
 * Created by Farzan on 10/24/2015.
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
                1: 'me',
                2: '***',
                3: 'Bunny'
            }],
            correct: 1
        }
    },

    question: m.prop(),
    answers: m.prop([]),
    time: 0,

    getQuestion: function (time, parent) {

        var self = this,
            t = Math.round(time);

        self.time = t;

        if (self.config[t] && parent.state.playing != false && !self.config[t].seen) {
            QuenLayer.parent.playIt();
            self.question(self.config[t].question);

            console.log(self.config[t].answers);
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
            console.log('hoooooray')
        }else{
            console.log('wrong answer')
        }

    }
    ,

    controller: function (parent) {
        PubSub.subscribe('timeChange', function (time) {
            QuenLayer.getQuestion(time, parent)
        });
    }
    ,

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