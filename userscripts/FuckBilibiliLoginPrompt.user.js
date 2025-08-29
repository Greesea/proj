// ==UserScript==
// @name         Fuck Bilibili Login Prompt
// @namespace    fuck.bilibili.loginPrompt
// @version      1
// @description  no more dumb things
// @author       Greesea
// @match        *://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        unsafeWindow
// @grant        GM_addElement
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // ONLY RUN IN INCOGNITO
    if (!GM_info.isIncognito) return;

    const MATCH_RULE = "jinkela/video/video";
    const SCRIPT_LOADER_CALLBACK = `___${+new Date() + parseInt(Math.random() * 100)}___`;

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            let node = mutation.addedNodes[0];
            if (!node) return;

            if (node.tagName === "SCRIPT" && node.textContent?.length && node.textContent.startsWith("function loadScript")) {
                let content = node.textContent;
                let bracket = content.indexOf("{");
                if (bracket === -1) return; else bracket++;

                let functionDefine = content.substring(0, bracket);
                let functionContent = content.substring(bracket);
                functionContent = `
                    if (arguments[0]?.indexOf("${MATCH_RULE}") > -1) {
                        window["${SCRIPT_LOADER_CALLBACK}"]?.apply(this, arguments);
                        return;
                    }
                    ${functionContent}`;
                node.textContent = functionDefine + functionContent;

                observer.disconnect();
            }
        });
    });
    unsafeWindow[SCRIPT_LOADER_CALLBACK] = function(url, callback) {
        fetch(url).then(response => response.text()).then(data => {
            data = data.replaceAll("e.user.isLogin", "true");
            data = data.replaceAll("i.user.isLogin", "true");
            GM_addElement("script", {
                textContent: data,
            });
            callback?.();
        });
    };

    observer.observe(document.documentElement, { childList: true, subtree: true });
})();
