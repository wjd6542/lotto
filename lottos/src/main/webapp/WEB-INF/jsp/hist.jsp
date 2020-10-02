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
	
	<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
	<link href="css/fontawesom-all.min.css" rel="stylesheet" type="text/css">
	<link href="css/highcharts.css" rel="stylesheet" type="text/css">
	<link href="css/agency.min.css" rel="stylesheet">
</head>


<body id="page-top">

	<!-- include -->
	<jsp:include page="./common/menu.jsp" flush="false" />
	<jsp:include page="./common/header.jsp" flush="false" />


	<!-- Services -->
	<section class="page-section" id="services">
		
		<div class="container">
			<h3>
				<i class="far fa-thumbs-up"></i> 역대 최대 당첨정보
			</h3>
			<hr>
			
			<div class="row">
				<div class="col-md-12">
					<h4 id="victory_ranking"></h4>
					<h4 id="victory_count"></h4>
					<h4 id="victory_total_price"></h4>
					<h4 id="victory_price"></h4>
					<h4 id="victory_num"></h4>
				</div>
			</div>
			<br><br>
			<br><br>
		
			<h3>
				<i class="far fa-chart-bar"></i> 1등 위치 정보
			</h3>
			<hr>
			
			<div class="row">
				<div class="col-md-6">
					<div id="addressGroup"></div>
				</div>
				
				<div class="col-md-6">
					<div id="addressRank"></div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-md-6" style="height: 600px; overflow: auto;">
					<table class="table" >
						<tr>
							<th>지역</th>
							<th>로또당첨(회)</th>
							<th>확률(%)</th>
						</tr>
						<tbody id="groupTable">
						
						</tbody>
					</table>
				</div>
				
				<div class="col-md-6" style="height: 600px; overflow: auto;">
					<table class="table">
						<tr>
							<th>지역</th>
							<th>중복당첨(회)</th>
							<th>확률(%)</th>
						</tr>
						<tbody id="rankTable">
						
						</tbody>
					</table>
				</div>
				
			</div>
		</div>
	</section>
	
	<section class="page-section" >
		<div class="container">
			<h3>
				<i class="far fa-chart-bar"></i> 구간별 출현 빈도
			</h3>
			<hr>
			<div class="row">
				<div class="col-md-6">
					<div id="layerPieChart"></div>
				</div>
				
				<div class="col-md-6">
					<div id="layerdBarChart"></div>
				</div>
			</div>
		</div>
		
		<div class="container">
			<h3>
				<i class="far fa-chart-bar"></i> 1등 게임타입 정보
			</h3>
			<hr>
			<div class="row">
				<div class="col-md-6">
					<div id="gameTypePercentageChart"></div>
				</div>
				
				<div class="col-md-6">
					<div id="gameTypeCountChart"></div>
				</div>
			</div>
		</div>
		
		<div class="container">
			<h3>
				<i class="far fa-chart-bar"></i> 1등 지역구 정보
			</h3>
			<hr>
			<div class="row">
				<div class="col-md-12">
					<div id="addrAreaChart"></div>
				</div>
			</div>
		</div>
	</section>
	
	<jsp:include page="./common/footer.jsp" flush="false" />
	<script src="js/lib/jquery.min.js"></script>
	<script src="js/lib/agency.js"></script>
	<script src="js/lib/underscore.js"></script>
	<script src="js/lib/highcharts.js"></script>
	<script src="js/init.js"></script>
	<script src="js/utility.js"></script>
	<script src="js/hist.js"></script>
</body>
</html>