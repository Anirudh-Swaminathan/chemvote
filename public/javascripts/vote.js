/*document.getElementById('voteform').addEventListener("submit", function (e) {
  e.preventDefault();
  var f = e.target;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(xhttp.readyState == 4 && xhttp.status == 200){
      var json = xhttp.responseText;
      var jsonObj = JSON.parse(json);
      //console.log(json);
      var msg = jsonObj.msg;
      //var errors = jsonObj.errors;
      console.log("This is the response message: " + msg);
      switch (msg) {
        case 200:
          $('#voteform')[0].reset();
          window.location = '/doneVote';
          break;
        case 405:
          $('#voteform')[0].reset();
          alert("Already Voted!!");
          break;
        default:
          alert('Unknown error occured, try again!!!');
          break;
      }
    }
  }
  var values = {};
  $.each($('#voteform').serializeArray(), function(i, field) {
      values[field.name] = field.value;
  });
  console.log(values["votedCandidateBoy"]);
  console.log(values["votedCandidateGirl"]);
  //xhttp.open(f.method, f.action, false);
  xhttp.open("POST", "http://10.42.0.1:3000/submitVote", false);
  xhttp.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhttp.setRequestHeader("Access-Control-Allow-Methods", "GET,POST");
  xhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
  xhttp.setRequestHeader("pragma", "no-cache");
  xhttp.send(JSON.stringify(values));
});
*/

function rand() {
  var val = Math.random()*10;
  if(val>7.5)
    return 0;
  else if(val>5 && val<=7.5)
    return 1;
  else if(val>2.5 && val<=5)
    return 2;
  else
    return 3;
}

window.onload = function() {
  var a = rand();
  console.log(a);
  if(a==1) {
    document.getElementById("votedCandidate1").checked = "checked";
    document.getElementById("votedCandidate3").checked = "checked";
  }
  else if(a==2) {
    document.getElementById("votedCandidate2").checked = "checked";
    document.getElementById("votedCandidate4").checked = "checked";
  }
  else if(a==3) {
    document.getElementById("votedCandidate1").checked = "checked";
    document.getElementById("votedCandidate4").checked = "checked";
  }
  else if(a==0) {
    document.getElementById("votedCandidate2").checked = "checked";
    document.getElementById("votedCandidate3").checked = "checked";
  }
}
