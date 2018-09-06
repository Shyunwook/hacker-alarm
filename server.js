var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static('public'));

app.get('/vertical',function(req,res){
  res.render('vertical.html');
});

app.get('/vertical2',function(req,res){
  res.render('vertical2.html');
});

app.get('/vertical3',function(req,res){
  res.render('vertical3.html');
});


app.get('/beam',function(req,res){
  res.render('beam.html');
});

app.get('/admin',function(req,res){
  io.on('connection',function(socket){
    socket.on('trigger',function(option,msg){
      console.log('event send!');
      io.emit('change',option,msg);
    })
  })
  res.render('admin.html');
})

http.listen(3000,function(){
  console.log('server on!!!!');
})
