var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/html/index.html'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    let str = fs.readFileSync('public/html/index.html').toString();
    const arrstr = JSON.parse(fs.readFileSync('db/page1.json')).map(item=>`<li>${item.id}</li>`).join('');
    str = str.replace('{{page}}', `<ul>${arrstr}</ul>`);
    response.write(str);
    response.end();
  }else if(path === '/public/js/main.js'){
    response.statusCode = 200;
    response.setHeader('Content-Type','text/javascript;charset=utf-8');
    response.write(fs.readFileSync('public/js/main.js'));
    response.end();
  }else if(path === '/style.css'){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/css;charset=utf-8');
    response.write(fs.readFileSync('public/style.css'));
    response.end();
  }else if(path === '/js/demo.js'){
    response.statusCode = 200;
    response.setHeader('Content-Type','text/javascript;charset=utf-8');
    response.write(fs.readFileSync('public/js/demo.js'));
    response.end();
  }else if(path === '/html/demo.html'){
    response.statusCode = 200;
    response.setHeader('Content-Type','text/html;charset=utf-8');
    response.write(fs.readFileSync('public/html/demo.html'));
    response.end();
  }else if(path === '/demo.xml'){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/xml;charset=utf-8');
    response.write(fs.readFileSync('public/demo.xml'));
    response.end();
  }else if(path === '/db/page1.json'){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json;charset=utf-8');
    response.write(fs.readFileSync('db/page1.json'));
    response.end();
  }else if(path === '/db/page2.json'){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json;charset=utf-8');
    response.write(fs.readFileSync('db/page2.json'));
    response.end();
  }else if(path === '/db/page3.json'){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json;charset=utf-8');
    response.write(fs.readFileSync('db/page3.json'));
    response.end();
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)