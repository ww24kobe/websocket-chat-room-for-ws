const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

wss.on('connection', function connection(ws,req) {
  ws.on('message', function(message) {
    console.log('from client:', message);
    let data
    try{
        data = JSON.parse(message)
    }catch(e){
        data = message
    }

    if( typeof data === 'object' && data.type === 'message' ) {
        notify(wss,message)
    }else if(typeof data === 'object' && data.type === 'inputing'){
        broadcast(wss,message,ws)
    }
    
  });
});

// 通知所有人
function notify(wss,data){
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
    });
}

// 通知所有人（排除自己）
function broadcast(wss,data,ws){
    wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
    });
}

console.log('websocket is Running at port 5000...')