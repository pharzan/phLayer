/**
 * Created by Farzan on 10/24/2015.
 */
var overlayControls = {
        controlsConfig: {
            playUrl: "url('file://C:/wamp/www/phLayer/assets/images/playBtn.png')",
            playDimensions: {h: "100px", w: "100px"},
            pauseUrl: "url('file://C:/wamp/www/mithPlayer/assets/img/pauseBtn.png')",
            pauseDimensions: {h: "25px", w: "25px"}
        },

        view: function (ctrl, parent) {
            return m('.btns', {

                    style:{
                        height:"100%",
                        width:"100%",
                        position:"absolute",
                        top:"0"

                    },
                    onclick: function () {
                        parent.playIt()
                    }
                },
                m("div.playBtn",
                    {
                        width: parent.config.dimensions.w,
                        height: parent.config.dimensions.h,
                        style: {
                            position:"relative",
                            left: "35%",
                            top: "20%",
                            color: "red",
                            height: this.controlsConfig.playDimensions.h,
                            width: this.controlsConfig.playDimensions.w,
                            backgroundImage: this.controlsConfig.playUrl,
                            backgroundRepeat: "no-repeat",
                            display: parent.state.playing ? "none" : "block",
                            backgroundSize: "cover"
                        }
                    }
                )
            )
        }
    };