// ==UserScript==
// @name        比利比利列表过滤器
// @namespace   DrakeWorks.Bilibili.List
// @description 过滤不想看到的视频(只影响列表 不影响其它途径访问)
// @include     http://www.bilibili.com/video/*.html*
// @version     II Fix.I
// @require     https://code.jquery.com/jquery-1.12.3.min.js
// @grant       unsafeWindow
// @grant       GM_setClipboard
// @author      Greesea
// ==/UserScript==

//Important! Require HTML 5 LocalStorage Support
this.$ = this.jQuery = jQuery.noConflict(true);
$(function () {
    var base = {
        //设置内容请自行备份 每次更新都将重置(保存的筛选信息不会被重置 除非更换storageKey或typeName)
        storageKey: "BilibiliListFilterUserScript",//存储key
        typeName: "BilibiliListFilterStorage",//类型名 读取配置时依靠此项判断是否为脚本配置
        counterColor: "darkorange",//计数器颜色
        triggerTimeout: 400,//触发延时
        tooltipConfigDefault: {//默认提示的样式(具体配置项与默认值请去脚本内找Tooltip内的cfg对象)
            fontColor: "white"
        },
        tooltipConfigOnSuccess: {//成功时提示的样式(具体配置项与默认值请去脚本内找Tooltip内的cfg对象)
            fontColor: "lightgreen"
        },
        tooltipConfigOnFail: {//失败时提示的样式(具体配置项与默认值请去脚本内找Tooltip内的cfg对象)
            fontColor: "red"
        },

        //------------ 下面的设置部分如果不是熟悉javascript并脚本失效请勿修改 ------------
        //version
        storageVersion: 1,
        //Tracker
        listTracker: $(".vd-list-cnt"),
        orderTracker: null,
        categoryNameTracker: $(".fcname").find(".n_num").find("li").filter(".on").find("a").text(),
        //Element
        counterElement: null
    };

    //region Support
    //List library is a copy from https://github.com/Greesea/GearCase4Js
    function listCheckFunctionBoolean(value) {
        if (typeof value === "number")
            return value > 0;
        else if (typeof value === "boolean")
            return value;
        return null;
    }

    function listCheckFunctionNumber(value) {
        if (typeof value === "number")
            return value;
        return null;
    }

    function listCalculate(array, func) {
        var obj = {
            sum: 0,
            count: 0,
            avg: 0,
            min: 0,
            max: 0
        };

        for (var i = 0; i < array.length; i++) {
            var result = listCheckFunctionNumber(func(array[i]));

            if (i === 0)
                obj.min = result;

            if (result != null) {
                obj.sum += result;
                obj.count++;
                if (result < obj.min)
                    obj.min = result;
                if (result > obj.max)
                    obj.max = result;
            } else {
                return;
            }
        }

        obj.avg = obj.sum / obj.count;

        return obj;
    }

    function List(array) {
        if (!array)
            array = [];

        for (var i = 0; i < array.length; i++) {
            this.valueOf().push(array[i]);
        }

        //方法
        this["clear"] = function () {
            for (var i = 0; i < this.length; i++) {
                this[i] = undefined;
            }

            this.length = 0;
            return this;
        };

        this["clone"] = function (depth) {
            if (depth == undefined)
                depth = false;

            var newArr = new List();
            for (var i = 0; i < this.length; i++) {
                if (depth) {
                    if (this[i]["clone"] != null)
                        newArr.push(this[i]["clone"]());
                    else if (this[i]["Clone"] != null)
                        newArr.push(this[i]["Clone"]());
                    else if (this[i]["Copy"] != null)
                        newArr.push(this[i]["Copy"]());
                    else
                        newArr.push(this[i]);
                } else
                    newArr.push(this[i]);
            }

            return newArr;
        };

        this["append"] = function (array) {
            for (var i = 0; i < array.length; i++) {
                this.push(array[i]);
            }

            return this;
        };

        this["exists"] = function (value, strict) {
            if (strict == null)
                strict = false;

            return this
                    .where(function (v) {
                        if (strict)
                            return v === value;
                        else
                            return v == value;
                    })
                    .first() != null;
        };

        this["indexOf"] = function (value, strict) {
            if (strict == null)
                strict = false;

            for (var i = 0; i < this.length; i++) {
                if ((this[i] === value && strict) || (this[i] == value && !strict))
                    return i;
            }

            return -1;
        };

        this["lastIndexOf"] = function (value, strict) {
            if (strict == null)
                strict = false;

            for (var i = this.length - 1; i >= 0; i--) {
                if ((this[i] === value && strict) || (this[i] == value && !strict))
                    return i;
            }

            return -1;
        };

        this["remove"] = function (value, strict) {
            if (strict == null)
                strict = false;

            var index = this.indexOf(value, strict);
            if (index !== -1)
                this.removeAt(index);
            return this;
        };

        this["removeAt"] = function (index) {
            var right = new List(this.splice(index + 1, this.length - index));
            var left = new List(this.splice(0, index));

            this.clear();
            this.append(left.append(right));
            return this;
        };

        this["toArray"] = function (depth) {
            if (depth == undefined)
                depth = true;

            var arr = [];

            for (var i = 0; i < this.length; i++) {
                if (depth) {
                    if (this[i]["toArray"] != null)
                        arr.push(this[i]["toArray"]());
                    else if (this[i]["toarray"] != null)
                        arr.push(this[i]["toarray"]());
                    else if (this[i]["getArray"] != null)
                        arr.push(this[i]["getArray"]());
                    else
                        arr.push(this[i]);
                } else
                    arr.push(this[i]);
            }

            return arr;
        };

        this["each"] = function (func) {
            if (typeof func !== "function")
                return;

            for (var i = 0; i < this.length; i++)
                if (func(this[i]))
                    break;
        };

        //投影方法
        this["select"] = function (func) {
            if (typeof func !== "function")
                return;

            var newArr = new List();
            for (var i = 0; i < this.length; i++) {
                var result = func(this[i]);
                newArr.push(result);
            }

            return newArr;
        };

        //筛选方法
        this["where"] = function (func) {
            if (typeof func !== "function")
                return;

            var newArr = new List();
            for (var i = 0; i < this.length; i++) {
                var result = listCheckFunctionBoolean(func(this[i]));

                if (!!result) {
                    newArr.push(this[i]);
                } else if (result == null) {
                    return;
                }
            }

            return newArr;
        };

        //排序方法
        this["orderBy"] = function (func) {
            if (typeof func !== "function")
                return;

            var clone = this.clone();
            for (var i = 0; i < clone.length - 1; i++) {
                for (var j = 0; j < clone.length - 1 - i; j++) {
                    var result = listCheckFunctionBoolean(func(clone[j], clone[j + 1]));

                    if (!!result) {
                        var temp = clone[j];
                        clone[j] = clone[j + 1];
                        clone[j + 1] = temp;
                    } else if (result == null) {
                        return;
                    }
                }
            }

            return clone;
        };

        //集方法
        this["distinct"] = function () {
            var newArr = new List();
            for (var i = 0; i < this.length; i++) {
                if (!newArr.exists(this[i], true))
                    newArr.push(this[i]);
            }

            return newArr;
        };

        //聚合方法
        this["sum"] = function (func) {
            if (typeof func !== "function")
                return;

            return listCalculate(this, func).sum;
        };

        this["avg"] = function (func) {
            if (typeof func !== "function")
                return;

            return listCalculate(this, func).avg;
        };

        this["min"] = function (func) {
            if (typeof func !== "function")
                return;

            return listCalculate(this, func).min;
        };

        this["max"] = function (func) {
            if (typeof func !== "function")
                return;

            return listCalculate(this, func).max;
        };

        //分区方法
        this["single"] = function () {
            if (this.length == 1)
                return this[0];
            else if (this.length > 0)
                return;
            return null;
        };

        this["first"] = function () {
            if (this.length > 0)
                return this[0];
            return null;
        };

        this["skip"] = function (value) {
            if (value < 0)
                value = 0;
            var newArr = new List();
            for (var i = value; i < this.length; i++) {
                newArr.push(this[i]);
            }

            return newArr;
        };

        this["take"] = function (value) {
            if (value < 0)
                value = 0;
            if (value > this.length)
                value = this.length;
            var newArr = new List();
            for (var i = 0; i < value; i++) {
                newArr.push(this[i]);
            }

            return newArr;
        };
    }

    List.prototype = [];

    String.prototype.fill = function (key, value) {
        return this.replace(new RegExp("(\\{:" + key + "})", "g"), value);
    };

    String.prototype.exists = function (text) {
        return !!this.match(text);
    };

    String.prototype.isInt = function (unsigned) {
        if (unsigned != undefined && unsigned == true)
            return /^\d+$/g.test(this.toString().trim());
        else
            return /^[-]?\d+$/g.test(this.toString().trim());
    };
    //endregion

    if (!!localStorage) {
        if (base.listTracker.length > 0) {
            base.orderTracker = base.listTracker.prev().find("#tab_list_order");
            base.counterElement = $("<li id='script-list-filter-counter' class='tab-i' style='color:{:color};'>有效条数：<span>[未筛选]</span></li>".fill("color", base.counterColor));

            //region Constructor
            function FilterStorage() {
                return {
                    version: base.storageVersion,
                    type: base.typeName,
                    list: new List([new FilterCategory("未分区")])//Categories
                }
            }

            function FilterCategory(name) {
                return {
                    name: name,
                    items: new List()//Filters
                }
            }

            function FilterItem(keyword, type) {
                return {
                    keyword: keyword,
                    type: type
                }
            }

            //endregion

            //region Storage
            var storage = new FilterStorage();

            function stringify() {
                var obj = new FilterStorage();
                obj.list = [];

                storage.list.each(function (i) {
                    obj.list.push({name: i.name, items: i.items.toArray()});
                });

                return JSON.stringify(obj);
            }

            function save() {
                localStorage[base.storageKey] = stringify();
            }

            function parse(data) {
                if (data === undefined)
                    data = null;

                try {
                    var tryParse = JSON.parse(data);
                }
                catch (e) {
                    return false;
                }

                if (!!tryParse && tryParse instanceof Object && tryParse.type === base.typeName) {
                    if (!tryParse.hasOwnProperty("version")) {
                        return false;
                    }
                    if (tryParse.version !== base.storageVersion) {
                        //TODO StorageVersionUpdate
                    }

                    var parsedList = new List(tryParse.list);
                    tryParse.list = new List();
                    parsedList.each(function (i) {
                        var category = new FilterCategory(i.name);
                        var categoryItems = new List(i.items);

                        categoryItems.each(function (j) {
                            category.items.push(new FilterItem(j.keyword, j.type));
                        });

                        tryParse.list.push(category);
                    });

                    storage = tryParse;
                    return true;
                } else {
                    return false;
                }
            }

            if (!parse(localStorage[base.storageKey]))
                storage = new FilterStorage();
            save();
            //endregion

            //region Tooltip
            var tooltipArray = new List();
            var tooltipBody = $("body");

            function tooltip(text, config) {
                function sort() {
                    var totalHeight = 0;
                    for (var i = 0; i < tooltipArray.length; i++) {
                        var str = tooltipArray[i].css("height");
                        str = str.substr(0, str.length - 2);
                        totalHeight += parseInt(str);
                    }
                    totalHeight += ((tooltipArray.length * cfg.marginBorder) + cfg.baseBottom);

                    for (var i = 0; i < tooltipArray.length; i++) {
                        var div = tooltipArray[i];
                        var str = div.css("height");
                        str = str.substr(0, str.length - 2);
                        totalHeight -= (cfg.marginBottom + parseInt(str));
                        div.css({bottom: totalHeight});
                    }
                }

                var cfg = {
                    fontColor: "white",
                    bgColor: "darkorange",
                    width: 220,
                    lineHeight: 35,
                    baseBottom: 40,
                    marginBottom: 20,
                    marginBorder: 20,
                    stayTimeout: 2500,
                    fadeOutTimeout: 1000,
                    textAlign: "center",
                    className: "",
                    zIndex: 100000,
                    isLeft: false
                };

                if (config != null) {
                    if (config["fontColor"] != null)
                        cfg.fontColor = config["fontColor"];
                    if (config["bgColor"] != null)
                        cfg.bgColor = config["bgColor"];
                    if (config["width"] != null)
                        cfg.width = parseInt(config["width"]);
                    if (config["lineHeight"] != null)
                        cfg.lineHeight = parseInt(config["lineHeight"]);
                    if (config["baseBottom"] != null)
                        cfg.baseBottom = parseInt(config["baseBottom"]);
                    if (config["marginBottom"] != null)
                        cfg.marginBottom = parseInt(config["marginBottom"]);
                    if (config["marginBorder"] != null)
                        cfg.marginBorder = parseInt(config["marginBorder"]);
                    if (config["stayTimeout"] != null)
                        cfg.stayTimeout = parseInt(config["stayTimeout"]);
                    if (config["fadeOutTimeout"] != null)
                        cfg.fadeOutTimeout = parseInt(config["fadeOutTimeout"]);
                    if (config["textAlign"] != null)
                        cfg.textAlign = config["textAlign"];
                    if (config["className"] != null)
                        cfg.className = config["className"];
                    if (config["zIndex"] != null)
                        cfg.className = config["zIndex"];
                    if (config["isLeft"] != null)
                        cfg.marginBottom = config["isLeft"] === "true";
                }

                var div = $("<div></div>");
                div.html(text);
                div.css({
                    "position": "fixed",
                    "color": cfg.fontColor,
                    "background-color": cfg.bgColor,
                    "width": cfg.width + "px",
                    "line-height": cfg.lineHeight + "px",
                    "height": cfg.lineHeight + "px",
                    "text-align": cfg.textAlign,
                    "z-index": cfg.zIndex,
                    "padding-left": "20px",
                    "padding-right": "20px"
                });

                if (!!cfg.className)
                    div.attr("class", cfg.className);
                if (cfg.isLeft)
                    div.css({"left": cfg.marginBorder + "px"});
                else
                    div.css({"right": cfg.marginBorder + "px"});

                tooltipBody.append(div);
                tooltipArray.push(div);
                sort();

                setTimeout(function () {
                    div.fadeOut(cfg.fadeOutTimeout, function () {
                        tooltipArray.remove(div);
                        div.remove();
                    });
                }, cfg.stayTimeout)
            }

            //endregion

            //region Function
            function doFilter(categoryName) {
                var category = storage.list
                    .where(function (i) {
                        return i.name === categoryName;
                    })
                    .first();
                var all = storage.list
                    .where(function (i) {
                        return i.name === "未分区";
                    })
                    .first();

                var search = category.items.clone(true);
                if (!!all) {
                    search.append(all.items.clone(true));
                }

                var ul = base.listTracker.find("ul");
                var hide = 0;
                ul.children().each(function (i, e) {
                    var element = $(e);
                    var up = element.find(".up-info").find(".v-author");
                    var title = element.find(".title");
                    var desc = element.find(".v-desc");
                    var play = element.find(".v-info").find(".gk").find("span");
                    var danmaku = element.find(".v-info").find(".dm").find("span");
                    var favorite = element.find(".v-info").find(".sc").find("span");

                    search.each(function (i) {
                        switch (i.type) {
                            case "up":
                                if (up.length > 0 && up.text().exists(i.keyword)) {
                                    element.hide();
                                    hide++;
                                    return true;
                                }
                                break;
                            case "up_r":
                                if (up.length > 0 && !up.text().exists(i.keyword)) {
                                    element.hide();
                                    hide++;
                                    return true;
                                }
                                break;
                            case "up_s":
                                if (up.length > 0 && up.text() === i.keyword) {
                                    element.hide();
                                    hide++;
                                    return true;
                                }
                                break;
                            case "up_sr":
                                if (up.length > 0 && up.text() !== i.keyword) {
                                    element.hide();
                                    hide++;
                                    return true;
                                }
                                break;
                            case "title":
                                if (title.length > 0 && title.text().exists(i.keyword)) {
                                    element.hide();
                                    hide++;
                                    return true;
                                }
                                break;
                            case "title_r":
                                if (title.length > 0 && !title.text().exists(i.keyword)) {
                                    element.hide();
                                    hide++;
                                    return true;
                                }
                                break;
                            case "description":
                                if (desc.length > 0 && desc.text().exists(i.keyword)) {
                                    element.hide();
                                    hide++;
                                    return true;
                                }
                                break;
                            case "description_r":
                                if (desc.length > 0 && !desc.text().exists(i.keyword)) {
                                    element.hide();
                                    hide++;
                                    return true;
                                }
                                break;
                            case "play_lt":
                            case "play_gt":
                            case "play_eq":
                            case "play_lteq":
                            case "play_gteq":
                            case "play_noteq":
                            case "danmaku_lt":
                            case "danmaku_gt":
                            case "danmaku_eq":
                            case "danmaku_lteq":
                            case "danmaku_gteq":
                            case "danmaku_noteq":
                            case "favorite_lt":
                            case "favorite_gt":
                            case "favorite_eq":
                            case "favorite_lteq":
                            case "favorite_gteq":
                            case "favorite_noteq":
                                var obj;

                                if (i.type.startsWith("play"))
                                    obj = play;
                                else if (i.type.startsWith("danmaku"))
                                    obj = danmaku;
                                else if (i.type.startsWith("favorite"))
                                    obj = favorite;
                                else
                                    break;

                                if (obj.length > 0) {
                                    var num = obj.attr("number");
                                    if (!!num) {
                                        if (num.isInt())
                                            num = parseInt(num);
                                        else
                                            break;

                                        var val = parseInt(i.keyword);
                                        if ((i.type.endsWith("lt") && num < val) || (i.type.endsWith("gt") && num > val) || (i.type.endsWith("eq") && num === val) || (i.type.endsWith("lteq") && num <= val) || (i.type.endsWith("gteq") && num >= val) || (i.type.endsWith("noteq") && num !== val)) {
                                            element.hide();
                                            hide++;
                                            return true;
                                        }
                                    }
                                }
                                break;
                        }
                    });
                });

                base.orderTracker.find("#script-list-filter-counter").find("span").text(ul.children().length - hide);
            }

            //endregion

            //region DOM Listener
            var timeout = null;
            var order = base.orderTracker.find("#script-list-filter-counter");
            if (order.length === 0)
                base.orderTracker.append(base.counterElement);
            else
                order.find("span").text("-1");

            base.listTracker.on("DOMSubtreeModified", function () {
                if (!!timeout)
                    clearTimeout(timeout);

                timeout = setTimeout(function () {
                    doFilter(base.categoryNameTracker);
                    timeout = null;
                }, base.triggerTimeout);
            });
            //endregion

            //region UI(Html)
            var ui =
                '<style>' +
                '    #script-list-filter-menu {' +
                '        font-size: 12px;' +
                '        height: 16px;' +
                '        display: block;' +
                '        background-color: darkorange;' +
                '        position: fixed;' +
                '        bottom: 1%;' +
                '        right: 1%;' +
                '        width: 74px;' +
                '        text-align: center;' +
                '        cursor: pointer;' +
                '        color: white;' +
                '        -moz-user-select: none;' +
                '        -webkit-user-select: none;' +
                '        -ms-user-select: none;' +
                '        user-select: none;' +
                '    }' +
                '    .script-list-filter-modal {' +
                '        position: fixed;' +
                '        top: 0;' +
                '        left: 0;' +
                '        width: 100%;' +
                '        height: 100%;' +
                '        -moz-box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4) inset;' +
                '        -webkit-box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4) inset;' +
                '        -ms-box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4) inset;' +
                '        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.4) inset;' +
                '        text-align: center;' +
                '        z-index: 99999;' +
                '    }' +
                '    .script-list-filter-modal-dialog {' +
                '        background-color: #dcdcdc;' +
                '        width: 430px;' +
                '        margin: 120px auto auto;' +
                '        padding: 15px;' +
                '        text-align: left;' +
                '        border: 1px solid black;' +
                '        -webkit-border-radius: 6px;' +
                '        -moz-border-radius: 6px;' +
                '        border-radius: 6px;' +
                '    }' +
                '    .script-list-filter-btn {' +
                '        cursor: pointer;' +
                '        padding-left: 20px;' +
                '        padding-right: 20px;' +
                '        min-width: 70px;' +
                '        height: 40px;' +
                '        background-color: #f6a63d;' +
                '        color: white;' +
                '        border: 1px solid #6d6d6d;' +
                '        -webkit-border-radius: 7px;' +
                '        -moz-border-radius: 7px;' +
                '        border-radius: 7px;' +
                '        -webkit-transition: background-color 200ms;' +
                '        -moz-transition: background-color 200ms;' +
                '        -o-transition: background-color 200ms;' +
                '        transition: background-color 200ms;' +
                '    }' +
                '    .script-list-filter-btn:hover {' +
                '        background-color: #e3953b;' +
                '    }' +
                '    .script-list-filter-btn:active {' +
                '        background-color: #c98036;' +
                '    }' +
                '    .script-list-filter-btn-close {' +
                '        background-color: #e11a4e;' +
                '    }' +
                '    .script-list-filter-btn-close:hover {' +
                '        background-color: #cd1a46;' +
                '    }' +
                '    .script-list-filter-btn-close:active {' +
                '        background-color: #af163e;' +
                '    }' +
                '    .script-list-filter-btn-back {' +
                '        background-color: #2d8edc;' +
                '    }' +
                '    .script-list-filter-btn-back:hover {' +
                '        background-color: #2c83cd;' +
                '    }' +
                '    .script-list-filter-btn-back:active {' +
                '        background-color: #256faf;' +
                '    }' +
                '</style>' +
                '<div id="script-list-filter-menu">' +
                '    过滤器配置' +
                '</div>' +
                '<div class="script-list-filter-modal" style="display: none;">' +
                '    <div id="script-list-filter-menu-main" class="script-list-filter-modal-dialog" style="width: 110px;">' +
                '        <table>' +
                '            <tr>' +
                '                <td>' +
                '                    <button id="script-list-filter-modal-add" class="script-list-filter-btn" style="width: 100px;">添加' +
                '                    </button>' +
                '                </td>' +
                '            </tr>' +
                '            <tr>' +
                '                <td>' +
                '                    <button id="script-list-filter-modal-list" class="script-list-filter-btn" style="width: 100px;">条件列表</button>' +
                '                </td>' +
                '            </tr>' +
                '            <tr>' +
                '                <td>' +
                '                    <button id="script-list-filter-modal-import" class="script-list-filter-btn" style="width: 100px;">' +
                '                        导入' +
                '                    </button>' +
                '                </td>' +
                '            </tr>' +
                '            <tr>' +
                '                <td>' +
                '                    <button id="script-list-filter-modal-export" class="script-list-filter-btn" style="width: 100px;">' +
                '                        导出' +
                '                    </button>' +
                '                </td>' +
                '            </tr>' +
                '            <tr>' +
                '                <td>' +
                '                    <button class="script-list-filter-btn script-list-filter-btn-close" style="width: 100px;">关闭' +
                '                    </button>' +
                '                </td>' +
                '            </tr>' +
                '        </table>' +
                '    </div>' +
                '    <div id="script-list-filter-menu-add" class="script-list-filter-modal-dialog" style="width: 240px; display: none;">' +
                '        <table>' +
                '            <tr style="text-align:right;">' +
                '                <td><label for="script-list-filter-menu-add-area">分区：</label></td>' +
                '                <td><input id="script-list-filter-menu-add-area" type="text" style="width: 11em;" value="{:category}"/></td>' +
                '            </tr>' +
                '            <tr style="text-align:right;">' +
                '                <td><label for="script-list-filter-menu-add-type">类型：</label></td>' +
                '                <td><select id="script-list-filter-menu-add-type" style="width: 11em;">' +
                '                    <option value="up">Up主中存在..</option>' +
                '                    <option value="up_r">Up主中不存在..</option>' +
                '                    <option value="up_s">Up主是..</option>' +
                '                    <option value="up_sr">Up主不是..</option>' +
                '                    <option value="spec">-----------------</option>' +
                '                    <option value="title">标题中存在..</option>' +
                '                    <option value="title_r">标题中不存在..</option>' +
                '                    <option value="spec">-----------------</option>' +
                '                    <option value="description">描述中存在..</option>' +
                '                    <option value="description_r">描述中不存在..</option>' +
                '                    <option value="spec">-----------------</option>' +
                '                    <option value="play_lt">播放数小于..</option>' +
                '                    <option value="play_gt">播放数大于..</option>' +
                '                    <option value="play_eq">播放数等于..</option>' +
                '                    <option value="play_lteq">播放数小于等于..</option>' +
                '                    <option value="play_gteq">播放数小于等于..</option>' +
                '                    <option value="play_noteq">播放数不等于..</option>' +
                '                    <option value="spec">-----------------</option>' +
                '                    <option value="danmaku_lt">弹幕数小于..</option>' +
                '                    <option value="danmaku_gt">弹幕数大于..</option>' +
                '                    <option value="danmaku_eq">弹幕数等于..</option>' +
                '                    <option value="danmaku_lteq">弹幕数小于等于..</option>' +
                '                    <option value="danmaku_gteq">弹幕数大于等于..</option>' +
                '                    <option value="danmaku_noteq">弹幕数不等于..</option>' +
                '                    <option value="spec">-----------------</option>' +
                '                    <option value="favorite_lt">收藏数小于..</option>' +
                '                    <option value="favorite_gt">收藏数大于..</option>' +
                '                    <option value="favorite_eq">收藏数等于..</option>' +
                '                    <option value="favorite_lteq">收藏数小于等于..</option>' +
                '                    <option value="favorite_gteq">收藏数大于等于..</option>' +
                '                    <option value="favorite_noteq">收藏数不等于..</option>' +
                '                </select>' +
                '                </td>' +
                '            </tr>' +
                '            <tr style="text-align:right;">' +
                '                <td><label for="script-list-filter-menu-add-keyword">关键字：</label></td>' +
                '                <td>' +
                '                    <input id="script-list-filter-menu-add-keyword" type="text" style="width: 11em;"/>' +
                '                </td>' +
                '            </tr>' +
                '            <tr>' +
                '                <td></td>' +
                '                <td>' +
                '                    <button class="script-list-filter-btn">添加</button>' +
                '                    <button class="script-list-filter-btn script-list-filter-btn-back">返回</button>' +
                '                </td>' +
                '            </tr>' +
                '        </table>' +
                '    </div>' +
                '    <div id="script-list-filter-menu-list" class="script-list-filter-modal-dialog" style="width: 460px;display: none;">' +
                '        <div class="script-list-filter-menu-list-view"' +
                '             style="height: 430px; overflow: scroll; overflow-x: hidden; overflow-y: auto;">' +
                '            <table style="width: 100%;table-layout: fixed;">' +
                '                <tr class="script-list-filter-menu-list-view-header">' +
                '                    <th style="width: 20%;">分区</th>' +
                '                    <th style="width: 30%;">类型</th>' +
                '                    <th style="width: 30%;">关键字</th>' +
                '                    <th style="width: 11%;"></th>' +
                '                </tr>' +
                '            </table>' +
                '        </div>' +
                '        <br/>' +
                '        <button class="script-list-filter-btn script-list-filter-btn-back">返回</button>&nbsp;&nbsp;&nbsp;<small>*&nbsp;删除操作将在刷新页面后生效</small>' +
                '    </div>' +
                '</div>';

            ui = ui.fill("category", base.categoryNameTracker);
            ui = $(ui);
            //endregion

            //region UI(Method)
            var menuDialog = ui.filter(".script-list-filter-modal");

            var menuDialogMain = ui.find("#script-list-filter-menu-main");
            var menuDialogAdd = ui.find("#script-list-filter-menu-add");
            var menuDialogList = ui.find("#script-list-filter-menu-list");

            var menuBtn = ui.filter("#script-list-filter-menu");
            var menuCloseBtn = ui.find(".script-list-filter-btn-close");
            var menuAddBtn = ui.find("#script-list-filter-modal-add");
            var menuListBtn = ui.find("#script-list-filter-modal-list");
            var menuImportBtn = ui.find("#script-list-filter-modal-import");
            var menuExportBtn = ui.find("#script-list-filter-modal-export");

            var menuAddAreaInput = menuDialogAdd.find("#script-list-filter-menu-add-area");
            var menuAddTypeSelect = menuDialogAdd.find("#script-list-filter-menu-add-type");
            var menuAddKeywordInput = menuDialogAdd.find("#script-list-filter-menu-add-keyword");
            var menuAddConfirmBtn = menuDialogAdd.find(".script-list-filter-btn:eq(0)");
            var menuAddBackBtn = menuDialogAdd.find(".script-list-filter-btn-back");

            var menuListViewTable = menuDialogList.find(".script-list-filter-menu-list-view").find("table");
            var menuListBackBtn = menuDialogList.find(".script-list-filter-btn-back");

            menuBtn.click(function () {
                menuDialog.show();
            });

            menuCloseBtn.click(function () {
                menuDialog.hide();
            });

            menuImportBtn.click(function () {
                var result = prompt("请将之前获得的文本粘贴进文本框");

                if (!!result && parse(result)) {
                    tooltip("导入成功", base.tooltipConfigOnSuccess);
                    save();
                }
                else if (result != null)
                    tooltip("导入失败", base.tooltipConfigOnFail);
            });

            menuExportBtn.click(function () {
                GM_setClipboard(stringify(), "text");
                tooltip("已将导出信息复制到剪贴板,请妥善保存", base.tooltipConfigDefault);
            });

            menuAddBtn.click(function () {
                menuDialogMain.hide();
                menuDialogAdd.show();
            });

            menuListBtn.click(function () {
                menuDialogMain.hide();
                menuDialogList.show();

                listRefresh(menuListViewTable)
            });

            menuAddConfirmBtn.click(function () {
                var area = menuAddAreaInput.val();
                var type = menuAddTypeSelect.val();
                var keyword = menuAddKeywordInput.val();
                if (area === "") {
                    tooltip("请填写分区(*为全部分区)", base.tooltipConfigOnFail);
                    alert("请填写分区(*为全部分区)");
                }
                else if (type === "spec") {
                    tooltip("请选择一个类型", base.tooltipConfigOnFail);
                    alert("请选择一个类型");
                }
                else if (keyword === "") {
                    tooltip("请选择一个类型", base.tooltipConfigOnFail);
                    alert("请填写关键字");
                }
                else {
                    var category = storage.list.where(function (i) {
                        if (area === "*")
                            return i.name === "未分区";
                        return i.name === area;
                    }).first();

                    if (category == null) {
                        category = new FilterCategory(area === "*" ? "未分区" : area);
                        storage.list.push(category);
                    }

                    var exists = category.items.where(function (i) {
                            return i.keyword === keyword && i.type === type;
                        }).length > 0;

                    if (!exists) {
                        category.items.push(new FilterItem(keyword, type));
                        save();

                        if (area === base.categoryNameTracker)
                            doFilter(area);

                        tooltip("添加完成", base.tooltipConfigOnSuccess);
                    } else {
                        tooltip("已经存在", base.tooltipConfigOnFail);
                    }
                }
            });

            menuAddBackBtn.click(function () {
                menuDialogMain.show();
                menuDialogAdd.hide();
            });

            menuListBackBtn.click(function () {
                menuDialogMain.show();
                menuDialogList.hide();
            });

            var data = new List();
            data.push(["up", "Up主中存在"]);
            data.push(["up_r", "Up主中不存在"]);
            data.push(["up_s", "Up主是"]);
            data.push(["up_sr", "Up主不是"]);
            data.push(["title", "标题中存在"]);
            data.push(["title_r", "标题中不存在"]);
            data.push(["description", "描述中存在"]);
            data.push(["description_r", "描述中不存在"]);
            data.push(["play_lt", "播放数小于"]);
            data.push(["play_gt", "播放数大于"]);
            data.push(["play_eq", "播放数等于"]);
            data.push(["play_lteq", "播放数小于等于"]);
            data.push(["play_gteq", "播放数大于等于"]);
            data.push(["play_noteq", "播放数不等于"]);

            data.push(["danmaku_lt", "弹幕数小于"]);
            data.push(["danmaku_gt", "弹幕数大于"]);
            data.push(["danmaku_eq", "弹幕数等于"]);
            data.push(["danmaku_lteq", "弹幕数小于等于"]);
            data.push(["danmaku_gteq", "弹幕数大于等于"]);
            data.push(["danmaku_noteq", "弹幕数不等于"]);

            data.push(["favorite_lt", "收藏数小于"]);
            data.push(["favorite_gt", "收藏数大于"]);
            data.push(["favorite_eq", "收藏数等于"]);
            data.push(["favorite_lteq", "收藏数小于等于"]);
            data.push(["favorite_gteq", "收藏数大于等于"]);
            data.push(["favorite_noteq", "收藏数不等于"]);

            function listRefresh(table) {
                function getType(key, reverse) {
                    var val = undefined;
                    data.each(function (i) {
                        if (reverse) {
                            if (i[1] === key) {
                                val = i[0];
                                return true;
                            }
                        } else {
                            if (i[0] === key) {
                                val = i[1];
                                return true;
                            }
                        }
                    });

                    return val;
                }

                function createNewLine(area, type, keyword) {
                    return $("<tr class='script-list-filter-menu-list-view-item'><td>{:area}</td><td>{:type}</td><td>{:keyword}</td><td><a href='#'>删除</a></td></tr>".fill("area", area).fill("type", getType(type, false)).fill("keyword", keyword));
                }

                table.find(".script-list-filter-menu-list-view-item").remove();

                var all = storage.list.where(function (i) {
                    return i.name === "未分区";
                }).first();

                if (all != null) {
                    all.items.each(function (i) {
                        table.append(createNewLine(all.name, i.type, i.keyword));
                    });
                }

                var other = storage.list.where(function (i) {
                    return i.name !== "未分区";
                });

                other.each(function (i) {
                    i.items.each(function (j) {
                        table.append(createNewLine(i.name, j.type, j.keyword));
                    })
                });

                table.find("a").each(function (i, e) {
                    $(e).click(function () {
                        var parent = $(this).parent().parent();

                        var area, type, keyword;
                        if (!!parent) {
                            parent.children().each(function (j, item) {
                                var jItem = $(item);
                                switch (j) {
                                    case 0:
                                        area = jItem.text();
                                        break;
                                    case 1:
                                        type = getType(jItem.text(), true);
                                        break;
                                    case 2:
                                        keyword = jItem.text();
                                        break;
                                }
                            });

                            var category = storage.list.where(function (i) {
                                return i.name === area;
                            }).first();

                            if (category != null) {
                                var find = undefined;

                                category.items.each(function (i) {
                                    if (i.type === type && i.keyword === keyword) {
                                        find = i;
                                        return true;
                                    }
                                });

                                if (find != null) {
                                    category.items.remove(find, true);
                                    save();
                                    listRefresh(table);
                                    tooltip("删除成功", base.tooltipConfigOnSuccess);
                                } else {
                                    tooltip("删除失败", base.tooltipConfigOnFail);
                                }
                            }
                        }
                    });
                })
            }

            $("body").append(ui);
            //endregion
        }
    }
    else
        throw new Error("当前浏览器不支持HTML 5 LocalStorage. 脚本:Bilibili List Filter");
});