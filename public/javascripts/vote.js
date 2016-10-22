function btnClick(){
  return isOneChecked();
}

function isOneChecked() {
  // All <input> tags...
  var boyVal = false;
  var girlVal = false;
  var boySel = document.getElementsByClassName('boy');
  var girlSel = document.getElementsByClassName('girl');
  var boyName = "";
  var girlName = "";
  for (var i=0; i<boySel.length; i++) {
    if (boySel[i].type == 'radio' && boySel[i].checked) {
      boyVal = true;
      boyName = boySel[i].value;
    } 
  }
  
  for (var i=0; i<girlSel.length; i++) {
    if (girlSel[i].type == 'radio' && girlSel[i].checked) {
      girlVal = true;
      girlName = girlSel[i].value;
    } 
  }
  // End of the loop, return false
  if (!boyVal && !girlVal) {
      alert("Girl CR and Boy CR selection not made!!");
      return false;
  }
  else if(!boyVal) {
      alert("Boy CR selection not made!!");
      return false;
  }
  else if(!girlVal) {
      alert("Girl CR selection not made!!");
      return false;
  }
  else {
    var confirmVote = confirm("You sure to vote -|" + girlName + "|- and -|" + boyName + "|- ?");
    if(confirmVote) {
      return true;
    }
    else {
      return false;
    }
  }    
}