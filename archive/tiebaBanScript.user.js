// ==UserScript==
// @name        贴吧大封禁
// @namespace   DrakeWorks.Tieba
// @description 循环永封
// @include     http://tieba.baidu.com/*
// @exclude     http://tieba.baidu.com/tb*
// @exclude     http://tieba.baidu.com/bawu2*
// @version     III Fix.II
// @require     https://code.jquery.com/jquery-1.12.3.min.js
// @grant       unsafeWindow
// @grant       GM_setClipboard
// @author      Greesea
// ==/UserScript==

//Important! Require HTML 5 LocalStorage Support
//查看所有用户：_rbs.getAll();
//删除用户：_rbs.remove(贴吧名,用户名);
//导出：_rbs.output();
//导入：_rbs.load();
//重置(不输入贴吧名则清空全部)：_rbs.reset(贴吧名);
this.$ = this.jQuery = jQuery.noConflict(true);
$(function () {
    //-----Config-----
    //设置内容请自行备份 每次更新都将重置(保存的封禁用户不会被重置 除非更换storageKey或typeName)
    var lang = {
        name: "十封循",//脚本名
        success: "成功",//成功
        fail: "失败",//失败
        btn_labelName: "十封循",//封禁按钮文本
        menu_separator: "------",//菜单 分割线
        menu_forceRepeatLabel: "立即循环封禁",//菜单 立即循环封禁
        menu_displayCurrentBarListLabel: "显示本吧列表",//菜单 弹出当前贴吧的封禁列表
        menu_displayAllLabel: "显示全部",//菜单 弹出全部的封禁信息
        menu_displayEmpty: "[无]",//菜单 封禁列表不存在或没有包含用户
        menu_outputLabel: "导出设置",//菜单 导出
        menu_loadLabel: "导入设置",//菜单 导入
        info_alreadyIn: "用户 {:username} 已在封禁列表",//普通方式 用户已存在
        info_banComplete: "用户名:{:username}\n{:result}",//普通方式 用户封禁
        info_repeatStart: "[{:name}] 循环 间隔日期：{:diff}天",//普通方式 开始循环
        info_repeatBan: "[{:name}] 循环 贴吧：{:tieba}\t用户：{:username} \t结果：{:result}\t{:resp}",//普通方式 循环Ban
        info_repeatComplete: "[{:name}] 循环 完成 成功率:{:rate}%",//普通方式 循环结束
        info_funcDisplayFmt: "贴吧:{:tieba}\t用户:{:username}",//普通方式 查询所有用户
        info_outputHint: "已将导出信息复制到剪贴板,请妥善保存",//导出提示
        info_loadHint: "请将之前获得的文本粘贴进文本框",//导入提示
        info_loadSuccess: "导入成功",//导入成功
        info_loadFail: "导入失败",//导入失败
        err_requireLocalStorage: "当前浏览器不支持HTML 5 LocalStorage. 脚本:{:name}",//错误 浏览器不支持LocalStorage
        tooltip_alreadyIn: "{:username} 已在封禁列表",//提示 用户已存在
        tooltip_banComplete: "{:username} 封禁{:result} {:resp}",//提示 用户封禁
        tooltip_repeatStart: "循环开始 请勿关闭页面或跳转页面<br/>距离上次间隔{:diff}天",//提示 开始循环
        tooltip_repeatBan: "[{:tieba}吧] {:username} {:result} {:resp}",//提示 循环Ban
        tooltip_repeatComplete: "循环完成 成功率:{:rate}%",//提示 循环结束
        tooltip_needMove: "<strong>封禁到期</strong><br/>非帖子页无法封禁用户<br/>请移步至任意一个帖子开始封禁",//提示 需要跳转
        tooltip_networkErr: "封禁通讯异常"//请求发送失败
    };

    var base = {
        storageKey: "RepeatBanUserScript",//存储key
        typeName: "RepeatBanStorage",//类型名 读取配置时依靠此项判断是否为脚本配置
        banInterval: 10,//封禁时长(也是几天一循环)
        reason: "黑名单用户",//封禁理由
        color: "darkorange",//封禁按钮颜色
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
        storageVersion: 2,
        //request
        tbsRequestUrl: "http://tieba.baidu.com/dc/common/tbs",
        banRequestUrl: "http://tieba.baidu.com/pmc/blockid",
        ie: "gbk",
        //Tracker
        bawuTracker: unsafeWindow.PageData.is_posts_admin !== 0,
        tiebaNameTracker: unsafeWindow.PageData.forum.forum_name,
        tiebaIdTracker: unsafeWindow.PageData.forum.forum_id,
        selfNameTracker: unsafeWindow.PageData.user.name,
        tbsTracker: unsafeWindow.PageData.tbs
    };

    //-----Script-----

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
                throw new Error(["Types-List", ":", "Invalid function result."]);
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
                throw new Error(["Types-List", ":", "Invalid function."]);

            for (var i = 0; i < this.length; i++)
                func(this[i]);
        };

        //投影方法
        this["select"] = function (func) {
            if (typeof func !== "function")
                throw new Error(["Types-List", ":", "Invalid function."]);

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
                throw new Error(["Types-List", ":", "Invalid function."]);

            var newArr = new List();
            for (var i = 0; i < this.length; i++) {
                var result = listCheckFunctionBoolean(func(this[i]));

                if (!!result) {
                    newArr.push(this[i]);
                } else if (result == null) {
                    throw new Error(["Types-List", ":", "Invalid function result."]);
                }
            }

            return newArr;
        };

        //排序方法
        this["orderBy"] = function (func) {
            if (typeof func !== "function")
                throw new Error(["Types-List", ":", "Invalid function."]);

            var clone = this.clone();
            for (var i = 0; i < clone.length - 1; i++) {
                for (var j = 0; j < clone.length - 1 - i; j++) {
                    var result = listCheckFunctionBoolean(func(clone[j], clone[j + 1]));

                    if (!!result) {
                        var temp = clone[j];
                        clone[j] = clone[j + 1];
                        clone[j + 1] = temp;
                    } else if (result == null) {
                        throw new Error(["Types-List", ":", "Invalid function result."]);
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
                throw new Error(["Types-List", ":", "Invalid function."]);

            return listCalculate(this, func).sum;
        };

        this["avg"] = function (func) {
            if (typeof func !== "function")
                throw new Error(["Types-List", ":", "Invalid function."]);

            return listCalculate(this, func).avg;
        };

        this["min"] = function (func) {
            if (typeof func !== "function")
                throw new Error(["Types-List", ":", "Invalid function."]);

            return listCalculate(this, func).min;
        };

        this["max"] = function (func) {
            if (typeof func !== "function")
                throw new Error(["Types-List", ":", "Invalid function."]);

            return listCalculate(this, func).max;
        };

        //分区方法
        this["single"] = function () {
            if (this.length == 1)
                return this[0];
            else if (this.length > 0)
                throw new Error(["Types-List", ":", "Array contains more than one element."]);
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
    //endregion

    if (!!localStorage) {
        function ban(username, pid) {
            var result = null;

            $.ajax({
                url: base.banRequestUrl,
                data: {
                    "day": base.banInterval,
                    "fid": base.tiebaIdTracker,
                    "ie": base.ie,
                    "reason": base.reason,
                    "tbs": base.tbsTracker,
                    "user_name[]": username,
                    "pid[]": pid
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function (d) {
                    result = {state: false};
                    result.msg = d["errmsg"];
                    if (d["errno"] == 0)
                        result.state = true;
                },
                error: function () {
                    tooltip(lang.tooltip_networkErr, base.tooltipConfigOnFail);
                }
            });

            return result;
        }

        //region Constructor
        function BlockStorage() {
            return {
                version: 2,
                type: base.typeName,
                list: new List()//BlockIndex
            }
        }

        function BlockIndex(name) {
            return {
                name: name,
                date: getDate(),
                items: new List()//Users
            }
        }

        function BlockUser(username, pid) {
            return {
                username: username,
                pid: pid//帖子ID 这东西貌似必须有
            }
        }

        //endregion

        //region Storage
        var storage = new BlockStorage();

        function stringify() {
            var obj = new BlockStorage();
            obj.list = [];

            storage.list.each(function (i) {
                obj.list.push({name: i.name, date: i.date, items: i.items.toArray()});
            });

            return JSON.stringify(obj);
        }

        function save() {
            localStorage[base.storageKey] = stringify();
        }

        function parse(data) {
            if (data === undefined)
                data = null;

            var tryParse = JSON.parse(data);

            if (!!tryParse && tryParse instanceof Object && tryParse.type === base.typeName) {
                if (!tryParse.hasOwnProperty("version")) {
                    tryParse.version = 1;
                }
                if (tryParse.version !== base.storageVersion) {
                    switch (tryParse.version) {
                        case 1:
                            var date = tryParse["date"];
                            var newObj = new BlockStorage();
                            newObj.list = [];

                            for (var i = 0; i < tryParse.list.length; i++) {
                                tryParse.list[i]["date"] = date;
                                newObj.list.push(tryParse.list[i]);
                            }

                            tryParse = newObj;
                            break;
                    }
                }

                tryParse.list = new List(tryParse.list);

                tryParse.list.each(function (i) {
                    i.items = new List(i.items);
                });

                storage = tryParse;
                return true;
            } else {
                return false;
            }
        }

        if (!parse(localStorage[base.storageKey]))
            storage = new BlockStorage();
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
                lineHeight: 30,
                baseBottom: 40,
                marginBottom: 20,
                marginBorder: 20,
                stayTimeout: 2500,
                fadeOutTimeout: 1000,
                textAlign: "center",
                className: "",
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
                "text-align": cfg.textAlign
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

        //region Date
        function getDate(date) {
            if (date == undefined || !(date instanceof Date)) {
                date = new Date();
            }

            var fmt = "y-m-d";
            fmt = fmt.replace(/y/g, date.getFullYear().toString());
            fmt = fmt.replace(/m/g, (date.getMonth() + 1).toString());
            fmt = fmt.replace(/d/g, date.getDate().toString());

            return fmt;
        }

        function toDate(str) {
            var date = new Date();

            var items = str.split('-');
            date.setFullYear(parseInt(items[0]));
            date.setMonth(parseInt(items[1]) - 1);
            date.setDate(parseInt(items[2]));

            return date;
        }

        function dateDiff(date1, date2) {
            var diff = (date1 - date2).toString();
            diff = parseInt(diff.substr(0, diff.length - 3));

            diff = diff / 60 / 60 / 24;

            return Math.abs(Math.ceil(diff));
        }

        //endregion

        //region RepeatBan

        function Repeat(diff, tiebaName) {
            if (!tiebaName)
                return;

            if (!diff)
                diff = -1;

            if (/^(http(s)?:\/\/tieba\.baidu\.com\/f\?)/.test(location.href)) {
                tooltip(lang.tooltip_needMove, base.tooltipConfigDefault);
            }
            else if (/^(http(s)?:\/\/tieba\.baidu\.com\/p\/)/.test(location.href)) {
                console.log(lang.info_repeatStart.fill("name", lang.name).fill("diff", diff));
                tooltip(lang.tooltip_repeatStart.fill("diff", diff), base.tooltipConfigDefault);

                var tieba = storage.list.where(function (i) {
                    return i.name === tiebaName;
                }).first();

                var total = tieba.items.length;
                var succ = 0;
                tieba.items.each(function (i) {
                    var result = ban(i.username, i.pid);

                    if (!result)
                        result = {state: false};
                    if (result.state)
                        succ++;

                    console.log(
                        lang.info_repeatBan
                            .fill("name", lang.name)
                            .fill("tieba", tieba.name)
                            .fill("username", i.username)
                            .fill("result", result.state ? lang.success : lang.fail)
                            .fill("resp", "{" + result.msg + "}")
                    );
                    tooltip(
                        lang.tooltip_repeatBan
                            .fill("tieba", tieba.name)
                            .fill("username", i.username)
                            .fill("result", result.state ? lang.success : lang.fail)
                            .fill("resp", "{" + result.msg + "}")
                        , result.state ? base.tooltipConfigOnSuccess : base.tooltipConfigOnFail
                    )
                });

                var rate = (total === 0) ? 100 : (succ === 0 ? 0 : (total / succ) * 100);
                console.log(lang.info_repeatComplete.fill("name", lang.name).fill("rate", rate));
                tooltip(lang.tooltip_repeatComplete.fill("rate", rate), base.tooltipConfigDefault);
                tieba.date = getDate();
                save();
            }

            storage.list.each(function (i) {
                if (i.name === base.tiebaNameTracker)
                    if (!i.date) {
                        i.date = getDate();
                        save();
                    } else {
                        var diff = dateDiff(new Date(), toDate(i.date));
                        if (diff >= (base.banInterval - 1)) {
                            Repeat(diff, i.name);
                        }
                    }
            });
        }

        //endregion

        //region AddToBan
        if (base.bawuTracker && /^(http(s)?:\/\/tieba\.baidu\.com\/p\/)/.test(location.href)) {
            $(".d_author").find(".d_name").find("a").each(function (i, elem) {
                var self = $(elem);

                if (self.text() !== base.selfNameTracker) {
                    self.parent().parent().parent().next().find(".post-tail-wrap").prepend($("<span class='script-block-user-btn' style='color:{:color};cursor:pointer;'>{:labelName}</span>".fill("labelName", lang.btn_labelName).fill("color", base.color)));
                }
            });

            $(".script-block-user-btn").click(function () {
                var username = $(this).parent().parent().parent().parent().prev().find(".d_name").find("a").text();
                var pid = $(this).parent().parent().parent().parent().parent().data("field").content.post_id;

                var index = storage.list.where(function (i) {
                    return i.name === base.tiebaNameTracker;
                }).first();

                if (!index) {
                    index = new BlockIndex(base.tiebaNameTracker);
                    storage.list.push(index);
                    save();
                }

                var find = index.items.where(function (i) {
                    return i.username === username;
                });
                if (find.length === 0) {
                    var result = ban(username, pid);
                    if (!result)
                        result = {state: false};
                    tooltip(
                        lang.tooltip_banComplete
                            .fill("username", username)
                            .fill("result", result.state ? lang.success : lang.fail)
                            .fill("resp", "{" + result.msg + "}")
                        , result.state ? base.tooltipConfigOnSuccess : base.tooltipConfigOnFail
                    );
                    if (result.state) {
                        index.items.push(new BlockUser(username, pid));
                        save();
                    }
                } else {
                    tooltip(lang.tooltip_alreadyIn.fill("username", username), base.tooltipConfigOnFail);
                }
            });
        }
        //endregion

        //region menu
        if (base.bawuTracker && /^(http(s)?:\/\/tieba\.baidu\.com\/p\/)/.test(location.href)) {
            function genMenuItem(id, text) {
                return $("<li class='u_itieba'><a href='#' id='{:id}'>{:text}</a></li>".fill("id", id).fill("text", text));
            }

            setTimeout(function () {
                var repeatLabel = genMenuItem("script-block-menu-repeat", lang.menu_forceRepeatLabel);
                var currentLabel = genMenuItem("script-block-menu-current", lang.menu_displayCurrentBarListLabel);
                var allLabel = genMenuItem("script-block-menu-all", lang.menu_displayAllLabel);
                var outputLabel = genMenuItem("script-block-menu-output", lang.menu_outputLabel);
                var loadLabel = genMenuItem("script-block-menu-load", lang.menu_loadLabel);

                repeatLabel.click(function () {
                    Repeat(-1, base.tiebaNameTracker);
                });

                currentLabel.click(function () {
                    var tieba = storage.list.where(function (i) {
                        return i.name === base.tiebaNameTracker;
                    }).first();

                    if (!tieba || tieba.items.length === 0)
                        alert(lang.menu_displayEmpty);
                    else {
                        var str = "";

                        tieba.items.each(function (i) {
                            str += i.username + "\n";
                        });

                        alert(str);
                    }
                });

                allLabel.click(function () {
                    var total = storage.list.sum(function (i) {
                        return i.items.length;
                    });

                    if (total <= 0)
                        alert(lang.menu_displayEmpty);
                    else {
                        var str = "";

                        storage.list.each(function (i) {
                            i.items.each(function (j) {
                                str += lang.info_funcDisplayFmt.fill("tieba", i.name).fill("username", j.username) + "\n";
                            })
                        });

                        alert(str);
                    }
                });

                outputLabel.click(function () {
                    GM_setClipboard(stringify());
                    tooltip(lang.info_outputHint, base.tooltipConfigDefault);
                });

                loadLabel.click(function () {
                    var result = prompt(lang.info_loadHint);

                    if (!!result && parse(result))
                        alert(lang.success);
                    else
                        alert(lang.fail);
                });

                $("#com_userbar").find("#j_u_username .u_ddl .u_ddl_con_top ul")
                    .append(genMenuItem("script-block-menu-separator", lang.menu_separator))
                    .append(repeatLabel)
                    .append(currentLabel)
                    .append(allLabel)
                    .append(outputLabel)
                    .append(loadLabel);
            }, 5000);
        }
        //endregion

        //region func
        var rbs = {};
        rbs.getAll = function () {
            console.log("-------------------------------------");
            storage.list.each(function (i) {
                i.items.each(function (j) {
                    console.log(lang.info_funcDisplayFmt.fill("tieba", i.name).fill("username", j.username));
                })
            });
            console.log("-------------------------------------");
        };
        rbs.remove = function (tiebaName, username) {
            var tieba = storage.list
                .where(function (i) {
                    return i.name === tiebaName;
                })
                .first();

            var user = tieba.items.where(function (i) {
                return i.username === username;
            }).first();

            if (!user)
                return false;

            tieba.list.remove(user);
            return true;
        };
        rbs.output = function () {
            console.log(lang.info_outputHint);
            console.log(stringify());
        };

        rbs.load = function () {
            var result = prompt(lang.info_loadHint);

            if (!!result && parse(result))
                console.log(lang.info_loadSuccess);
            else
                console.log(lang.info_loadFail);

            save();
        };

        rbs.reset = function (tiebaName) {
            if (!tiebaName)
                storage = new BlockStorage();
            else {
                var tieba = storage.list.where(function (i) {
                    return i.name === tiebaName;
                }).first();

                if (!!tieba)
                    storage.list.remove(tieba);
            }
            save();
        };

        rbs.debug = {
            forceRepeat: function () {
                Repeat(-1, base.tiebaNameTracker);
            },
            getStorage: function () {
                return storage;
            },
            getBase: function () {
                return base;
            }
        };

        unsafeWindow._rbs = rbs;
        console.log("RepeatBanScript Initialize Complete");

        //endregion
    }
    else
        throw new Error(lang.err_requireLocalStorage.fill("name", lang.name));
});