/**
 * Created by andy on 2017/6/20.
 */

describe("Model", function () {
    var Asset;
    beforeEach(function () {
        console.profile("ModelTest");
        console.time("ModelTest");
        console.log("Model test start...");
        Asset = Model.create();
        Asset.attributes = ["name"];
    });
    afterEach(function () {
        console.profileEnd("ModelTest");
        console.timeEnd("ModelTest");
        console.log("Model test end...");
    });
    it("can create records", function () {
        var asset = Asset.init({name: "andy", id: 1});
        asset.save();
        expect(Asset.find(1).name).toEqual("andy");
    });
    it("can update records", function () {
        var asset = Asset.init({name: "maria", id: 2});
        asset.save();
        expect(Asset.find(2).name).toEqual("maria");
        asset.name = "wem";
        asset.update();
        expect(Asset.find(2).name).toEqual("wem");
    });
    it("can destroy records", function () {
        var asset = Asset.init({name: "dived", id: 3});
        asset.save();
        expect(Asset.find(3).name).toEqual("dived");
        asset.destroy();
        expect(Asset.find(3)).toBeNull();
    });
});