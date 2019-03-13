const http=require('http');
const fs=require('fs');
const querystring=require('querystring');
const urlLib=require('url');


var server=http.createServer(function(req,res){
	
	
	
	
	var str='';
	console.log(req.url);
	var urlObj=urlLib.parse(req.url,true);
	var url=urlObj.pathname;
	var GET=urlObj.query;
	
	var POST={};
	
	req.on('data',function(data){
		str+=data;
	});
	req.on('end',function(){
		 POST=querystring.parse(str);
		 var fileName='./www'+url;
		switch (url){
			case '/file/goosList.json':
		 fs.readFile(fileName,function(err,data){
		 if(err){
		 	res.write('404');
		 }else{
		 	
		 	res.write(data);
		 	
		 }
		 res.end();
	});
			
		break;
				
			
			
		case '/add':
		 fs.readFile("./www/file/goosList.json",function(err,data){
		 if(err){
		 	res.write('404');
		 }else{
		 	function strToJson(str){
		 		var json=eval( '('+str+')' );
		 		return json
		 	}
		 	var goods=strToJson(data.toString());
		 	
		 	var params= {"id":5, "name": POST.name, "time": "2019-03-08T12:54:39.449Z" };
		 	//console.log(typeof(result));
		 	//res.write(data);
		 	goods.data.push(params);
		 	var str=JSON.stringify(goods);
		 	fs.writeFile("./www/file/goosList.json",str,function(err){
		 		if(err){
		 			console.log("写入文件失败");
		 		}else{
		 			console.log("goosList.json文件更新啦");
		 		}
		 	});
		 	res.end();
		 }
		 
	});
			
		break;	
			
			
			
			
				
			default:
			fs.readFile(fileName,function(err,data){
		 if(err){
		 	res.write('404');
		 }else{
		 	res.write(data);
		 	
		 }
		 res.end();
	});
				break;
		}
	
	});
	
	
	
	
	
}).listen(8081);




 
