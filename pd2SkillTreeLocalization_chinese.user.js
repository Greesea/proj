// ==UserScript==
// @id          pd2SkillTreeLocalization_chinese
// @name        pd2stats技能树汉化
// @description 替换pd2stats的技能树文本
// @namespace   pd2statsSkillTreeLocalization_chinese
// @include     http://pd2stats.com/stats.php?*
// @require     http://code.jquery.com/jquery-1.11.1.js
// @version     b0.1
// @author      Greesea,Lie1092
// ==/UserScript==
var count = 0;
function Load() {
    //替换职业名称
    var inner = $("#tree .maxtable tbody tr").html();
    inner = inner.replaceAll("Mastermind", "黑手");
    inner = inner.replaceAll("Enforcer", "暴徒");
    inner = inner.replaceAll("Technician", "技师");
    inner = inner.replaceAll("Ghost", "幽灵");
    inner = inner.replaceAll("Fugitive", "逃犯");
    $("#tree .maxtable tbody tr").html(inner);

    //技能树替换
    $(".skilltree").each(skillTree);
}

function skillTree(html) {
    count++;
    var text = $(this).html();
    switch (count) {
        //黑手
        case 1:
            //主技能
            text = text.replaceAll("<div class=\"blueh2\">Unlocking the Mastermind</div><br><strong class=\"blue\">Unlock for</strong> 1 Skillpoint<br>The Mastermind is a manipulative leader who excels in situational control.<br><br>Spending the first point in the Mastermind skill tree unlocks the ability to place the doctor bag deployable. The doctor bag can be used to regain health.<br><br>The doctor bag has <div class=\"bluein\">2</div> charges in its basic state.", "<div class=\"blueh2\">解锁黑手技能</div><br /><strong class=\"blue\">成为黑手需</strong> 1 技能点<br/>黑手是团队领导，擅长控场。<br/><br/>解锁即可部署医疗包，用于恢复生命值。<br/><br/>基础医疗包可使用 <div class=\"bluein\">2</div> 次。");
            //Cable Guy
            text = text.replaceAll("<div class=\"blueh2\">Cable Guy</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>You can cable tie hostages <div class=\"bluein\">75%</div> faster.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Increases your supply of cable ties from <div class=\"bluein\">2</div> to <div class=\"bluein\">6</div>.", "<div class=\"blueh2\">捆绑PLAY</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>捆绑人质的速度提高 <div class=\"bluein\">75%</div> 。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>绑带携带量从 <div class=\"bluein\">2</div> 根提升至 <div class=\"bluein\">6</div> 根。");
            //Combat Medic
            text = text.replaceAll("<div class=\"blueh2\">Combat Medic</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>After you have revived a crew member, you receive a <div class=\"bluein\">25%</div> damage bonus for <div class=\"bluein\">10</div> seconds.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Reviving a crew member gives them <div class=\"bluein\">30%</div> more health.", "<div class=\"blueh2\">创可贴</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>救起同伙后 <div class=\"bluein\">10</div> 秒内获得 <div class=\"bluein\">25%</div> 的伤害加成。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>被救起的同伙多恢复 <div class=\"bluein\">30%</div> 的生命值。");
            //Endurance
            text = text.replaceAll("<div class=\"blueh2\">Endurance</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Increases your stamina by <div class=\"bluein\">100%</div>.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Increases stamina for you and your crew by <div class=\"bluein\">50%</div>.", "<div class=\"blueh2\">耐久</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>增加你 <div class=\"bluein\">100%</div> 的耐力值。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>额外增加你与同伙 <div class=\"bluein\">50%</div> 的耐力值。");
            //Control Freak
            text = text.replaceAll("<div class=\"blueh2\">Control Freak</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Civilians remain intimidated <div class=\"bluein\">50%</div> longer.<br><br>Noise created by you intimidates civilians<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Unlocks special Inside Man assets in the Job Overview menu.", "<div class=\"blueh2\">控制狂</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>平民恐惧时间增长 <div class=\"bluein\">50%</div> 。<br><br>发出的噪音能威胁到平民。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>解锁任务概述菜单 <div class=\"bluein\">专业驾驶员</div> 选项。");
            //Pain Killers
            text = text.replaceAll("<div class=\"blueh2\">Pain Killers</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Crew members you revive take <div class=\"bluein\">10%</div> less damage for <div class=\"bluein\">5</div> seconds<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>The damage reduction is increased by an additional <div class=\"bluein\">20%</div>.", "<div class=\"blueh2\">药不能停</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>被同伙救起后 <div class=\"bluein\">5</div> 秒内获得 <div class=\"bluein\">10%</div> 的减伤效果。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>减伤效果额外增加 <div class=\"bluein\">20%</div> 。");
            //Leadership
            text = text.replaceAll("<div class=\"blueh2\">Leadership</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>You and your crew's weapon stability with pistols is increased by <div class=\"bluein\">25%</div>.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>You and your crew's weapon stability with all weapons is increased by <div class=\"bluein\">50%</div>.", "<div class=\"blueh2\">领导者</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>你与同伙的手枪稳定性（stability）增加 <div class=\"bluein\">25%</div> 。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>你与同伙的所有武器稳定性（stability）增加 <div class=\"bluein\">50%</div> 。");
            //Spotter
            text = text.replaceAll("<div class=\"blueh2\">Spotter</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Special enemies marked by you take <div class=\"bluein\">15%</div> additional damage.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Unlocks the Spotter asset in the Job Overview menu.<br><br>During stealth the Spotter will highlight guards for you and your crew.<br><br>If stealth is not an option, the Spotter will highlight special enemies for you and your crew.", "<div class=\"blueh2\">监视者</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>被你标记的敌人增加 <div class=\"bluein\">15%</div> 附加伤害。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>解锁任务概述菜单 <div class=\"bluein\">监视者</div> 选项。<br><br>潜行时，监视者将标记出敌人。<br><br>非潜行时，监视者将标记出特殊敌人。");
            //Equilibrium
            text = text.replaceAll("<div class=\"blueh2\">Equilibrium</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Increases accuracy with pistols by <div class=\"bluein\">10%</div> and decreases the time it takes to pull and put away pistols by <div class=\"bluein\">50%</div>.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Increases your rate of fire with pistols by <div class=\"bluein\">100%</div>.", "<div class=\"blueh2\">冷静</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>手枪精度（accuracy）增加 <div class=\"bluein\">10%</div> ，换枪速度提高 <div class=\"bluein\">50%</div> 。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>手枪射速（rate of fire）增加 <div class=\"bluein\">100%</div> 。");
            //Dominator
            text = text.replaceAll("<div class=\"blueh2\">Dominator</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>You and your crew can now intimidate a non-special enemy. Less well trained enemies are easier to intimidate.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>The power and range of your intimidation is increased by <div class=\"bluein\">50%</div>.", "<div class=\"blueh2\">支配者</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>你与同伙可以威胁非特殊敌人，杂兵更容易被威胁。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>威胁的效果和范围增加 <div class=\"bluein\">50%</div> 。");
            //Stockholm Syndrome
            text = text.replaceAll("<div class=\"blueh2\">Stockholm Syndrome</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Nearby civilians have a chance of reviving you if you interact with them.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Civilians reviving you have a chance of giving you ammunition.", "<div class=\"blueh2\">斯德哥尔摩综合症</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>倒地后可以叫平民救你。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>救起后给你一些弹药。");
            //Combat Doctor
            text = text.replaceAll("<div class=\"blueh2\">Combat Doctor</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You can now place <div class=\"bluein\">2</div> doctor bags instead of just one.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Your doctor bags have <div class=\"bluein\">2</div> additional charges each.", "<div class=\"blueh2\">战场医生</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>携带 <div class=\"bluein\">2</div> 个医疗包。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>你的医疗包可多使用 <div class=\"bluein\">2</div> 次。");
            //Joker
            text = text.replaceAll("<div class=\"blueh2\">Joker</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You can convert a non-special enemy to fight on your side. This cannot be done during stealth and the enemy must have surrendered in order for you to convert it.<br><br>You can only convert one non-special enemy at a time.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>The converted enemy gains <div class=\"bluein\">55%</div> more health and deals <div class=\"bluein\">45%</div> more damage.<br><br>The time to convert an enemy is reduced by <div class=\"bluein\">65%</div>.", "<div class=\"blueh2\">洗脑</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>策反非特殊敌人。潜行时不可使用，对方必须已投降。<br><br>每人每次只能策反一个。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>策反后获得 <div class=\"bluein\">55%</div> 的额外生命值及 <div class=\"bluein\">45%</div> 的附加伤害。<br><br>策反时间减少 <div class=\"bluein\">65%</div> 。");
            //Kilmer
            text = text.replaceAll("<div class=\"blueh2\">Kilmer</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Increases your reload speed with assault rifles and sniper rifles by <div class=\"bluein\">25%</div>.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Your weapon accuracy while moving with assault rifles and sniper rifles is increased by <div class=\"bluein\">50%</div>.<br><br>Run and Reload - you can reload your weapons while sprinting.", "<div class=\"blueh2\">基尔墨营地</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>突击步枪及狙击步枪的上弹速度提高 <div class=\"bluein\">25%</div> 。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>移动中突击步枪及狙击步枪的精度（accuracy）提高 <div class=\"bluein\">50%</div> 。<br><br>移动装弹 - 你可以跑动中装弹。");
            //Gunslinger
            text = text.replaceAll("<div class=\"blueh2\">Gunslinger</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You reload pistols <div class=\"bluein\">50%</div> faster.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>You deal <div class=\"bluein\">50%</div> additional damage with pistols.", "<div class=\"blueh2\">枪手</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>手枪装弹速度提高 <div class=\"bluein\">50%</div> 。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>手枪伤害提高 <div class=\"bluein\">50%</div> 。");
            //Partner in Crime
            text = text.replaceAll("<div class=\"blueh2\">Partner in Crime</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Having a converted enemy increases your movement speed by <div class=\"bluein\">10%</div>. Your converted enemy takes <div class=\"bluein\">40%</div> less damage<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Having a converted enemy increases your health by <div class=\"bluein\">20%</div>. Your converted enemy takes an additional <div class=\"bluein\">40%</div> less damage.", "<div class=\"blueh2\">犯罪伙伴</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>拥有策反的敌人后增加你 <div class=\"bluein\">10%</div> 移动速度。<br>你策反的敌人获得 <div class=\"bluein\">40%</div> 的减伤效果。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>拥有策反的敌人后增加你 <div class=\"bluein\">20%</div> 的生命值。<br>你策反的敌人的减伤效果额外增加 <div class=\"bluein\">40%</div> 。");
            //Hostage Taker
            text = text.replaceAll("<div class=\"blueh2\">Hostage Taker</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Having at least one hostage makes you regenerate <div class=\"bluein\">0.6%</div> health every <div class=\"bluein\">5</div> seconds.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Having at least one hostage makes you regenerate <div class=\"bluein\">2%</div> health every <div class=\"bluein\">5</div> seconds.", "<div class=\"blueh2\">劫持人质</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>拥有人质时，每 <div class=\"bluein\">5</div> 秒恢复 <div class=\"bluein\">0.6%</div> 的生命值。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>拥有人质时，每 <div class=\"bluein\">5</div> 秒恢复 <div class=\"bluein\">2%</div> 的生命值。");
            //Pistol Messiah
            text = text.replaceAll("<div class=\"blueh2\">Pistol Messiah</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>When in bleedout, you are instantly revived if you kill an enemy with a pistol. You only have <div class=\"bluein\">1</div> charge. You will replenish your charge when you get out of custody.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>You gain an additional <div class=\"bluein\">2</div> charges. You will replenish your charges when you get out of custody.", "<div class=\"blueh2\">手枪救世</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>倒地后用手枪杀死一个敌人后可立刻复活。只能使用 <div class=\"bluein\">1</div> 次，被逮捕并释放后重置复活次数。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>复活次数额外增加 <div class=\"bluein\">2</div> 次。被逮捕并释放后重置复活次数。");
            //Inspire
            text = text.replaceAll("<div class=\"blueh2\">Inspire</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You revive crew members <div class=\"bluein\">50%</div> faster. Shouting at your team-mates will increase their movement speed by <div class=\"bluein\">20%</div> for <div class=\"bluein\">10</div> seconds.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>There is a <div class=\"bluein\">75%</div> chance that you can revive crew members at a distance by shouting at them.", "<div class=\"blueh2\">松冈修造</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>你救起同伙的速度提高 <div class=\"bluein\">50%</div> 。你的呼喊声将在 <div class=\"bluein\">10</div> 秒内提高同伙 <div class=\"bluein\">20%</div> 的移动速度。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>有 <div class=\"bluein\">75%</div> 的概率能直接喊起倒地的同伙。");
            break;
            //暴徒
        case 2:
            break;
            //技师
        case 3:
            break;
            //幽灵
        case 4:
            break;
            //逃犯
        case 5:
            break;
    }
    $(this).html(text);
}

//替换全部
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

Load();