// ==UserScript==
// @name        quick-ID
// @namespace   quick-ID
// @match       *://*/*
// @version     2.0.0
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
// ==/UserScript==


const baseURL = "https://moodle.bbbaden.ch/course/view.php?id=";

// ######################### READ CONFIG #########################
// function to read a variable from storage with default value and type check
function readVariableFromStorageWithDefault(variableName, defaultValue, expectedType) {
    try {
        const storedValue = GM_getValue(variableName, defaultValue);
        console.debug(`%c[VALUE]%c read value of %c${variableName}%c from storage: %c${storedValue}`, 'color: purple;', 'color: inherit;', 'color: blue;', 'color: inherit;', 'color: green');


        if (typeof storedValue !== 'undefined' && typeof storedValue === expectedType) {
            return storedValue;
        } else {
            console.warn(`%c[VALUE]%c ${variableName} %cis not defined or does not match the expected type (%c${expectedType}%c) in storage.`, 'color: purple;', 'color: blue;', 'color: inherit;', 'color: red', 'color: inherit;');
            return defaultValue; // Return the default value if it's not defined or doesn't match the expected type
        }

    } catch (error) {
        console.error(`%c[VALUE]%c An error occurred while trying to retrieve %c${variableName}%c value from storage: %c${error}`, 'color: purple;', 'color: inherit;', 'color: blue;', 'color: inherit;', 'color: red;');
        return defaultValue; // Return the default value in case of an error
    }
}


const makeRequests = readVariableFromStorageWithDefault("makeRequests", false, "boolean");
const keycode = readVariableFromStorageWithDefault("keycode", 69, "number");



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
