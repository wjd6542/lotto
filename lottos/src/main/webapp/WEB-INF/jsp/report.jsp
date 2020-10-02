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

	<section class="page-section">
	
		<div class="container">
			<h3>
				<i class="fas fa-table"></i> 년도별 당첨 정보
			</h3>
			<div class="row">
				<div class="col-md-12" style="height: 600px; overflow: auto;">
					<table class="table">
						<thead>
							<tr>
								<th>년도</th>
								<th>확률(%)</th>
								<th>당첨 인원(명)</th>
								<th>총 금액(원)</th>
								<th>인당 금액(원)</th>
							</tr>
						</thead>
						<tbody id="yearFirstOneDataList"></tbody>						
					</table>
				</div>
			</div>
		</div>
		
		<br>
		<div class="container">
			<h3>
				<i class="fas fa-table"></i> 월별 당첨 정보
			</h3>
			<div class="row">
				<div class="col-md-12" style="height: 600px; overflow: auto;">
					<table class="table">
						<thead>
							<tr>
								<th>년도</th>
								<th>확률(%)</th>
								<th>당첨 인원(명)</th>
								<th>총 금액(원)</th>
								<th>인당 금액(원)</th>
							</tr>
						</thead>
						<tbody id="monthFirstOneDataList"></tbody>						
					</table>
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
	<script src="js/report.js"></script>
</body>
</html>