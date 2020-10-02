
let index = {
		
		
	/**
	 * 최초 실행 함수
	 * init
	 */
	init : function() {
		this.getMataData();
	},
	
	
	/**
	 * 최신 로또 정보 호출 getMataData
	 * getMataData
	 */
	getMataData : function() {
		
		// ajax 실행
		let yearData 			= utility.ajax("/lotto/getYearData", {});
		let orderData			= utility.ajax("/lotto/getOrderData", {});
		let addrRankingData 	= utility.ajax("/lotto/getAddrRanking", {});
		let numberFrequencyData	= utility.ajax("/lotto/getNumberFrequency", {});
		let firstNumberData		= utility.ajax("/lotto/getFirstNumber", {});
		
		if(yearData.length === 0 ) {
			this.mkNullLayout("yearPriceChart");
		} else {
			this.mkYearMataData("yearPriceChart", yearData);
		}
		
		if(orderData.length === 0 ) {
			this.mkNullLayout("orderChart");
		} else {
			this.mkOrderData("orderChart", orderData);
		}
		
		if(addrRankingData.length === 0 ) {
			this.mkNullLayout("addrRankingChart");
		} else {
			this.mkAddrRankingData("addrRankingChart", addrRankingData);
		}
		
		if(numberFrequencyData.length === 0 ) {
			this.mkNullLayout("numberFrequencyChart");
		} else {
			this.mkNumberFrequencyData("numberFrequencyChart", numberFrequencyData);
		}
		
		if(firstNumberData.length === 0 ) {
			this.mkNullLayout("numCountChart");
		} else {
			this.mkNumberData("numCountChart", firstNumberData);
		}
		
	},
	
	
	/**
	 * 레이아웃 예외처리
	 * mkNullLayout
	 */
	mkNullLayout : function(id) {
		$("#" + id).html(` 등록된 정보가 없습니다. `);
	},
	
	
	/**
	 * 1등 주소 정보 data
	 * mkAddrRankingData
	 */
	mkAddrRankingData : function(id, data) {
		let keys 	= [];
		let series 	= [];
		
		
		// 1. data set up
		for (let i = 0; i < data.length; i++) {
			let map = data[i];
			
			keys.push(map.addrType1);
			series.push([map.addrType1, map.cnt])
			
		}
		
		this.mkAddrRankingChart(id, keys, series);
	},
	
	
	/**
	 * 1등 상점 지역별 당첨인원
	 * mkAddrRankingChart
	 */
	mkAddrRankingChart : function(id, xAxis, series) {
		Highcharts.chart(id, {
		    chart: {
		        type: 'column',
		    },
		    title: {
		        text : ''
		    },
		    subtitle: {
		        text: ''
		    },
		    xAxis: {
		        type: 'category',
		        labels: {
		            rotation: -45,
		            style: {
		                fontSize: '13px',
		                fontFamily: 'Verdana, sans-serif'
		            }
		        }
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
		    tooltip: {
		        headerFormat: '<span style="font-size:10px"><h6>{point.key}</h6></span>',
		        pointFormat: '<div>{series.name} : <b>{point.y}</b></div>' ,
		        footerFormat: '</div>',
		        shared: true,
		        useHTML: true
		    },
		    credits: {
                enabled: false
            },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    series : [{
		    	name: '지역',
		    	data : series
		    }]
		});
	},
	
	
	/**
	 * 회차별 data 추출
	 * mkOrderData
	 */
	mkOrderData : function(id, data) {
		
		let keys		= [];
		let priceArr 	= [];
		let countArr 	= [];
		
		for(let i =0; i< data.length; i++) {
			 let map = data[i];
			 
			 
			 priceArr.push({
				 name 	: map.drawNo + " 회",
				 y		: map.price,
			 });
			 
			 countArr.push({
				 name 	: map.drawNo + " 회",
				 y		: map.cnt,
			 });
			 
			 keys.push(map.drawNo);
		}
		
		let seriesArr	= [
			{
				name 	: "판매 금액",
				data	: priceArr,
			},
			{
				name 	: "당첨 인원",
				data	: countArr,
			},
		];
		
		
		this.mkOrderChart(id, keys, seriesArr);
	},
	
	
	/**
	 * 년도 별 data 추출
	 * mkYearMataData
	 */
	mkYearMataData : function(id, list) {
		let groupList		=  _.groupBy(list, "year");
		let keys			= _.keys(groupList);
		let	yearTotalPrice	= [];
		let yearTotalCount	= [];
		
		
		for (let i = 0; i < keys.length; i++) {
			let key			= keys[i];
			let dataList	= groupList[key];
			let totalPrice 	= 0;
			let totalCount 	= 0;
			
			for (let j = 0; j < dataList.length; j++) {
				let obj	= dataList[j];
				totalPrice += obj.sellingPriceByRank;
				totalCount += obj.winningCnt;
			}
			
			yearTotalPrice.push({
				name 	: key + " 년",
				y		: totalPrice,
			});
			
			yearTotalCount.push({
				name 	: key + " 년",
				y		: totalCount,
			});
			
		}
		
		let seriesArr = [
			{
				name : "년도별 판매금액",
				data : yearTotalPrice
			},
			{
				name : "년도별 구입인원",
				data : yearTotalCount
			},
		];
		
		this.mkYearchart(id,"", keys, seriesArr);
	},
	
	
	/**
	 * 년도별 판매 금액
	 * mkOrderChart
	 */
	mkOrderChart : function(id, xAxis, series) {
		Highcharts.chart(id, {
		    chart: {
		        type: 'column',
		        zoomType : "xy",
		    },
		    title: {
		        text : ''
		    },
		    subtitle: {
		        text: ''
		    },
		    xAxis: {
		        categories: xAxis,
		        crosshair: true
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: ''
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px"><h6>{point.key}</h6></span>',
		        pointFormat: '<div>{series.name} : <b>{point.y}</b></div>' ,
		        footerFormat: '</div>',
		        shared: true,
		        useHTML: true
		    },
		    credits: {
                enabled: false
            },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    series : series
		});
	},
	
	
	/**
	 *  년도별  로또 판매금액
	 * mkYearTotalPriceChart
	 */
	mkYearchart : function(id, title, xAxis, series) {
		Highcharts.chart(id, {
		    chart: {
		        type: 'column'
		    },
		    title: {
		        text : title
		    },
		    subtitle: {
		        text: ''
		    },
		    xAxis: {
		        categories: xAxis,
		        crosshair: true
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: ''
		        }
		    },
		    tooltip: {
		        headerFormat: '<span style="font-size:10px"><h6>{point.key}</h6></span>',
		        pointFormat: '<div>{series.name} : <b>{point.y}</b></div>' ,
		        footerFormat: '</div>',
		        shared: true,
		        useHTML: true
		    },
		    credits: {
                enabled: false
            },
		    plotOptions: {
		        column: {
		            pointPadding: 0.2,
		            borderWidth: 0
		        }
		    },
		    series : series
		});
	},
	
	
	/**
	 * 번호 랭크 data 생성 함수
	 * mkNumberData
	 */
	mkNumberData : function(id, list) {
		let dataObj		= {};
		let resultList	= [];
		
		// 오브젝트 초기화
		for (let i = 1; i < 46; i++) {
			dataObj[i] = 0;
		};
		
		// data 생성
		for (let i = 0; i < list.length; i++) {
			let obj = list[i];
			
			// row loop
			for (let j = 1; j <= 6; j++) {
				let key = "num"+j;
				let val = obj[key];
				dataObj[val]++;
			}
			
		};
		
		
		for ( let key in dataObj) {
			resultList.push({
				name	: key,
				y		: dataObj[key],
			});
		}
		
		// 내림차순
		resultList.sort(function(a, b) {
		    return a.y > b.y ? -1 : a.y < b.y ? 1 : 0;
		});
		
		this.mkNumberTrend(id, "", resultList);
	},
	
	
	/**
	 * 최대 당첨 번호 트렌드 생성
	 * mkNumberTrend
	 */
	mkNumberTrend : function(id, title, list) {
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
		        pointFormat : '{point.name}: <b>{point.y}회</b>'
		    },
		    plotOptions: {
		    	column: {
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
		        type			: 'column',
		        colorByPoint	: true,
		        data			: list,
		        showInLegend	: false
		    }]

		});
		
	},
	
	
	/**
	 * 번호별 빈도 data 생성 함수
	 * numberFrequencyData
	 */
	mkNumberFrequencyData : function(id, list) {
		let groupList		=  _.groupBy(list, "drawNo");
		let keys			= _.keys(groupList);
		let series			= [];
		let drilldown		= [];
		
		
		// 로또 번호 반복
		for (let i = 0; i < keys.length; i++) {
			let num 		= keys[i];
			let dataList	= groupList[num];
			let downArr 	= [];
			let total		= 0;
			
			
	
			// 로또번호 리스트 반복중
			for (let j = 0; j < dataList.length; j++) {
				let obj	= dataList[j];
				
				total +=  parseInt(obj.winningCnt);
				downArr.push([obj.lottoRank, obj.winningCnt]);
			}
			
			// 시리즈 삽입
			series.push({
				name		: num + "번",
				y			: total,
				drilldown 	: num ,
			});
			
			// 드릴다운 삽입
			drilldown.push({
				name		: num + "번",
				id			: num,
				data 		: downArr,
			});
			
		}
		
		this.mkNumberdrilldownChart(id, "", series, drilldown);
	},
	
	/**
	 * 번호별 빈도 차트
	 * mkNumberdrilldownChart
	 */
	mkNumberdrilldownChart : function(id, title, series, drilldown) {
		let chart = Highcharts.chart(id, {
		    chart: {
		        type: 'column',
		        zoomType : "xy",
		    },
		    title: {
		        text : title
		    },
		    legend: {
		        enabled: false
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
		    plotOptions: {
		        series: {
		            borderWidth: 0,
		            dataLabels: {
		                enabled: false,
		              
		            }
		        }
		    },

		    credits: {
                enabled: false
            },
		    series: [{
		            name		: "당첨횟수",
		            colorByPoint: true,
		            data		: series
		    }],
		    drilldown : {
		    	series : drilldown
		    }
		});
	},

};

index.init();