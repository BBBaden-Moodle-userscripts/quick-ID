// ==UserScript==
// @name        quick-ID
// @namespace   quick-ID
// @match       *://moodle.bbbaden.ch/*
// @version     2.3.0
//
// @updateURL   https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/quick-ID.user.js
// @homepageURL https://github.com/BBBaden-Moodle-userscripts/quick-ID
// @supportURL  https://github.com/BBBaden-Moodle-userscripts/quick-ID/issues
//
// @description press Alt + E to open prompt
// @author      black-backdoor
//
// @icon        https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/icon.svg
//
// @grant       GM_info
// @grant       GM_getValue
// @grant       GM_setValue
// @run-at      document-end
// ==/UserScript==

(function () {
    'use strict';

    const baseURL = "https://moodle.bbbaden.ch/course/view.php?id=";

    // Set default value if not exists in local storage
    const savedLetter = GM_getValue("savedLetter", "e");

    // Function to check if a URL is available
    function isUrlAvailable(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();
        return xhr.status !== 404;
    }

    function promptURL() {
        var id = prompt("Kurs ID eingeben", "");
        if (id != null && id !== "") {
            const newURL = baseURL + id;
            if (isUrlAvailable(newURL)) {
                window.location = newURL;
            } else {
                alert("Webseite nicht verfügbar\nURL: " + newURL);
            }
        }
    }

    function onAltKey(evt) {
        if (evt.altKey && evt.key === savedLetter) {
            promptURL();
        }
    }

    document.addEventListener('keydown', onAltKey, true);
})();
