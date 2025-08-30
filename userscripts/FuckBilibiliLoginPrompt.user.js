// ==UserScript==
// @name         Fuck Bilibili Login Prompt
// @namespace    fuck.bilibili.loginPrompt
// @version      2
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

    const log = console.log;

    log("[FBLP]");
    // ONLY RUN IN INCOGNITO
    // COMMENT NEXT LINE IF YOU DONT NEED THIS OPTIMISE
    if (!GM_info.isIncognito) return;

    const MATCH_RULE = "jinkela/video/video";
    const SCRIPT_LOADER_CALLBACK = `___${+new Date() + parseInt(Math.random() * 100)}___`;

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            let node = mutation.addedNodes[0];
            if (!node) return;

            if (node.tagName === "SCRIPT" && node.textContent?.length && node.textContent.startsWith("function loadScript")) {
                log("FBLP: matched");
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
                log("FBLP: hooked");

                observer.disconnect();
            }
        });
    });
    unsafeWindow[SCRIPT_LOADER_CALLBACK] = function(url, callback) {
        log("FBLP: called");
        fetch(url).then(response => response.text()).then(data => {
            data = data.replaceAll("e.user.isLogin", "true");
            data = data.replaceAll("i.user.isLogin", "true");
            data = data.replaceAll("n.user.isLogin", "true");
            data = data.replaceAll("t.user.isLogin||", "true||");
            data = data.replaceAll("loginVersionBackBlock:function(t){", "loginVersionBackBlock:function(t){return;")

            log("FBLP: patched");
            GM_addElement("script", {
                textContent: data,
            });
            log("FBLP: injected");
            callback?.();
            log("FBLP: callback");
        });
    };

    observer.observe(document.documentElement, { childList: true, subtree: true });
    console.log("FBLP: observing");
})();
