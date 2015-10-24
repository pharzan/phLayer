/**
 * Created by Farzan on 10/24/2015.
 */
var QuenLayer = {
    config: [{
        1: {
            question: 'who is this?',
            answers: [{
                1: 'pharzan',
                2: 'you',
                3: 'Big Bunny'
            }],
            correct: 1
        }
    }],

    view: function (ctrl, parent) {

        var self = this;

        return m('div', 'hello')
    }
};