const huya_danmu = require('./index');
const roomid = 'longdd';
// kaerlol
// longdd
// lafeng

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

            // 判断价格
            if (msg.price >=88){
                setGift(msg);
            }
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
var setDbGift = [];

function setGift(msg){

    var userName = msg.from.name;
    var user_id = msg.from.rid;
    var giftName = msg.name;
    var count = msg.count;
    var price = msg.price;
    var createtime = msg.time;
    var id = msg.id;


    var tmpObj = {};
    tmpObj.id = id;
    tmpObj.username = userName;
    tmpObj.user_id = user_id;
    tmpObj.giftName = giftName;
    tmpObj.count = count;
    tmpObj.price = price;
    tmpObj.createtime = parseInt(createtime/1000);
    setDbGift.push(tmpObj);

    //
    if (setDbGift.length >= 1){
        // 写入到数据库
        var saveData = {'gift':setDbGift};
        console.log('insert gift');
        var DB = new sendDb();
        DB.gift(saveData);
        setDbGift = [];
        return true;
    }
}

var setDbData = [];

function setData(msg){

    var userName = msg.from.name;
    var content = msg.content;
    var createtime = msg.time;
    var yy_id = msg.from.yy_id;
    var user_id = msg.from.rid;

    // 过滤 代言消息
    var check = checkMessage(content);

    if (!check){
        return false;
    }

    var tmpObj = {};
    tmpObj.username = userName;
    tmpObj.yy_id = yy_id;
    tmpObj.user_id = user_id;
    tmpObj.content = content;
    tmpObj.createtime = parseInt(createtime/1000);
    setDbData.push(tmpObj);

    //
    if (setDbData.length >= 10){
        // 写入到数据库
        var saveData = {'danmu':setDbData};
        console.log('insert danmu');
        var DB = new sendDb();
        DB.danmu(saveData);

        setDbData = [];
        return true;
    }
}

/**
 * 过滤无用弹幕
 */
function checkMessage(content) {

    // 长度过短的弹幕
    if (content.length <=3){
        return false;
    }

    // 检查 过滤无用弹幕
    var check =  ['激动的心','颤抖的手','分享了直播间','hahaha','哈哈哈','2333','6666','牛逼','收','高能预警',
        '前方高能反应','????','....','。。。。','支付宝','QQ','qq','？？？？','3333','¿¿¿¿','/{'];

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
