var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static('public'));

app.get('/',function(req,res){
  res.render('screen.html');
});

app.get('/admin',function(req,res){
  io.on('connection',function(socket){
    socket.on('trigger',function(image){
      console.log('event send!');
      io.emit('change',image);
    })
  })
  res.render('admin.html');
})

http.listen(3000,function(){
  console.log('server on!!!!');
})
