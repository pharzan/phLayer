/**
 * Created by Farzan on 10/24/2015.
 */
var QuenLayer = {
    parent: {},
    config: {
        2: {
            question: 'who is this?',
            answers: [{
                1: 'pharzan',
                2: 'you',
                3: 'Big Bunny'
            }],
            correct: 1
        },
        4: {
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
    answers: [],

    questionCheck: function (time, parent) {

        var self = this,
            t = Math.round(time);

        if (self.config[t] && parent.state.playing != false && !self.config[t].seen) {
            QuenLayer.parent.playIt();
            self.question(self.config[t].question);

            console.log(self.config[t].answers);
            //iterate through the answers in the config object
            for (var timeId in self.config[t].answers[0]) {
                console.log(timeId,self.config[t].answers[0][timeId])


            }


            self.config[t].seen = true;
            m.redraw()
        }
    },

    controller: function (parent) {
        PubSub.subscribe('timeChange', function (time) {
            QuenLayer.questionCheck(time, parent)
        });
    },

    view: function (ctrl, parent) {
        this.parent = parent;
        var self = this;
        return m('div', self.question(), m('div', self.answers
        ))
    }
};