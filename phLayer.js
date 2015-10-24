/**
 * Created by Farzan on 10/23/2015.
 */
var phLayer=function(){
    //variable to store the player object
    this.playerObj = m.prop();

    // intial configurations
    this.config = {
        dimensions: {w: "400px", h: "225px"},
        autoPlay: false,
        playList: [
            'file://C:/wamp/www/phLayer/assets/videos/trailer.mp4',
            'file://C:/wamp/www/phLayer/assets/videos/01.mp4'
        ],
        loop: true
    };


    // states returned by the player
    this.state = {
        playing: false,
        finished: false,
        fileIdx: 0,
        time: 0,
        duration: 0,
        speed: 0,
        vol: 1
    };

    //function to play the file
    this.playIt = function () {

        var self = this.playerObj();

        if (self.paused) {
            this.state.playing = true;
            self.play();
        } else {
            this.state.playing = false;
            self.pause();
        }
    };

    //function to seek in the file by setting the current time to
    //a time value passed to the function
    this.seek = function (time) {
        var self = this;
        self.playerObj().currentTime = time;
        self.playIt()
    };

    //playback speed control function
    // 0.5 half the normal speed
    // 2.0 twice the normal speed
    // 1.0 normal speed
    this.speed = function (speed) {
        var self = this;
        self.playerObj().playbackRate = speed
    };

    // volume control
    this.volume = function (v) {
        var self = this;
        if (v == 1 && self.state.vol < 1) {
            self.state.vol = self.state.vol + 0.1;
            self.playerObj().volume = self.state.vol
        }
        if (v == -1 && self.state.vol > 0.1) {
            self.state.vol = self.state.vol - 0.1;
            self.playerObj().volume = self.state.vol
        }
    };

    this.loadFromPlayList = function () {

        var playerObj = this.playerObj();
        var config = this.config;
        var fileIdx = this.state.fileIdx;
        this.state.fileIdx++;

        if (config.playList[fileIdx]) {
            playerObj.src = config.playList[fileIdx];
            playerObj.load();

        }
        else if (config.loop && fileIdx == config.playList.length) {
            this.state.fileIdx = 0;
            this.loadFromPlayList()
        }

    }.bind(this);

    this.view = function () {
        var self = this;
        var videoView = [
            m("video",
                {

                    height: self.config.dimensions.h,
                    width: self.config.dimensions.w,
                    oncanplay: function () {
                        if (self.config.autoPlay) {
                            self.state.duration = self.playerObj().duration;
                            self.playIt()
                        }
                    },
                    config: function (element, isinit) {
                        if (isinit) {
                            return
                        }
                        self.playerObj(element);

                        self.loadFromPlayList()

                    },
                    onended: self.loadFromPlayList,
                    ontimeupdate: function () {
                        self.state.time = self.playerObj().currentTime;
                        PubSub.publish('timeChange',[self.state.time]);
                    }

                },
                m("source",
                    {
                        src: '',
                        type: "video/mp4"
                    }
                )
            )
        ];

        videoView.push(m.component(overlayControls, self),m.component(QuenLayer, self));

        return [m('.videoContainer', {

            height: self.config.dimensions.h,
            width: self.config.dimensions.w,
            style: {
                position: "relative",
                width: self.config.dimensions.w,
                height: self.config.dimensions.h
            }
        }, videoView)]
    }
};

myPlayer = new phLayer();
m.mount(document.body, myPlayer);