const request = require('request');

class sendDb{

    //构造函数
    constructor(data) {
        this.send(data);
    }

    send(data){

        // var url="http://hx.yuanxu.top/api/Danmu/add";
        var url="http://huya.web/api/danmu/add";

        request({
            url: url,
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Content-Length':data.length
            },
            form: data,
        }, function(error, response, body) {

            if (!error && response.statusCode == 200) {

                console.log(body) // 请求成功的处理逻辑
            }
        });
    }
}

module.exports = sendDb;
