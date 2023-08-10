<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- ${map.boardList[0].boardTitle} 로 쓰면 번거로움-->
<!-- map에 저장된 값을 각각 변수에 저장 -->
<c:set var="boardName" value = "${map.boardName}"/>
<c:set var="pagination" value = "${map.pagination}"/>
<c:set var="boardList" value = "${map.boardList}"/>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${boardName}</title>

    <link rel="stylesheet" href="${contextPath}/resources/css/main-style.css">
    
    <link rel="stylesheet" href="${contextPath}/resources/css/boardList-style.css">

    <script src="https://kit.fontawesome.com/16679b9adf.js" crossorigin="anonymous"></script>

</head>

<body>

    <main>
      
        <jsp:include page="/WEB-INF/views/common/header.jsp"/>

        <%-- 검색을 진행한 경우 key, query를 쿼리스트링 형태로 저장한 변수 생성 --%>
        <c:if test="${!empty param.key}">
            <c:set var="sURL" value="&key=${param.key}&query=${param.query}"/>
            
        </c:if>
        <!-- key가 있을 경우(검색을 했을 경우) sURL에 key=?&query=? 를 담음 그리고  detail로 들어갈 때 등 모든 a태그 주소에 ${sURL}를 붙임,-->
         <!-- 벨류가 있다면 주소에 붙을거고 없다면 원래대로 됨 -->

        <section class="board-list">

            <h1 class="board-name">${boardName}</h1>

            <c:if test="${!empty param.key}">
                <h3 style="margin-left:30px;">"${param.query}" 검색 결과</h3>
            </c:if>


            <div class="list-wrapper">
                
                <table class="list-table">
                    
                    <thead>
                        <tr>

                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                            
                        </tr>
                    </thead>


                    <tbody>
                        <!-- c:if는 else 없음 -> choose씀 choose안에는 html 주석 불가능 -->
                        <c:choose>

                            <c:when test="${empty boardList}">
                                <!-- 게시글 목록 조회 결과가 비어있다면 -->
                                <tr>
                                    <th colspan="5">게시글이 존재하지 않습니다.</th>
                                </tr>
                            </c:when>

                            <c:otherwise>
                                <!-- 게시글 목록 조회 결과가 비어있지 않다면 -->

                                <!-- 향상된 for문처럼 사용 -->
                                <c:forEach var="board" items="${boardList}"> <!-- 꺼낸거에 대해 board라고 하겠다. var board는 객체임 -->
                                    <tr>
                                        <td>${board.boardNo}</td>
                                        
                                        <td>
	                                        <c:if test="${!empty board.thumbnail}">
	                                        	<img class="list-thumbnail" src="${contextPath}${board.thumbnail}">
	                                        </c:if>
            						
                                        	<a href="detail?no=${board.boardNo}&cp=${pagination.currentPage}&type=${param.type}${sURL}">${board.boardTitle}</a>
                                        </td>
            
                                        <td>${board.memberNickname}</td>
            
                                        <td>${board.createDate}</td>
            
                                        <td>${board.readCount}</td>
                                    </tr>

                                </c:forEach>

                            </c:otherwise>

                        </c:choose>

                    </tbody>

                </table>

            </div>

                <div class="btn-area">
                    
                    <c:if test="${!empty loginMember}"> <!-- 로그인 한 경우에만 -->

                        <!-- /community/board/write -->
                        <button id="insertBtn" onclick="location.href='write?mode=insert&type=${param.type}&cp=${param.cp}'">글쓰기</button>
                                                        <!-- get방식임 form말고는 걍 다 get이라 생각 -->
                                                        <!-- http://localhost:8080/community/board/list?type=1 에서 type 쿼리스트링으로 param.type -->
                                                        <!-- http://localhost:8080/community/board/write?mode=insert&type=1 으로 -->
                    </c:if>

                </div>

                <!-- ${param.type}  --><!-- 리퀘스트로 타입 전달되서 옴. el로 표현 (파라미터의 타입)-->

                <div class="pagination-area">
                    
                    <!-- 페이지네이션 a태그에 사용될 공통 주소를 저장할 변수 선언 -->
                    <c:set var="url" value="list?type=${param.type}&cp="/>

                    <ul class="pagination">
                        
                        <!-- 첫 페이지로 이동 -->
                        <li><a href="${url}1${sURL}">&lt;&lt;</a></li> <!-- 리스트 넘기기, <<로 처음화면 가게하기? -->
                        
                        <!-- 이전 목록 마지막 번호로 이동 -->
                        <li><a href="${url}${pagination.prevPage}${sURL}">&lt;</a></li> 

                        <!-- li*10>a{$} -->

                                <!-- ${contextPath}/board/list?type=1&cp=2 절대경로-->
                                <!-- list?type=1&cp=2 상대경로 -->


                        <!-- 범위가 정해진 일반 for문 사용 -->
                        <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">

                            <c:choose>
                                <c:when test="${i == pagination.currentPage}">
                                    <li><a class="current">${i}</a></li> <!-- 첫페이지는 기본값이라 링크 x -->
                                </c:when>
                                <c:otherwise>
                                    <li><a href="${url}${i}${sURL}">${i}</a></li>    
                                </c:otherwise>
                            </c:choose>

                        </c:forEach>

                        <li><a href="${url}${pagination.nextPage}${sURL}">&gt;</a></li> 

                        <!-- 끝 페이지로 이동 -->
                        <li><a href="${url}${pagination.maxPage}${sURL}">&gt;&gt;</a></li> 
                    </ul>
                </div>

                <!-- /board/list/type=1&cp=3 -->

                <!-- /board/list/type=1&key=t&query=안녕 -->
                <form action="list" method="get" id="boardSearch" onsubmit="return searchValidate()">
                    
                    <input type="hidden" name="type" value="${param.type}">

                    <select name="key" id="search-key">
                        <option value="t">제목</option>
                        <option value="c">내용</option>
                        <option value="tc">제목+내용</option>
                        <option value="w">작성자</option>
                    </select>

                    <input type="text" name="query" id="search-query" placeholder="검색어를 입력해주세요.">
                    
                    <button>검색</button>

                </form>

        </section>

        </main>

		<div class="modal">
	        <span id="modal-close">&times;</span>
	        <img id="modal-image" src="${contextPath}/resources/images/user.png">
    	</div>


        <jsp:include page="/WEB-INF/views/common/footer.jsp"/>

        <script src="${contextPath}/resources/js/board/board.js"></script>

</body>

</html>