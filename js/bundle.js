var _;_={i:function(){return this.console=setInterval(this.detect.bind(this),200)},p:{offing:!1,offtime:0},turn:function(m,d,n){return null==d&&(d=!1),null==n&&(n=!1),m instanceof jQuery||(m=$(m)),d!==!1&&m.removeClass(d),n!==!1&&m.addClass(n),!0},off:function(m,d){null==d&&(d={}),d.offing&&d.offtime>0?(this.turn(m,!1,"offing"),setTimeout(function(){return this.turn(m,"offing",!1),this.turn(m,"on","off")},1e3*d.offtime+100)):this.turn(m,"on","off")},on:function(m,d){return this.turn(m,"off","on")},swap:function(m,d){m instanceof jQuery||(m=$(m)),m.hasClass("off")?this.on(m,d):this.off(m,d)},encode:function(m){return encodeURIComponent(m).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")},t:function(m,d,n,o){return _gaq.push(["_trackEvent",m,d,n,o])},rand:function(m,d){return Math.floor(Math.random()*d)+m},llc:function(){var m;return m="\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: "+config.meta.repo,console.log(m,"color: grey; font-family: Menlo, monospace;")},detect:function(){if(window.outerHeight-window.innerHeight>100||window.outerWidth-window.innerWidth>100)return this.llc(),clearInterval(this.console)}},_.i();
var config;config={beers:[{image:"beer.jpg",name:"Gilman Pilsner 1",info:"ABV: 4.5% - IBUS: 16",description:"A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."},{image:"beer.jpg",name:"Gilman Pilsner 2",info:"ABV: 4.5% - IBUS: 16",description:"A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."},{image:"beer.jpg",name:"Gilman Pilsner 3",info:"ABV: 4.5% - IBUS: 16",description:"A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."},{image:"beer.jpg",name:"Gilman Pilsner 4",info:"ABV: 4.5% - IBUS: 16",description:"A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."},{image:"beer.jpg",name:"Gilman Pilsner 5",info:"ABV: 4.5% - IBUS: 16",description:"A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."},{image:"beer.jpg",name:"Gilman Pilsner 6",info:"ABV: 4.5% - IBUS: 16",description:"A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."},{image:"beer.jpg",name:"Gilman Pilsner 7",info:"ABV: 4.5% - IBUS: 16",description:"A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."}],color:{white1:"#ffffff",black1:"#000000",goldlight:"#daa02c",golddark:"#c08000",grey90:"#1a1a1b",grey80:"#333330",grey70:"#50504d",grey50:"#80807d",grey30:"#b3b3b0",grey15:"#d9d9d4"},font:{h1:{"font-family":"Karla","font-weight":"700","font-size":"60px","line-height":"70px","letter-spacing":"4px"},"h2-light":{"font-family":"Karla","font-size":"32px","line-height":"38px"},h2:{"font-family":"Karla","font-weight":"700","font-size":"32px","line-height":"38px"},"h3-light":{"font-family":"Karla","font-size":"24px","line-height":"30px"},h3:{"font-family":"Karla","font-weight":"700","font-size":"24px","line-height":"30px"},h4:{"font-family":"Cutive","font-size":"18px","line-height":"24px","letter-spacing":"2px"},h5:{"font-family":"Cutive","font-size":"14px","line-height":"20px","letter-spacing":"4px"},body:{"font-family":"Karla","font-size":"18px","line-height":"24px"},small:{"font-family":"Karla","font-size":"14px","line-height":"20px"}},meta:{url:"http://gilmanbrewing.com/",title:"title placeholder",description:"description placeholder",keywords:"keywords",trackingID:"UA-77714389-1",share:"img/share.jpg",repo:"https://github.com/acidjazz/gilman",address:{map:"https://goo.gl/maps/E358TP48W4G2",street:"912 Gilman St",city:"Berkeley",state:"CA",zip:93710,country:"US",phone:"(510) 556-8701"},email:"info@gilmanbrewing.com",social:{facebook:"https://www.facebook.com/AnvilBrewingCompany/",twitter:"https://twitter.com/Gilman_Brewing",instagram:"https://www.instagram.com/gilmanbrewing/"}}};
var Index;Index={options:{},i:function(){var n,r;return this.handlers(),r=$(document).width(),n=Math.floor(r/350),$(".beerlist > .inner").slick({infinite:!0,slidesToShow:n,slidesToScroll:1})},handlers:function(){return $(".top .burger").click(this.burgerHandler),$(".menu .item, a.cta").click(this.menuHandler)},burgerHandler:function(){return _.swap(".top > .burger"),_.swap(".top > .menu")},menuHandler:function(){var n;return _.off(".top > .menu"),_.on(".top > .burger"),n=$(this).data("item"),$.scrollTo($("."+n),500)}};
var Preload;Preload=function(){function n(){$(".loading").each(function(n){return function(o,r){var t,e,a,l,i,s;for(e=$(r).attr("class").split(" "),s=[],l=0,i=e.length;l<i;l++)t=e[l],"loading"!==t&&(a=n.stylin(t)),s.push(console.log("url: "+a));return s}}(this))}return n.prototype.stylin=function(n){var o,r;return console.log(n),o=$("<p></p>").hide().addClass(n).appendTo("body"),r=o.css("background-image"),o.remove(),r},n}();