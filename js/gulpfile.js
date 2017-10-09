/**
 * Created by 123 on 2017/10/9.
 */
    //数组去重
var gulp = require('gulp');
gulp.task('norepeat',function () {
    var arr = [8,4,9,5,2,1,8,6,5,4,9];
    var newarr = [];
    for(var i = 0; i<arr.length; i++ ){
        if(newarr.indexOf(arr[i]) === -1){
            newarr.push(arr[i]);
        }
    }
    var str = arr.join('');
    var newstr = '';
    for(var i = 0; i<str.length; i++ ){
        if(newstr.indexOf(str[i]) === -1){
            newstr += str[i];
        }
    }
    console.log(newarr);
    console.log(newstr.split(''));
});