var _;_={constructor:function(){return this.console=setInterval(this.detect.bind(this),200)},p:{offing:!1,offtime:0},turn:function(m,n,d){return null==n&&(n=!1),null==d&&(d=!1),m instanceof jQuery||(m=$(m)),n!==!1&&m.removeClass(n),d!==!1&&m.addClass(d),!0},off:function(m,n){null==n&&(n={}),n.offing&&n.offtime>0?(this.turn(m,!1,"offing"),setTimeout(function(){return this.turn(m,"offing",!1),this.turn(m,"on","off")},1e3*n.offtime+100)):this.turn(m,"on","off")},on:function(m,n){return this.turn(m,"off","on")},swap:function(m,n){m instanceof jQuery||(m=$(m)),m.hasClass("off")?this.on(m,n):this.off(m,n)},encode:function(m){return encodeURIComponent(m).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},t:function(m,n,d,o){return _gaq.push(["_trackEvent",m,n,d,o])},rand:function(m,n){return Math.floor(Math.random()*n)+m},llc:function(){var m;return m="\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: "+config.meta.repo,console.log(m,"color: grey; font-family: Menlo, monospace;")},detect:function(){if(window.outerHeight-window.innerHeight>100||window.outerWidth-window.innerWidth>100)return this.llc(),clearInterval(this.console)}};var _$1=_,Index;_$1.constructor(),Index=function(){function m(){this.handlers()}return m.prototype.handlers=function(){return $(".top .burger").click(this.mobile)},m.prototype.mobile=function(){return _$1.swap(".top > .burger"),_$1.swap(".top > .menu")},m}();var Index$1=Index,index;index=new Index$1;