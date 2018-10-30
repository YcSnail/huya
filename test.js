const huya_danmu = require('./index');
const roomid = 'xiaozhan';
const client = new huya_danmu(roomid);
const sendDb = require('./sendDb');

client.on('connect', () => {
    console.log(`已连接huya ${roomid}房间弹幕~`)
});

client.on('message', msg => {
    switch (msg.type) {
        case 'chat':
            setData(msg);
            // console.log(`[${msg.from.name}]`+ msg.content);
            break;
        case 'gift':
            // console.log(`[${msg.from.name}]->赠送${msg.count}个${msg.name}`)
            break;
        case 'online':
            // console.log(`[当前人气]:${msg.count}`)
            break
    }
});

client.on('error', e => {
    console.log(e)
});

client.on('close', () => {
    console.log('close')
});
client.start();

// 请求数据库保存

var setDbData = [];

function setData(msg){

    var userName = msg.from.name;
    var content = msg.content;
    var createtime = msg.time;

    // 过滤 代言消息
    // var check = checkMessage(content);
    var check = content;

    if (!check || content == ''){
        return false;
    }

    var tmpObj = {};
    tmpObj.username = userName;
    tmpObj.content = content;
    tmpObj.createtime = parseInt(createtime/1000);
    setDbData.push(tmpObj);

    //
    if (setDbData.length >= 2){
        // 写入到数据库
        var saveData = setDbData;
        setDbData = [];
        console.log('insert');
        new sendDb(saveData);
        return true;
    }
}

/**
 *
 */
function checkMessage(content) {

    // 检查 过滤无用弹幕
    var check =  ['分享了直播间','hahaha','哈哈哈','233','666','牛逼','收','高能预警','前方高能反应','???','...','。。。'];

    for (var i=0;i<check.length;i++){

        var checkValue = check[i];
        var checkHave = content.indexOf(checkValue);
        if (checkHave >=0){
            console.log(content);
            return false;
        }

    }

    return true;
}

