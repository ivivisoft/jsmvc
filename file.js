/**
 * Created by andy on 2017/6/19.
 */

//验证浏览器是否支持file api
if(window.File && window.FileReader && window.FileList){
    console.log('The brower support the file api...');
}