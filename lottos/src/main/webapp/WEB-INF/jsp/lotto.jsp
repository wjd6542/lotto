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
	<link href="css/agency.min.css" rel="stylesheet">
</head>


<body id="page-top">

	<!-- include -->
	<jsp:include page="./common/menu.jsp" flush="false" />
	<jsp:include page="./common/header.jsp" flush="false" />


	<!-- Services -->
	<section class="page-section" id="services">
		<div class="container">
			<h3><i class="fas fa-check-double"></i> 로또 뽑기</h3>
			<hr>
			<div class="row col-md-12">
				
			</div>
			
			<div class="row col-md-12">
				<div class="btn btn-primary btn-sm" data-toggle="collapse" href="#coll2" aria-expanded="false" aria-controls="coll2">
				  <i class="far fa-question-circle"></i> 도움말
				</div>
				&nbsp;
				<div class="btn btn-danger btn-sm" data-toggle="collapse" href="#coll1" aria-expanded="false" aria-controls="coll1">
					  <i class="far fa-minus-square"></i> 제외
				</div>
				&nbsp;
				<div class="btn btn-info btn-sm" id="rendem_all">
					<i class="fas  fa-sync"></i> 전체 자동
				</div> 
				&nbsp;
				<div class="btn btn-info btn-sm" id="rendem_check">
					<i class="fas fa-sync"></i> 자동
				</div> 
				&nbsp;
				<div class="btn btn-info btn-sm" id="self_check" data-toggle="modal" data-target=".lottoModal">
					<i class="far fa-hand-pointer"></i> 수동
				</div> 
				&nbsp;
				<div class="btn btn-info btn-sm" id="kakao_send">
					<i class="far fa-paper-plane"></i> 카톡으로
				</div>
			</div>
		</div>
			
		<div class="container">
			<div class="collapse" id="coll2">
				<hr>
				<div id="statusMsg">
					1. 전체 자동 클릭시  5개 로또번호를 자동으로 뽑을수있습니다.<br>
					2. 자동 클릭시 로또번호를 자동으로 뽑을수있습니다.<span style="color:red">(선택행 적용)</span><br>
					3. 수동 선택시 원하시는 번호를 선택후 뽑을수 있습니다.<span style="color:red">(선택행 적용)</span><br>
					4. 제외 클릭시 원하는 제외 로직으로 로또번호를 뽑을수 있습니다. <span style="color:red">(선택행 적용)</span><br>
					5. 홀수 제외시 짝수번호만 추출됩니다.<span style="color:red">(선택행 적용)</span><br>
					6. 짝수 제외시 홀수번호만 추출됩니다.<span style="color:red">(선택행 적용)</span><br>
					7. 최신번호 제외시 회차번호를 제외한 번호만 추출됩니다. <span style="color:red">(보너스번호 적용)</span><br>
				</div>
			</div>
			
			<div class="collapse" id="coll1">
			  <div class="well">
			  <hr>
			   <div class="btn btn-danger" id="odd_remove">
					<i class="far fa-hand-point-up"></i> 홀수
				</div>
				
				<div class="btn btn-danger" id="even_remove">
					<i class="far fa-hand-peace"></i> 짝수
				</div>
				
				<div class="btn btn-danger" id="last_remove">
					new 최신 번호
				</div>
			  </div>
			</div>
			<br><br>
			
			<div class="row">
				<div>
					<h4 id="last_num"></h4>
					<h4 id="last_nums"></h4>
				</div>
			</div>
			
			<div class="row text-center">
				
				<table id="lottoTable" class="table">
					<tr>
						<th>선택</th>
						<th>1</th>
						<th>2</th>
						<th>3</th>
						<th>4</th>
						<th>5</th>
						<th>6</th>
					</tr>
				</table>
			</div>
		</div>
	</section>

	<jsp:include page="./common/footer.jsp" flush="false" />



	<div class="modal lottoModal fade" role="dialog"
		aria-labelledby="gridSystemModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="gridSystemModalLabel">
						<i class="far fa-hand-pointer"></i> 수동 뽑기
					</h4>
				</div>
				<div class="modal-header">
					<button type="button" class="btn btn-primary" id="selfSave">
						<i class="fas fa-check"></i> 적용
					</button>
					<button type="button" class="btn btn-danger" id="selfClose" data-dismiss="modal">
						<i class="far fa-times-circle"></i> 닫기
					</button>
				</div>
				<div class="modal-body" id="modal-body">
					<div>
						<b>선택번호 : <span id="selfCheckData"></span></b>
					</div>
					<hr>
					<table class="row" id="dataArea">
					
					</table>
				</div>
				
			
			</div>
		</div>
	</div>


	<script src="js/lib/jquery.min.js"></script>
	<script src="js/lib/bootstrap.bundle.min.js"></script>
	<script src="js/lib/jquery.easing.min.js"></script>
	<script src="js/lib/agency.js"></script>
	 <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
	<script src="js/init.js"></script>
	<script src="js/utility.js"></script>
	<script src="js/lotto.js"></script>
</body>
</html>