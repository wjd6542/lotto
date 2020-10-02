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
				<i class="fas fa-search"></i> 회차별 찾아 보기
			</h3>

			<div class="row col-md-2">
				<select class="form-control" id="drawNo"></select>
			</div>

			<hr>
			<div class="row">
				<div class="col-lg-12 text-center">
					<h2 class="section-heading text-uppercase">
						<span class="drawNo"></span>회차 당첨 번호
					</h2>
					<h3 class="section-subheading text-muted">당첨금 지급기한 : 지급개시일로부터
						1년 (휴일인 경우 익영업일)</h3>
				</div>
			</div>


			<div class="row text-center">
				<table id="webView" style="width: 100%;">
					<tr>
						<td>
							<div class="corcle bg-red num1"></div>
						<td>
						<td>
							<div class="corcle bg-yellow num2"></div>
						<td>
						<td>
							<div class="corcle bg-blue num3"></div>
						<td>
						<td>
							<div class="corcle bg-red num4"></div>
						<td>
						<td>
							<div class="corcle bg-red num5"></div>
						<td>
						<td>
							<div class="corcle bg-green num6"></div>
						<td>
						<td>
							<div class="corcle bg-bonus bonusNum"></div>
						<td>
					</tr>
				</table>
				<table id="mobileView" style="width: 100%;">
					<tr>
						<td>
							<div class="m_corcle bg-red num1"></div>
						<td>
						<td>
							<div class="m_corcle bg-yellow num2"></div>
						<td>
						<td>
							<div class="m_corcle bg-blue num3"></div>
						<td>
						<td>
							<div class="m_corcle bg-red num4"></div>
						<td>
						<td>
							<div class="m_corcle bg-red num5"></div>
						<td>
						<td>
							<div class="m_corcle bg-green num6"></div>
						<td>
						<td>
							<div class="m_corcle bg-bonus bonusNum"></div>
						<td>
					</tr>
				</table>
			</div>
		</div>
	</section>

	<section class="page-section">
		<div class="container">
			<h3>
				<i class="far fa-chart-bar"></i> <span class="drawNo"></span>회차 순위별
				현황
			</h3>
			<hr>
			<div class="row">
				<div class="col-md-6 col-lg-6">
					<div id="lackChart"></div>
				</div>
				<div class="col-md-6 col-lg-6">
					<div id="priceList"></div>
				</div>
			</div>
		</div>
	</section>


	<section class="page-section">
		<div class="container">
			<h3>
				<i class="far fa-clipboard"></i> <span class="drawNo"></span>회차 순위별
				집계
			</h3>
			<hr>
			<div class="row">
				<div class="col-lg-12 text-center">
					<div class="table-responsive">
						<table id="dataTable" class="table table-bordered">

						</table>
					</div>
				</div>
				<div class="col-lg-12 text-left">
					추첨 일자 : <span id="drawDate"></span>
				</div>
				<div class="col-lg-12 text-left">
					총판매금액 : <span id="total"></span>
				</div>
			</div>
		</div>
	</section>


	<section class="page-section">
		<div class="container">
			<h3>
				<i class="fas fa-map-marker-alt"></i> <span class="drawNo"></span>회 로또 1등 당첨점
			</h3>
			<hr>
			<div class="row">
				<div id="map" style="width : 100%; height:500px;"></div>
			</div>
		</div>
	</section>


	<jsp:include page="./common/footer.jsp" flush="false" />

	<script src="js/lib/jquery.min.js"></script>
	<script src="js/lib/jquery.easing.min.js"></script>
	<script src="js/lib/agency.js"></script>
	<script src="js/lib/fSelect.js"></script>
	<script src="js/lib/highcharts.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNcjkWjPGaQjOq9YNgZPQA1SUiQGYiC08&region=KR "></script>
	<script src="js/init.js"></script>
	<script src="js/utility.js"></script>
	<script src="js/index.js"></script>
</body>
</html>