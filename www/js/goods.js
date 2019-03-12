




Vue.directive('focus',{
	bind:function(el){ //每当指令绑定到元素上的时候，会立即执行这个函数,此时还没有插入到DOM中
		
	},
	
	inserted:function(el){//元素插入到DOM的时候，会执行此函数
		el.focus();//和js相关的操作，最好在inserted中去执行，防止js不生效
		//样式，只要指令绑定给了元素，不管这个元素有没有插入到页面中去，这个元素肯定有了一个内联样式
	},
	updated:function(el){//每当VNode更新的时候，会执行此函数
		
	},
	
	
});



var app=new Vue({
	el:"#app",
	data:{
		list:[
		
		
		],
		id:'',
		name:'',
		keywords:'',
	},
	//定义私有过滤器
	//padStart(2,'0') 用于在字符串前面进行的填充,填充成2位,用0这个字符串填充
	filters:{
		timeFilter(date,pattern=""){
			var time =new Date(date);
			var y=time.getFullYear();
			var m=(time.getMonth()+1).toString().padStart(2,'0');
			var d=time.getDate().toString().padStart(2,'0');
			var h=time.getHours().toString().padStart(2,'0');
			var mm=time.getMinutes().toString().padStart(2,'0');
			var s=time.getSeconds().toString().padStart(2,'0');
			
			if(pattern.toLowerCase()==="yyyy-mm-dd")
				return `${y}-${m}-${d}`;
			else
			     return `${y}-${m}-${d} ${h}:${mm}:${s}`;
			
		}
	},
	created:function(){
		this.$http.get('http://localhost:8081/goosList.json').then(function(result){
				this.list=result.body.data;
			});
	},
	methods:{
		add(){
			if(this.id!=''&&this.name!=''){
				var flower={id:this.id,name:this.name,time:new Date(),};
			    this.list.push(flower);
			    this.id='';
			    this.name='';
			}else{
				alert("请您填写完整的数据哟~");
			}
			
		},
		
		del(id){
			this.list.some((item,index)=>{
				if(item.id==id)
				   this.list.splice(index,1);
			});
		},
		
		search(keywords){
			var newList=[];
			this.list.forEach(function(item){
				if(item.name.indexOf(keywords)!=-1){
					newList.push(item);
				}
			});
			return newList;
		},
	},
	
	
	
});







