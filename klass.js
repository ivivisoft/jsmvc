/**
 * Created by andy on 2017/6/15.
 */

//规范创建类以及类的一些方法
var Class = function Class(parent) {
    var klass = function () {
        this.init.apply(this, arguments);
    };

    //如果有父类改变类的原型
    if (parent) {
        //这个小技巧,避免了在继承类的时候创建实例
        var subclass = function () {
        };
        //暗示了只有实例的属性会被继承,而非类属性.
        //关于javascript怎么查找属性:
        // 她会先找类本身有没有这个属性,再去寻找其原型有么有,
        // 还没有会找原型的原型,最后直到Object.prototype,
        // 还没有的话直接报undefined
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass;
    }


    klass.prototype.init = function () {
        console.log('klass init...')
    };
    //定义prototype的别名
    klass.fn = klass.prototype;
    //定义类的别名
    klass.fn.parent = klass;

    //为了保持类库的作用域,添加代理
    klass.proxy = function (func) {
        var self = this;
        return (function () {
            return func.apply(self,arguments);
        });
    };
    //实例中也添加这个代理
    klass.fn.proxy = klass.proxy;


    //给类添加属性
    klass.extend = function (obj) {
        //是否有回调函数
        var extended = obj.extended;
        for (var i in obj) {
            klass[i] = obj[i];
        }
        if (extended) extended(klass);
    };
    //给实例添加属性
    klass.include = function (obj) {
        //是否有回调函数
        var included = obj.included;
        for (var i in obj) {
            klass.fn[i] = obj[i];
        }
        if (included) included(klass);
    };
    return klass;
};









