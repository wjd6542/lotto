
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
		let yearData 			= utility.ajax("/lotto/reportYearData", {});
		let monthData 			= utility.ajax("/lotto/reportMonthData", {});
		
		
		
		this.mkYearMataData("yearFirstOneDataList", yearData);
		this.mkMonthMataData("monthFirstOneDataList", monthData);
	},
	
	
	/**
	 * 년도별 당청 정보
	 * mkYearMataData
	 */
	mkYearMataData : function(id, list) {
		let html 	= "";
		let total 	= 0;
		
		if(list.length === 0) {
			html = "등록된 정보가 없습니다.";
		} else {
			
			for (var i = 0; i < list.length; i++) total += Number(list[i].total);
			
			for (let i = 0; i < list.length; i++) {
				let obj 	= list[i];
				let pro 	= (list[i].total /  total) * 100;
				let price 	= (list[i].total / list[i].cnt);
				html += `
					<tr>
						<td>${list[i].year}</td>
						<td class="text-right">
							${pro.toFixed(2)}%
							<div class="progress">
								<div class="progress-bar" role="progressbar" aria-valuenow="${pro.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="width:${pro.toFixed(2)}%">
									<span class="sr-only">${pro.toFixed(2)}%</span>
								</div>
							</div>
						</td>
						<td class="text-right">${list[i].cnt}명</td>
						<td class="text-right">${ utility.numberHan(list[i].total) }원</td>
						<td class="text-right">${ utility.numberHan(price) }원</td>
					</tr>
				`;
			}
		}
		
		$("#" + id).html(html);
		
	},
	
	
	/**
	 * 월별 당청 정보
	 * mkMonthMataData
	 */
	mkMonthMataData : function(id, list) {
		let html 	= "";
		let total 	= 0;
		
		if(list.length === 0) {
			html = "등록된 정보가 없습니다.";
		} else {
			
			for (var i = 0; i < list.length; i++) total += Number(list[i].total);
			
			for (let i = 0; i < list.length; i++) {
				let obj 	= list[i];
				let pro 	= (list[i].total /  total) * 100;
				let price 	= (list[i].total / list[i].cnt);
				html += `
					<tr>
						<td>${list[i].month}</td>
						<td class="text-right">
							${pro.toFixed(2)}%
							<div class="progress">
								<div class="progress-bar" role="progressbar" aria-valuenow="${pro.toFixed(2)}" aria-valuemin="0" aria-valuemax="100" style="width:${pro.toFixed(2)}%">
									<span class="sr-only">${pro.toFixed(2)}%</span>
								</div>
							</div>
						</td>
						<td class="text-right">${list[i].cnt}명</td>
						<td class="text-right">${ utility.numberHan(list[i].total) }원</td>
						<td class="text-right">${ utility.numberHan(price) }원</td>
					</tr>
				`;
			}
		}
		
		$("#" + id).html(html);
		
	},
	
	
	/**
	 * 레이아웃 예외처리
	 * mkNullLayout
	 */
	mkNullLayout : function(id) {
		$("#" + id).html(` 등록된 정보가 없습니다. `);
	},

	

};

index.init();