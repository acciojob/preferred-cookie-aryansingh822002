//your JS code here. If required.
// Utility: Set a cookie
function setCookie(name, value, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Utility: Get a cookie by name
function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split("; ");
  for (let c of cookies) {
    if (c.indexOf(name + "=") === 0) {
      return c.substring(name.length + 1);
    }
  }
  return "";
}

// Apply preferences to page
function applyPreferences() {
  const fontsize = getCookie("fontsize") || "16";
  const fontcolor = getCookie("fontcolor") || "#000000";

  // update CSS variables
  document.documentElement.style.setProperty("--fontsize", fontsize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontcolor);

  // update form values
  document.getElementById("fontsize").value = fontsize;
  document.getElementById("fontcolor").value = fontcolor;
}

// On form submit → save cookies
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fontsize = document.getElementById("fontsize").value;
  const fontcolor = document.getElementById("fontcolor").value;

  // save to cookies
  setCookie("fontsize", fontsize);
  setCookie("fontcolor", fontcolor);

  // apply immediately
  applyPreferences();
});

// On page load
window.onload = applyPreferences;
