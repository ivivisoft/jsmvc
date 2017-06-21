/**
 * Created by andy on 2017/6/16.
 */

//Object.create()只有一个参数即对象原型,他返回一个新对象,这个新对象的原型
//就是传入的参数,没有这个函数的可以写以下的兼容,相当于扩展o对象.
// if (typeof Object.create !== "function") {
//     Object.create = function (o) {
//         function F() {
//         };
//         F.prototype = o;
//         return new F();
//     }
// }

//Model对象用于创建新对象和模型
var Model = {
    inherited: function () {

    },
    created: function () {

    },
    prototype: {
        init: function (data) {
            if (!data) return;
            for (var i in this.parent.attributes) {
                var attr = this.parent.attributes[i];
                this[attr] = data[attr];
            }
            this.id = data.id;
        }
    },
    create: function () {
        //即继承原型链由继承类属性
        var object = Object.create(this);
        object.parent = this;
        object.prototype = object.fn = Object.create(this.prototype);
        object.created();
        this.inherited(object);
        return object;
    },
    init: function () {
        var instance = Object.create(this.prototype);
        instance.parent = this;
        instance.init.apply(instance, arguments);
        return instance;
    },
    extend: function (o) {
        var extended = o.extended;
        jQuery.extend(this, o);
        if (extended) extended(this);
    },
    include: function (o) {
        var included = o.included;
        jQuery.extend(this.prototype, o);
        if (included) included(this);
    }
};


// 持久化记录
//用来保存资源对象
Model.extend({
    created: function () {
        this.records = {};
        //定义哪些字段需要序列化保存起来
        this.attributes = [];
    }
});

Model.records = {};
Model.include({
    newRecord: true,
    create: function () {
        if (!this.id) {
            this.id = Math.guid()
        }
        this.newRecord = false;
        this.parent.records[this.id] = this;
    },
    destroy: function () {
        delete this.parent.records[this.id];
    },
    update: function () {
        this.parent.records[this.id] = this;
    },
    save: function () {
        this.newRecord ? this.create() : this.update();
    },
    //实现查询结果复制
    dup: function () {
        var result = {};
        for (var i in this.parent.attributes) {
            var attr = this.parent.attributes[i];
            result[attr] = this[attr];
        }
        //jQuery.extend(true, {}, this);
        return result;
    },
    //提取需要序列化的相应属性
    attributes: function () {
        var result = {};
        for (var i in this.parent.attributes) {
            var attr = this.parent.attributes[i];
            result[attr] = this[attr];
        }
        result.id = this.id;
        return result;
    },
    //覆盖JSON.stringify()方法
    toJSON: function () {
        return (this.attributes());
    },
    //将新记录提交给服务器
    createRemote: function (url, callback) {
        jQuery.post(url, this.attributes(), callback);
    },
    //更新服务器记录
    updateRemote: function (url, callback) {
        jQuery.ajax({
            url: url,
            data: this.attributes(),
            success: callback,
            type: 'PUT'
        });
    }
});
Model.extend({
    //通过ID查找,找不到则抛异常
    find: function (id) {
        var record = this.records[id];
        if (!record) {
            return null;
        }
        return record.dup();
    },
    findAll: function () {
        return this.records;
    },
    //解析后台数据使用实例来填充records(向ORM中填充数据)
    populate: function (values) {
        //重置model和records
        this.records = {};
        for (var i = 0, il = values.length; i < il; i++) {
            var record = this.init(values[i]);
            record.newRecord = false;
            this.records[record.id] = record;
        }
    },
    saveLocal: function (name) {
        //将记录转换为数组
        var result = [];
        for (var i in this.records) {
            result.push(this.records[i]);
        }
        localStorage[name] = JSON.stringify(result);
    },
    loadLocal: function (name) {
        var result = JSON.parse(localStorage[name]);
        this.populate(result);
    }

});


Math.guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
};
