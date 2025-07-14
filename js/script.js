
google.script.run.withSuccessHandler(function(content) {
  document.getElementById("header-container").innerHTML = content;

  // Load each script separately
  addScript("https://cdn.jsdelivr.net/gh/gkpillai/dhr/js/common.min.js");
 
}).createHeader();

google.script.run.withSuccessHandler(function(content) {
  document.getElementById("sidebar-container").innerHTML = content;

  // Load admin script after sidebar
  addScript("https://cdn.jsdelivr.net/gh/gkpillai/dhr/js/admin.js");
}).createSidebar();

function addScript(src) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = function() {
    console.log(src + " loaded");
  };
  document.body.appendChild(script);
}



function logout() {
  sessionStorage.clear();
  localStorage.clear();
  navigateToPage("login");
}

