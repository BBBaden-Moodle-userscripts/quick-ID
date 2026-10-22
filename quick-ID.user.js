// ==UserScript==
// @name        quick-ID
// @namespace   quick-ID
// @match       *://moodle.bbbaden.ch/*
// @match       *://lms.bbbaden.ch/*
// @version     2.4.0
//
// @updateURL   https://github.com/BBBaden-Moodle-userscripts/quick-ID/raw/main/quick-ID.user.js
// @homepageURL https://github.com/BBBaden-Moodle-userscripts/quick-ID
// @supportURL  https://github.com/BBBaden-Moodle-userscripts/quick-ID/issues
//
// @require     https://github.com/BBBaden-Moodle-userscripts/LoggingLibrary/raw/refs/heads/main/Logging.lib.user.js
// @require     https://github.com/BBBaden-Moodle-userscripts/UserscriptBridgeLib/raw/main/userscriptBridge.lib.js
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

    if (UserscriptBridge.registerScript() || !UserscriptBridge.runOnce()) return;
    Logger.info('quickid', 'v2.4.0 - Initializing');

    // Relative to the current Moodle instance (moodle.bbbaden.ch or lms.bbbaden.ch)
    const baseURL = window.location.origin + "/course/view.php?id=";

    // Set default value if not exists in local storage
    const savedLetter = GM_getValue("savedLetter", "e");

    // Function to check if a URL is available
    async function isUrlAvailable(url) {
        const response = await fetch(url, { method: 'HEAD' });
        return response.status !== 404;
    }

    async function promptURL() {
        var id = prompt("Kurs ID eingeben", "");
        if (id != null && id !== "") {
            const newURL = baseURL + encodeURIComponent(id.trim());
            if (await isUrlAvailable(newURL)) {
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
    Logger.success('quickid', 'Initialization complete');
})();
