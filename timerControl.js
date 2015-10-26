/**
 * Created by Farzan on 10/26/2015.
 */
var timerControl = {
    ticker: {minutes: m.prop("00"), seconds: m.prop("00")},

    startTimer: function (duration, parent) {
        var timer = duration, minutes, seconds;
        var self = this;

        var t = setInterval(function () {
            m.startComputation();
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            self.ticker.minutes(minutes);
            self.ticker.seconds(seconds);


            if (--timer < 0) {
                clearInterval(t);
                console.log('finished');
                self.ticker.minutes();
                self.ticker.seconds();
                /*
                 * Do something when the timer has finished
                 */
                parent.playIt()
            }
            m.endComputation()
        }, 1000)


    },

    controller: function () {

    },

    view: function (ctrl, QuenLayer, parent) {

        var self = this;

        return m('div', self.ticker.minutes() + ":" + self.ticker.seconds())
    }
};