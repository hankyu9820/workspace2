<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>지진해일 긴급대피 장소정보 조회</title>
<script src="https://code.jquery.com/jquery-3.7.0.min.js" integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
</head>
<body>

    
   <button id="btn">지진해일 긴급대피 장소정보 조회</button>
   <br><br>
   
   <table border="1" id="result">
      <thead>
         <tr>
            <th>시도명</th>
            <th>시군구명</th>
            <th>대피지구명</th>
            <th>대피장소명</th>
            <th>주소</th>
            <th>경도</th>
            <th>위도</th>
            <th>수용가능인원수</th>
            <th>대피소 분류명</th>
            <th>해변으로부터거리</th>
            <th>대피소 분류명</th>
            <th>내진적용여부</th>
            <th>해발높이</th>
         </tr>
      </thead>
      <tbody></tbody>
   </table>
    


</body>

<script>
    $(function (){
		$("#btn").click(function () {
			
			$.ajax({
				url : "tsunami",
				success : function(result){
					const item = $(result).find("row");
					
					let value;
					item.each(function (index, item){
						
						value += "<tr>"
							  +  "<td>" + $(item).find("sido_name").text() + "</td>"
							  +  "<td>" + $(item).find("sigungu_name").text() + "</td>"
							  +  "<td>" + $(item).find("remarks").text() + "</td>"
							  +  "<td>" + $(item).find("shel_nm").text() + "</td>"
							  +  "<td>" + $(item).find("address").text() + "</td>"
							  +  "<td>" + $(item).find("lon").text() + "</td>"
							  +  "<td>" + $(item).find("lat").text() + "</td>"
							  +  "<td>" + $(item).find("shel_av").text() + "</td>"
							  +  "<td>" + $(item).find("lenth").text() + "</td>"
							  +  "<td>" + $(item).find("shel_div_type").text() + "</td>"
							  +  "<td>" + $(item).find("seismic").text() + "</td>"
							  +  "<td>" + $(item).find("height").text() + "</td>"
							  +"</tr>"
					})
					
					$("#result > tbody").html(value);
					
				},
				error : function(){
					console.log("통신 실패");
				}
				
				
			})
			
			
		})
		
		
	})
 








</script>


</html>