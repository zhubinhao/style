//var DDNS='pmis.szstyle.cc:6082';
//var DDNS='http://pmis.szstyle.cc:6082';
var DDNS=localStorage.getItem('fuwu');

//var IMG='pmis.szstyle.cc:9003';
var IMG=localStorage.getItem('xiang');

(function( owner) {	
	var isIOS='【苹果端】';
	  if (!mui.os.ios){  
	     isIOS='【安卓端】';
	  }
	/**
	 * 新闻列表
	 **/
	owner.news=function(i,pro_sid,cellback){
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetCompanyProjCMS("'+i+'","'+pro_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},20000); 
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetCompanyProjCMS("'+i+'","'+pro_sid+'")',  function(data,status){
			 if(timeout){clearTimeout(timeout);timeout=null;}  
		      cellback(data,status)	  
		});
	}
//	/**
//	 * 进度
//	 **/
//	owner.GetProjectObj=function(pro_sid,cellback){
//		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetProjectObj("'+pro_sid+'")')
//		var timeout=setTimeout(function(){cellback('err','err')},20000); 
//		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetProjectObj("'+pro_sid+'")',  function(data,status){
//			 if(timeout){clearTimeout(timeout);timeout=null;}  
//		      cellback(data,status)	  
//		});
//	}
	/**
	 * 日志
	 **/
	owner.rizhi=function(User_sid,User_code,UserName,Action,ECobssid,remark,cellback){	
//console.log(DDNS+'/datasnap/rest/TECServerMethods/PostSysLog("ECMobile","'+ User_sid+'","'+User_code+'","'+UserName+'","'+Action+'","'+ECobssid+'","'+remark+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	

		$.get(DDNS+'/datasnap/rest/TECServerMethods/PostSysLog("ECMobile","'+ User_sid+'","'+User_code+'","'+UserName+'","'+Action+'","'+ECobssid+'","'+remark+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	}	
	
	/**
	 * 新闻详情
	 **/ 
	owner.newsxq=function(id,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetCompanyCMSConent("'+id+'")', function(data,status){
		   if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 通讯录
	 **/
	owner.txl=function(cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+"/datasnap/rest/TECServerMethods/GetCompanyBook", function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 反馈
	 **/
	owner.feedback=function(human_sid,userName,text1,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000);  
		console.log(DDNS+'/datasnap/rest/TECServerMethods/PostQuestion("'+human_sid+'","'+userName+'","'+text1+'")')
		$.get(DDNS+'/datasnap/rest/TECServerMethods/PostQuestion("'+human_sid+'","'+userName+'","'+text1+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 修改登录密码 
	 **/
	owner.dlpass=function(UserKey,OldPass,NewPass1,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/ChangePassword("'+UserKey+'","'+OldPass+'","'+NewPass1+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 修改签章密码
	 **/
	owner.qzpass=function(UserKey,OldPass,NewPass1,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/ChangeSignPassword("'+UserKey+'","'+OldPass+'","'+NewPass1+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 个人信息
	 **/
	owner.peoples=function(human_sid,cellback){
//		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetUserInfo("'+human_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetUserInfo("'+human_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 个人信息修改
	 **/
	owner.xpeoples=function(human_sid,Email,telephone,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/ChangeUserInfo("'+human_sid+'","'+Email+'","'+telephone+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 业务数目 
	 **/
	owner.count=function(i,cellback){
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetWfDataCount("'+i+'")')

		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetWfDataCount("'+i+'")', function(data){
//			console.log(data)
		  cellback(data)
		});
	}

    /**
	 * 业务列表
	 **/
	owner.countlist=function(human_sid,type,i,sWhere,zWhere,mWhere,cellback){
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetwhereWfdataList("'+ human_sid+'","'+type+'","'+i+'","'+sWhere+'","'+zWhere+'","'+mWhere+'")')
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetwhereWfdataList("'+ human_sid+'","'+type+'","'+i+'","'+sWhere+'","'+zWhere+'","'+mWhere+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	 /**
	 * 附件列表
	 **/
	owner.GetBillFile=function(bill_sid,cellback){
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetBillFile("'+ bill_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetBillFile("'+ bill_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	 /**
	 * 附件日志
	 **/
	owner.PostSysLog=function(User_sid,User_code,UserName,Action,ECobssid,remark,cellback){
		console.log(DDNS+'/datasnap/rest/TECServerMethods/PostSysLog("ECMobile","'+ User_sid+'","'+User_code+'","'+UserName+'","'+Action+'","'+ECobssid+'","'+remark+'")')
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/PostSysLog("ECMobile","'+ User_sid+'","'+User_code+'","'+UserName+'","'+Action+'","'+ECobssid+'","'+remark+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 业务筛选
	 **/
	owner.getDataMod=function(human_sid,type,cellback){
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetwfData_getDataMod("'+ human_sid+'","'+type+'")')
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetwfData_getDataMod("'+ human_sid+'","'+type+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 查阅
	 **/
	owner.readings=function(list_sid,human_sid,human_sign_sid,values,cellback){
		
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/ExeWfDataGoNext("'+list_sid+'","'+human_sid+'","'+human_sign_sid+'","4","'+isIOS+values+'","")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 业务详情
	 **/
	owner.ywxq=function(list_sid,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetRecBillDetail("'+list_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 审批历史
	 **/
	owner.spli=function(bill,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetRecBillCheckRecord("'+bill+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 明细
	 **/
	owner.mxs=function(list,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetRecBillTabDetail("'+list+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 审批流程
	 **/
	owner.splc=function(bill,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetRecBillCheckStep("'+bill+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 同意人员列表
	 **/
	owner.typeople=function(step,rec,bill,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetNextCheckhuman("'+step+'","'+rec+'","'+bill+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 退回人员列表
	 **/
	owner.thpeople=function(wfdata_sid,cellback){
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetBackHuman("'+wfdata_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 签章图片
	 **/
	owner.qztp=function(human_sid,cellback){
//		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetPersonSignPicPwd("'+human_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetPersonSignPicPwd("'+human_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 同意提交人员
	 **/
	owner.btypeople=function(wfdata_sid,list_sid,shujustring,cellback){ 
		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/PostWfDataList("'+wfdata_sid+'","'+list_sid+'","'+shujustring+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 同意最后的提交,
	 **/
	owner.tysubmit=function(list_sid,human_sid,human_sign_sid,valueN,cellback){

		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/ExeWfDataGoNext("'+list_sid+'","'+human_sid+'","'+human_sign_sid+'","2","'+isIOS+valueN+'","")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 不同意最后的提交
	 **/
	owner.btysubmit=function(list_sid,human_sid,human_sign_sid,valueN,cellback){

		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/ExeWfDataGoNext("'+list_sid+'","'+human_sid+'","'+human_sign_sid+'","3","'+isIOS+valueN+'","")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 终止最后的提交
	 **/
	owner.zzsubmit=function(list_sid,human_sid,human_sign_sid,valueN,cellback){

		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		console.log(DDNS+'/datasnap/rest/TECServerMethods/ExeWfDataGoNext("'+list_sid+'","'+human_sid+'","'+human_sign_sid+'","10","'+isIOS+valueN+'","")')
		$.get(DDNS+'/datasnap/rest/TECServerMethods/ExeWfDataGoNext("'+list_sid+'","'+human_sid+'","'+human_sign_sid+'","10","'+isIOS+valueN+'","")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 退回最后的提交
	 **/
	owner.thsubmit=function(list_sid,human_sid,human_sign_sid,valueN,bohui_step,cellback){

		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/ExeWfDataGoNext("'+list_sid+'","'+human_sid+'","'+human_sign_sid+'","12","'+isIOS+valueN+'","'+bohui_step+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 组织架构
	 **/
	owner.zzjg=function(user_sid,cellback){	

		var timeout=setTimeout(function(){cellback('err','err')},10000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetUserLevel("'+user_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	/**
	 * 签到权限121
	 **/
	owner.qiandao=function(user_sid,dept_sid,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetPersonSignRight("'+user_sid+'","'+dept_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetPersonSignRight("'+user_sid+'","'+dept_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	}
	owner.banben=function(cellback){	  

		var timeout=setTimeout(function(){cellback('err','err')},60000); 		
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetlastVersionInfo', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});
	} 
	/**
	 * alert
	 **/
	owner.alert=function(url,cellback){
		mui.prompt('<img src='+url+' alt="" style="width: 130px;height: 80px;"/>','请输入签章密码','签章密码',['取消','确认'],function (e) {
		    cellback(e)
		},'div')
		document.querySelector('.mui-popup-input input').type='password';						
        
		
	}
	/**
	 * 上传图片
	 **/
	owner.UPimg=function(base,name,SuffixName,Url,HttpUrl,cellback){	
//		console.log('http://192.168.10.41:6082/datasnap/rest/TECServerMethods/PostProjectCircle("'+title+'","'+human_sid+'","'+dept_sid+'","'+time+'","'+HTMLs+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
		$.post(IMG+'/Up.aspx',{'photoBase':base,'FileName':name,'SuffixName':SuffixName,'LocalAddress':Url,'HttpUrl':HttpUrl}, function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	}	
	/**
	 * 发表
	 **/
	owner.fabiao=function(title,human_sid,dept_sid,time,HTMLs,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/PostProjectCircle("'+title+'","'+human_sid+'","'+dept_sid+'","'+time+'","'+HTMLs+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
//		console.log("1")
		$.get(DDNS+'/datasnap/rest/TECServerMethods/PostProjectCircle("'+title+'","'+human_sid+'","'+dept_sid+'","'+time+'","'+HTMLs+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	}	
	
//                              进度管理
     /**
	 * 进度管理查看权限
	 **/
	owner.GetProgLookFeedRight=function(user_sid,ECobs_sid,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetProgLookFeedRight("'+user_sid+'","'+ECobs_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
//		console.log("1")
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetProgLookFeedRight("'+user_sid+'","'+ECobs_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	} 
	    /**
	 * 进度管理查看权限
	 **/
	owner.GetPerCaclRight=function(user_sid,ECobs_sid,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetPerCaclRight("'+user_sid+'","'+ECobs_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
//		console.log("1")
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetPerCaclRight("'+user_sid+'","'+ECobs_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	} 
	/**
	 * 进度提交管理权限
	 **/
	owner.GetProgFeedRight=function(user_sid,ECobs_sid,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetProgFeedRight("'+user_sid+'","'+ECobs_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
//		console.log("1")
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetProgFeedRight("'+user_sid+'","'+ECobs_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	}
	
	  /**
	 * 进度管链表梗
	 **/
	owner.GetProjectObj=function(proj_sid,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetProjectObj("'+proj_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
//		console.log("1")
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetProjectObj("'+proj_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	} 
	/**
	 * 进度管刷新
	 **/
	owner.RefreshTask=function(proj_sid,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/RefreshTask("'+proj_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
//		console.log("1")
		$.get(DDNS+'/datasnap/rest/TECServerMethods/RefreshTask("'+proj_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	}
	/**
	 * 进度管链表下一
	 **/
	owner.GetProjectParentObj=function(proj_sid,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/GetProjectParentObj("'+proj_sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
//		console.log("1")
		$.get(DDNS+'/datasnap/rest/TECServerMethods/GetProjectParentObj("'+proj_sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	}
	/**
	 * 进度提交
	 **/
	owner.PostProjTask=function(string,sid,cellback){	
		console.log(DDNS+'/datasnap/rest/TECServerMethods/PostProjTask("'+string+'","'+sid+'")')
		var timeout=setTimeout(function(){cellback('err','err')},60000); 	
//		console.log("1")
		$.get(DDNS+'/datasnap/rest/TECServerMethods/PostProjTask("'+string+'","'+sid+'")', function(data){
		 if(timeout){clearTimeout(timeout);timeout=null;} 
		   cellback(data,status)
		});		
	}

	/**
	 * 转base64
	 **/		
	owner.Base64=function() {   
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";    
    // 转base64 
    this.encode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = _utf8_encode(input);  
        while (i < input.length) {  
            chr1 = input.charCodeAt(i++);  
            chr2 = input.charCodeAt(i++);  
            chr3 = input.charCodeAt(i++);  
            enc1 = chr1 >> 2;  
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
            enc4 = chr3 & 63;  
            if (isNaN(chr2)) {  
                enc3 = enc4 = 64;  
            } else if (isNaN(chr3)) {  
                enc4 = 64;  
            }  
            output = output +  
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +  
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);  
        }  
        return output;  
    }    
    // 解析base64
    this.decode = function (input) {  
        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;  
    }  
    _utf8_encode = function (string) {  
        string = string.replace(/\r\n/g,"\n");  
        var utftext = "";  
        for (var n = 0; n < string.length; n++) {  
            var c = string.charCodeAt(n);  
            if (c < 128) {  
                utftext += String.fromCharCode(c);  
            } else if((c > 127) && (c < 2048)) {  
                utftext += String.fromCharCode((c >> 6) | 192);  
                utftext += String.fromCharCode((c & 63) | 128);  
            } else {  
                utftext += String.fromCharCode((c >> 12) | 224);  
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
                utftext += String.fromCharCode((c & 63) | 128);  
            }    
        }  
        return utftext;  
    }  
    _utf8_decode = function (utftext) {  
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  
    }
	/**
	 * 打开新页面
	 * */
	owner.open=function(url1,ids,obj,type){
		if(type==undefined){		
			type='pop-in'
		}
		if(obj==undefined){
			obj={}
		}		
			mui.openWindow({
			url:url1,
			id:ids,
			show: {
					aniShow: type,									
				},		    					
			waiting:{
		      autoShow:false,//自动显示等待框，默认为true						    
		          },
		    extras:obj
		})	
	}
		/**
	 * 双击退出
	 * */
	owner.back=function(){
		var backButtonPress = 0;
		mui.back = function(event) {
			console.log(1)
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
	
}( window.api = {}));
