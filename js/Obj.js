(function(owner) {

	owner.list = {
		1: {
			name: "待处理",
			show: true,
			list: [{

					icon: "jg2 icon-daishenpi",
					name: "待审批",
					pid: "checking"
				},
				{
					icon: "jg1 icon-weichayue",

					name: "待查阅",
					pid: "reading"
				},
			]
		},
		2: {
			name: "已处理",
			show: true,
			list: [{
					icon: "jg4 icon-shenpi",
					name: "已审批",
					pid: "checked"
				},
				{
					icon: "icon-cloud-date jg5",

					name: "已查阅",
					pid: "read"
				},
			]
		},
		3: {
			name: "统计",
			show: true,
			list: [{
					icon: "icon-zhengzaibanli jg2",
					name: "我的在办",
					pid: "mychecking"
				},
				{
					icon: "icon-yibanjie jg6",
					name: "已办结文件",
					pid: "checkover"
				},
				{
					icon: "icon-weibiaoti9 jg7",

					name: "我的已办",
					pid: "mychecked"
				},
			]
		}

	}
}(window.objs = {}));