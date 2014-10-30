// ==UserScript==
// @id          pd2SkillTreeLocalization_chinese
// @name        pd2stats技能树汉化
// @description 替换pd2stats的技能树文本_暴徒100%
// @namespace   pd2statsSkillTreeLocalization_chinese
// @include     http://pd2stats.com/stats.php?*
// @require     http://code.jquery.com/jquery-1.11.1.js
// @version     b0.3
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
            //主技能
            text = text.replaceAll("<span><div class=\"blueh2\">Unlocking the Enforcer</div><br><strong class=\"blue\">Unlock for</strong> 1 Skillpoint<br>The Enforcer is a violent criminal, usually employed by crime syndicates to execute jobs that no one else can.<br><br>Spending the first point in the Enforcer skill tree unlocks the ability to place the ammo bag deployable. The ammo bag can be used to gain ammunition.</span>", "<span><div class=\"blueh2\">解锁暴徒技能</div><br><strong class=\"blue\">成为暴徒需</strong> 1 技能点<br>专业突突突，擅长突突突。<br><br>解锁即可部署弹药包，用于补给弹药。<br><br>基础弹药包可补给 <div class=\"bluein\">300%</div> 弹药量。</span>");
            //Oppressor
            text = text.replaceAll("<span><div class=\"blueh2\">Oppressor</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Your weapons are <div class=\"bluein\">25%</div> more effective at threatening enemies.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Your weapons are <div class=\"bluein\">50%</div> more effective at threatening enemies.</span>", "<span><div class=\"blueh2\">暴君</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>你的武器增加 <div class=\"bluein\">25%</div> 的威胁度。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>额外增加 <div class=\"bluein\">50%</div> 的威胁度</span>");
            //Bullet Strom
            text = text.replaceAll("<span><div class=\"blueh2\">Bullet Storm</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Directly after you deploy an ammo bag, you can fire your weapon for <div class=\"bluein\">5</div> seconds without depleting your ammunition.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>You can fire <div class=\"bluein\">10</div> seconds longer without depleting your ammunition.<br><br>Note: Does not apply to grenade launchers.</span>", "<span><div class=\"blueh2\">子弹风暴</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>放置一个弹药包后会获得 <div class=\"bluein\">5</div> 秒的无限子弹时间。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>额外增加 <div class=\"bluein\">10</div> 秒无限子弹时间。<br><br>注意：榴弹发射器不享受此效果</span>");
            //Transporter
            text = text.replaceAll("<span><div class=\"blueh2\">Transporter</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>You move <div class=\"bluein\">50%</div> faster when carrying bags.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>You can throw bags <div class=\"bluein\">50%</div> further.</span>", "<span><div class=\"blueh2\">运送者</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>提高 <div class=\"bluein\">50%</div> 的背包时移动速度。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>提高 <div class=\"bluein\">50%</div> 的扔包距离。</span>");
            //Die Hard
            text = text.replaceAll("<span><div class=\"blueh2\">Die Hard</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>You can use your primary weapon in bleedout.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Your armor recovers <div class=\"bluein\">15%</div> faster.</span>", "<span><div class=\"blueh2\">命硬</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>你能在倒地的时候使用主武器。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>增加 <div class=\"bluein\">15%</div> 的护甲恢复速度。</span>");
            //Underdog
            text = text.replaceAll("<span><div class=\"blueh2\">Underdog</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>When you are surrounded by three enemies or more, you receive a <div class=\"bluein\">15%</div> damage bonus for <div class=\"bluein\">7</div> seconds.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>When you are surrounded by three enemies or more, you receive <div class=\"bluein\">15%</div> less damage from enemies for <div class=\"bluein\">7</div> seconds.</span>", "<span><div class=\"blueh2\">落水狗</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>在被3个及以上敌人包围的时候获得持续 <div class=\"bluein\">7</div> 秒的 <div class=\"bluein\">15%</div> 伤害加成。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>同时获得持续 <div class=\"bluein\">7</div> 秒的 <div class=\"bluein\">15%</div> 减伤。</span>");
            //Pumping Iron
            text = text.replaceAll("<span><div class=\"blueh2\">Pumping Iron</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Your melee attacks against non-special enemies deal <div class=\"bluein\">50%</div> more damage.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Your melee attacks against special enemies deal <div class=\"bluein\">50%</div> more damage.</span>", "<span><div class=\"blueh2\">近战专精</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>你的近战攻击对普通敌人增加 <div class=\"bluein\">50%</div> 伤害。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>对特殊敌人也增加 <div class=\"bluein\">50%</div> 伤害。</span>");
            //Shotgun Impact
            text = text.replaceAll("<span><div class=\"blueh2\">Shotgun Impact</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Your weapon stability with shotguns is increased by <div class=\"bluein\">25%</div>.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>You deal <div class=\"bluein\">35%</div> more damage with shotguns.</span>", "<span><div class=\"blueh2\">霰弹枪强化</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>霰弹枪增加 <div class=\"bluein\">25%</div> 稳定性。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>霰弹枪增加 <div class=\"bluein\">35%</div> 伤害。</span>");
            //Stun Resistance
            text = text.replaceAll("<span><div class=\"blueh2\">Stun Resistance</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Reduces the visual effect duration of flashbangs by <div class=\"bluein\">25%</div>.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Further reduces the visual effect duration by <div class=\"bluein\">50%</div>.</span>", "<span><div class=\"blueh2\">太阳镜</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>减少 <div class=\"bluein\">25%</div> 的闪光弹持续时间。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>额外减少 <div class=\"bluein\">50%</div> 的视觉特效持续时间。</span>");
            //ToughGuy
            text = text.replaceAll("<span><div class=\"blueh2\">Tough Guy</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Reduces your camera shake by <div class=\"bluein\">50%</div> when you are damaged by enemy fire.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Your bleedout health is increased by <div class=\"bluein\">25%</div>.</span>", "<span><div class=\"blueh2\">硬汉</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>减少 <div class=\"bluein\">50%</div> 敌人攻击你造成的镜头抖动。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>增加 <div class=\"bluein\">25%</div> 倒地生命值。</span>");
            //Shotgun CQB
            text = text.replaceAll("<span><div class=\"blueh2\">Shotgun CQB</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Increases your shotgun reload speed by <div class=\"bluein\">50%</div>.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Increases your shotgun steel sight speed by <div class=\"bluein\">125%</div>.</span>", "<span><div class=\"blueh2\">霰弹枪格斗术</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>减少 <div class=\"bluein\">50%</div> 霰弹枪装弹时间。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>增加 <div class=\"bluein\">125%</div> 霰弹枪进入瞄具模式速度。</span>");
            //Ammunition Specialist
            text = text.replaceAll("<span><div class=\"blueh2\">Ammunition Specialist</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You can now place <div class=\"bluein\">2</div> ammo bags instead of just one.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Each ammo bag contains additional <div class=\"bluein\">200%</div> ammunition.</span>", "<span><div class=\"blueh2\">军火专家</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>你可以同时携带 <div class=\"bluein\">2</div> 个弹药包。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>每个弹药包增加 <div class=\"bluein\">200%</div> 的弹药量。</span>");
            //Berserker
            text = text.replaceAll("<span><div class=\"blueh2\">Berserker</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>The lower your health, the more melee damage you do. When your health is below <div class=\"bluein\">25%</div>, you will do up to <div class=\"bluein\">250%</div> more melee and saw damage.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>When your health is below <div class=\"bluein\">25%</div>, you will do up to <div class=\"bluein\">100%</div> more damage with ranged weapons.<br><br>Note: Does not apply to grenade launchers.</span>", "<span><div class=\"blueh2\">狂战士</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>当你的生命值低于 <div class=\"bluein\">25%</div> 时，你的近战伤害增加 <div class=\"bluein\">250%</div> (包括电锯)。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>当你的生命值低于 <div class=\"bluein\">25%</div> 时，你的远程伤害增加 <div class=\"bluein\">100%</div> 。</span>");
            //Hard Boiled
            text = text.replaceAll("<span><div class=\"blueh2\">Hard Boiled</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Increases your shotgun weapon accuracy by <div class=\"bluein\">20%</div> when firing from the hip.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Increases your weapon accuracy by <div class=\"bluein\">20%</div> when firing from the hip with all weapons.</span>", "<span><div class=\"blueh2\">冷酷</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>增加 <div class=\"bluein\">25%</div> 霰弹枪盲射精准度。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>增加所有武器 <div class=\"bluein\">25%</div> 盲射精准度。</span>");
            //Fully Loaded
            text = text.replaceAll("<span><div class=\"blueh2\">Fully Loaded</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You total ammo capacity is increased by <div class=\"bluein\">25%</div>.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Enemies drop <div class=\"bluein\">75%</div> more ammunition.<br><br>Note: ACE version does not work with custom shotgun ammo types.</span>", "<span><div class=\"blueh2\">全副武装</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>增加所有武器 <div class=\"bluein\">25%</div> 总弹量。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>敌人额外掉落 <div class=\"bluein\">75%</div> 的弹药。<br><br>注意：额外掉落不对霰弹枪DLC中的弹药生效</span>");
            //Portable Saw
            text = text.replaceAll("<span><div class=\"blueh2\">Portable Saw</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Unlocks the OVE9000 portable saw for you to use.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Increases your saw blade amount by <div class=\"bluein\">1</div>.</span>", "<span><div class=\"blueh2\">便携式电锯</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>解锁 <div class=\"bluein\">OVE9000</div> 便携式电锯。 <br><strong class=\"blue\">专家级</strong> 8 技能点<br>增加 <div class=\"bluein\">1</div> 个电锯锯片。</span>");
            //Overkill
            text = text.replaceAll("<span><div class=\"blueh2\">Overkill</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>When you kill an enemy using a shotgun or saw, you receive a <div class=\"bluein\">75%</div> damage bonus for <div class=\"bluein\">5</div> seconds.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>The damage bonus now applies to all weapons, but the effect must still be triggered with the shotgun or saw.<br><br>Note: Does not apply to grenade launchers.</span>", "<span><div class=\"blueh2\">杀戮</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>当你使用霰弹枪或电锯杀人后会增加持续 <div class=\"bluein\">5</div> 秒的 <div class=\"bluein\">75%</div> 伤害加成(只对霰弹枪和电锯有效)。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>所有武器都可以享受伤害加成(只能由霰弹枪和电锯触发)。<br><br>注意：榴弹发射器不享受此效果</span>");
            //Iron Man
            text = text.replaceAll("<span><div class=\"blueh2\">Iron Man</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Unlocks the ability for you to wear the Improved Combined Tactical Vest.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>When you melee Shield enemies, they get knocked back by the sheer force.<br><br>Run and shoot – you can now shoot from the hip while sprinting.</span>", "<span><div class=\"blueh2\">铁人</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>解锁 <div class=\"bluein\">改良型组合战术背心</div>。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>近战可以击退持盾警察。<br><br>跑动射击 &ndash; 你现在可以在跑动的时候进行盲射。</span>");
            //Carbon Blade
            text = text.replaceAll("<span><div class=\"blueh2\">Carbon Blade</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You replace your saw blades with carbon blades, increasing your saw efficiency by <div class=\"bluein\">20%</div>.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Attacking enemies with the OVE9000 portable saw wears it down <div class=\"bluein\">50%</div> less than before. Saws are <div class=\"bluein\">20%</div> more effective.<br><br>You can use the saw as a secondary weapon.</span>", "<span><div class=\"blueh2\">碳质锯片</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>把锯片换成碳质锯片，增加 <div class=\"bluein\">20%</div> 的电锯效果(非伤害)。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>使用电锯攻击敌人可以减少 <div class=\"bluein\">50%</div> 的锯片消耗并提升 <div class=\"bluein\">20%</div> 的电锯伤害。<br><br>你现在可以使用电锯当副手武器</span>");
            break;
        //技师
        case 3:
            //主技能
            text = text.replaceAll("<span><div class=\"blueh2\">Unlocking the Technician</div><br><strong class=\"blue\">Unlock for</strong> 1 Skillpoint<br>The Technician is an expert in the practical application of criminal science, enjoying anything that goes BOOM!<br><br>Spending the first point in the Technician skill tree unlocks the ability to place the trip mine deployable. The trip mine can be used to blow things up, like people and safes.<br><br><div class=\"bluein\">2</div> deployable trip mines are added to your inventory.</span>", "<span><div class=\"blueh2\">解锁技师技能</div><br><strong class=\"blue\">成为技师需</strong> 1 技能点<br>技师是一个炸弹狂人。<br><br>解锁即可部署地雷。<br><br>可携带 <div class=\"bluein\">2</div> 个地雷。</span>");
            //Rifleman
            text = text.replaceAll("<span><div class=\"blueh2\">Rifleman</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Your snap to zoom <div class=\"bluein\">100%</div> faster with assault rifles and sniper rifles.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Your weapon zoom level is increased by <div class=\"bluein\">25%</div> with assault rifles and sniper rifles.</span>", "<span><div class=\"blueh2\">步枪手</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>增加 <div class=\"bluein\">100%</div> 步枪和狙击枪进入瞄具速度。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>增加 <div class=\"bluein\">25%</div> 步枪和狙击枪缩放倍率。</span>");
            //Demolition Man
            text = text.replaceAll("<span><div class=\"blueh2\">Demolition Man</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Adds <div class=\"bluein\">1</div> more trip mine to your inventory.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Decreases your trip mine deploy time by <div class=\"bluein\">20%</div>.</span>", "<span><div class=\"blueh2\">拆迁办</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>增加 <div class=\"bluein\">1</div> 个地雷携带量。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>缩短 <div class=\"bluein\">20%</div> 地雷放置时间。</span>");
            //Nerves of Steel
            text = text.replaceAll("<span><div class=\"blueh2\">Nerves of Steel</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>You take <div class=\"bluein\">50%</div> less damage while interacting with things.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>You can now use steel sight while in bleed-out.</span>", "<span><div class=\"blueh2\">钢铁意志</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>互动时减少 <div class=\"bluein\">50%</div> 所受伤害。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>你能在倒地的时候使用瞄具。</span>");
            //Sharpshooter
            text = text.replaceAll("<span><div class=\"blueh2\">Sharpshooter</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>You are <div class=\"bluein\">20%</div> more accurate with all single shot weapons.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Your weapon stability is increased with all rifles by <div class=\"bluein\">25%</div>.</span>", "<span><div class=\"blueh2\">神射手</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>单发武器增加 <div class=\"bluein\">20%</div> 精准度。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>增加所有步枪 <div class=\"bluein\">25%</div> 稳定性。</span>");
            //Combat Engineer
            text = text.replaceAll("<span><div class=\"blueh2\">Combat Engineer</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Allows you to turn trip mines on or off.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Upgrades your trip mines with a sensor mode. Enemies that go past your trip mines while in sensor mode are highlighted for you and your crew.<br><br>If stealth is not an option, the trip mines will highlight special enemies for you and your crew.</span>", "<span><div class=\"blueh2\">战地工程师</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>允许开关地雷。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>地雷可以标记走过地雷的敌人。<br><br>非潜行时，地雷会标记出特殊敌人。</span>");
            //Hardware Expert
            text = text.replaceAll("<span><div class=\"blueh2\">Hardware Expert</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>You fix the drill <div class=\"bluein\">25%</div> faster and you also deploy trip mines <div class=\"bluein\">20%</div> faster.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Gives drill a <div class=\"bluein\">30%</div> chance to autorestart when it breaks down. You also deploy the sentry gun <div class=\"bluein\">50%</div> faster.</span>", "<span><div class=\"blueh2\">设备专家</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>增加 <div class=\"bluein\">25%</div> 钻机维修速度和地雷放置速度。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>钻机损坏后有 <div class=\"bluein\">30%</div> 几率自动修复，提升 <div class=\"bluein\">50%</div> 守卫机枪放置速度。</span>");
            //Sentry Gun
            text = text.replaceAll("<span><div class=\"blueh2\">Sentry Gun</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Unlocks the sentry gun for you to use.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Your sentry gun gains <div class=\"bluein\">150%</div> more health.</span>", "<span><div class=\"blueh2\">守卫机枪</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>解锁 <div class=\"bluein\">守卫机枪</div> 。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>增加 <div class=\"bluein\">150%</div> 守卫机枪耐久。</span>");
            //Tactical Mines
            text = text.replaceAll("<span><div class=\"blueh2\">Tactical Mines</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>The radius of trip mine explosions is increased by <div class=\"bluein\">30%</div>.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Special enemies marked by your trip mines take <div class=\"bluein\">15%</div> more damage.</span>", "<span><div class=\"blueh2\">战术地雷</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>增加 <div class=\"bluein\">30%</div> 地雷爆炸范围。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>地雷标记的特殊敌人会受到额外 <div class=\"bluein\">15%</div> 的伤害。</span>");
            //Drill Sergeant
            text = text.replaceAll("<span><div class=\"blueh2\">Drill Sergeant</div><br><strong class=\"blue\">Basic</strong> 1 Skillpoint<br>Increases your drill speed by <div class=\"bluein\">15%</div>.<br><strong class=\"blue\">Ace</strong> 3 Skillpoints<br>Further increases your drill speed by <div class=\"bluein\">15%</div>.</span>", "<span><div class=\"blueh2\">钻机强化</div><br><strong class=\"blue\">入门级</strong> 1 技能点<br>增加 <div class=\"bluein\">15%</div> 钻机效率。<br><strong class=\"blue\">专家级</strong> 3 技能点<br>额外增加 <div class=\"bluein\">15%</div> 钻机效率。</span>");
            //Sentry Targeting Package
            text = text.replaceAll("<span><div class=\"blueh2\">Sentry Targeting Package</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Your sentry gun accuracy is improved by <div class=\"bluein\">100%</div>.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Your sentry gun rotational speed is increased by <div class=\"bluein\">150%</div>. Your sentry gun is loaded with <div class=\"bluein\">50%</div> extra ammo.</span>", "<span><div class=\"blueh2\">守卫机枪瞄准装置</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>增加 <div class=\"bluein\">100%</div> 守卫机枪精准度。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>增加 <div class=\"bluein\">150%</div> 守卫机枪转向速度， <div class=\"bluein\">50%</div> 额外弹药。</span>");
            //Jack of all Trades
            text = text.replaceAll("<span><div class=\"blueh2\">Jack of all Trades</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>The radius of trip mine explosions is increased by <div class=\"bluein\">70%</div>.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>You can now carry sentry guns and trip mines at the same time. When you deplete your trip mines or sentry guns you will switch to the other one.<br><br>Note: You need a sentry gun for this skill to work.</span>", "<span><div class=\"blueh2\">万金油</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>增加 <div class=\"bluein\">70%</div> 地雷爆炸范围。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>你现在可以同时携带守卫机枪和地雷，当其中一个用完会自动切换到另一个。<br><br>注意：你需要守卫机枪技能来让专家级效果生效</span>");
            //Silent Drilling
            text = text.replaceAll("<span><div class=\"blueh2\">Silent Drilling</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Your drill makes <div class=\"bluein\">65%</div> less noise. Civilians and guards are less likely to hear your drill and sound the alarm.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Your drill is silent. Civilians and guards have to see the drill in order to sound the alarm.</span>", "<span><div class=\"blueh2\">静音钻机</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>减少 <div class=\"bluein\">65%</div> 钻机噪音。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>钻机现在完全不会发出噪音。</span>");
            //Sentry Combat Upgrade
            text = text.replaceAll("<span><div class=\"blueh2\">Sentry Combat Upgrade</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You can now reload your sentry gun with your own ammo.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Your sentry gun receives a protective shield.</span>", "<span><div class=\"blueh2\">守卫机枪强化</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>你现在可以用携带的子弹装填机枪。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>你的守卫机枪现在拥有保护装甲。</span>");
            //Shaped Charge
            text = text.replaceAll("<span><div class=\"blueh2\">Shaped Charge</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Adds <div class=\"bluein\">3</div> more trip mines to your inventory.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Trip mines can now be converted to shaped charges, used to breach certain safes and doors.</span>", "<span><div class=\"blueh2\">C4</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>增加 <div class=\"bluein\">3</div> 个地雷携带量。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>地雷现在能用来爆破门和保险柜。</span>");
            //Shockproof
            text = text.replaceAll("<span><div class=\"blueh2\">Shockproof</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Taser shock attacks on you backfire, knocking back the Taser.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Interacting with an enemy Taser while he is electrocuting you will electrocute him, dealing <div class=\"bluein\">50%</div> damage to his health.</span>", "<span><div class=\"blueh2\">电击抗性</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>当电击枪手电你后背时有小机率反电给电击枪手。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>当被电的时候和电击枪手互动会将电击反弹回去并对他造成 <div class=\"bluein\">50%</div> 的伤害。</span>");
            //Sentry Tower Defence
            text = text.replaceAll("<span><div class=\"blueh2\">Sentry Tower Defense</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>You can now place <div class=\"bluein\">2</div> sentry guns instead of just one.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Your sentry gun damage is increased by <div class=\"bluein\">300%</div>.</span>", "<span><div class=\"blueh2\">哨兵防御阵列</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>你可以同时携带 <div class=\"bluein\">2</div> 个守卫机枪。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>增加 <div class=\"bluein\">300%</div> 的守卫机枪伤害。</span>");
            //Mag Plus
            text = text.replaceAll("<span><div class=\"blueh2\">Mag Plus</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Your weapon magazine capacity is increased by <div class=\"bluein\">5</div> rounds.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>Further increases your weapon magazine capacity by <div class=\"bluein\">10</div> rounds.<br><br>Note: Does not apply to sniper rifles.</span>", "<span><div class=\"blueh2\">弹夹扩容</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>你的每个武器的弹夹都增加 <div class=\"bluein\">5</div> 发。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>每个弹夹额外增加 <div class=\"bluein\">10</div> 发。<br><br>注意：狙击枪不享受此效果。</span>");
            //Bulletproof
            text = text.replaceAll("<span><div class=\"blueh2\">Bulletproof</div><br><strong class=\"blue\">Basic</strong> 4 Skillpoints<br>Improves your armor so you can absorb <div class=\"bluein\">50%</div> more damage.<br><strong class=\"blue\">Ace</strong> 8 Skillpoints<br>The armor recovery rate of you and your crew is increased by <div class=\"bluein\">25%</div>.</span>", "<span><div class=\"blueh2\">防弹</div><br><strong class=\"blue\">入门级</strong> 4 技能点<br>你的装甲能额外吸收 <div class=\"bluein\">50%</div> 的伤害。<br><strong class=\"blue\">专家级</strong> 8 技能点<br>提升 <div class=\"bluein\">25%</div> 的装甲恢复速度给你和你的队友。</span>");
            break;
        //幽灵
        case 4:
            //主技能
            text = text.replaceAll("", "");
            //Dead Presidents
            text = text.replaceAll("", "");
            //Sprinter
            text = text.replaceAll("", "");
            //Car Burglar
            text = text.replaceAll("", "");
            //Fast Hands
            text = text.replaceAll("", "");
            //Chameleon
            text = text.replaceAll("", "");
            //Cleaner
            text = text.replaceAll("", "");
            //Shinobi
            text = text.replaceAll("", "");
            //Martial Arts
            text = text.replaceAll("", "");
            //SMG Specialist
            text = text.replaceAll("", "");
            //Nine Lives
            text = text.replaceAll("", "");
            //ECM Specialist
            text = text.replaceAll("", "");
            //Silent Killer
            text = text.replaceAll("", "");
            //Lockpicking Expert
            text = text.replaceAll("", "");
            //ECM Overdrive
            text = text.replaceAll("", "");
            //The Professional
            text = text.replaceAll("", "");
            //Camera Loop
            text = text.replaceAll("", "");
            //ECM Feedback
            text = text.replaceAll("", "");
            //Moving Target
            text = text.replaceAll("", "");
            break;
        //逃犯
        case 5:
            //主技能
            text = text.replaceAll("", "");
            //Daredevil
            text = text.replaceAll("", "");
            //Hidden Blade
            text = text.replaceAll("", "");
            //Thick Skin
            text = text.replaceAll("", "");
            //Run and Gun
            text = text.replaceAll("", "");
            //Sixth Sense
            text = text.replaceAll("", "");
            //Duck and Cover
            text = text.replaceAll("", "");
            //Brother's Keeper
            text = text.replaceAll("", "");
            //Winston Wolfe
            text = text.replaceAll("", "");
            //Quick Fix
            text = text.replaceAll("", "");
            //Swan Song
            text = text.replaceAll("", "");
            //Undertaker
            text = text.replaceAll("", "");
            //Uppers
            text = text.replaceAll("", "");
            //Trigger Happy
            text = text.replaceAll("", "");
            //Low Blow
            text = text.replaceAll("", "");
            //Conter-Strike
            text = text.replaceAll("", "");
            //Bullseye
            text = text.replaceAll("", "");
            //Sneaky Bastard
            text = text.replaceAll("", "");
            //Akimbo
            text = text.replaceAll("", "");
            break;
    }
    $(this).html(text);
}

//替换全部
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

Load();