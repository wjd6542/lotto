let lotto = {
	
	// 인덱스
	gIndex		: 0,
	
	// 홀수 제외 여부
	odd_remove : false,
	
	// 짝수 제외 여부
	even_remove : false,
	
	// 최신번호 제외 여부
	last_remove : false,
	
	// 최신번호 배열
	lastNum_arr : [],
	
	// 최신 회차
	lastNum 	: "",
	
	// 최초 실행 함수
	load : function() {
		Kakao.init('473ea560cf81963d57c4286569996f1a');
		this.getMataData();
		this.mkEvent();
		this.setRowView();
		this.mkSelfArea();
	},
	
	
	/**
	 * 최신 로또 정보 호출
	 * getMataData
	 */
	getMataData : function() {
		let data = utility.ajax("/lotto/getLastNum", {});
		
		this.lastNum = data.drawNo;
		for(let i = 1; i <= 7;  i++ ) {
			this.lastNum_arr.push(data["num" + i]);
		}
	},
	
	
	/**
	 * 기본 row 셋팅
	 * setRowView
	 */
	setRowView : function() {
		for (var i = 0; i <5; i++) {
			this.addRow();
		}
	},
	
	
	/**
	 * 회차 옵션 생성 함수
	 * mkLottoNum
	 */
	mkLottoNum : function() {
		
		// 6개의 로또 번호를 저장할 배열
		let lotto = new Array(7);
		// 추첨된 로또번호의 갯수
		let count = 0;
		// 번호중복 방지용 변수
		let mFlag = true;
		
		// 7개의 로또번호를 얻을때까지 반복
		while(count < 7) {
			let number;
			// 랜덤번호 추출
			number = parseInt(Math.random()*45)+1
		    // 중복확인
			for(let i=0; i<count; i++)
				if(lotto[i] == number) mFlag = false;
		  
			// 중복된 번호가 아니면 로또 번호배열에 추가
			if(mFlag) {
				
				// 홀수 제외
				if(number % 2 == 1 && this.odd_remove == true) {
					continue
				}
				
				// 짝수 제외
				if(number % 2 == 0 && this.even_remove == true) {
					continue
				}
				
				// 최신번호 제외
				if( this.lastNum_arr.indexOf(number) !== -1 ) {
					continue
				}
				
				lotto[count] = number;
		        count++;
			}
			mFlag = true;
		}
		return lotto;
	},
	
	/**
	 * 단일 로또생성
	 * setLottoData
	 */
	setLottoData : function (lotto) {
		let idx		= this.gIndex;
		for (let i = 0; i < 6; i++) {
			$(`#lottoTable tr:eq(${idx}) input:eq(${i})`).val(lotto[i]);
		}
	},
	
	/**
	 * 전체 로또 생성
	 * setAllLotto
	 */
	setAllLotto : function() {
		for(let j = 1; j <= 7; j++) {
			let lotto = this.mkLottoNum();
			for (let i = 0; i < 6; i++) {
				$(`#lottoTable tr:eq(${j}) input:eq(${i})`).val(lotto[i]);
			}
		}
	},
	
	/**
	 * 수동 영역 리셋
	 * selfReset
	 */
	selfReset : function(){
		$("#selfCheckData").html("번호를 선택하세요.");
		$("input:checkbox").prop("checked", false);
	},
	
	/**
	 * 로또 행 추가
	 * addRow
	 */
	addRow : function() {
		let index =  $("#lottoTable tr").length;
		let html = `
			<tr class="bg-success">
				<td>
					<div class="btn btn-info btn-sm btnIdx">
						<i class="fas fa-check"></i>
					</div>
				</td>
				<td>
					<input class="form-control selfInput" placeholder="1번" disabled="disabled">
				</td>
				<td>
					<input class="form-control selfInput" placeholder="2번" disabled="disabled">
				</td>
				<td>
					<input class="form-control selfInput" placeholder="3번" disabled="disabled">
				</td>
				<td>
					<input class="form-control selfInput" placeholder="4번" disabled="disabled">
				</td>
				<td>
					<input class="form-control selfInput" placeholder="5번" disabled="disabled">
				</td>
				<td>
					<input class="form-control selfInput" placeholder="6번" disabled="disabled">
				</td>
			</tr>
		`;
		$("#lottoTable tr").removeClass('bg-success');
		$("#lottoTable").append(html);
		this.gIndex = index;
	},
	
	/**
	 * 선택 row 셋팅
	 * mkSelfArea
	 */
	mkSelfArea : function() {
		let html = "";
		// 로프
		for (let j = 1; j <= 45; j++) {
			let val = (j < 10) ? "0"+j : j;
			let rowHtml = `
			<div class="col-md-2">
				<label class="btn btn-info">
					<input type="checkbox" value="${j}" autocomplete="off"> ${val}
				</label>
			</div>
			`;
			html += rowHtml;
		}
		$("#dataArea").html(html);
	},
	
	/**
	 * 채크박스 선택 배열 함수
	 * getSelfCheckArr
	 */
	getSelfCheckArr : function(){
		let checkArr = [];
		$('input:checkbox').each(function() {
	         if($(this).is(':checked'))
	        	 checkArr.push($(this).val());
	    });
		return checkArr;
	},
	
	/**
	 * data 추출함수
	 * getLottoTableData
	 */
	getLottoTableData : function() {
		let dataObj = {};
		let rowCnt	= 0;
		$('#lottoTable tr').each(function() {
	         let row = $(this).index() ;
	         let valueArr	= [];
	         
	         // 로또 선택여부 확인
	         $(this).children().children('input').each(function() {
	        	 if(this.value !== "") {
	        		 valueArr.push(this.value);
	        	 }
	         });
	         
	         // 빈거 아닌것만 입력
	         if(valueArr.length !== 0) {
	        	 dataObj[row] = valueArr;
	        	 rowCnt++;
	         }
	    });
		return {data : dataObj, rowCnt : rowCnt};
	},
	
	/**
	 * 카카오 전송
	 * sendKakao
	 */
	sendKakao : function(data) {
		
		let templateObj = {};
		for (let i = 1; i < 6; i++) {
			let rowData = data[i];
			templateObj["title" + i]	= i + " 번 로또 번호";
			templateObj["content" + i]	= (rowData === undefined) ? "" : rowData.join(", ");
		};
		
		Kakao.Link.createCustomButton({
		  container		: '#kakao_send',
		  templateId 	: 20429,
		  templateArgs 	: templateObj,
		});
	},
	
	/**
	 * 이벤트 생성 함수
	 * mkEvent
	 */
	mkEvent : function() {
		let self = this;

		// 랜덤 번호 생성
		$("#rendem_check").click(function() {
			let lotto = self.mkLottoNum();
			self.setLottoData(lotto);
		});
		
		// 전체 자동
		$("#rendem_all").click(function() {
			self.setAllLotto();
		});
		
		// 수동 번호 생성
		$("#self_check").click(function() {
			self.selfReset();
		});
		
		// 직접 뽑기
		$("#row_add").click(function() {
			self.addRow();
		});
		
		// row 선택
		$(document).on("click", ".btnIdx",function() {
			let rowIdx = $(this).parent().parent().index();
			// 인덱스 이동
			self.gIndex = rowIdx;
			
			// 백그라운드 표시
			$("#lottoTable tr").removeClass('bg-success');
			$(this).parent().parent().addClass('bg-success');
		});
		
		// 수동 번호 선택
		$(document).on("click", "input:checkbox",function() {
			let checkArr = self.getSelfCheckArr();
			let val = this.value;
			
			if(checkArr.length > 6) {
				alert("6개 이상 선택할수 없습니다.");
				$(this).prop("checked", false);
			} else {
				$("#selfCheckData").html(checkArr.join(', '));
			}
		});
		
		// 수동 선택
		$("#selfSave").click(function() {
			let checkArr = self.getSelfCheckArr();	
			if(checkArr.length === 6) {
				self.setLottoData(checkArr);
				$("#selfClose").click();
			} else {
				alert("번호 7개 선택해주세요.");
			}
		});
		
		// 카카오톡 보내기
		$("#kakao_send").click(function() {
			let mataData	= self.getLottoTableData();
			let dataObj 	= mataData.data;
			let rowCnt		= mataData.rowCnt;
			
			// 선택안됨
			if(rowCnt === 0) {
				alert("로또번호를 뽑아주세요.");
			} else {
				self.sendKakao(dataObj);
			}
			
		});
		
		// 홀수 제외
		$("#odd_remove").click(function() {
			self.odd_remove = true;
			$("#rendem_check").click();
			self.odd_remove = false;
		});
		
		// 짝수 제외
		$("#even_remove").click(function() {
			self.even_remove = true;
			$("#rendem_check").click();
			self.even_remove = false;
			
		});
		
		
		// 최신번호
		$("#last_remove").click(function() {
			self.last_remove = true;
			$("#rendem_check").click();
			self.last_remove = false;
			
			$("#last_nums").html("로또 번호 : " + self.lastNum_arr.join(", "));
			$("#last_num").html("로또 회차 : " + self.lastNum);
			
		});
		
	}
};

lotto.load();