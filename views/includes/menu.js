let userName = document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1");

if (userName) {
   document.getElementById('login').hidden = true;
   document.getElementById('register').hidden = true;
   document.getElementById('logout').hidden = false;
}
else {
   document.getElementById('login').hidden = false;
   document.getElementById('register').hidden = false;
   document.getElementById('logout').hidden = true;
}



