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
		
		 if(url=='/user'){
	 	
	 	  
	 }else{
	 	 var fileName='./www'+url;
	     fs.readFile(fileName,function(err,data){
		 if(err){
		 	res.write('404');
		 }else{
		 	res.write(data);
		 	
		 }
		 res.end();
	});
	 }
	
	});
	
	
	
	
	
}).listen(8081);




 
