const echartsYunNanMaOption = {
	title: {
		text: '',
		x: 'center',
		textStyle: {
			color: '#087EBE',
			fontSize: 14
		}
	},
	tooltip: {
		trigger: 'item',
		formatter: function (param, ticket, callback) {
			let value = param.value;
			const name = param.name;
			if (isNaN(value)) {
				value = "暂无数据";
			} else {
				value = value;
			}
			return value;
		}
	},
	toolbox: {
		show: true,
		orient: 'vertical',
		left: 'right',
		top: 'center',
		feature: {
			// dataView: {readOnly: false},
			// restore: {},
			// saveAsImage: {}
		}
	},
	visualMap: {
		// min: 0,
		// max: 10000,
		text: ['高', '低'],
		realtime: false,
		calculable: true,
		inRange: {
			color: ['#71C7EB', '#00416A']
		},
		textStyle: {
			fontSize: 14
		}
	},
	series: [{
		name: '云南省投资增速区域分布',
		type: 'map',
		mapType: '云南', //自定义扩展图表类型
		aspectScale: 1,
		zoom: 1,
		id: "1",
		label: {
			emphasis: {
				show: true
			},
			normal: {
				textStyle: {
					fontSize: 14,
					fontWeight: 'bold',
					color: 'red'
				}
			}
		},
		roam: false, //禁止其放大缩小
		itemStyle: {
			normal: {
				areaColor: '#71C7EB',
				borderColor: '#00416A',
				fontSize: '14px'
			},
			emphasis: {
				areaColor: 'yellow' //放上去颜色
			}
		},
		data: []
	}]
}
export default echartsYunNanMaOption;