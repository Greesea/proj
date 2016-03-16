// ==UserScript==
// @name        贴吧大封禁
// @namespace   DrakeWorks.Tieba
// @description 循环永封
// @include     http://tieba.baidu.com/*
// @exclude     http://tieba.baidu.com/tb*
// @exclude     http://tieba.baidu.com/bawu2*
// @version     I
// @grant       none
// @author      Greesea
// ==/UserScript==

//Important! Require HTML 5 LocalStorage Support
//查看所有用户：_rbs.getAll();
//删除用户：_rbs.remove(贴吧名,用户名);

$(function () {
    //-----Config-----
    var lang = {
        name: "十封循",//脚本名
        labelName: "十封循",//封禁按钮文本
        success: "成功",//成功
        fail: "失败",//失败
        info_alreadyIn: "用户 {:username} 已在封禁列表",//普通方式 用户已存在
        info_banComplete: "用户名:{:username}\n{:result}",//普通方式 用户封禁
        info_repeatStart: "[{:name}] 循环 间隔日期：{:diff}天",//普通方式 开始循环
        info_repeatBan: "[{:name}] 循环 贴吧：{:tieba}\t用户：{:username} \t结果：{:result}\t{:resp}",//普通方式 循环Ban
        info_repeatComplete: "[{:name}] 循环 完成 成功率:{:rate}%",//普通方式 循环结束
        info_funcDisplayFmt: "贴吧:{:tieba}\t用户:{:username}",//普通方式 查询所有用户
        err_requireLocalStorage: "当前浏览器不支持HTML 5 LocalStorage. 脚本:{:name}",//错误 浏览器不支持LocalStorage
        tooltip_alreadyIn: "{:username} 已在封禁列表",//提示 用户已存在
        tooltip_banComplete: "{:username} 封禁{:result} {:resp}",//提示 用户封禁
        tooltip_repeatStart: "循环开始 请勿关闭页面或跳转页面<br/>距离上次间隔{:diff}天",//提示 开始循环
        tooltip_repeatBan: "[{:tieba}吧] {:username} {:result} {:resp}",//提示 循环Ban
        tooltip_repeatComplete: "循环完成 成功率:{:rate}%",//提示 循环结束
        tooltip_needMove: "<strong>封禁到期</strong><br/>非帖子页无法封禁用户<br/>请移步至任意一个帖子开始封禁"//提示 需要跳转
    };

    var base = {
        storageKey: "RepeatBanUserScript",//存储key
        typeName: "RepeatBanStorage",//类型名 读取配置时依靠此项判断是否为脚本配置
        banInterval: 10,//封禁时长(也是几天一循环)
        reason: "测试用",//封禁理由
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

        //request
        tbsRequestUrl: "http://tieba.baidu.com/dc/common/tbs",
        banRequestUrl: "http://tieba.baidu.com/pmc/blockid",
        ie: "gbk",//意义不明的参数
        //Tracker
        bawuTracker: unsafeWindow.PageData.is_posts_admin !== 0,//如果脚本未失效请勿修改
        tiebaNameTracker: unsafeWindow.PageData.forum.forum_name,//如果脚本未失效请勿修改
        tiebaIdTracker: unsafeWindow.PageData.forum.forum_id,
        selfNameTracker: unsafeWindow.PageData.user.name,//如果脚本未失效请勿修改
        tbsTracker: unsafeWindow.PageData.tbs
    };

    //console.log(lang);
    console.log(base);

    //-----Script-----
    if (!!localStorage) {
        function ban(username, pid) {
            var result = null;
            //var tbs = "";
            //
            //$.ajax({
            //    url: base.tbsRequestUrl,
            //    type: "get",
            //    dataType: "json",
            //    async: false,
            //    success: function (d) {
            //        tbs = d["tbs"];
            //    },
            //    error: function () {
            //        tooltip("获取tbs异常", base.tooltipConfigOnFail);
            //    }
            //});

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
                    tooltip("封禁通讯异常", base.tooltipConfigOnFail);
                }
            });

            return result;
        }

        //region Support
        Array.prototype.findByProp = function (prop, name) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][prop] === name) {
                    return this[i];
                }
            }

            return null;
        };

        String.prototype.format = function (args) {
            if (!(args instanceof Array))
                args = [args];

            var val = this.toString();
            for (var i = 0; i < args.length; i++) {
                val = val.replace(new RegExp("(\\{" + i + "})", "g"), args[i]);
            }

            return val;
        };

        String.prototype.fill = function (key, value) {
            return this.replace(new RegExp("(\\{:" + key + "})", "g"), value);
        };

        try {
            [].remove("");
        } catch (e) {
            if (e !== "")
                Array.prototype.remove = function (val) {
                    var index = this.indexOf(val);

                    if (index !== -1) {
                        return this.removeAt(index);
                    }
                    return this;
                }
        }

        try {
            [].removeAt("");
        } catch (e) {
            if (e !== "")
                Array.prototype.removeAt = function (index) {
                    var after = this.splice(index + 1, this.length - index);
                    var before = this.splice(0, index);

                    var result = before.concat(after);

                    this.length = 0;
                    for (var i = 0; i < result.length; i++) {
                        this.push(result[i]);
                    }
                    return this;
                }
        }
        //endregion

        //region Constructor
        function BlockStorage() {
            return {
                type: base.typeName,
                date: null,
                list: []//BlockIndex
            }
        }

        function BlockIndex(name) {
            return {
                name: name,
                items: []//Username
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
        var storage = undefined;
        try {
            storage = JSON.parse(localStorage[base.storageKey]);
            console.log(storage);
        }
        catch (e) {
            //ignore
        }
        finally {
            if (!storage || !(storage instanceof Object) || storage.type !== base.typeName)
                storage = new BlockStorage();
        }

        function save() {
            localStorage[base.storageKey] = JSON.stringify(storage);
        }

        //endregion

        //region Tooltip
        var tooltipArray = [];
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
            fmt = fmt.replace(/y/g, date.getFullYear());
            fmt = fmt.replace(/m/g, date.getMonth() + 1);
            fmt = fmt.replace(/d/g, date.getDate());

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
        if (!storage.date) {
            storage.date = getDate();
            save();
        }
        else {
            var diff = dateDiff(new Date(), toDate(storage.date));
            if (diff >= (base.banInterval - 1)) {
                if (/^(http(s)?:\/\/tieba\.baidu\.com\/f\?)/.test(location.href)) {
                    tooltip(lang.tooltip_needMove, base.tooltipConfigDefault);
                }
                else if (/^(http(s)?:\/\/tieba\.baidu\.com\/p\/)/.test(location.href)) {
                    console.log(lang.info_repeatStart.fill("name", lang.name).fill("diff", diff));
                    tooltip(lang.tooltip_repeatStart.fill("diff", diff), base.tooltipConfigDefault);

                    var total = 0;
                    var succ = 0;
                    for (var i = 0; i < storage.list.length; i++) {
                        var tieba = storage.list[i];
                        total += tieba.items.length;

                        for (var j = 0; j < tieba.items.length; j++) {
                            var result = ban(tieba.items[j].username, tieba.items[j].pid);
                            if (!result)
                                result = {state: false};
                            if (result.state)
                                succ++;

                            console.log(
                                lang.info_repeatBan
                                    .fill("name", lang.name)
                                    .fill("tieba", tieba.name)
                                    .fill("username", tieba.items[j].username)
                                    .fill("result", result.state ? lang.success : lang.fail)
                                    .fill("resp", "{" + result.msg + "}")
                            );
                            tooltip(
                                lang.tooltip_repeatBan
                                    .fill("tieba", tieba.name)
                                    .fill("username", tieba.items[j].username)
                                    .fill("result", result.state ? lang.success : lang.fail)
                                    .fill("resp", "{" + result.msg + "}")
                                , result.state ? base.tooltipConfigOnSuccess : base.tooltipConfigOnFail
                            )
                        }
                    }

                    var rate = (total === 0) ? 100 : (succ === 0 ? 0 : (total / succ) * 100);
                    console.log(lang.info_repeatComplete.fill("name", lang.name).fill("rate", rate));
                    tooltip(lang.tooltip_repeatComplete.fill("rate", rate), base.tooltipConfigDefault);
                    storage.date = getDate();
                    save();
                }
            }
        }
        //endregion

        //region AddToBan
        if (base.bawuTracker && /^(http(s)?:\/\/tieba\.baidu\.com\/p\/)/.test(location.href)) {
            $(".d_author").find(".d_name").find("a").each(function (i, elem) {
                var self = $(elem);

                if (self.text() !== base.selfNameTracker) {
                    self.parent().parent().parent().next().find(".post-tail-wrap").prepend($("<span class='script-block-user-btn' style='color:{:color};cursor:pointer;'>{:labelName}</span>".fill("labelName", lang.labelName).fill("color", base.color)));
                }
            });

            $(".script-block-user-btn").click(function () {
                var username = $(this).parent().parent().parent().parent().prev().find(".d_name").find("a").text();
                var pid = $(this).parent().parent().parent().parent().parent().data("field").content.post_id;

                var index = storage.list.findByProp("name", base.tiebaNameTracker);
                if (!index) {
                    index = new BlockIndex(base.tiebaNameTracker);
                    storage.list.push(index);
                    save();
                }

                var find = index.items.findByProp("username", username);
                if (!find) {
                    var result = ban(username, pid);
                    if (!result)
                        result = {state: false};
                    //alert(lang.info_banComplete.fill("username", username).fill("result", result ? lang.success : lang.fail));
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
                    //alert(lang.info_alreadyIn.fill("username", username));
                    tooltip(lang.tooltip_alreadyIn.fill("username", username), base.tooltipConfigOnFail);
                }
            });
        }
        //endregion

        //region func
        var rbs = {};
        rbs.getAll = function () {
            console.log("-------------------------------------");
            for (var i = 0; i < storage.list.length; i++) {
                var tieba = storage.list[i];
                for (var j = 0; j < tieba.items.length; j++) {
                    console.log(lang.info_funcDisplayFmt.fill("tieba", tieba.name).fill("username", tieba.items[i].username));
                }
            }
            console.log("-------------------------------------");
        };
        rbs.remove = function (tiebaName, username) {
            for (var i = 0; i < storage.list.length; i++) {
                var tieba = storage.list[i];

                if (tieba.name === tiebaName)
                    for (var j = 0; j < tieba.items.length; j++) {
                        if (tieba.items[j].username === username) {
                            tieba.items.remove(tieba.items[j]);
                            save();
                            return true;
                        }
                    }
            }

            return false;
        };

        window._rbs = rbs;
        //endregion
    }
    else
        throw new Error(lang.err_requireLocalStorage.fill("name", lang.name));
});