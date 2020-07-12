console.log('我是main.js');

getCSS.onclick = ()=>{
    const request = new XMLHttpRequest();
    request.open("GET","public/style.css");
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            const status = request.status;
            if(status>=200 && status <300){
                const style = document.createElement('style');
                style.innerHTML = request.response;
                document.body.appendChild(style);
            }else{
                console.log('加载css失败！！！')
            }
        }
    }
    request.send();
}

getJS.onclick = ()=>{
    const request = new XMLHttpRequest();
    request.open('GET','/js/demo.js');
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            const status = request.status;
            if(status>=200 && status <300){
                const script = document.createElement('script');
                script.innerHTML = request.response;
                document.body.appendChild(script);
            }else{
                console.log('加载javascript失败！！！')
            }
        }
    }
    request.send();
}

getHTML.onclick = ()=>{
    const request = new XMLHttpRequest();
    request.open('GET', '/html/demo.html');
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            const status = request.status;
            if(status >=200 && status <300){
                const html = document.createElement('div');
                html.innerHTML = request.response;
                document.body.appendChild(html);
            }else{
                console.log('下载html失败！！！')
            }
        }
    }
    request.send(); 
}

getXML.onclick = ()=>{
    const request = new XMLHttpRequest();
    request.open('GET', '/demo.xml');
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            const status = request.status;
            if(status>= 200 && status <300){
                const tmp = request.responseXML;
                console.log(tmp.getElementsByTagName('warning')[0].textContent.trim());
            }else{
                console.log('加载xml失败！！！');
            }
        }
    }
    request.send();
}

getJSON.onclick = ()=>{
    const request = new XMLHttpRequest();
    request.open('GET', '/db/page1.json');
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            const {status} = request;
            if(status >=200 && status < 300){
               console.log(request.response);
            }else{
                console.log('加载json数据失败！！！');
            }
        }
    }
    request.send();
}

let i = 1;
getPAGE.onclick = ()=>{
    const request = new XMLHttpRequest();
    request.open('GET', `/db/page${++i}.json`);
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            const {status} = request;
            if(status>=200 && status<300){
                const array = JSON.parse(request.response);
                array.forEach(element => {
                    const li = document.createElement('li');
                    li.innerText = element.id;
                    xxx.appendChild(li);      
                });
            }else{
                console.log('加载json数据失败！！！');
            }
        }
    }
    if(i === 3){
        i = 0;
    }
    request.send();
} 