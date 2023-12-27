// ==UserScript==
// @name        quick-ID
// @namespace   quick-ID
// @match       *://moodle.bbbaden.ch/*
// @version     2.0.0
//
// @downloadURL https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/quick-ID-small.user.js
// @updateURL   https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/quick-ID-small.user.js
// @homepageURL https://github.com/BBBaden-Moodle-userscripts/quick-ID
// @supportURL  https://github.com/BBBaden-Moodle-userscripts/quick-ID/issues
//
// @description press Alt + E to open prompt
// @author      black-backdoor
//
// @icon        https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/icon.svg
//
// @grant       GM_getValue
//
// @run-at      document-end
// ==/UserScript==


const baseURL = "https://moodle.bbbaden.ch/course/view.php?id=";

const makeRequests = false;
const keycode = 69; // e



// Function to check if a URL is available
function isUrlAvailable(url) {
    if(makeRequests){
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();
        return xhr.status !== 404;
    } else {
        return true;
    }
}


function promptURL (){
    var id = prompt("Kurs ID eingeben", "");
    if(id != null || id != undefined){
        const newURL = baseURL + id;
        if(isUrlAvailable(newURL)){
            window.location = newURL;
        } else {
            alert("website nicht verfügbar\nURL: " + newURL);
        }
    }

}

function onAltE() {
    promptURL();
}

function onKeydown(evt) {
    // Use https://keycode.info/ to get keys
    if (evt.altKey && evt.keyCode == keycode) {
        onAltE();
    }
}

document.addEventListener('keydown', onKeydown, true);
