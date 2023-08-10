<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%

	String msg = (String)request.getAttribute("message");
	String id = request.getParameter("memberId");
	String pw = request.getParameter("memberPw");
	String name = request.getParameter("memberName");
	String intro = request.getParameter("intro"); // 파라미터는 스트링이다.

%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<ul>
		<li>아이디 : <%=id %></li>
		<li>비밀번호 : <%=pw %></li>
		<li>이름 : <%=name %></li>
		<li>자기소개 : <%=intro %></li>
	</ul>

	<h1><%= msg %></h1>


</body>
</html>