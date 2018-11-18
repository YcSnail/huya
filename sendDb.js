const request = require('request');

class sendDb{

    gift(data){

        // var url="http://hx.yuanxu.top/api/Danmu/addGift";
        var url="http://huya.web/api/danmu/addGift";

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


    danmu(data){

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

    online(data){

        // var url="http://hx.yuanxu.top/api/Online/add";
        var url="http://huya.web/api/Online/add";

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
