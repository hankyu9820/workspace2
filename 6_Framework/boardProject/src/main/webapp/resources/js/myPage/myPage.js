// 내 정보(수정) 페이지

const memberNickname = document.getElementById("memberNickname");
const memberTel = document.getElementById("memberTel");
const updateInfo = document.getElementById("updateInfo");

// 내 정보 수정 form 태그가 존재할 때 (내 정보 페이지)
if(memberNickname != null){

    // 전역변수로  수정 전 닉네임/전화번호를 저장
    initNickname = memberNickname.value;
    initTel = memberTel.value;

    // 닉네임 유효성 검사
    memberNickname.addEventListener("input" , ()=>{

        // 변경 전 닉네임과 입력 값이 같을 경우
        if(initNickname == memberNickname.value){
            memberNickname.removeAttribute("style");
            return;
        }

        // 정규 표현식으로 유효성 검사
        const regEx = /^[가-힣\d\w]{2,10}$/;

        if(regEx.test(memberNickname.value)){ //유효
            // 초록글씨
            memberNickname.style.color = "green";
            checkObj.memberNickname = true;

        }else{ // 무효

            // 빨간글씨
            memberNickname.style.color = "red";
            checkObj.memberNickname = false;
        }


    });

    // 전화번호 유효성 검사
    memberTel.addEventListener("input", ()=>{

        // 변경 전 전화번호와 입력 값이 같을 경우
        if(initTel == memberTel.value){
            memberTel.removeAttribute("style");
            return;
        }

        // 정규 표현식으로 유효성 검사
        const regExp = /^0(1[01679]|2|[3-6][1-5]|70)\d{3,4}\d{4}$/;

        if(regExp.test(memberTel.value)){ //유효
            // 초록글씨
            memberTel.style.color = "green";
            checkObj.memberTel = true;

        }else{ // 무효

            // 빨간글씨
            memberTel.style.color = "red";
            checkObj.memberTel = false;
        }






    });

    // form 태그 제출 시 유효하지 않은 값이 있으면 제출 X

    const checkObj = {
        "memberNickname" : false,
        "memberTel" : false
    };

    checkObj.memberTel = false;

    document.getElementById("updateInfo").addEventListener("submit", e=>{


        // 닉네임이 유효하지 않은 경우 
        // 전화번호가 유효하지 않을 경우

        for(let key in checkObj){

            if(!checkObj[key]){

                switch(key){
                    case "memberNickname"  : alert("닉네임이 유효하지 않습니다"); break;
    
                    case "memberTel" :  alert("전화번호가 유효하지 않습니다");  break;
    
                }
    
                // 유효하지 않은 input 태그로 focus 이동
                document.getElementById(key).focus();
                // form 태그 기본 이벤트 제거
                e.preventDefault();
                return; // 함수종료


            }


        }
    





    })


} // if end

// 비밀번호 변경 제출 시 

const currentPw = document.getElementById("currentPw");
const newPw = document.getElementById("newPw");
const newPwConfirm = document.getElementById("newPwConfirm");
const changePwFrm = document.getElementById("changePwFrm");

// 비밀번호 변경 페이지 인 경우

if(changePwFrm != null){


    changePwFrm.addEventListener("submit", e=>{
    
        // 현재 비밀번호 미작성 시 
        if(currentPw.value.trim() == ""){

            alert("현재 비밀번호를 입력해주세요");
            e.preventDefault();
            currentPw.focus();
            currentPw.value = "";
            return;
        }

    
        // 비밀번호 유효성 검사
        const regEx = /^[a-zA-Z0-9!@#\-_]{6,20}$/;
        
        if(!regEx.test(newPw.value)){
            alert("비밀번호 유효하지 않습니다")
            e.preventDefault();
            newPw.focus();
            return;
        } 


        // 비밀번호 == 비밀번호 확인
        if(newPw.value != newPwConfirm.value){
            alert("비밀번호가 서로 일치하지 않습니다")
            e.preventDefault();
            newPwConfirm.focus();
            return;
        } 
    
        
    })


}

const secessionFrm = document.getElementById("secessionFrm");
const memberPw = document.getElementById("memberPw");
const agree = document.getElementById("agree");

// 회원 탈퇴 페이지인 경우

if(secessionFrm != null){


    secessionFrm.addEventListener("submit" , e=>{


        // 비밀번호 미작성
        if(memberPw.value.trim() == ''){

            alert("현재 비밀번호를 입력해주세요");
            e.preventDefault();
            memberPw.focus();
            memberPw.value = "";
            return;
        }

        // 동의 체크가 되지 않은 경우
        if(!agree.checked){

            alert("탈퇴 동의 체크를 해주세요"); 
            e.preventDefault();
            return;
        }

        
        // 취소 클릭 시 
        if(!confirm("정말 탈퇴 하시겠습니까?")){
            alert("탈퇴 취소")
            e.preventDefault();
            return;
        }
    
        
        






    })
    









}



