// ==UserScript==
// @name        quick-ID
// @namespace   quick-ID
// @match       *://*/*
// @version     2.1.0
//
// @downloadURL https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/quick-ID.user.js
// @updateURL   https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/quick-ID.user.js
// @homepageURL https://github.com/BBBaden-Moodle-userscripts/quick-ID
// @supportURL  https://github.com/BBBaden-Moodle-userscripts/quick-ID/issues
//
// @description press Alt + E to open prompt
// @author      black-backdoor
//
// @icon        https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/icon.svg
//
// @grant       GM_getValue
// @run-at      document-end
// @require     https://github.com/BBBaden-Moodle-userscripts/404PageBuilder/raw/main/404PageBuilder.lib.user.js
// ==/UserScript==

(function() {
    'use strict';


    const baseURL = "https://moodle.bbbaden.ch/course/view.php?id=";

    // Read values directly from storage
    const makeRequests = GM_getValue("makeRequests", false);
    const keycode = GM_getValue("keycode", 69);

    // Function to check if a URL is available
    function isUrlAvailable(url) {
        if (makeRequests) {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send();
            return xhr.status !== 404;
        } else {
            return true;
        }
    }

    function promptURL() {
        var id = prompt("Kurs ID eingeben", "");
        if (id != null || id != undefined) {
            const newURL = baseURL + id;
            if (isUrlAvailable(newURL)) {
                window.location = newURL;
            } else {
                alert("website nicht verfügbar\nURL: " + newURL);
            }
        }
    }

    function onAltE(evt) {
        if (evt.altKey && evt.key === 'e') {
            promptURL();
        }
    }

    document.addEventListener('keydown', onAltE, true);

    // Check for configuration page
    if (window.location.href === 'https://moodle.bbbaden.ch/userscript/config') {
        PageBuilder.addElement("h1", 'Quick ID');
        PageBuilder.addTextField("letterInput");
        PageBuilder.addButton("button name", "const letter = document.getElementById('letterInput').value.charAt(0); const keycode = letter.charCodeAt(0); console.log('Keycode for \\'' + letter + '\\': ' + keycode);");
        PageBuilder.addLine();
    }
})();
