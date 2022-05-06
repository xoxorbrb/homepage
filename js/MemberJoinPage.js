//각 element 가져와서 정리
const userName = document.getElementById('userName');
const userID = document.getElementById('userID');
const Pw = document.getElementById('Pw');
const pwCheck = document.getElementById('pwCheck');
const Nname = document.getElementById('Nname');

//이모티콘들 정리
const nEmo = document.getElementById('nEmo');
const idEmo = document.getElementById('idEmo');
const pwEmo1 = document.getElementById('pwEmo1');
const pwEmo2 = document.getElementById('pwEmo2');
const nicEmo = document.getElementById('nicEmo');

//정규식 
const checkVar = /^[a-z A-Z 0-9 !-)]{8,15}$/;
const checkNic = /^[ㄱ-ㅎ ㅏ-ㅣ 가-힣 a-z A-Z 0-9]{2,15}$/;
const checkName =  /^[가-힣]{2,15}$/;
//버튼
const btn = document.getElementById('Joinbtn');

//입력값이 정책에 맞을 때 이모티콘 파란색으로 표시
function trueVarStyle(Ele){
    Ele.style.color = "blue";
    Ele.style.transition = "all ease 1s 0s";
    return true;
}

//입력값이 정책과 다를 때 이모티콘 빨간색으로 표시
function falseVarStyle(Ele) {
    Ele.style.color = "red";
    Ele.style.transition = "all ease 1s 0s";
    return false;
}

//사용자가 입력값을 넣지 않았을 때
function NullCheck(id) {
    if(id == userName) {
        if(id.value == "") {
            alert("이름을 입력해주세요.");
            falseVarStyle(nEmo);
            return false;
        }
        else {
            trueVarStyle(nEmo);
            return true;
        }
    }
    else if(id == userID) {
        if(id.value == "") {
            alert("아이디를 입력해주세요.");
            falseVarStyle(idEmo);
            return false;
        }
        else {
            trueVarStyle(idEmo);
            return true;
        }
    }
    else if(id == Pw) {
        if(id.value == "") {
            alert("비밀번호를 입력해주세요.");
            falseVarStyle(pwEmo1);
            falseVarStyle(pwEmo2);
            return false;
        }
        else {
            trueVarStyle(pwEmo1);
            return true;
        }
    }
    else if(id == Nname) {
        if(id.value == "") {
            alert("닉네임을 입력해주세요.");
            falseVarStyle(nicEmo);
            return false;
        }
        else {
            trueVarStyle(nicEmo);
            return true;
        }
    }
}

//암호, 닉네임 정책 확인  (암호일 때 8~15자, 닉네임일 때 2~15자)
function CheckPolicy(data) {
    if(data == Pw) {
        if(!checkVar.test(data.value)) {
            falseVarStyle(pwEmo1);
            return false;
        }
        else {
            trueVarStyle(pwEmo1);
            return true;
        }
    }
    else if(data == Nname) {
        if(Nname.value == "") {
            falseVarStyle(nicEmo);
            return false;
        }
        else if(!checkNic.test(data.value)) {
            alert("2자 이상, 15자 미만으로 입력해주세요.");
            falseVarStyle(nicEmo);
            return false;
        }
        else{
            trueVarStyle(nicEmo);
            return true;
        }
    }
    else if(data == userName) {
        if(userName.value == "") {
            falseVarStyle(nEmo);
            return false;
        }
        else if(!checkName.test(data.value)) {
            alert("한글로 입력해주세요.")
            falseVarStyle(nEmo);
            return false;
        }
        else {
            trueVarStyle(nEmo);
            return true;
        }
    }
    
}


function CheckPw() {
    if(Pw.value != pwCheck.value) {
        falseVarStyle(pwEmo2);
        alert("비밀번호가 틀렸습니다.")
        return false;
    }
    else if(Pw.value, pwCheck.value == "") {
        NullCheck(Pw);
    }
    else {
        if(CheckPolicy(Pw) == true) {
            trueVarStyle(pwEmo1);
            trueVarStyle(pwEmo2);
            return true;
        }
        else {
            alert("8자 이상, 15자 미만으로 입력해주세요.");
            falseVarStyle(pwEmo1);
            falseVarStyle(pwEmo2);
            return false;
        }
    }
}

function AllCheck() {
    NullCheck(userName);
    CheckPolicy(userName);
    NullCheck(userID);
    CheckPolicy(Pw);
    CheckPw();
    NullCheck(Nname);
    CheckPolicy(Nname);
    
    if(nEmo.style.color == "blue" & idEmo.style.color == "blue" & pwEmo1.style.color == "blue" & pwEmo2.style.color == "blue" & nicEmo.style.color == "blue") {
        localStorage.setItem("이름", userName.value);
        localStorage.setItem("ID" , userID.value);
        localStorage.setItem("비밀번호" , Pw.value);
        localStorage.setItem("닉네임", Nname.value);
        location.href = "LoginPage.html";
    }
}

