/**
 * Created by andy on 2017/6/16.
 */
//事件的发布和订阅模式
var PubSub = {
    subscribe: function (ev, callback) {
        //创建_callbacks对象,除非他已经存在了
        var calls = this._callbacks || (this._callbacks = {});
        //针对给定的事件key创建一个数组,除非这个数组已经存在
        //然后将回调函数追加到这个数组中
        (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);
        return this;
    },
    publish: function () {
        //将arguments对象转换为真正的数组
        var args = Array.prototype.slice.call(arguments, 0);
        //拿出第一个参数,即事件名称
        var ev = args.shift();
        //如果不存在_callbacks对象,则返回
        //或者如果不包含给定事件对应的数组
        var list, calls, i, l;
        if (!(calls = this._callbacks)) return this;
        if (!(list = this._callbacks[ev])) return this;

        //触发回调
        for (i = 0, l = list.length; i < l; i++) {
            list[i].apply(this, args);
        }
        return this;
    }
};

//jQuery版的更简单
(function ($) {
    var o = $({});
    $.subscribe = function () {
        o.bind.apply(o, arguments);
    };
    $.unsubscribe = function () {
        o.unbind.apply(o, arguments);
    };
    $.publish = function () {
        o.trigger.apply(o, arguments);
    };
})(jQuery);


//使用方法
PubSub.subscribe("wem", function (data) {
    console.log('wem...'+data);
});
PubSub.publish('wem',"hello");

$.subscribe("/some/topic", function (event, a, b, c) {
    console.log(event.type, a + b + c);
});

$.publish("/some/topic", ["a", "b", "c"]);
