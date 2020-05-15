let utility = {
	/**
	 * ajax 통신
	 * ajax
	 */
	ajax : function(url, data) {
		let result = {};
		$.ajax({ 
			url		: url, 
			data	: data,
			async	: false,
			type	: "POST",
			cache : false,
			success: function(data) {
				result = data;
			},
			error : function(e) {
				console.log(e);
				result.status	= "fail";
				result.msg		= e.message;
			}
		});
		return result;
	},
	
	/**
	 * 금액단위 변경
	 * numberCommas
	 */
	numberCommas : function(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
	/**
	 * 금액단위 변경 한글
	 * numberHan
	 */
	numberHan : function(number) {
		var inputNumber  = number < 0 ? false : number;
	    var unitWords    = ['', '만', '억', '조', '경'];
	    var splitUnit    = 10000;
	    var splitCount   = unitWords.length;
	    var resultArray  = [];
	    var resultString = '';

	    for (var i = 0; i < splitCount; i++){
	         var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
	        unitResult = Math.floor(unitResult);
	        if (unitResult > 0){
	            resultArray[i] = unitResult;
	        }
	    }

	    for (var i = 0; i < resultArray.length; i++){
	        if(!resultArray[i]) continue;
	        resultString = String(resultArray[i]) + unitWords[i] + resultString;
	    }
	    return resultString;
	},
	
};
