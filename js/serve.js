(function(owner) {
	owner.getURL = function(url, data) {
		var data =data||""
		var http = localStorage.getItem('http')
		var path = http + '/Rest/TSvrMethods/' + url + data
		return path
	}
	//get 
	owner.get = function(url, data, call, fail) {
		var fail = fail ? fail : function() {}
		var path = owner.getURL(url, data)
		console.log(path)
		owner.ajax({
			url: path,
			data: {},
			success: function(data) { //返回接受信息
				plus.nativeUI.closeWaiting()

				return call(data)
			},
			fail: function(data) {
				plus.nativeUI.closeWaiting()
				mui('#refreshContainer').pullRefresh() && mui('#refreshContainer').pullRefresh().endPulldown();
				return fail(data)
			}
		})
		
	}
	owner.post = function(obj, call, fail) {
		var path = owner.getURL(obj.url)
		console.log(path)
		mui.ajax(path,{
			data:obj.data,
			dataType:'text',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			headers:{'Content-Type': 'application/json'},	              
			success:function(data){
				var d = JSON.parse(data).result[0]
				var res = JSON.parse(d)
				if(res.code=='1'){
					call&&call(res)
				}else{
					// mui.toast(res.msg)
					fail&&fail(res.ms)
				}
			},
			error:function(xhr,type,errorThrown){
				console.log(type);
				fail&&fail()
			}
		});
	}
	owner.udate = function() {
		var bb;
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			bb = inf.version;
			// http://47.112.137.218:9986/Rest/TSvrMethods/GetLastVersionInfo/{}
			var obj = {
				"accountname":"hc"
			}
			owner.get("GetLastVersionInfo/",JSON.stringify(obj),function(data) {
				var banben = data.Version_Number;
				var a = '发现新版本';

				if(mui.os.ios) {
					return;
				}
				if(bb.toString() != banben) {
					mui.confirm(a, "更新提示", ['确认', '取消'], function(e) {
						if(e.index == 0) {
							// plus.runtime.openURL('http://47.112.137.218:8088//HCPMIS.apk');
							//var url ="http://47.112.137.218:8088/HCFile/update/HCPMIS.wgt"
							 var url =localStorage.getItem('failPath')+'/HCFile/update/HCPMIS.wgt'
							 var options = {method:"GET"};
							 var  dtask = plus.downloader.createDownload( url, options );
							 dtask.addEventListener( "statechanged", function(task,status){             
							    switch(task.state) {
							            case 1: // 开始
							                console.log( "开始下载..." );
							            break;
							            case 2: // 已连接到服务器
							                console.log( "链接到服务器..." );
							            break;
							            case 3: // 已接收到数据                                
							                // var a= Math.floor(task.downloadedSize/task.totalSize*100)+'%';
							                // document.getElementById('two').style.width=a
							                
							            break; 
							            case 4: // 下载完成
							                console.log( "下载完成！" );                                                                     
							                // install (task)
											 plus.runtime.install(task.filename, {force:true}, function() {
											        //完成更新向服务器进行通知
											        mui.toast("更新完毕，将重启应用！");
											        plus.runtime.restart();
											     },function(err){
											        // alert(JSON.stringify(err));
											        mui.toast("安装升级失败");
											   });
							            break;
							        }
							 } );
							dtask.start();
						} else {}
					})
				} else {
					mui.toast('已是最新版本')
				}
			})
		});

	}
	//去左右空格
	owner.trim = function(str) {
		//		return (str||"").replace(/(^\s*)|(\s*$)/g, "");
		return str
	}
	//返回键处理
	owner.back = function() {
		var backButtonPress = 0;
		mui.back = function(event) {
			backButtonPress++;
			if(backButtonPress > 1) {
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
	owner.open = function(url1, ids, obj, type) {
		mui.openWindow({
			url: url1,
			id: ids,
			show: {
				aniShow: type||'slide-in-right',
			},
			waiting: {
				autoShow: false, 					    
			},
			extras: obj||{}
		})
	}
	//关闭右滑
	owner.closeRight = function() {
		var wv = plus.webview.currentWebview();
		wv.setStyle({
			'popGesture': 'none'
		});
	}
	owner.alert = function(url, cellback) {
		mui.prompt('<img src=' + url + ' alt="" style="width: 130px;height: 80px;"/>', '请输入签章密码', '签章密码', ['取消', '确认'], function(e) {
			cellback(e)
		}, 'div')
		document.querySelector('.mui-popup-input input').type = 'password';

	}
	owner.ajax = function(options) {
		options.type = options.type || "GET"
		var xhr = null;
		var params = formsParams(options.data);
		//创建对象
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest()
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		// 连接
		if(options.type == "GET") {
			xhr.open(options.type, options.url + "?" + params, true);
			xhr.send(null)
		} else if(options.type == "POST") {
			xhr.open(options.type, options.url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(JSON.stringify(options.data));
		}
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(JSON.parse(xhr.responseText).result[0])
				data.base = JSON.parse(xhr.responseText).result[1]
				if(data.code == 1) {

					options.success(data);
				} else {
					console.log(JSON.stringify(data))

					if(data.code != 4) {
						mui.toast(data.msg, {
							duration: 'long'
						})
					}
					options.fail(data)

				}
			} else if(xhr.readyState == 4 && xhr.status != 200) {
				mui.alert("请检查网络")
				options.fail()
			}
		}

		function formsParams(data) {
			var arr = [];
			for(var prop in data) {
				arr.push(prop + "=" + data[prop]);
			}
			return arr.join("&");
		}
	}

}(window.TB = {}));