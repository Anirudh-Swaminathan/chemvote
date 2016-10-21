function btnClick(){
  return validate();
}
function validate(){
  var n = document.getElementById('name').value;
  var pa = document.getElementById('pass').value;
  var g = document.getElementById('gender').value;
  var ag = document.getElementById('agenda').value;

  // Check name
  if(!(n.match('[a-zA-Z][a-zA-Z ]+|[a-zA-Z]'))){
    alert('The Name must not be empty and mustn\'t contain special characters');
    return false;
  }

  // Check gender
  if(!(g === 'M' || g==='F')){
      alert('Please choose your gender');
      return false;
  }

  // Check agenda
  if(ag === ""){
      alert('Please write your agenda');
      return false;
  }

  // Check pass
  if(pa == ""){
    alert('Password mustn\'t be null');
    return false;
  }
  var st = pa;
  if (/\s/g.test(st)) {
    // string only contained whitespace (ie. spaces, tabs or line breaks)
    alert('Password mustn\'t contain any whitespace');
    return false;
  }
  return true;
}
