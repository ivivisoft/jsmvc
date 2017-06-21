/**
 * Created by andy on 2017/6/18.
 */

// (function ($, exports) {
//     var mod = function (includes) {
//         if (includes) this.include(includes);
//     };
//     mod.fn = mod.prototype;
//     //保证了函数在局部上下文中执行,对于事件回调来说是非常有用的模式
//     mod.fn.proxy = function (func) {
//         return $.proxy(func, this);
//     };
//     mod.fn.load = function (func) {
//         $(this.proxy(func));
//     };
//     //给控制器添加属性,保存类型功能的快捷方式
//     mod.fn.include = function (obj) {
//         $.extend(this, obj);
//     };
//     exports.Controller = mod;
// })(jQuery, window)
//
// // controller使用方式终极版
// var exports = this;
// //DOM加载之后执行
// jQuery(function () {
//     exports.SearchView = Controller.create({
//         //所有事件名称,选择器和回调的映射
//         events: {
//             "submit form": "search"
//         },
//         //选择器到局部变量名的映射
//         elements: {
//             "input[type=search]": "searchInput",
//             "form": "searchForm"
//         },
//         //实例化时调用
//         init: function (element) {
//             this.el = $(element);
//             this.refreshElements();
//             this.delegateEvents();
//         },
//
//         search: function () {
//             console.log("Searching:", this.searchInput.val());
//             return false;
//         },
//         //私有
//         $: function (selector) {
//             //需要一个`el`属性,同时传入选择器
//             return $(selector, this.el);
//         },
//         //根据第一个空格来分割
//         eventSplitter: /^(\w+)\s*(.*)$/,
//
//         delegateEvents: function () {
//             for (var key in this.events) {
//                 var methodName = this.events[key];
//                 var method = this.proxy(this[methodName]);
//                 var match = key.match(this.eventSplitter);
//                 var eventName = match[1], selector = match[2];
//                 if (selector === '') {
//                     this.el.bind(eventName, method);
//                 } else {
//                     this.el.delegate(selector, eventName, method);
//                 }
//             }
//         },
//         //设置本地变量
//         refreshElements: function () {
//             for (var key in this.elements) {
//                 this[this.elements[key]] = this.$(key);
//             }
//         }
//     });
//     new SearchView("#users");
// })

    //使用全局变量作为上下文,而不是window对象
    //用来创建全局对象
var exports = this;
//使用jquery(func)的方式,可以保证dom节点创建完成才执行控制器
(function ($) {
    var mod = {};
    mod.create = function (includes) {
        var result = function () {
            this.init.apply(this, arguments);
        };
        result.fn = result.prototype;
        result.fn.init = function () {

        };
        result.proxy = function (func) {
            return $.proxy(func, this);
        };
        result.fn.proxy = result.proxy;
        result.include = function (ob) {
            $.extend(this.fn, ob);
        };
        result.extend = function (ob) {
            $.extend(this, ob);
        };
        if (includes) {
            result.include(includes);
        }
        return result;
    };
    exports.Controller = mod;
})(jQuery);

