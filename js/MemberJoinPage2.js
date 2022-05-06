/*각 element 정의*/
const years = document.getElementById('years');
const day = document.getElementById('day');
const othercheck = document.getElementById('othercheck'); // 취미 기타 체크박스
const other = document.getElementById('other') //취미 기타 체크 시 나오는 text박스
const num1 = document.getElementById('num1');  //주민등록번호 앞자리
const num2 = document.getElementById('num2'); //주민등록번호 뒷자리
const hobbyCheckNum = document.getElementsByName('hobby'); //기타 체크 제외 체크박스 개수
let hobbyCheck = [];
const mailinput = document.getElementById('mailinput'); //메일 앞자리
const mailaddress = document.getElementById('mailaddress'); //메일 뒷자리(사이트)
const site = document.getElementById('site')
const idEmo = document.getElementById('idEmo'); //주민등록번호 이모티콘 
const mailEmo = document.getElementById('mailEmo'); //메일 이모티콘
const checkmailEmo = document.getElementById('checkmailEmo'); //유효성없는 메일일 경우 이모티콘
const bEmo = document.getElementById('birthdayEmo'); // 생년월일 이모티콘
var Num1 = new Array(); //주민등록번호 앞자리 배열
var Num2 = new Array(); //주민등록번호 뒷자리 배열
var testNum = 0; //주민등록번호 확인을 위한 수 
const pattern1 = /^[0-9 a-z A-Z _]{2,20}$/;
const pattern2 = /[0-9 a-z A-Z]*.+[a-z A-Z]{2,3}$/i; 

const Joinbtn = document.getElementById('Joinbtn');

//모든 정책을 한 꺼번에 확인 (MemberJoinPage2.html의 onclick에 반응하기 위함)
function checkAll() {
    checkIDNUM();
    checkBirthday();
    checkMail();
    Hobby();
     
    if(idEmo.style.color == "blue" && checkmailEmo.style.color == "blue" && bEmo.style.color == "blue") {
        localStorage.setItem("생년월일", num1.value);
        localStorage.setItem("주민등록번호", num1.value + '-' + num2.value);
        localStorage.setItem("취미", hobbyCheck);
        localStorage.setItem("메일주소", mailinput.value + '@' + mailaddress.value);
        location.href = "MemberJoinPage.html";
    }
    // 다음 단계로 넘어갈 수 없음.
    else {
        localStorage.removeItem("생년월일");
        localStorage.removeItem("주민등록번호");
        localStorage.removeItem("취미");
        localStorage.removeItem("메일주소");
    }
}

//주민등록번호 유효성 확인
function checkIDNUM(){
    if(num1.value == "" || num2.value == "") {
        alert("주민등록번호를 입력하세요.");
        falseVarStyle(idEmo);
    }
    else {
        for(i=0; i<num1.value.length; i++) {
            Num1[i] = num1.value.charAt(i);
        }
        
        for(i=0; i<num2.value.length; i++) {
            Num2[i] = num2.value.charAt(i);
        }
    
        for(i=0; i < num1.value.length; i++) {
            testNum += Num1[i]*(i+2);
        }
        
        for(i=0; i < num2.value.length-1; i++) {
            if(i <= 1) {
                testNum += Num2[i]*(i+8);
            }
            else {
                testNum += Num2[i]*i;
            }
        }
        if(11-testNum%11!= Number(Num2[6])) {
            alert("올바르지 않은 주민등록번호입니다.")
            falseVarStyle(idEmo);
        }
        else {
            trueVarStyle(idEmo);
            //Num = Num1 + Num2;
            //IdNum = Num.replace(/,/g , "");
        }
        testNum = 0;   
    }
}

//연도 체크 (연도가 2000년도일 때와 1900년대일때 비교 후 주민등록번호 앞자리와 비교)
function checkyears() {
    if(years.value%100 < 10 ) {
        if(Number(Num1[0]) != 0 || years.value%100 != Number(Num1[1])) {
            falseVarStyle(bEmo);
        }
        else{
            trueVarStyle(bEmo);
        }
    }
    else {
        if(Math.floor(years.value%100/10) != Number(Num1[0]) || years.value%10 != Number(Num1[1])) {
            falseVarStyle(bEmo);
        }
        else {
            trueVarStyle(bEmo);
        }
    }
}
//월 체크 (10월 이상인 경우와 아닐경우를 나누어 주민등록번호 앞자리와 비교)
function checkmonth() {
    if(Math.floor(month.value/10) == 0) {
        if(Number(Num1[2]) != 0) {
            falseVarStyle(bEmo);
        }
        else if(month.value != Number(Num1[3])) {
            falseVarStyle(bEmo);
        }
        else {
            trueVarStyle(bEmo);
        }
    }
    else {
        if(Number(Num1[2]) != 1) {
            falseVarStyle(bEmo);
        }
        else if(month.value%10 != Number(Num1[3])) {
            falseVarStyle(bEmo);
        }
        else {
            trueVarStyle(bEmo);
        }
    }
}
//일 체크 (10일 미만일 경우와 아닐 경우를 비교하여 주민등록번호 앞자리와 비교)
function checkday() {
    if(Math.floor(day.value/10) == 0) {
        if(Number(Num1[4]) != 0 || Number(Num1[5]) != day.value) {
            falseVarStyle(bEmo);
        }
        else {
            trueVarStyle(bEmo);
        }
    }
    else {
        if(Number(Num1[4]) != Math.floor(day.value/10) || Number(Num1[5]) != day.value%10) {
            falseVarStyle(bEmo);
        }
        else {
            trueVarStyle(bEmo);
        }
    }
}
//생년월일과 주민등록번호 앞자리 비교 후 출력 (맞을 시  파랑, 아닐 시  빨강)
function checkBirthday() {
    checkyears();
    if(bEmo.style.color == "red") {
        alert("생년월일이나, 주민등록번호가 잘못 입력되었습니다.");
    }
    else {
        checkmonth();
        if(bEmo.style.color == "red") {
            alert("생년월일이나, 주민등록번호가 잘못 입력되었습니다.");
        }
        else {
            checkday();
            if(bEmo.style.color == "red") {
                alert("생년월일이나, 주민등록번호가 잘못 입력되었습니다.");
            }
        }
    }
}

//취미 체크
function Hobby() {
    hobbyCheck = []; //체크를 하고 난 다음 단계로 넘어가기 전에 수정이 있을 수 있으므로 값을 계속 저장하지 않도록 함(새로 고침되면 값을 잃게끔)
    for(i = 0; i<hobbyCheckNum.length; i++) {
        //hobbyCheckNum[i]는 컴퓨터, 노래, 산책, 등산에 대한 체크박스로
        //체크하면 if문으로 들어감
        if(hobbyCheckNum[i].checked) {
            //다음을 눌릴수록 값이 중복되어 추가되지 않도록 includes를 이용하여 값이 있지 않을 시에만 값을 추가
            if(!hobbyCheck.includes(hobbyCheckNum[i].value)){
                hobbyCheck += hobbyCheckNum[i].value;
            }
        }
    }
}
//메일 유효성 검사 (이모티콘 색 변경 후 이모티콘도 변경)
function checkMail() {
    if(site.value == '직접입력') {
        if(mailinput.value == "" || mailaddress.value == "") {
            mailEmo.style.display = "none";
            checkmailEmo.style.display = "inline";
            falseVarStyle(checkmailEmo); 
            alert("메일 주소를 입력해주세요.");
        }
        else if(!pattern1.test(mailinput.value) || !pattern2.test(mailaddress.value)) {
            mailEmo.style.display = "none";
            checkmailEmo.style.display = "inline";
            falseVarStyle(checkmailEmo); 
            alert("메일 주소가 잘못 입력되었습니다.");
        }
        else{
            mailEmo.style.display = "none";
            checkmailEmo.style.display = "inline";
            trueVarStyle(checkmailEmo);
        }
    }
    else{
        mailaddress.value = site.value;
        mailaddress.style.backgroundColor = "gray";
        if(mailinput.value == "" || mailaddress.value == "") {
            mailEmo.style.display = "none";
            checkmailEmo.style.display = "inline";
            falseVarStyle(checkmailEmo); 
            alert("메일 주소를 입력해주세요.");
        }
        else if(!pattern1.test(mailinput.value) || !pattern2.test(mailaddress.value)) {
            mailEmo.style.display = "none";
            checkmailEmo.style.display = "inline";
            falseVarStyle(checkmailEmo); 
            alert("메일 주소가 잘못 입력되었습니다.");
        }
        else{
            mailEmo.style.display = "none";
            checkmailEmo.style.display = "inline";
            trueVarStyle(checkmailEmo);
        }
    }
}