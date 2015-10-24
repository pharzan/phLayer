/**
 * Created by Farzan on 10/24/2015.
 */
var QuenLayer = {
    config: [{
        1: {
            question: 'who is this?',
            answers: ['pharzan', 'a big bunny', 'you'],
            correct: [1]

        }
    }],

    view: function (ctrl, parent) {

        var self = this;

        return m('div', 'hello')
    }
};