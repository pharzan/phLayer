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
    questions: {
        2: {
            text: 'who is this?',
            choices: {
                1: 'pharzan',
                2: 'you',
                3: 'Big Bunny',
                4: 'little Bunny'
            },
            correct: 1,
            timeLimit: 5000
        },
        3: {
            text: 'where is this?',
            choices: {
                1: 'me',
                2: '***',
                3: 'Bunny'
            },
            correct: 3
        },
        6: {
            text: 'who are you?',
            choices: {
                a: 'not you',
                b: 'probably you'

            },
            correct: 0
        }
    },

    question: m.prop(),

    getQuestion: function (time, parent) {

        var t = Math.round(time),
            question = this.questions[t];

        if (question && !question.seen) {
            if (parent.state.playing) {
                parent.playIt();
            }

            this.question(question);
            question.seen = true;
        }
    },

    checkAnswer: function (key) {

        var correctAnswer = this.question().correct;

        if (key == correctAnswer) {
            /* do something when the answer is right*/
            console.log('hoooooray');
        } else {
            /* do something when the answer is wrong*/
            console.log('wrong answer')
        }

        return
    },

    clearContinue: function (parent) {
        this.question('');
        return parent.playIt();
    },

    controller: function (parent) {
        PubSub.subscribe('timeChange', function (time) {
            QuenLayer.getQuestion(time, parent)
        });
    },

    view: function (ctrl, parent) {
        this.parent = parent;
        var self = this,
            question = self.question();

        if (!question) {
            return m('')
        }

        var choices = question.choices;
        return m('div', question.text, m('ul',
            Object.keys(choices).map(function (key) {
                return m('li',
                    {
                        onclick: function () {
                            self.checkAnswer(key);
                            self.clearContinue(parent)
                        }
                    },
                    choices[key])
            })
        ))
    }
};