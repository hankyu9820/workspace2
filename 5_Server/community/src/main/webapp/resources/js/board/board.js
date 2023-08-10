// 상세조회, 게시글 작성 - 목록으로 버튼

/* 즉시실행함수 */
(function(){
    const goToListBtn = document.getElementById("goToListBtn");

    if(goToListBtn != null){ // 목록으로 버튼이 화면에 있을 때만 이벤트 추가하겠다. 

        // 상세조회, 게시글 작성에 둘다 같은 id의 목록으로 버튼이있음 둘다 board.js와 연결되어있음

        goToListBtn.addEventListener("click", function(){

            // location 객체(BOM)

            // 문자열.substring(시작, 끝) : 시작 이상 끝 미만 인덱스까지 문자열 자르기

            // 문자열.indexOf("검색 문자열", 시작 인덱스)
            // : 문자열에서 "검색 문자열"의 위치(인덱스)를 찾아서 반환
            // 단, 시작 인덱스 이후부터 검색

            const pathname = location.pathname; // 주소상에서 요청 경로 반환
           
            // location.pathname을 사용하여 현재 페이지의 경로를 반환한다. 
            // 결과는 문자열로 반환되며,  
            // "/community/board/detail"(상세조회) 나 /community/board/write(게시글 작성) 페이지의 경로를 반환





            // 이동할 주소를 저장
            let url = pathname.substring(0, pathname.indexOf("/", 1));
            // url에 /community가 저장됨
           
            // pathname 에는  "/community/board/detail"(상세조회) 나 /community/board/write(게시글 작성) 이 담겨있음

            // 여기서 시작 인덱스는 0이고, 끝 인덱스는 pathname.indexOf("/", 1)입니다.
            //pathname.indexOf("/", 1)은 pathname 문자열에서 두 번째 '/'의 인덱스를 반환합니다.
            // 즉, "/community/board/detail" 문자열에서 첫 번째 '/' 다음에 나오는 '/'의 인덱스를 반환하는 것입니다. 
            // / 가 아닌 c부터 검색하게 됨. --> 처음부터 2번쨰 / 전까지 짜르겠다.


            


            
            url += "/board/list?" 
            // "/community/board/detail"(상세조회) 나 /community/board/write(게시글 작성) 현재 페이지에서
            // /community 까지 짤라서
            // /community/board/list? 를 붙여준다
            
            /* http://localhost:8080/community/board/detail?no=1502&cp=1&type=1 에서 */
            /* http://localhost:8080/community/board/list?type=1 으로 */
            
            
            


            // URL 내장 객체 : 주소 관련 정보를 나타내는 객체
            // location.href : 현재 페이지 주소 + 쿼리스트링
            // URL.searchParams : 쿼리 스트링만 별도 객체로 반환

            const params = new URL(location.href).searchParams;
            // new URL(location.href)는 현재 페이지의 URL을 나타내는 URL 객체를 생성합니다.
            //.searchParams는 URL 객체의 search 부분을 가지고 있는 URLSearchParams 객체를 반환합니다.
            // 따라서 const params는 현재 페이지 URL의 쿼리 매개변수를 가지고 있는 URLSearchParams 객체입니다. 
            // 이 객체를 사용하여 쿼리 매개변수를 읽기 및 조작할 수 있습니다.
            
            // --> 현재 페이지의 쿼리 스트링 부분만 담겠다.

            const type = "type=" + params.get("type"); // type = 1
            let cp; 

/*             if(params.get("cp") == null){
                cp = "cp=1";
            }

            if(params.get("cp") != ""){ // 퀴리스트링에 cp가 있을 경우
                cp = "cp=" + params.get("cp");
            } else{
                cp = "cp=1";
            }  */

            
            if(params.get("cp") != ""){ // 쿼리스트링에 cp가 있을 경우
                cp = "cp=" + params.get("cp"); //상세조회 경우에는 cp가 있어서 목록으로 누르면 해당 페이지로감 15p -> 15p
            
            }
            
            if(params.get("cp") == null){ // cp="" 이면 (게시글 작성에서의 목록으로를 위함)
                cp = "cp=1"; 

                // 1페이지로 가는게 싫고 해당 페이지로 돌아갈거면
                // location.href='write?mode=insert&type=${param.type} 에서
                // location.href='write?mode=insert&type=${param.type}&cp=${param.cp}로 바꿔주면 된다.
                // 바꿨기 때문에  // 처음 1페이지에서 글쓰기 화면에서의 cp= 빈문자열임일때 적용이

                // 처음 1페이지에서 글쓰기 화면에서의 cp= 빈문자열임
            }

            if(params.get("cp") == ""){ // 처음 1페이지에서 글쓰기 화면에서의 cp= 빈문자열임
                cp = "cp=1";
            } 

            // if cp != '' -> cp = "cp=" + params.get("cp"); 
            // else -> cp = "cp=1"; 로 해도 된다.

            
            // 조립
            url += type + "&" + cp
            // /community/board/list? += type= 숫자 얻어온거 + & + cp = 숫자 얻어온거

            // 검색 key,query가 존재하는 경우 url에 추가
            if(params.get("key") != null){
                const key = "&key=" + params.get("key");
                const query = "&query=" + params.get("query");

                url += key + query; // url 뒤에 붙이기

            }
            
            location.href = url;
            // /community/board/list?type=1&cp=1 첨부터 쿼리스트링 끝까지 다 담기게 되고
            // location.href = "주소"; -> 해당 주소로 이동하게 된다. 그냥 문장 실행되면 이동하나봄

        });

    }

})();

// 즉시 실행 함수 : 성능 up, 변수명 중복 X
(function(){

    const deleteBtn = document.getElementById("deleteBtn"); // 존재하지 않으면 null

    if(deleteBtn != null){ // 버튼이 화면이 존재할 때만 함수를 실행함

        deleteBtn.addEventListener("click",function(){
            // 현재 위치 : /community/board/detail?no=1500&cp=1&type=1
            // 목표 위치 : /community/board/delete?no=1500&type=1
            // 상대 경로 -> delete

            let url = "delete"; 

            // 주소에 작성된 쿼리스트링에서 필요한 파라미터만 얻어오기

            // 현재 페이지 주소에서 쿼리스트링에 존재하는 파라미터만 얻어온다.
            const params = new URL(location.href).searchParams; 

            const no = "?no=" + params.get("no");

            const type = "&type=" + params.get("type");

            url += no + type;

            if(confirm("정말로 삭제하시겠습니까?")){
                location.href = url; // get방식으로 url에 요청
            }
        
        });
    
    }

})();

// 검색창에 이전 검색기록 반영하기
(function(){

    const select = document.getElementById("search-key");
    const input = document.getElementById("search-query");

    //const option = select.children; // 4개있음
    const option = document.querySelectorAll("#search-key > option"); // css 선택자

    if(select != null){ // 검색창 화면이 존재할 때만 코드를 적용하겠다.

        // 현재 주소에서 쿼리스트링(파라미터) 얻어오기
        const params = new URL(location.href).searchParams;

        // 얻어온 파라미터 중 key, query만 변수에 저장하겠다.
        const key = params.get("key");
        const query = params.get("query");

        // input에 query값 대입
        input.value = query;

        // option을 반복 접근해서 value와 key와 같으면 selected 속성 추가
        for(let op of option){
            
            if(op.value == key){
                op.selected = true;
            }
        }

    }

})();

// 검색 유효성 검사(검색어를 입력했는지 확인)

function searchValidate(){

    const input = document.getElementById("search-query");

    if(input.value.trim().length == 0){
        alert("검색어를 입력해주세요.");
        input.focus();
        return false;
    }

    return true;

}

// 즉시 실행 함수
(function(){
    const thumbnail = document.getElementsByClassName("list-thumbnail");


    if(thumbnail.length > 0){ // 목록에 썸네일 이미지가 있을 경우에만 이벤트 추가
     
        const modal = document.querySelector('.modal');
        const modalImage = document.getElementById("modal-image");
        const modalClose = document.getElementById("modal-close");


        for(let th of thumbnail){
            th.addEventListener("click", function(){
                modalImage.setAttribute("src", th.getAttribute("src") );
               
                /* on/off 스위치 */
                // classList.toggle("클래스명") : 클래스가 없으면 추가(add)
                //                                클래스가 있으면 제거(remove)
               
                modal.classList.toggle('show'); // add
            });
        }


        // X버튼
        modalClose.addEventListener("click", function(){
           
            modal.classList.toggle('hide'); // hide 클래스 추가


            setTimeout(function(){ // 0.45초 후 동작
                modal.classList.toggle('hide'); // hide 클래스 제거


                modal.classList.toggle('show'); // remove
            }, 450);
        });




    }


})();

