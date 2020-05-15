
let index = {
		
	// 최초 실행 함수
	init : function() {
		this.getMataData();
		this.mkEvent();
	},
	
	/**
	 * 정보 호출
	 * getMataData
	 */
	getMataData : function() {
		
		// call data
		let addressGroupData	= utility.ajax("/lotto/getAddrgroupData", {});
		let addressRankData		= utility.ajax("/lotto/getAddrRank", {});
		let maxRankingData		= utility.ajax("/lotto/getMaxRanking", {});
		let numberFrequencyData	= utility.ajax("/lotto/getNumberFrequency", {});
		let addrGameTypeData	= utility.ajax("/lotto/getAddrGameType", {});
		let addrAreaData		= utility.ajax("/lotto/getAddrArea", {});
		
		
		// make 1step data
		this.mkAddressGroupData(addressGroupData);
		this.mkAddressRankData(addressRankData);
		this.mkMaxRanking(maxRankingData);
		this.mkLayerData(numberFrequencyData);
		this.mkAddrGameTypeData(addrGameTypeData);
		this.mkAddrAreaData(addrAreaData);
	},
	
	/**
	 * 역대 최고 판매금액 정보
	 * mkMaxRanking
	 */
	mkMaxRanking : function(data) {
		let total_price = utility.numberHan(data.sellingPriceByRank);
		let price 		= utility.numberHan(data.winningPriceByRank);
		$("#victory_ranking").html(`로또 회차  :  ${data.drawNo}회`);
		$("#victory_count").html(`당첨 인원  :  ${data.winningCnt}명`);
		$("#victory_total_price").html(`당첨 금액  :  ${total_price}`);
		$("#victory_price").html(`인당 금액  :  ${price}`);
		$("#victory_num").html(`당첨 번호  :  ${data.num1}, ${data.num2}, ${data.num3}, ${data.num4}, ${data.num5}, ${data.num6}, B(${data.bonusNum})`);
	},
	
	/**
	 * 1등 지역구 정보
	 * mkAddrAreaData
	 */
	mkAddrAreaData : function(list) {
		let yArr		= [];
		let seriesData	= [];
		
		
		for (let i = 0; i < list.length; i++) {
			let map		= list[i];
			let name	= map.addrType1 + " " + map.addrType2;
			
			
			yArr.push(name);
			seriesData.push({
				name 	: name,
				y 		: map.cnt
			});
		}
		
		this.mkAddrAreaChart("addrAreaChart", yArr, seriesData);
	},
	
	/**
	 * 1등 지역구 차트 생성
	 * mkAddrAreaChart
	 */
	mkAddrAreaChart : function(id, yArr, dataList) {
		
		Highcharts.chart(id, {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text : ''
		    },
		    subtitle: {
		        text: ''
		    },
		    xAxis: {
		        categories: yArr,
		        crosshair: true
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: ''
		        }
		    },
		    credits: {
                enabled: false
            },
            legend: {
		        enabled: false
		    },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    series: [{
		        type			: 'column',
		        colorByPoint	: true,
		        data			: dataList,
		        showInLegend	: false
		    }]
		});
	},
	
	/**
	 * 게임 타입 정보 추출
	 * mkAddrGameTypeData
	 */
	mkAddrGameTypeData : function(data) {
		let total 	= (data[0].cnt + data[1].cnt + data[2].cnt);
		let pList	= [];
		let cList	= [];
		for (let i = 0; i < data.length; i++) {
			let map 		= data[i];
			let selected	= (i === 0) ? true : false;
			let sliced		= (i === 0) ? true : false;
			
			pList.push({
				name		: map.gameType,
				y			: (map.cnt / total) * 100,
				selected 	: selected,
				sliced 		: sliced,
			});
			
			cList.push({
				name	: map.gameType,
				y		: map.cnt
			});
		}

		this.mkAddrGameTypePiechart("gameTypePercentageChart", "1등 게임타입 확률",  pList);
		
		this.mkAddrGameTypeBarchart("gameTypeCountChart", "1등 게임타입 횟수", cList);
	},
	
	/**
	 * 게임 타입 차트 생성
	 * mkAddrGameTypeBarchart
	 */
	mkAddrGameTypeBarchart: function(id,title,  dataList) {
		Highcharts.chart(id, {
			chart: {
		        type: 'column'
		    },
		    title: {
		        text: title
		    },
		    subtitle: {
		        text: ''
		    },
		    xAxis: {
		        type: 'category'
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: ''
		        }
		    },
		    legend: {
		        enabled: false
		    },
		    series: [{
		        name: '1등 횟수',
		        colorByPoint: true,
		        data		: dataList,
		        dataLabels: {
	                enabled: true
	            },
		    }],
		    credits: {
                enabled: false
            },
		});
	},
	
	/**
	 * 게임 타입 차트 생성
	 * mkAddrGameTypePiechart
	 */
	mkAddrGameTypePiechart : function(id, title, dataList) {
		Highcharts.chart(id, {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie'
		    },
		    title: {
		        text : title
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: false
		            },
		            showInLegend: true,
		            dataLabels: {
		                enabled: true,
		                format  :"{point.name} : {point.y:.1f}%" 
		            },
		        }
		    },
		    series: [{
		        name: '확률',
		        colorByPoint: true,
		        data		: dataList
		    }],
		    credits: {
                enabled: false
            },
		});
	},
	
	/**
	 * 최신 로또 정보 호출 getMataData
	 * mkAddressGroupData
	 */
	mkAddressGroupData : function(data) {
		let dataList	= [];
		let keyList		= [];
		let total 		= 0;
		for (let i = 0; i < data.length; i++) {
			let obj = data[i];
			dataList.push({
				name	: (obj.addr === undefined) ? "미등록" :  obj.addr,
				y 		: obj.cnt,
			});
			total += obj.cnt;
		}
		
		// 내림차순
		dataList.sort(function(a, b) {
		    return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
		});
		
		for (let i = 0; i < dataList.length; i++) {
			keyList.push(dataList[i].name);
		}
		
		// 차트 생성
		this.mkBarChart("addressGroup", "지역별 1위 당첨" , dataList, keyList);
		// 테이블 생성
		this.mkDataTable("groupTable", dataList, total);
	},
	
	/**
	 * top 10 개 로또 지점
	 * mkAddressRankData
	 */
	mkAddressRankData : function(data) {
		let dataList	= [];
		let keyList		= [];
		let total 		= 0;
		for (let i = 0; i < data.length; i++) {
			let obj = data[i];
			
			dataList.push({
				name	: (obj.shopName === undefined) ? "미등록" :  obj.shopName,
				y 		: obj.cnt,
			});
			
			keyList.push(obj.shopName);
			total += parseInt(obj.cnt);
		}
	
		// 차트 생성
		this.mkBarChart("addressRank", "Top10 로또상점" , dataList, keyList);
		// 테이블 생성
		this.mkDataTable("rankTable", dataList, total);
	},
	
	/**
	 * 데이터 테이블 생성
	 * mkDataTable
	 */
	mkDataTable : function(id, data, total) {
		let html = "";
		for (let i = 0; i < data.length; i++) {
			let obj = data[i];
			html +=`
				<tr>
					<td><b>${obj.name}</b> </td>
					<td class='text-center'> ${obj.y} </td>
					<td class='text-right'> ${  ((obj.y / total) *100).toFixed(1) } % </td>
				</tr>
			`;
				
		}
		$("#" + id).html(html);
	},
	
	/**
	 * 번호 영역대 데이터 추출
	 * mkLayerData
	 */
	mkLayerData : function(list) {
		let total			= 0;
		let resultBarArr 	= [];
		let resultPieArr 	= [];
		let dataObj = {
			10	: 0,
			20	: 0,
			30	: 0,
			40	: 0,
		};
		
		
		for (let i = 0; i < list.length; i++) {
			let obj = list[i];
			
			// 번호값 추출
			for (let j = 1; j <= 7; j++) {
				let num = obj["num" + j];
		
				if(10 >= num) {
					dataObj["40"]++;
				} else if(20 >= num) {
					dataObj["30"]++;
				} else if(30 >= num) {
					dataObj["20"]++;
				} else if(45 >= num) {
					dataObj["10"]++;
				}
				
				total++;
			}
		}
		
		let count = 0;
		for ( let key in dataObj) {

			let selected	= (count === 0) ? true : false;
			let sliced		= (count === 0) ? true : false;
			
			// 바차트
			resultBarArr.push({
					name		: key,
					y			: dataObj[key],
			});
			
			// 파이 차트
			resultPieArr.push({
				name		: key +" 번대",
				y			: (dataObj[key] / total) * 100,
				selected	: selected,
				sliced 		: sliced,
			});
			count++;
		}
		
		
		// 내림차순
		resultBarArr.sort(function(a, b) {
		    return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
		});
		
		resultPieArr.sort(function(a, b) {
		    return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
		});
		
		this.mkLayerBarChart("layerdBarChart", "구간별 출현횟수", resultBarArr);
		
		this.mkLayerPieChart("layerPieChart", "구간별 출현확률", resultPieArr);
	},
	
	/**
	 * 구간별 확률 차트
	 * mkLayerPieChart
	 */
	mkLayerPieChart : function(id, title, dataList) {
		Highcharts.chart(id, {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie'
		    },
		    title: {
		        text : title
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled : true,
		                format  :"{point.name} : {point.y:.1f}%" 
		            },
		            showInLegend: true
		        }
		    },
		    series: [{
		        name: '확률',
		        colorByPoint: true,
		        data		: dataList,
		      
		    }],
		    credits: {
                enabled: false
            },
		});
	},
	
	/**
	 * 구간별 data 차트
	 * mkLayerBarChart
	 */
	mkLayerBarChart : function(id, title, dataList) {
		Highcharts.chart(id, {
		    title: {
		        text : title
		    },

		    subtitle: {
		        text: ''
		    },
		    xAxis: {
		        title: {
		            text: null
		        }
		    },
		    yAxis: {
		        title: {
		            text: null
		        }
		    },
		    tooltip: {
		        pointFormat : '{point.name} 번대 : <b>{point.y}회</b>'
		    },
		    plotOptions: {
		    	column: {
		    		allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true
		            },
		            showInLegend: true
		        }
		    },
		    
		    credits: {
		        enabled: false
		    },
		    series: [{
		        type			: 'column',
		        colorByPoint	: true,
		        data			: dataList,
		        showInLegend	: false
		    }]

		});
	},
	
	/**
	 * 순위 차트 생성 mkRankChart
	 * mkRankChart
	 */
	mkRankChart(id, text, dataList) {
		Highcharts.chart(id, {
		    chart: {
		        plotBackgroundColor: null,
		        plotBorderWidth: null,
		        plotShadow: false,
		        type: 'pie'
		    },
		    title: {
		        text : text
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: false
		            },
		            showInLegend:false
		        }
		    },
		    series: [{
		        name: '확률',
		        colorByPoint: true,
		        data		: dataList,
		        dataLabels: {
	                enabled: true
	            },
		    }],
		    credits: {
                enabled: false
            },
		});
	},
	
	/**
	 * 당첨횟수 차트 생성
	 * mkBarChart
	 */
	mkBarChart(id, text, dataList, categories) {
		Highcharts.chart(id, {
		    chart: {
		        type: 'bar'
		    },
		    title: {
		        text: text
		    },
		    subtitle: {
		        text: ''
		    },
		    xAxis: {
		        categories: categories,
		        title: {
		            text: null
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: '(회)',
		            align: 'high'
		        },
		        labels: {
		            overflow: 'justify'
		        }
		    },
		    tooltip: {
		        valueSuffix: ' 회'
		    },
		    plotOptions: {
		        bar: {
		            dataLabels: {
		                enabled: true
		            },
		            showInLegend:false
		        }
		    },
		  
		    credits: {
		        enabled: false
		    },
		    series: [{
		        name: '당첨횟수',
		        data: dataList,
		        dataLabels: {
	                enabled: true
	            },
		    }]
		});
	},
	
	
	/**
	 * 이벤트 생성 함수
	 * mkEvent
	 */
	mkEvent : function() {
		let self = this;
		
	}
};

index.init();