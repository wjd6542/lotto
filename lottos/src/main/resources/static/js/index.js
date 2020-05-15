
let index = {
	
	// 지도 마커 배열
	gMakerArr	: [],
	
	// 구글 지도
	gMap		: {},
		
	
	/**
	 * 최최 실행 함수
	 * init
	 */
	init : function() {
		this.gMap = new google.maps.Map(document.getElementById("map"), {
			zoom    : 9,
			center  : {
			  lat: 35.180119640568435, lng:  128.10755940528463
			}
		});
		
		this.getMataData();
		this.display();
		this.mkEvent();
	},
	
	/**
	 * 기본정보 호출
	 * getMataData
	 */
	getMataData : function() {
		let lastData	= utility.ajax("/lotto/getLastLottoNum", {});
		let drawNo		= lastData.lastNum;
		this.getLoadData(drawNo);
	},
	
	/**
	 * data 로드
	 * getLoadData
	 */
	getLoadData : function(drawNo) {
		// 로도 정보 추출
		let master = utility.ajax("/lotto/getLottoMaster", {
			drawNo :  drawNo
		});
		
		// 로도 정보 추출
		let detail = utility.ajax("/lotto/getLottoDetail", {
			drawNo :  drawNo
		});
		
		// 위치 정보 추출
		let locationData = utility.ajax("/lotto/getLottoLocation", {
			drawNo :  drawNo
		});
		
		// 선택 요소 생성
		this.mkOption(drawNo);
		
		// 레포트 생성
		this.mkReport(master, detail);
		
		// 차트 정보 생성
		this.mkLottoData(detail);
		
		// 장소 정보 생성
		this.mkLocationData(locationData);
	},
	
	
	/**
	 * 회차 옵션 생성 함수 mkOption
	 * mkOption
	 */
	mkOption :function(max = 1) {
		for (let i = max; 1 <= i; i--) {
			let option = $(`<option vlaue="${i}">${i}</option>`);
			$('#drawNo').append(option);
		}
		$('#drawNo').fSelect();
	},
	
	
	/**
	 * 마커 초기화
	 * cleanMaker
	 */
	cleanMaker : function() {
		let arr = this.gMakerArr;
		for (var i = 0; i < arr.length; i++) {
			arr[i].setMap(null);
		}
	},
	
	/**
	 * 당첨점 생성 함수 mkLocationData
	 * mkLocationData
	 */
	mkLocationData : function(data) {
		
		let marker, i;
		for (let j = 0; j < data.length; j++) {
			let obj = data[j];
			
			let shopName = (obj.shopName === undefined) ? "미등록" : obj.shopName;
			let gameType = (obj.gameType === undefined) ? "미등록" : obj.gameType;
			let address = (obj.address === undefined) ? "미등록" : obj.address;
			
			let content = `
				<h5><i class='fas fa-map-marked-alt'></i> ${shopName}</h5>
				<hr>
				<p>방식 : ${gameType}</p>
				<p>주소 : ${address} </p>
			`;
			
			
			marker = new google.maps.Marker({
				id			: i,
				position	: new google.maps.LatLng(obj.lat, obj.lng),
				map			: this.gMap,
				
			});
			
			this.gMakerArr.push(marker);
			
			let info_wondow = new google.maps.InfoWindow({
                content : content
            });
			
			// 윈도우 기본 오픈
            info_wondow.open(map, marker);
            

            marker.addListener(marker, 'click', (function(marker, i) {
				return function() {
					info_wondow.open(this.gMap, marker);
				}

			})(marker, i));

			if(marker) {

				marker.addListener('click', function() {
					map.setZoom(15);
					map.setCenter(this.getPosition());
				});

			}
		}
	},
	
	/**
	 * 레토드 생성 함수 mkReport
	 * mkReport
	 */
	mkReport : function(master, detail) {
		
		// 회차, 로또 번호
		let lankList 	= detail;
		
		let total		= 0;
		
		try{
			total = utility.numberCommas(master.totalSellingPrice);
		} catch(e) {
			total = 0;
			console.log(e);
		}
		
		let resHtml 	= "";
		let map = {
			1 : "당첨",
			2 : "당첨번호 5개 숫자일치 + 보너스 숫자일치",
			3 : "당첨번호 5개 숫자일치",
			4 : "당첨번호 4개 숫자일치",
			5 : "당첨번호 3개 숫자일치",
		};
		
		let header = `
			<tr>
				<th style="text-align: center">순위</th>
				<th style="text-align: center">당첨 횟수</th>
				<th style="text-align: center">순위별 총 당첨금액(원)</th>
				<th style="text-align: center">게임당 당첨금액(원)</th>
				<th style="text-align: center">당첨기준</th>
			</tr>
		`;
		
		// 등수별 data 추출
		for ( let idx in lankList) {
			let obj		= lankList[idx];
			let num 	= parseInt(idx) + 1;
			let data 	= map[num];
			
			resHtml +=`
				<tr>
					<td>${num}</td>
					<td align='right'>${ utility.numberCommas(obj.winningCnt)}</td>
					<td align='right'>${ utility.numberCommas(obj.sellingPriceByRank)}</td>
					<td align='right'>${ utility.numberCommas(obj.winningPriceByRank)}</td>
					<td align='left'>${data}</td>
				</tr>
			`;
		}
		
		
		// 기본 정보 추출
		for ( let key in master) {
			if(key !== "drawNo") {
				$("#" + key).text(master[key]);
				$("." + key).text(master[key]);
			}
		}
		
		// html 랜더링
		$("#dataTable").html(header + resHtml);
		$("#total").html(total);
		$(".drawNo").html(master.drawNo);
		$("#drawNo").val(master.drawNo);
	},

	/**
	 * 차트 data 생성함수
	 * mkLottoData
	 */
	mkLottoData : function(list) {
		let dataList	= list;
		let rankTotal	= 0;
		let rankList	= [];
		let priceList	= [];
		
		// 토탈 추출
		for ( let idx in dataList) {
			let rankPrice	= dataList[idx].sellingPriceByRank;
			let count		= dataList[idx].winningCnt;
			rankTotal += parseInt(rankPrice);
		
		}
		
		let cnt = 0;
		// data 추츨
		for ( let idx in dataList) {
			let obj			= dataList[idx];
			let rankPrice	= obj.sellingPriceByRank;
			let count		= obj.winningCnt;
			let selected	= (cnt === 0) ? true : false;
			let sliced		= (cnt === 0) ? true : false;
			
			
			
			let rObj = {
				name		: parseInt(idx) + 1 + "등",
				y			: (rankPrice / rankTotal) * 100,
				selected	: selected,
				sliced 		: sliced,
			};
			
			let cObj = {
				name	: parseInt(idx) + 1 + "등",
				y		: count,
			};
			
			// 순위별 차트 data
			rankList.push(rObj);
			
			// 금액별 차트 data
			priceList.push(cObj);
			cnt++;
		}
		
		
		// chart 생성
		this.mkRankChart("lackChart", "순위별 총합산", rankList);
		this.mkCountChart("priceList", "순위별 당첨횟수", priceList);
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
		                enabled : true,
		                format  :"{point.name} : {point.y:.1f}%" 
		            },
		            showInLegend: true
		        }
		    },
		    series: [{
		        name: '등위',
		        colorByPoint: true,
		        data		: dataList
		    }],
		    credits: {
                enabled: false
            },
		});
	},
	
	/**
	 * 당첨횟수 차트 생성 mkCountChart
	 * mkCountChart
	 */
	mkCountChart(id, text, dataList) {
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
		        categories: ['1등', '2등', '3등', '4등', '5등'],
		        title: {
		            text: null
		        }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: '순위별 (회)',
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
		            }
		        }
		    },
		    legend: {
		    	enabled: false
		    },
		    credits: {
		        enabled: false
		    },
		    series: [{
		        name: '당첨횟수',
		        data: dataList
		    }]
		});
	},
	
	
	/**
	 * 넘버 뷰 설정
	 * display
	 */
	display : function(){
		let width_size = window.outerWidth;
		if(width_size > 1000){
			$("#webView").show(); 
			$("#mobileView").hide(); 
		} else {
			$("#mobileView").show(); 
			$("#webView").hide(); 
		}
	},
	
	/**
	 * 이벤트 생성 함수
	 * mkEvent
	 */
	mkEvent : function() {
		let self = this;
		
		$(window).resize(function() {
			self.display();
		});
		
		$("#drawNo").change(function() {
			let drawNo = this.value;
			self.getLoadData(drawNo);
		});
	}
};

index.init();