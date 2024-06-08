var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var siteNameRegex = /^.{3,}$/;
var siteUrlRegex = /^((http|https|ftp):\/\/)?[A-Za-z0-9]+(\.[A-Za-z0-9]{1,})+(.)+$/;
var alertMsg = document.getElementById("validationAlert");

var siteList = [];

var path = location.pathname.split('/')
path.pop()
var basicUrl = path.join('/')
console.log(basicUrl);

if(localStorage.getItem('siteList')){
  siteList = JSON.parse(localStorage.getItem('siteList'));
  displayBookmarks(siteList);
}

function addBookmark(){

  if(validateNameUrl()){
    
    if(!(siteUrl.value.includes('http://') || siteUrl.value.includes('https://') || siteUrl.value.includes('ftp://'))){
      siteUrl.value = 'https://' + siteUrl.value;
    }
    
  var site={
    name: siteName.value,
    url: siteUrl.value,
  }

  siteList.push(site);
  localStorage.setItem('siteList', JSON.stringify(siteList));
  displayBookmarks(siteList);
  clearForm();
}
else{
  alertMsg.classList.remove("d-none");
}
}

function displayBookmarks(list){
  var cartona='';
  for ( i = 0; i < list.length; i++) {
    cartona += `<tr>
    <td>${i+1}</td>
    <td>${list[i].name}</td>
    <td><a class="text-decoration-none" href="${list[i].url}" target="_blank"><i class="fa-solid fa-eye me-1"></i> Visit</a></td>
    <td><button class="btn btn-danger" onclick='deleteSite(${i})'><i class="fa-regular fa-trash-alt"></i> Delete</button></td>
</tr>`
  }
  document.getElementById('data').innerHTML = cartona;
}
function clearForm() {
  siteName.value = '';
  siteName.classList.remove("is-valid")
  siteUrl.value = '';
  siteUrl.classList.remove("is-valid")
}
function deleteSite(index) {
  siteList.splice(index,1);
  localStorage.setItem('siteList', JSON.stringify(siteList));
  displayBookmarks(siteList);
}


function validate(id, regex) {
  var testElement = document.getElementById(id);
  if (regex.test(testElement.value)) {
    testElement.classList.add("is-valid");
    testElement.classList.remove("is-invalid");
  } 
  else {
    testElement.classList.remove("is-valid");
    testElement.classList.add("is-invalid");
  }
}

function validateNameUrl(){
 
  return (siteNameRegex.test(siteName.value) && siteUrlRegex.test(siteUrl.value))
}



function closeAlert() {
  alertMsg.classList.add("d-none");
}

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeAlert();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("alert")) {
    closeAlert();
  }
});