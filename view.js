/**
 * Created by andy on 2017/6/19.
 */

//绑定
var addChange = function (ob) {
    ob.change = function (callback) {
        if (callback) {
            if (!this._change) this._change = [];
            this._change.push(callback);
        } else {
            if (!this._change)return;
            for (var i = 0; i < this._change.length; i++) {
                this._change[i].apply(this);
            }
        }
    }
}


//使用demo
var object = {};
object.name = "Foo";
addChange(object);
object.change(function () {
    console.log("Changed!", this);
    //这里可以添加视图的代码
});
object.change();

object.name = "Bar";
object.change();

