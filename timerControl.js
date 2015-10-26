/**
 * Created by Farzan on 10/26/2015.
 */
var timerControl = {
    ticker: {minutes: m.prop("00"), seconds: m.prop("00")},
    timerId:0,
    start: function (duration) {
        var timer = duration, minutes, seconds;
        var self = this;

        var t = setInterval(function () {
            self.timerId=t;
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            self.ticker.minutes(minutes);
            self.ticker.seconds(seconds);


            if (--timer < 0) {
                /*
                 * Do something when the timer has ended
                 * this also triggers timeLimitReached and
                 * my be used to subscribe to a function from
                 * anywhere.
                 */
                clearInterval(t);
                self.ticker.minutes();
                self.ticker.seconds();
                PubSub.publish('timeLimitReached');

            }
            m.redraw()
        }, 1000)


    },

    clear: function () {
      clearInterval(this.timerId)
    },
    controller: function () {

    },

    view: function (ctrl, QuenLayer, parent) {

        var self = this;

        return m('div', self.ticker.minutes() + ":" + self.ticker.seconds())
    }
};