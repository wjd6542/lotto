<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	
	<title>로또야 구해줘!</title>
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/fontawesom-all.min.css" rel="stylesheet" type="text/css"> 
	<link href="css/highcharts.css" rel="stylesheet" type="text/css">
	<link href="css/agency.min.css" rel="stylesheet">
	<link href="css/fSelect.css" rel="stylesheet">
	
</head>


<body id="page-top">

	<!-- include -->
	<jsp:include page="./common/menu.jsp" flush="false" />
	<jsp:include page="./common/header.jsp" flush="false" />


	<!-- Services -->
	<section class="page-section" id="services">
		<div class="container">
			<h3>
				<i class="fas fa-chart-line"></i> 년도별 정보
			</h3>
			<div></div>
			<hr>
			<div class="row">
				<div class="col-md-12">
					<div id="yearPriceChart"></div>
				</div>
			</div>
		</div>
		
		<div class="container">
			<h3>
				<i class="fas fa-chart-line"></i> 회차별 정보
			</h3>
			<hr>
			<div class="row">
				<div class="col-md-12">
					<div id="orderChart"></div> 
				</div>
			</div>
		</div>
		
		<div class="container">
			<h3>
				<i class="far fa-chart-bar"></i> 회차별 당첨횟수
			</h3>
			<hr>
			<div id="customLegend" class="col-md-4"></div>
			
			<div class="row">
				<div id="numberFrequencyChart" class="col-md-12"></div>
			</div>
		</div>
		
		<div class="container">
			<h3>
				<i class="far fa-chart-bar"></i> 번호별 출현 빈도
			</h3>
			<hr>
			
			<div class="row">
				<div id="numCountChart" class="col-md-12"></div>
			</div>
		</div>
		
		
		
		<div class="container">
			<h3>
				<i class="fas fa-chart-line"></i> 1등 상점 지역별 당첨인원
			</h3>
			<hr>
			<div class="row">
				<div class="col-md-12">
					<div id="addrRankingChart"></div>
				</div>
			</div>
		</div>
		
	</section>


	<jsp:include page="./common/footer.jsp" flush="false" />


	<script src="js/lib/jquery.min.js"></script>
	<script src="js/lib/jquery.easing.min.js"></script>
	<script src="js/lib/agency.js"></script>
	<script src="js/lib/underscore.js"></script>
	<script src="js/lib/highcharts.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNcjkWjPGaQjOq9YNgZPQA1SUiQGYiC08&region=KR "></script>
	<script src="js/init.js"></script>
	<script src="js/utility.js"></script>
	<script src="js/trend.js"></script>
</body>
</html>