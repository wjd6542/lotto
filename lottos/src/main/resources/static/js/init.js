
let loder = {
		
	// 최초 실행 함수
	init : function() {
		this.menuCheck();
		this.mainImgAreaLoader();
	},
	
	/**
	 * 현재 페이지 url 로드
	 * getUrl
	 */
	getUrl : function() {
		let urlData  = window.location.href;
		let url = urlData.split("/").pop();
		return url;
	},
	
	
	/**
	 * 메뉴 선택 함수
	 * menuCheck
	 */
	menuCheck : function() {
		let url = this.getUrl();
		
		if(url == "" || !url) {
			$("a[href='/index']").addClass("active");
		} else {
			$(`a[href='/${url}']`).addClass("active");
		}
	},

	/**
	 * 메인 이미지 영역 로드 함수
	 * mainImgAreaLoader
	 */
	mainImgAreaLoader : function() {
		let url = this.getUrl();
		let mappingMap = {
			index : {
				subText : "OH! 고통받는 당신이여 ~!",
				mainText : "로또를 통해 구원받으시오~!",
				imgPath : "",
				btnText : "회차 보기",
				btnIcon : "fas fa-arrow-down",
			},
			lotto : {
				subText		: "간단하게 뽑아보자",
				mainText	: "원하는 번호를 카톡으로~!",
				imgPath 	: "",
				btnText 	: "로또 뽑기",
				btnIcon 	: "fas fa-arrow-down",
			},
			hist : {
				subText		: "이제는 분석시대!",
				mainText	: "분석 정보를 참고하세요~!",
				imgPath 	: "",
				btnText 	: "분석 참고",
				btnIcon 	: "fas fa-arrow-down",
			},
			report : {
				subText		: "나도 보고받는다",
				mainText	: "로또 레포트를 참고하세요!",
				imgPath 	: "",
				btnText 	: "레포트 참고",
				btnIcon 	: "fas fa-arrow-down",
			},
			trend : {
				subText		: "어디로 흘러가는가?",
				mainText	: "트렌트 정보을 참고하세요!",
				imgPath 	: "",
				btnText 	: "트렌드 참고",
				btnIcon 	: "fas fa-arrow-down",
			},
		};
		
		let urlMap = mappingMap[url];
		
		// main img
		$("header.masthead").css("background-image", "");
		// main text
		$("#mainText").html(`${urlMap.mainText}`);
		// main text sub
		$("#subText").html(`${urlMap.subText}`);
		// btn text icon
		$("#mainBtn").html(`<i class="${urlMap.btnIcon}"></i> ${urlMap.btnText}`);
	},
};



loder.init();