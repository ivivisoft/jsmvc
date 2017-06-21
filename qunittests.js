/**
 * Created by andy on 2017/6/20.
 */
QUnit.module("model test", {
    before: function () {
        // prepare something once for all tests
        console.log("model test start...")
        this.Asset = Model.create();
    },
    after: function () {
        // clean up once after all tests are done
        console.log("model test end...")
    }
});
QUnit.test("init()", function (assert) {
    this.Asset.attributes = ["name"];
    var a = this.Asset.init({name: "test1.pdf"});
    assert.equal(a.name, "test1.pdf", "Calls init on instance");
});
QUnit.test("attributes()", function (assert) {
    this.Asset.attributes = ["name", "age"];
    var obj = {id: 1, name: "andy", age: 15};
    var b = this.Asset.init(obj);
    assert.ok(b.attributes(),"attributes method invoked success");
    assert.propEqual(b.attributes(), obj, "Calls attributes on instance");
});
