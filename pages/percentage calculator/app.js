
// function calculatePercentage (){
//      var obtainedMarks = Number(document.getElementById('obt-marks').value);
//      var totalMarks = Number(document.getElementById('tot-marks').value);
//      var ans = document.getElementById('result');

//      if(obtainedMarks < 0 || totalMarks <= 0 || obtainedMarks > totalMarks){

//         ans.innerText = 'invalid input';
//         ans.style.color = 'red';
//         return

//      }

//        var percentage = obtainedMarks / totalMarks * 100;
//        ans.innerText = "your percentage  " + percentage.toFixed(2) + "  %" ;
//        ans.style.textAlign = 'center'
   
// }


function calaculatePercentage(){

   var obtainedMarks = Number (document.getElementById("obt-marks").value);
   var totMarks = Number (document.getElementById("tot-marks").value);
   var result = document.getElementById('result');

   if(obtainedMarks < 0 || totMarks <= 0 || obtainedMarks > totMarks){

      result.innerText = "invalid input";
      result.style.color = "red";
      return
   }
var percentage = obtainedMarks / totMarks * 100;

result.innerText = "your percentage   " + percentage.toFixed(2) + "%";
result.style.color = "green"


}