/* signUp.js */

// 유효성 검사 여부를 기록할 객체를 생성
const checkObj = { // 객체 = { key value}

    "memberEmail" : false,
    "memberPw" : false,
    "memberPwConfirm" : false,
    "memberNickname" : false,
    "memberTel" : false

};


// 전화번호 유효성 검사
const memberTel = document.getElementById("memberTel");
const telMessage = document.getElementById("telMessage");

// ** input 이벤트 **
// -> 입력과 관련된 모든 동작(key 관련, mouse관련, 붙여넣기)

memberTel.addEventListener("input",function(){

    // 입력이 되지 않은 경우
    if(memberTel.value.trim().length == 0){
        telMessage.innerText = "전화번호를 입력해주세요test.(- 제외)";
        telMessage.classList.remove("confirm", "error");

        checkObj.memberTel = false; // 유효하지 않은 상태임을 기록한다.
        // 유효하면 true라 다시 유효하지 않을 때 false를 해줘야하는듯?

        return;

    }

// 전화번호 정규식

    const regExp = /^0(1[01679]|2|[3-6][1-5]|70)\d{3,4}\d{4}$/;

     if(regExp.test(memberTel.value)){ // 유효한 경우

        telMessage.innerText = "전화번호가 유효한 형식입니다.";

        telMessage.classList.add("confirm");

        telMessage.classList.remove("error");

        checkObj.memberTel = true; // 유효한 상태임을 기록한다.

    }else{

        telMessage.innerText = "전화번호가 유효하지 않은 형식입니다.";

        telMessage.classList.remove("confirm");

        telMessage.classList.add("error");

        checkObj.memberTel = false; // 유효하지 않은 상태임을 기록

    } 

});

// 이메일 유효성 검사
const memberEmail = document.getElementById("memberEmail");
const emailMessage = document.querySelector("#emailMessage"); // queryselect -> css 선택자

memberEmail.addEventListener("input",function(){

    // 입력이 되지 않은 경우
    if(memberEmail.value.trim().length == 0){

        emailMessage.innertext = "메일을 받을 수 있는 이메일을 입력해주세요.";
        emailMessage.classList.remove("confirm","error");

        checkObj.memberEmail = false; // 유효 x 기록

        return;
    }

    // 입력된 경우
    const regExp2 = /^[\w\-\_]{4,}@[\w\-\_]+(\.\w+){1,3}$/;

    // user01@naver.com
    // jeon-hs@iei.or.kr
    // test_1@ko.or.kr
    // + -> @ 뒤에 한글자 이상은 나와야 한다.
    // (){1,3} -> ()안의 묶음이 3개까지 가능하게 함. ko.or.kr

    if(regExp2.test(memberEmail.value)){ // 유효한 경우



        // ** 이메일 중복 검사(ajax)

        // $.ajax( { K:V , K:V} ); -> jQuery ajax 기본 형태
        
        // 입력된 이메일 == memberEmail.value
        $.ajax({
            url : "emailDupCheck", // 필수 속성 url
            // 현재 주소 : /community/member/signUp <- 최상위 주소가 없어서?
            // 상대 경로 : /community/member/emailDupcheck

            data : { "memberEmail" : memberEmail.value},   //{ k : v}
            // data속성 : 비동기 통신 시 서버로 전달할 값을 작성(JS 객체 형식)
            // 비동기 통신 시 input에 입력된 값을 
            // "memberEmail" 이라는 key 값 (파라미터)로 전달

            type : "GET", // 데이터 전달 방식 type

            success : function(result){

                
                // 비동기 통신(ajax)가 오류없이 요청/응답 성공한 경우

                // 매개변수 result : servlet에서 출력된 result값이 담겨있음

                //console.log(result);

                if(result == 1){ // 중복 O 

                    emailMessage.innerText = "이미 사용중인 이메일입니다.";

                    emailMessage.classList.add("error");
                    emailMessage.classList.remove("confirm");
            
                    checkObj.memberEmail = false; // 유효 o 기록

                }else{ // 중복 X

                    emailMessage.innerText = "사용 가능한 이메일입니다.";

                    emailMessage.classList.add("confirm");
                    emailMessage.classList.remove("error");
            
                    checkObj.memberEmail = true; // 유효 o 기록


                }

            },
                    

            error : function(){

                // 비동기 통신(ajax) 중 오류가 발생한 경우
                console.log("에러 발생");
            }

         })

        

    }else{ // 유효하지 않은 경우

        emailMessage.innerText = "이메일 형식이 유효하지 않습니다."

        emailMessage.classList.add("error");
        emailMessage.classList.remove("confirm");

        checkObj.memberEmail = false; // 유효 x 기록

    }

});

// 닉네임 유효성 검사
const memberNickname = document.getElementById("memberNickname");
const nicknameMessage = document.getElementById("nicknameMessage");

memberNickname.addEventListener("input", function(){
    // 입력되지 않은 경우

    if(memberNickname.value.trim().length == 0){
        nicknameMessage.innerText = "영어/숫자/한글 2~10글자 사이로 작성해주세요.";
        nicknameMessage.classList.remove("confirm","error");
       
        checkObj.memberNickname = false; // 유효 x 기록

        return;

    }

    const repExp3 = /^[가-힇a-zA-Z0-9]{2,10}$/;

    if(repExp3.test(memberNickname.value)){

        /* 닉네임 중복검사 ajax */

        // /community/member/nicknameDupCheck
        $.ajax({

            url : "nicknameDupCheck", // 필수 작성 속성
            // 현재 주소 : /community/member/signUp -> /community/member/signUp

            data : { "memberNickname" : memberNickname.value }, 
            // 서버로 전달할 값 : 파라미터
            // 비동기 통신 시 input에 입력된 값을 
            // "memberNickname" 이라는 key 값 (파라미터)로 전달 -> 서블릿에서 파라미터로 쓸거임 이름 달라도 상관 x
            
            type : "GET", // 데이터 전달 방식(기본값 GET)

            success : function(rst){ // 비동기 통신이 성공했을 때(에러 발생 X)

                // 매개변수 rst : servlet에서 응답으로 출력된 데이터가 저장

                if(rst == 1){ // 중복

                    nicknameMessage.innerText = "이미 사용중인 닉네임입니다.";

                    nicknameMessage.classList.add("error");
                    nicknameMessage.classList.remove("confirm");
            
                    checkObj.memberNickname = false; // 유효 x 기록

                }else{ // 중복 X

                    nicknameMessage.innerText = "사용 가능한 닉네임입니다.";

                    nicknameMessage.classList.add("confirm");
                    nicknameMessage.classList.remove("error");
            
                    checkObj.memberNickname = true; // 유효 o 기록

                }

            },

            error : function(){ // 비동기 통신중 에러가 발생한 경우
                console.log("에러 발생");

            }

        })

    }else{
        
        nicknameMessage.innerText = "닉네임 형식이 유효하지 않습니다.";

        nicknameMessage.classList.add("error");
        nicknameMessage.classList.remove("confirm");

        checkObj.memberNickname = false; // 유효 x 기록

    }

});

const memberPw = document.getElementById("memberPw");
const memberPwConfirm = document.getElementById("memberPwConfirm");
const pwMessage = document.getElementById("pwMessage");

memberPw.addEventListener("input",function(){

    if(memberPw.value.trim().length == 0){
        pwMessage.innerText = "영어, 숫자, 특수문자(!,@,#,-,_) 6~30글자 사이로 작성해주세요.";
        pwMessage.classList.remove("confirm","error");

        checkObj.memberPw = false; // 유효 x 기록

        return;

    }

    const regExp4 = /^(\w|[!@#-_]){6,30}$/;

    if(regExp4.test(memberPw.value)){ // 비밀번호가 유효하면서

        checkObj.memberPw = true; // 유효 o 기록

        if(memberPwConfirm.value.trim().length == 0){ 
            // 비밀번호 유효하면서, 확인이 작성 안됐을때 if임    
            pwMessage.innerText = "유효한 비밀번호 형식입니다.";
            pwMessage.classList.add("confirm");
            pwMessage.classList.remove("error");

            
        }else{ // 비밀번호가 유효하면서 확인도 작성이 된 경우
               // 이미 작성됐을 때 지웠다 썼을 때 적용?

             checkPw();   // 비밀번호 일치 검사 함수 호출()


            /*     if(memberPw.value != memberPwConfirm.value){

                pwMessage.innerText = "비밀번호가 동일하지 않습니다."

                pwMessage.classList.add("error");
                pwMessage.classList.remove("confirm");

            }else{

                pwMessage.innerText = "비밀번호가 동일합니다."

                pwMessage.classList.add("confirm");
                pwMessage.classList.remove("error");

            } */
                    
        }

    }else{
        
        pwMessage.innerText = "비밀번호 형식이 유효하지 않습니다.";

        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");

        checkObj.memberPw = false; // 유효 x 기록
    }

});

// 함수명() : 함수 호출(수행)
// 함수명   : 함수에 작성된 코드 반환

// 비밀번호 확인 유효성 검사
memberPwConfirm.addEventListener("input", checkPw);
/* memberPwConfirm.addEventListener("input",function(){}) */
// 이벤트가 발생 되었을 때 정의된 함수를 호출하겠다.

function checkPw(){ // 비밀번호 일치 검사

    // 비밀번호 / 비밀번호 확인이 같지 않을 경우
    if(memberPw.value != memberPwConfirm.value){

        pwMessage.innerText = "비밀번호가 동일하지 않습니다."

        pwMessage.classList.add("error");
        pwMessage.classList.remove("confirm");

        checkObj.memberPwConfirm = false; // 유효 x 기록


    }else{ // 같을 경우

        pwMessage.innerText = "비밀번호가 동일합니다."

        pwMessage.classList.add("confirm");
        pwMessage.classList.remove("error");

        checkObj.memberPwConfirm = true; // 유효 o 기록

    }

}

function signUpValidate(){

    // checkObj에 있는 모든 속성을 반복 접근하여
    // false가 하나라도 있는 경우에는 form태그 기본 이벤트를 제거한다.

    let str;

    for(let key in checkObj ){ // 객체용 향상된 for문
        // 변수명  // 객체이름

        //현재 접근 중인 key의 value가 false인 경우
        if(!checkObj[key]){ // []로 인덱스처럼 받아옴

            switch(key){
                case "memberEmail"     : str="이메일이"; break;
                case "memberPw"        : str="비번이"; break;
                case "memberPwConfirm" : str="비번확인이"; break;
                case "memberNickname"  : str="닉네임이"; break;
                case "memberTel"       : str="전화번호가"; break;
            }

            str+= " 유효하지 않습니다.";
            alert(str);

            document.getElementById(key).focus();
            
            return false; // form 태그 기본 이벤트 제거


        }

    }                                                                                  

    return true;

}