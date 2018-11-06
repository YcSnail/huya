var mysql = require('mysql');

class db{

    //构造函数
    constructor(data) {
        this.start(data);
    }

    start(data) {

        var connection = mysql.createConnection({
            host:'127.0.0.1',
            user :'root',
            password:'root',
            port : '3306',
            database:'huya'

        });

        var userTable = '`hy_user`';
        var danmuTable = '`hy_danmu`';

        connection.connect();

        // 拼接数组
        var userAddSql_Params = '';
        var sqlValue = ',';

        data.forEach(function (item,index) {

            var userSql = "SELECT `id` from "+userTable+" where username="+"'"+item.username+"'";

            // 判断用户是否存在
            var UserId = connection.query(userSql,false,function (err,result) {

                if (err){
                    console.log('check user ERROR',err.message);
                    return false;
                }

                return result;
            });


            if (UserId == '') {
                // 如果不存在则新增用户
                var nowTime =  parseInt((new Date(a))/1000);
                var inserUser = "INSERT INTO " +danmuTable+" (username, sign , create_time) VALUES ('"+item.username+"','0','"+nowTime+"')";

                UserId = connection.query(inserUser,false,function (err,result) {

                    if (err){
                        console.log('insert user ERROR',err.message);
                        return false;
                    }

                    return result;
                });

            }


        });

        // 查询用户信息
        for (var i=0;i<data.length;i++){

            var userSql = "SELECT `id` from "+userTable+" where username="+"'"+data[i]['username']+"'";

            // 判断用户是否存在
            var userData = connection.query(userSql,false,function (err,result) {

                if (err){
                    console.log('check user ERROR',err.message);
                    return false;
                }

                return result;
            });


            if (userData == '') {
                // 如果不存在则新增用户
                var inserUser = 'INSERT INTO `huya`';

            }

        }



        for (var i=0;i<data.length;i++){

            if (i ==(data.length - 1)){
                sqlValue = '';
            }

            userAddSql_Params += "('"+data[i]['username']+"','"+data[i]['content']+"',"+data[i]['createtime']+")"+sqlValue;
        }

        var userAddSql = 'INSERT INTO `hy_danmu` (`username`,`content`,`createtime`) VALUES '+userAddSql_Params;

        connection.query(userAddSql,false,function (err,result) {

            if (err){
                console.log('INSERT ERROR - ',err.message);
                return;
            }

            console.log('insert ok');
        });

        connection.end();

    }

}
module.exports = db;