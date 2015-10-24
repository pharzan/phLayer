/**
 * Created by Farzan on 10/24/2015.
 * http://weslleyaraujo.github.io/javascript/2015/02/11/creating-a-simple-javascript-pub-sub.html
 */
;
(function (root) {
    'use strict';

    function PubSub() {
        this.topics = {};
    }

    PubSub.prototype.subscribe = function (name, fn) {
        this.topics[name] = this.topics[name] || [];
        this.topics[name].push(fn);
    };

    PubSub.prototype.publish = function (name, args) {
        this.topics[name] = this.topics[name] || [];
        this.topics[name].forEach(function (fn) {
            fn.apply(this, args);
        });
    };

    root.PubSub = new PubSub();

}(window));