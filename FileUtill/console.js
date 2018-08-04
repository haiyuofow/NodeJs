/**
 * 
 * 命令行直接输入参数测试
 */

var result = 0;

for (var i = 2; i < process.argv.length; i++) {
    console.log(process.argv[i]);
}