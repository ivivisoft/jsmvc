/**
 * Created by andy on 2017/6/20.
 */

describe("spine test", function () {
    it("spint create a class and create his subclass", function () {
        var User = Spine.Class.create({
            name: "Andy"
        });
        var Friend = User.create();
        expect(Friend.prototype.name).toEqual("Andy");
    });
    it("spint create a class and init his instance", function () {
        var User = Spine.Class.create({
            name: "maria"
        });
        var user = User.init();
        expect(user.name).toEqual("maria");
        user.name = "andy";
        expect(user.name).toEqual("andy");
    });
    it("we give spine's init method some params and she give it to her instance's init method", function () {
        var User = Spine.Class.create({
            init: function (name) {
                this.name = name;
            }
        });
        var user = User.init("somebody");
        expect(user.name).toEqual("somebody");
    });
    it("spine class extend and include(extend method extend the class,and include method extend instance)", function () {
        var User = Spine.Class.create();
        var ORM = {
            extended: function () {
                console.log("ORM extended is invoked!");
            },
            find: function () {

            },
            first: function () {

            }
        };
        User.extend(ORM);
        var Friend = User.create();
        User.include({
            email: "ivivisoft@163.com"
        });
        expect(Friend.init().email).toEqual("ivivisoft@163.com");
    });



});
