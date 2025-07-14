
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

const empNo = sessionStorage.getItem("empNo");

if (!empNo) {
  // Not logged in, redirect to login
  navigateToPage("login");
} else {
  google.script.run.withSuccessHandler(function (data) {
    const nameTitle = toTitleCase(data.name || "Unknown");
    const designationTitle = toTitleCase(data.designation || "Unknown");

    const nameEl = document.querySelector(".sidebar-userpic-name");
    const desigEl = document.querySelector(".profile-usertitle-job");

    if (nameEl) nameEl.innerText = nameTitle;
    if (desigEl) desigEl.innerText = designationTitle;
  }).getEmployeeDetails(empNo);
}

function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function(txt) {
    return txt.toUpperCase();
  });
}

function logout() {
  sessionStorage.clear();
  localStorage.clear();
  navigateToPage("login");
}

