
const socket = new WebSocket('ws://localhost:5000'); // websocket没有跨域限制
socket.addEventListener('open', function (event) {
    console.log('connect server success');
});

let message = document.getElementById('message'),
      user = document.getElementById('username'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      inputing = document.getElementById('inputing');

btn.addEventListener('click', function(){
    // 发送聊天事件
    let data = JSON.stringify({
        type:"message",
        message: message.value,
        username: user.value
    });
    socket.send(data);
    message.value = "";
});

// 监听服务器推来信息
socket.addEventListener('message', function (event) {
    console.log('from message',event.data)
    let data
    try{
        data = JSON.parse(event.data)
    }catch(e){
        data = event.data
    }
    if( typeof data === 'object' && data.type === 'message' ) {
        inputing.innerHTML = '';
        output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
    } else if( typeof data === 'object' && data.type === 'inputing' ){
        inputing.innerHTML = '<p>' + data.username + ' 正在输入...</p>';
    }
    console.log(data);
});

message.addEventListener('keyup', function(){
    let data = JSON.stringify({
        type:"inputing",
        username: user.value
    });
    // 发送谁正在输入
    socket.send(data);
})

