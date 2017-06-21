/**
 * Created by andy on 2017/6/16.
 */

// jQuery.fn.tabs = function (control) {
//     var element = $(this),
//         control = $(control);
//     element.find('li').bind('click', function () {
//         //从列表中添加或删除active类
//         element.find('li').removeClass('active');
//         $(this).addClass('active');
//
//         //给tabContent添加或删除active类
//         var tabName = $(this).attr('data-tab');
//         control.find('>[data-tab]').addClass('unactive');
//         control.find(">[data-tab='" + tabName + "']").removeClass('unactive');
//         control.find(">[data-tab='" + tabName + "']").addClass('active');
//     });
//     //激活第一个选项卡
//     element.find('li:first').addClass('active');
//     control.find('div').addClass('unactive');
//     control.find('div:first').removeClass('unactive');
//     control.find('div:first').addClass('active');
//     //返回this以启用链式调用
//     return this;
// }

jQuery.fn.tabs = function (control) {
    var element = $(this),
        control = $(control);

    element.delegate('li', 'click', function () {
        //遍历选项卡名称
        var tabName = $(this).attr('data-tab');

        //在点击选项卡时触发自定义事件
        element.trigger('change.tabs', tabName);
    });

    //绑定到自定义事件
    element.bind('change.tabs', function (e, tabName) {
        element.find('li').removeClass('active');
        element.find(">[data-tab='" + tabName + "']").addClass('active');
    });
    element.bind('change.tabs', function (e, tabName) {
        control.find('>[data-tab]').addClass('unactive');
        control.find(">[data-tab='" + tabName + "']").removeClass('unactive');
        control.find(">[data-tab='" + tabName + "']").addClass('active');
    });
    //激活第一个选项卡
    var firstName = element.find('li:first').attr('data-tab');
    element.trigger('change.tabs', firstName);
    return this;
}
