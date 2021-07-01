# websocket-chat-room-for-ws

## 介绍
基于原生的[websocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)和[ws](https://www.npmjs.com/package/ws)库搭建的简易聊天室
- client: 客户端。
- server: 服务端。

## 启动
进入server目录，执行以下命令，启动服务端
```
node server.js
```
进入client目录，执行以下命令，启动客户端,托管静态资源

```
hs ./
```



>  注意：没有hs命令可以全局安装 [http-server](https://www.npmjs.com/package/http-server)