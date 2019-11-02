(function(owner) {

	owner.list = {
		1: {
			name: "工作台",
			show: true,
			list: [{

					icon: "jg2 icon-daishenpi",
					name: "待审批",
					pid: "checking"
				},
				{
					icon: "jg1 icon-chayuerizhi",

					name: "待查阅",
					pid: "reading"
				},
			]
		},
		2: {
			name: "已处理",
			show: true,
			list: [{
					icon: "jg2 icon-shenpi",
					name: "已审批",
					pid: "checked"
				},
				{
					icon: "icon-shu jg3",

					name: "已查阅",
					pid: "read"
				},
			]
		},
		3: {
			name: "统计",
			show: true,
			list: [{
					icon: "icon-banli jg4",
					name: "我的在办",
					pid: "mychecking"
				},
				{
					icon: "icon-banjie jg9",
					name: "已办结文件",
					pid: "checkover"
				},
				{
					icon: "icon-icon_yiban jg8",

					name: "我的已办",
					pid: "mychecked"
				},
			]
		}

	}
}(window.objs = {}));