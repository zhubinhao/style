(function(owner) {

	//	owner.url = 'http://150.109.105.140:9085/Rest/TSvrMethods/';
	//	owner.url = 'http://113.72.123.243:9090/Rest/TSvrMethods/'; 

	owner.getURL = function(url, data) {
		var port = plus.storage.getItem('port1') || "9986"
		var http = plus.storage.getItem('http1') || "http://47.112.137.218"
		var path = http + ":" + port + '/Rest/TSvrMethods/' + url + data
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
			fail: function() {
				plus.nativeUI.closeWaiting()
				return fail()
			}
		})
	}
	owner.post = function(obj, call, fail) {
		var fail = fail ? fail : function() {}
		var port = plus.storage.getItem('port') || "9090"
		var http = plus.storage.getItem('http') || "http://es.zy16.com"
		var path = http + ":" + port + '/Rest/TSvrMethods/' + obj.url
		console.log(path)
		owner.ajax({
			url: path,
			data: obj.data,
			type: 'POST',
			success: function(data) { //返回接受信息
				plus.nativeUI.closeWaiting()

				return call(data)
			},
			fail: function() {

				plus.nativeUI.closeWaiting()
				return fail()
			}
		})
	}
	owner.udate = function(bb) {

		api.banben(function(data) {
			var datas = JSON.parse(data).result[0];
			var banben = datas.split(",")[1].split(":")[1];
			var bbs = '"' +bb + '"';
			var a = datas.split(",")[3].split(":")[1].split('"')[1];
			console.log(banben)
			console.log(bbs)
			if(mui.os.ios) {
				return;
			}
			if(bbs != banben) {
				mui.confirm(a, "更新提示", ['确认', '取消'], function(e) {
					if(e.index == 0) {
						plus.runtime.openURL('http://jinyintian.vicp.cc:13856/金银田PMIS.apk');
					} else {
					}
				})
			} else {
				mui.toast('已是最新版本')
			}
		})
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
		if(type == undefined) {
			type = 'pop-in'
		}
		if(obj == undefined) {
			obj = {}
		}
		mui.openWindow({
			url: url1,
			id: ids,
			show: {
				aniShow: type,
			},
			waiting: {
				autoShow: false, //自动显示等待框，默认为true						    
			},
			extras: obj
		})
	}
	//关闭右滑
	owner.closeRight = function() {
		var wv = plus.webview.currentWebview();
		wv.setStyle({
			'popGesture': 'none'
		});
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
					options.fail()
					mui.toast(data.msg, {
						duration: 'long'
					})
				}
			} else if(xhr.readyState == 4 && xhr.status != 200) {
				mui.alert("主机名或端口有误")
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