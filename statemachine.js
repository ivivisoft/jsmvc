/**
 * Created by andy on 2017/6/19.
 */
//利用状态机,管理controller切换
var Events = {
    bind: function () {
        if (!this.o) this.o = $({});
        this.o.bind.apply(this.o, arguments);
    },
    trigger: function () {
        if (!this.o) this.o = $({});
        this.o.trigger.apply(this.o, arguments);
    }
};


var StateMachine = function () {}
StateMachine.fn = StateMachine.prototype;
//添加事件绑定或触发行为
$.extend(StateMachine.fn, Events);

StateMachine.fn.add = function (controller) {
    this.bind("change", function (e, current) {
        if (controller == current) {
            controller.activate();
        } else {
            controller.deactivate();
        }
    });
    controller.active = $.proxy(function () {
        this.trigger("change", controller);
    }, this);
};

//demo
//一般我们在控制器的activate函数的内部,创建显示的视图,添加显示元素等,
//在deactivate中做相反的操作
//.active{
//#con1,#con2{display:none}
//#con1.active,#con2.active{display:block}
//}
var con1 = {
    activate: function () {
        $("#con1").addClass("active");
        console.log('con1 active...');
    },
    deactivate: function () {
        $("#con1").removeClass("active");
        console.log('con1 deactive...');
    }
};

var con2 = {
    activate: function () {
        $("#con2").addClass("active");
        console.log('con2 active...');
    },
    deactivate: function () {
        $("#con2").removeClass("active");
        console.log('con2 deactive...');
    }
};

//创建一个新的状态机,并添加状态
var sm = new StateMachine;
sm.add(con1);
sm.add(con2);


//激活第一个con
con1.active();

//我们也可以手动触发con
sm.trigger("change",con2);




