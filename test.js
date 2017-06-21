/**
 * Created by andy on 2017/6/15.
 */

var Person = new Class;
Person.extend({
    find: function (id) {
        console.log('find a person and his id is:' + id);
    },
    extended: function (klass) {
        console.log(typeof klass);
    }
});

Person.include({
    init: function () {
        console.log('Person is init...');
    }
});

var person = new Person;
Person.find('1');


var Animal = function () {

};
Animal.id = '123';
Animal.prototype.breath = function () {
    console.log('Animal breath...');
}


var Dog = function () {

};
Dog.prototype = new Animal;
Dog.prototype.wag = function () {
    console.log('dog wag tail');
};
// Dog.prototype.breath = function () {
//     console.log('Dog breath...');
// };
var dog = new Dog;
dog.breath();
dog.wag();


//函数的上下文是在调用的地方决定的,但是如果面向类的话,
//我们一般是要求他的上下文应该是类本身!通过将回调包装
//在匿名函数中的方式,可以保持原始的上下文
var proxy = function (func, thisObject) {
    return (function () {
        func.apply(thisObject, arguments);
    });
};


// var clicky = {
//     wasClicked: function () {
//         console.log('clicked ....');
//     },
//     addListener: function () {
//         var self = this;
//         $('#clicky').click(function () {
//             console.log(this);
//             self.wasClicked();
//         })
//     }
// };
// clicky.addListener();


var Button = new Class;
Button.include({
    init: function (element) {
        this.element = jQuery(element);
        //代理了这个click函数,如果不使用代理,他会基于上下文
        //this.element来调用,从而不错.
        this.element.click(this.proxy(this.click));
    },
    click: function () {
        console.log('A button is clicked...');
    }
});

var button = new Button;
button.init($('#clicky'));

Button.include({
    init: function (element) {
        this.element = jQuery(element);
        //新的浏览器可以使用bind,从而达到使用正确的上下
        // 文的需求,但是老的浏览器不支持,可以手动实现兼
        // 容性,以满足兼容性
        this.element.click(this.click.bind(this));
    },
    click: function () {
        console.log('B button is clicked...');
    }
});

var button = new Button;
button.init($('#clicky'));


//针对bind老的浏览器不支持,手动实现兼
//容性,以满足兼容性
if (!Function.prototype.bind) {
    Function.prototype.bind = function (obj) {
        var slice = [].slice,
            args = slice.call(arguments, 1),
            self = this,
            nop = function () {
            },
            bound = function () {
                return self.apply(this instanceof nop ? this : (obj || {}), args.concat(slice.call(arguments)));
            };
        nop.prototype = self.prototype;
        bound.prototype = new nop();
        return bound;
    };
}

//添加私有函数,利用javascript匿名函数来创建私有作用域,
//这些私有作用域只能内部访问
var Man = function () {

};

(function () {
    //此处的var一定要存在,不然就成了全局变量了!
    var findById = function () {
        console.log('inner function was called!');
    };
    Man.find = function (id) {
        if (typeof id == 'number') {
            return findById();
        }
    }
})();



//如果你需要定义全局变量,在全局作用域定义它或定义为window的属性
(function (exports) {
    var foo = "bar";

    //将变量暴露出去
    exports.foo = foo;
})(window);

console.log(foo);


Man.find(1);



