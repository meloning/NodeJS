// 모듈 import 및 객체화
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

// 웹 서버를 만듭니다.
var server = http.createServer(function(request,response){
    //ClientHTML.html 파일 읽기
    fs.readFile('clientViewHTML.html',function(error,data){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.end(data);
    });
}).listen(52273,function(){
    console.log('Server Running at http://127.0.0.1:52273');
});

//소켓 서버 생성
var io = socketio.listen(server);
io.sockets.on('connection',function(socket){
    //message 이벤트
    socket.on('message',function(data){
        //클라이언트의 message 이벤트 발생
        io.sockets.emit('message',data);
    });
});