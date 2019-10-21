(function(mui, owner) {
	/**
	 * 双击退出
	 * */	
     owner.back = function(){
     	// 退出的逻辑 
		var backButtonPress = 0; 
		mui.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};     
    }	
    /**
	 * 打开新页面
	 * */
    owner.open=function(url,id,obj,type){
		if(type==undefined){		
			type='pop-in'
		}
		if(obj==undefined){
			obj={}  //页面传送的数据
		}		
			mui.openWindow({
			url:url,   //页面路径
			id:id,    //页面ID
			show: {
					aniShow: type, //打开页面动画									
				},		    					
			waiting:{
		      autoShow:false,//自动显示等待框，默认为true						    
		          },
		    extras:obj
		})	
	}
      /*
                调用其他页面的方法
       * */
      owner.evalJS=function(id,method){
      
      	 var i = plus.webview.getWebviewById(id)
      	 console.log(i)
		     i.evalJS(method)
      }
      /*
          get请求
       * */
      owner.gets=function(url,callback,time){      	 
      		 xhr = new plus.net.XMLHttpRequest();
	      	 xhr.ontimeout=function(e){
	      	 	mui.toast('请求超时，请检查您的网络！') 	      	 	
	      	 }
	      	 xhr.onreadystatechange=function(){
	      	 	switch ( xhr.readyState ) {								
						case 4:
							if ( xhr.status == 200 ) {
							    return callback(xhr.responseText)
							} else {
								mui.toast('请求失败，请稍后再试！') 
								console.log(xhr.readyState )
							}
							break;
						default :
							break;
					} 
	      	 }
	      	 xhr.timeout=time||5000;
	      	 console.log(xhr.timeout)
	      	 xhr.open('GET',url);
	      	 xhr.setRequestHeader('Content-Type','application/json');
	      	 xhr.send()
      }
      /*
         //mui.get请求
      */
      owner.GET=function(url,callback,time){
      	mui.ajax(url,{
				dataType:'json',//服务器返回json格式数据
				type:'get',//HTTP请求类型
			    timeout:time||10000,//超时时间设置为10秒；				
				success:function(data){
					return callback(data)
				},
				error:function(xhr,type,errorThrown){
				mui.toast('请求失败，请稍后再试！');				
				//异常处理；
				console.log(type);
			}
			});
      }
      /*
              //mui.post请求
       */
      owner.POST=function(url,dataObj,callback,time){
      	 mui.ajax(url,{
			data:dataObj,
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:time||10000,//超时时间设置为10秒；
			headers:{'Content-Type':'application/json'},	              
			success:function(data){
				return callback(data);
			},
			error:function(xhr,type,errorThrown){
				mui.toast('请求失败，请稍后再试！');				
				//异常处理；
				console.log(type);
			}
		})
      }
      /*
                      扫一扫图片
       * */
	  var scan=null
      
      owner.sao=function(callback){
         scan = new plus.barcode.Barcode('bcid'); 
    	 scan.onmarked=onmarked1;
    	 
    	 scan.start()  
    	  function onmarked1(type,result){
			var text = '未知: ';
			switch(type){
				case plus.barcode.QR:
				text = 'QR: ';
				break;
				case plus.barcode.EAN13:
				text = 'EAN13: ';
				break;
				case plus.barcode.EAN8:
				text = 'EAN8: ';
				break;
			}							
			return callback(result,scan)							
		}
      }   
      /*
       * 从图片选二维码
       * */     
     owner.getIMG=function(callback){
		this.oneIMG(function(path){
		    plus.barcode.scan(path,onmarked)			
		})		 
    	  function onmarked(type,result){
			var text = '未知: ';
			switch(type){
				case plus.barcode.QR:
				text = 'QR: ';
				break;
				case plus.barcode.EAN13:
				text = 'EAN13: ';
				break;
				case plus.barcode.EAN8:
				text = 'EAN8: ';
				break;
			}							
			return callback(result,scan)							
		}
		
	}
    /*  
     *   从相册选取单张图片
     * */
    owner.oneIMG=function(callback){
    	plus.gallery.pick(function(path){
		
		 return  callback(path);
		},function(e){
			console.log(e)
		},{filter:'image'}) 
    }
    /*  
     * 从相册选取多张图片
     * 
     * */
      var lfs=null   
      owner.moreIMG=function(callback,n){
      	var imgArr=[];
    		plus.gallery.pick( function(e){
		    for(var i in e.files){
					lfs=e.files;
			    	
					imgArr.push(e.files[i]);			    	
		    	
		    	}
		    return callback(imgArr)
		    }, function ( e ) {
		    	console.log( "取消选择图片" );
		    },{filter:"image",multiple:true,selected:lfs,maximum:n||3,system:false});
    }
      /*      
       *  保存图片
       * 
       * */
      owner.savaIMG=function(imgurl){
      	 plus.gallery.save(imgurl,function(){
			   	  mui.toast('图片保存成功')
			   },function(){
			   	  mui.toast('图片保存失败，请稍后再试')
			   })
      }
      /**
       * 监听网络变化
       * */
     owner.netchange=function(callback){
     	     onNetChange()
        	document.addEventListener('netchange',onNetChange,false)
        	function onNetChange(){
        		var nt = plus.networkinfo.getCurrentType();
        		switch(nt){
        			case plus.networkinfo.CONNECTION_ETHERNET:
					case plus.networkinfo.CONNECTION_WIFI:					    
					    return callback('Wifi')
					break; 
					case plus.networkinfo.CONNECTION_CELL2G:
					case plus.networkinfo.CONNECTION_CELL3G:
					case plus.networkinfo.CONNECTION_CELL4G:					
					    return callback('2/3/4G')
					     
					break; 
					default:
					 return callback('no')
					 mui.toast('请检查您的网络设置')
					break;
        			
        		}
        	}
     }
     /*
      *     发短信
     * */
     owner.sendSMS=function(phone,content){
     	var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
		msg.to = [phone];
		if(content==undefined){ 
			content='';
			console.log(content)
		}
		msg.body = content;
		plus.messaging.sendMessage( msg );
     }
     /*
      *     发邮件
     * */
     owner.sendEMAIL=function(title,to,content,cc,bcc){
     	var msg = plus.messaging.createMessage(plus.messaging.TYPE_EMAIL);
		msg.to = to; //数组
		msg.cc = cc; //数组
		msg.bcc = bcc; //数组
		msg.subject = title; 
		msg.body = content;
		plus.messaging.sendMessage( msg, function () {
			console.log('success')
		}, function () {
			mui.toast( "Send failed!" );
		} );
     }
     /*
      *  从底部动画弹出系统样式选择按钮框  原生actionSheet
      * */
    owner.actionSheet=function(title,btn,callback){
    	plus.nativeUI.actionSheet({
					title:title,
					cancel:'取消',
					buttons:btn,	 //[{title:"不同意",style:"destructive"}]	 destructive:红色，默认黑色			
				},function(e){
				  return callback(e.index);				
				})   	   	
    }
    /**
     *     原生Alert
     * */
    owner.alert=function(content,title){
    	var titles = title||'温馨提示';
    	plus.nativeUI.alert(content,function(){
			console.log(content)
		},titles,'确认')
    	
    }
    /**
     * 原生confirm
     * */
    owner.confirm=function(content,callback){ 
    	plus.nativeUI.confirm( content, function(e){
			if(e.index==0){
			return	callback('确认');
			}
		});   	
    } 
    /**
     * 原生状态栏背景和字体颜色
     * */
    owner.setStatusBar=function(color,textc){
    	
    	plus.navigator.setStatusBarBackground('red');//背景颜色 ，颜色码
    	if(textc!=undefined){
	         plus.navigator.setStatusBarStyle('light');  // "dark"：文字为黑色 "light"：文字为白色 	  		
    	}

    }
    /**
     * 下载文件
     * */
    owner.Download=function(urls,callback){
    	 var dtask = plus.downloader.createDownload( urls, {}, function ( d, status ) {
					// 下载完成					
					if ( status == 200 ) { 
						console.log( d.filename);						
						 plus.io.resolveLocalFileSystemURL(d.filename, function(entry) { 
		                    return callback(entry.toLocalURL()) 	//绝对地址	                    
		               }); 						
					} else {
						 alert( "Download failed: " + status ); 
					}  
				});
				dtask.start();
    }

}(mui, window.server = {}));