// 내 정보 수정 유효성 검사
function infoValidate(){

    const memberNickname = document.getElementById("memberNickname");
    const memberTel = document.getElementById("memberTel");

    const regExp1= /^[a-zA-Z0-9가-힣]{2,10}$/; // 닉네임 정규식
    const regExp2= /^0(1[01679]|2|[3-6][1-5]|70)\d{3,4}\d{4}$/;  // 전화번호 정규식

    // 닉네임 유효성 검사
    if(memberNickname.value.length == 0){ // 미작성 시 : 닉네임을 입력해주세요.
        alert("닉네임을 입력해주세요.");
        memberNickname.focus();
        return false;
    }

    if(!regExp1.test(memberNickname.value)){ // 유효하지 않은 경우
        alert("닉네임은 영어/숫자/한글 2~10글자 사이로 작성해주세요.");
        memberNickname.focus();
        return false;
    }


    // 전화번호 유효성 검사
    if(memberTel.value.length == 0){ // 미작성 시 : 전화번호를 입력해주세요.(-제외)
        alert("전화번호를 입력해주세요.(-제외)");
        memberTel.focus();
        return false;
    }

    if(!regExp2.test(memberTel.value)){ // 유효하지 않은 경우
       // alert("전화번호 형식이 올바르지 않습니다.");
       // memberTel.focus();
       // return false;

        return printAlert(memberTel, "전화번호 형식이 올바르지 않습니다.");
    }

    return true; // true를 반환해서 form 제출 수행
}

// 경고 출력 + 포커스 + false 반환 함수
function printAlert(el, message){ // 매개변수 el은 요소
    alert(message);
    el.focus;
    return false;
}

function changePwValidate(){

    const currentPw = document.getElementById("currentPw");
    const newPw = document.getElementById("newPw");
    const newPwConfirm = document.getElementById("newPwConfirm");
    
   /*  const regExp1 = /^(\w|\!|\@|\#|\-|\_){6,30}$/; */
    const regExp1 = /^[\w!@#_-]{6,30}$/; 

    if(currentPw.value.trim().length == 0){
        return printAlert(currentPw, "현재 비밀번호를 입력해주세요.");
    }

    if(newPw.value.trim().length == 0){
        return printAlert(newPw, "새 비밀번호를 입력해주세요.");
    }

    if(!regExp1.test(newPw.value)){
        return printAlert(newPw, "영어, 숫자, 특수문자(!,@,#,-,_) 6글자 사이로 작성해주세요.");
    }

    if(newPwConfirm.value.trim().length == 0){
        return printAlert(newPwConfirm, "새 비밀번호 확인을 입력해주세요.");
    }

    if(newPw.value != newPwConfirm.value){
        alert("새 비밀번호가 일치하지 않습니다.");
        return false; 
        // return printAlert(newPwConfirm, "새 비밀번호가 일치하지 않습니다.");
    }

    return true;

}

//회원 탈퇴 유효성 검사

function secessionValidate(){
    
    const memberPw = document.getElementsByName("memberPw")[0];
    const agree = document.getElementById("agree");

    if(memberPw.value.trim().length == 0){
        
        return printAlert(memberPw, "비밀번호를 입력해주세요.");

    }

    if(!agree.checked){

        return printAlert(agree, "약관 동의 후 탈퇴버튼을 클릭해주세요.");
    }

    // [window.]confirm("내용") : 대화상자에 확인/취소 생성
    //  -> 확인 클릭 시 true / 취소 클릭 시 false

    if(!(memberPw.value.trim().length == 0) && agree.checked){
        // if문 안써도 됨
        
        const str = "정말 탈퇴하시겠습니까?";

        if(!confirm(str)){
            return false;
        }else{
            return true;
        }

    }

}

// 회원 프로필 이미지 변경(미리보기)
const inputImage = document.getElementById("input-image");

if(inputImage != null){ // inputImage 요소가 화면에 존잘할 때
    
    // input type="file" 요소는 파일이 선택될 때 change 이벤트가 발생한다.
    inputImage.addEventListener("change",function(){ // 파일 삽입하면 change 발생
    
    //console.log(this.files); // this : 이벤트가 발생한 요소 <인풋 타입 = 파일>

                             // files : input type=file만 사용가능한 속성
                             //         선택된 파일 목록(배열이라 생각)을 반환  
    //console.log(this.files[0]); // 파일 목록에서 첫 번째 파일 객체를 선택                        
    
    if(this.files[0] != undefined){ // 파일이 선택되었을 때

        const reader = new FileReader();
        // 자바스크립트의 FileReader
        // - 웹 애플리케이션이 비동기적으로 데이터를 읽기 위하여 사용하는 객체

        reader.readAsDataURL(this.files[0]);
        // FileReader.readAsDataURL(파일)
        // - 지정된 파일의 내용을 읽기 시작함
        // - 읽어오는게 완료되면 result 속성 data:에
        //   읽어온 파일의 위치를 나타내는 URL이 포함된다.
        // ->해당 URL을 이용해서 브라우저에 이미지를 볼 수 있다.

        // FileReader.onload = function(){}
        // - FileReader가 파일을 다 읽어온 경우 함수를 수행
        reader.onload = function(e){ // 고전 이벤트 모델
            // e : 이벤트 발생 객체
            // e.target : 이벤트가 발생한 요소(객체) -> FileReader
            // e.target.result : FileReader가 읽어온 파일의 URL
        
        // 프로필 이미지의 src 속성의 값을 FileReader가 읽어온 파일의 URL로 변경
        const profileImage = document.getElementById("profile-image");

        profileImage.setAttribute("src", e.target.result); // // - 읽어오는게 완료되면 result 속성 data:에
        // <img src="../resources/images/user.png" id="profile-image">
        // -> setAttribute() 호출 시 중복되는 속성이 존재하면 덮어쓴다. // 삽입하면 취소해도 set한게 남아있어서 이제 취소가 안됨.

        document.getElementById("delete").value == 0;
        // 새로운 이미지가 선택 되었기 때문에 1 -> 0(안눌러진 상태)로 변경 그래야 다시 x 누를 때 지움

        }

        }
    
    });
    
} 

function profileValidate(){

    const inputImage = document.getElementById("input-image");

    const del = document.getElementById("delete"); // hidden 타입

    if(inputImage.value == "" && del.value == 0){
        // 빈문자열 == 파일 선택 X / del의 값이 0 == x를 누르지도 않았다. 파일도 선택 안하고 x를 누르지도 않았다.
        // -> 암것도 안하고 변경버튼을 클릭한경우
        alert("이미지를 선택한 후 변경 버튼을 클릭해주세요.");
        return false;
    }
    
    return true;

}

// 프로필 이미지 옆 x 버튼 클릭 시
document.getElementById("delete-image").addEventListener("click",function(){
    // 0 : 안눌러짐
    // 1 : 눌러짐

    const del = document.getElementById("delete");

    if(del.value == 0){ //눌러지지 않은 경우
        
        // 1) 프로필 이미지를 기본 이미지로 변경
        document.getElementById("profile-image").setAttribute("src", contextPath + "/resources/images/user.png");
    
        // 2) input type = "file"에 저장된 값(value)에 "" 대입
        document.getElementById("input-image").value = "";

        del.value = 1; // 눌러진걸로 인식

    }


})


