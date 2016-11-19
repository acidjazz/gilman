var _;

_ = {
  i: function() {
    return this.console = setInterval(this.detect.bind(this), 200);
  },
  p: {
    offing: false,
    offtime: 0
  },
  turn: function(el, remove, add) {
    if (remove == null) {
      remove = false;
    }
    if (add == null) {
      add = false;
    }
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (remove !== false) {
      el.removeClass(remove);
    }
    if (add !== false) {
      el.addClass(add);
    }
    return true;
  },
  off: function(el, p) {
    if (p == null) {
      p = {};
    }
    if (p.offing && p.offtime > 0) {
      this.turn(el, false, 'offing');
      setTimeout(function() {
        this.turn(el, 'offing', false);
        return this.turn(el, 'on', 'off');
      }, p.offtime * 1000 + 100);
    } else {
      this.turn(el, 'on', 'off');
    }
  },
  on: function(el, p) {
    return this.turn(el, 'off', 'on');
  },
  swap: function(el, p) {
    if (!(el instanceof jQuery)) {
      el = $(el);
    }
    if (el.hasClass('off')) {
      this.on(el, p);
    } else {
      this.off(el, p);
    }
  },
  encode: function(str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  },
  t: function(category, action, label, value) {
    return _gaq.push(['_trackEvent', category, action, label, value]);
  },
  rand: function(min, max) {
    return Math.floor(Math.random() * max) + min;
  },
  llc: function() {
    var ascii;
    ascii = "\n%cmmm/............................................................./mmm\nmmo................-:://::-.......-:::::::::::::-........-::///:-.omm\nmd-.............:+yhddddddhy+-..../ddddddddddddd+....../shdddddddyodm\nmo.............-hmmmhyyyydmmmh:.../mmmmhhhhhhhhh+....:ydmmdhyyyhddoom\nm-..............-ss:-....-ymmmy.../mmmm---------....:dmmms:-...-:/.-m\nd.........................ymmmy.../mmmm-/+ooo+:-....ymmmy-:+ooo+/-..d\nh.......................:smmmd:.../mmmmhmmmmmmdh+...dmmmshdmmmmmmhs-h\nh.....................:sdmmdy:....:hhdho+//+ymmmm+..dmmmdyo//+sdmmmhh\nd..................-+ydmmdy/.......--:.......smmmh..ymmms......:mmmmm\nm-..............-:shmmmds/-----....:s/--...-:hmmms..:dmmd/-...-ommmmm\nmo..............hmmmmmmhhhhhhhh...+dmmdhyyyhdmmmy-.../hmmmhyyyhmmmdhm\nmd-.............ddddddddddddddd...-+shdddddddhy/-.....-oydddddddho:dm\nmmo.............:::::::::::::::.......-:///::-...........-:///:-..omm\nmmm/............................................................./mmm\n\n:: syntactic sugar by 256\n:: http://256.io/\n:: " + config.meta.repo;
    return console.log(ascii, "color: grey; font-family: Menlo, monospace;");
  },
  detect: function() {
    if (((window.outerHeight - window.innerHeight) > 100) || ((window.outerWidth - window.innerWidth) > 100)) {
      this.llc();
      return clearInterval(this.console);
    }
  }
};

_.i();

var Basal,
  hasProp = {}.hasOwnProperty;

Basal = {
  domain: 'http://basal.tech/api',
  client: false,
  data: false,
  structures: false,
  complete: false,
  i: function(client, complete) {
    this.complete = complete;
    this.client = client;
    return this.getStructures((function(_this) {
      return function() {
        return _this.loop();
      };
    })(this));
  },
  loop: function() {
    return $(".basal-loop").each(function(i, el) {
      var entry, name, ref, results, structure, template, tpl;
      el = $(el);
      structure = el.attr("basal-structure");
      if (Basal.structures[structure] == null) {
        Basal.error("Structure not found \"" + structure + "\"");
      }
      template = el.children().remove();
      ref = Basal.structures[structure].entries;
      results = [];
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        entry = ref[name];
        tpl = template.clone();
        tpl.find('*').each(function(ci, cel) {
          var j, jcel, len, names, ref1, ref2, results1, type, types;
          jcel = $(cel);
          name = jcel.attr('basal-name');
          type = jcel.attr('basal-type');
          names = (ref1 = jcel.attr('basal-names')) != null ? ref1.split(',') : void 0;
          types = (ref2 = jcel.attr('basal-types')) != null ? ref2.split(',') : void 0;
          if (name === void 0 && names === void 0) {
            return true;
          }
          if (names === void 0) {
            names = [name];
            types = [type];
          }
          results1 = [];
          for (i = j = 0, len = names.length; j < len; i = ++j) {
            name = names[i];
            type = types[i];
            if (type !== void 0) {
              switch (type) {
                case 'css-background':
                  results1.push(jcel.css('background-image', "url(" + entry.entities[name].value + ")"));
                  break;
                case 'date':
                  results1.push(jcel.html(moment(entry.entities[name].value, 'MM/DD/YYYY').format(jcel.attr('basal-dateformat'))));
                  break;
                case 'image':
                  results1.push(jcel.attr('src', entry.entities[name].value));
                  break;
                case 'text':
                  results1.push(jcel.html(entry.entities[name].value));
                  break;
                case 'href':
                  results1.push(jcel.attr('href', entry.entities[name].value));
                  break;
                default:
                  results1.push(void 0);
              }
            } else {
              if (name === 'structure-name') {
                results1.push(jcel.html(entry.name));
              } else {
                results1.push(jcel.html(entry.entities[name].value));
              }
            }
          }
          return results1;
        });
        results.push(el.append(tpl));
      }
      return results;
    }).promise().done(function() {
      return Basal.complete();
    });
  },
  getStructures: function(complete) {
    return this.jsonp("structures", {
      client: this.client
    }, (function(_this) {
      return function(result) {
        var i, ref, structure;
        _this.structures = {};
        ref = result.data;
        for (i in ref) {
          structure = ref[i];
          _this.structures[structure.name] = structure;
        }
        return typeof complete === "function" ? complete() : void 0;
      };
    })(this));
  },
  jsonp: function(endpoint, params, complete) {
    var el, script;
    params.callback = 'Basal.callback';
    script = (this.domain + "/" + endpoint + "?") + $.param(params);
    el = document.createElement('script');
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === "function") {
        complete(Basal.data);
      }
      return Basal.data = false;
    }, false);
    return document.getElementsByTagName('head')[0].appendChild(el);
  },
  callback: function(data) {
    return Basal.data = data;
  },
  error: function(message) {
    throw new Error("Basal: " + message);
  }
};

var config;

config = {
  "basal": {
    "client": "580a2cd45aa59b21396f1e13"
  },
  "beers": [
    {
      "image": "beer.jpg",
      "name": "Gilman Pilsner 1",
      "info": "ABV: 4.5% - IBUS: 16",
      "description": "A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."
    }, {
      "image": "beer.jpg",
      "name": "Gilman Pilsner 2",
      "info": "ABV: 4.5% - IBUS: 16",
      "description": "A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."
    }, {
      "image": "beer.jpg",
      "name": "Gilman Pilsner 3",
      "info": "ABV: 4.5% - IBUS: 16",
      "description": "A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."
    }, {
      "image": "beer.jpg",
      "name": "Gilman Pilsner 4",
      "info": "ABV: 4.5% - IBUS: 16",
      "description": "A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."
    }, {
      "image": "beer.jpg",
      "name": "Gilman Pilsner 5",
      "info": "ABV: 4.5% - IBUS: 16",
      "description": "A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."
    }, {
      "image": "beer.jpg",
      "name": "Gilman Pilsner 6",
      "info": "ABV: 4.5% - IBUS: 16",
      "description": "A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."
    }, {
      "image": "beer.jpg",
      "name": "Gilman Pilsner 7",
      "info": "ABV: 4.5% - IBUS: 16",
      "description": "A short description goes here, lorem ipsum sit amet lorem ipsum dolor sit amet lorem."
    }
  ],
  "color": {
    "white1": "#ffffff",
    "black1": "#000000",
    "goldlight": "#daa02c",
    "golddark": "#c08000",
    "grey90": "#1a1a1b",
    "grey80": "#333330",
    "grey70": "#50504d",
    "grey50": "#80807d",
    "grey30": "#b3b3b0",
    "grey15": "#d9d9d4"
  },
  "font": {
    "h1": {
      "font-family": "Karla",
      "font-weight": "700",
      "font-size": "60px",
      "line-height": "70px",
      "letter-spacing": "4px"
    },
    "h2-light": {
      "font-family": "Karla",
      "font-size": "32px",
      "line-height": "38px"
    },
    "h2": {
      "font-family": "Karla",
      "font-weight": "700",
      "font-size": "32px",
      "line-height": "38px"
    },
    "h3-light": {
      "font-family": "Karla",
      "font-size": "24px",
      "line-height": "30px"
    },
    "h3": {
      "font-family": "Karla",
      "font-weight": "700",
      "font-size": "24px",
      "line-height": "30px"
    },
    "h4": {
      "font-family": "Cutive",
      "font-size": "18px",
      "line-height": "24px",
      "letter-spacing": "2px"
    },
    "h5": {
      "font-family": "Cutive",
      "font-size": "14px",
      "line-height": "20px",
      "letter-spacing": "4px"
    },
    "body": {
      "font-family": "Karla",
      "font-size": "18px",
      "line-height": "24px"
    },
    "small": {
      "font-family": "Karla",
      "font-size": "14px",
      "line-height": "20px"
    }
  },
  "meta": {
    "url": "http://gilmanbrewing.com/",
    "title": "Gilman Brewing Company",
    "description": "Gilman Brewing Company and Taproom, born and brewed in Berkeley, California. Founded in 2016, we specialize in craft beers, ales, stouts and lagers. Drink responsibly.",
    "keywords": "beer, ale, craft brew, stouts, lagers, spirits, berkeley, california, gilman, brewery, pub, IBUs, taproom, bay area",
    "trackingID": "UA-77714389-2",
    "share": "images/share.jpg",
    "repo": "https://github.com/acidjazz/gilman",
    "address": {
      "map": "https://goo.gl/maps/E358TP48W4G2",
      "street": "912 Gilman St",
      "city": "Berkeley",
      "state": "CA",
      "zip": 93710,
      "country": "US",
      "phone": "(510) 556-8701"
    },
    "email": "info@gilmanbrewing.com",
    "social": {
      "facebook": "https://www.facebook.com/AnvilBrewingCompany/",
      "twitter": "https://twitter.com/Gilman_Brewing",
      "instagram": "https://www.instagram.com/gilmanbrewing/"
    }
  }
};

var Index;

Index = {
  options: {},
  loaded: false,
  cache: {
    window: false,
    stickied: false
  },
  i: function() {
    Basal.i(config.basal.client, function() {
      Index.loaded = true;
      return Index.slick();
    });
    this.cache.window = $(window);
    this.handlers();
    if (this.cache.window.width() > 1190) {
      return setInterval(this.sticky, 50);
    }
  },
  handlers: function() {
    $('.top .burger').click(this.burgerHandler);
    $('.item, a.cta, .anvil').click(this.menuHandler);
    $('.form .cta').click(this.newsletterHandler);
    return $(window).resize(Index.slickReload);
  },
  slick: function() {
    var amt, width;
    if (Index.loaded === false) {
      return true;
    }
    width = $(document).width();
    amt = Math.floor(width / 350);
    return $('.beerlist > .inner').slick({
      infinite: true,
      slidesToShow: amt,
      slidesToScroll: 1
    });
  },
  slickReload: function() {
    var amt, width;
    if (Index.loaded === false) {
      return true;
    }
    width = $(document).width();
    amt = Math.floor(width / 350);
    $('.beerlist > .inner').slick('unslick');
    return $('.beerlist > .inner').slick({
      setPosition: true,
      slidesToShow: amt
    });
  },
  sticky: function() {
    var stickySpot;
    stickySpot = 300;
    if (Index.cache.window.scrollTop() > stickySpot && Index.cache.stickied === false) {
      _.off('.infobar');
      setTimeout(function() {
        $('.infobar').addClass('stuck');
        return _.on('.infobar');
      }, 200);
      Index.cache.stickied = true;
    }
    if (Index.cache.window.scrollTop() < stickySpot && Index.cache.stickied === true) {
      _.off('.infobar');
      setTimeout(function() {
        $('.infobar').removeClass('stuck');
        return _.on('.infobar');
      }, 200);
      return Index.cache.stickied = false;
    }
  },
  burgerHandler: function() {
    _.swap('.top > .burger');
    return _.swap('.top > .menu');
  },
  menuHandler: function() {
    var item;
    _.off('.top > .menu');
    _.on('.top > .burger');
    item = $(this).data('item');
    return $.scrollTo($("." + item), 500);
  },
  newsletterHandler: function() {
    return $(this).parent().submit();
  }
};

var Preload;

Preload = (function() {
  function Preload() {
    $('.loading').each((function(_this) {
      return function(i, el) {
        var cl, classes, image, j, len, results;
        classes = $(el).attr('class').split(' ');
        results = [];
        for (j = 0, len = classes.length; j < len; j++) {
          cl = classes[j];
          if (cl !== 'loading') {
            image = _this.stylin(cl);
          }
          results.push(console.log('url: ' + image));
        }
        return results;
      };
    })(this));
  }

  Preload.prototype.stylin = function(cl) {
    var $p, url;
    console.log(cl);
    $p = $("<p></p>").hide().addClass(cl).appendTo('body');
    url = $p.css('background-image');
    $p.remove();
    return url;
  };

  return Preload;

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJiYXNhbC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtN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QUFBLENBQUUsU0FBRixDQUFZLENBQUMsSUFBYixDQUFBLENBQW1CLENBQUMsUUFBcEIsQ0FBNkIsRUFBN0IsQ0FBZ0MsQ0FBQyxRQUFqQyxDQUEwQyxNQUExQztJQUNMLEdBQUEsR0FBTSxFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQO0lBQ04sRUFBRSxDQUFDLE1BQUgsQ0FBQTtBQUNBLFdBQU87RUFMRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiQmFzYWwgPVxuXG4gIGRvbWFpbjogJ2h0dHA6Ly9iYXNhbC50ZWNoL2FwaSdcbiAgY2xpZW50OiBmYWxzZVxuXG4gIGRhdGE6IGZhbHNlXG4gIHN0cnVjdHVyZXM6IGZhbHNlXG5cbiAgY29tcGxldGU6IGZhbHNlXG5cbiAgaTogKGNsaWVudCwgY29tcGxldGUpIC0+XG5cbiAgICBAY29tcGxldGUgPSBjb21wbGV0ZVxuXG4gICAgQGNsaWVudCA9IGNsaWVudFxuXG4gICAgQGdldFN0cnVjdHVyZXMgPT5cbiAgICAgIEBsb29wKClcblxuICBsb29wOiAtPlxuXG4gICAgJChcIi5iYXNhbC1sb29wXCIpLmVhY2goIChpLCBlbCkgLT5cblxuICAgICAgZWwgPSAkKGVsKVxuICAgICAgc3RydWN0dXJlID0gZWwuYXR0cihcImJhc2FsLXN0cnVjdHVyZVwiKVxuXG4gICAgICBCYXNhbC5lcnJvcihcIlN0cnVjdHVyZSBub3QgZm91bmQgXFxcIiN7c3RydWN0dXJlfVxcXCJcIikgaWYgIUJhc2FsLnN0cnVjdHVyZXNbc3RydWN0dXJlXT9cblxuICAgICAgdGVtcGxhdGUgPSBlbC5jaGlsZHJlbigpLnJlbW92ZSgpXG5cbiAgICAgIGZvciBvd24gbmFtZSwgZW50cnkgb2YgQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdLmVudHJpZXNcbiAgICAgICAgdHBsID0gdGVtcGxhdGUuY2xvbmUoKVxuICAgICAgICB0cGwuZmluZCgnKicpLmVhY2ggKGNpLCBjZWwpIC0+XG4gICAgICAgICAgamNlbCA9ICQoY2VsKVxuICAgICAgICAgIG5hbWUgPSBqY2VsLmF0dHIoJ2Jhc2FsLW5hbWUnKVxuICAgICAgICAgIHR5cGUgPSBqY2VsLmF0dHIoJ2Jhc2FsLXR5cGUnKVxuICAgICAgICAgIG5hbWVzID0gamNlbC5hdHRyKCdiYXNhbC1uYW1lcycpPy5zcGxpdCAnLCdcbiAgICAgICAgICB0eXBlcyA9IGpjZWwuYXR0cignYmFzYWwtdHlwZXMnKT8uc3BsaXQgJywnXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiBuYW1lIGlzIHVuZGVmaW5lZCBhbmQgbmFtZXMgaXMgdW5kZWZpbmVkXG5cbiAgICAgICAgICBpZiBuYW1lcyBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIG5hbWVzID0gW25hbWVdXG4gICAgICAgICAgICB0eXBlcyA9IFt0eXBlXVxuXG4gICAgICAgICAgZm9yIG5hbWUsIGkgaW4gbmFtZXNcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlc1tpXVxuXG4gICAgICAgICAgICBpZiB0eXBlIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN3aXRjaCB0eXBlXG4gICAgICAgICAgICAgICAgd2hlbiAnY3NzLWJhY2tncm91bmQnXG4gICAgICAgICAgICAgICAgICBqY2VsLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7ZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWV9KVwiXG4gICAgICAgICAgICAgICAgd2hlbiAnZGF0ZSdcbiAgICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBtb21lbnQoZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWUsICdNTS9ERC9ZWVlZJykuZm9ybWF0IGpjZWwuYXR0cignYmFzYWwtZGF0ZWZvcm1hdCcpXG4gICAgICAgICAgICAgICAgd2hlbiAnaW1hZ2UnXG4gICAgICAgICAgICAgICAgICBqY2VsLmF0dHIgJ3NyYycsIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG4gICAgICAgICAgICAgICAgd2hlbiAndGV4dCdcbiAgICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuICAgICAgICAgICAgICAgIHdoZW4gJ2hyZWYnXG4gICAgICAgICAgICAgICAgICBqY2VsLmF0dHIgJ2hyZWYnLCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGlmIG5hbWUgaXMgJ3N0cnVjdHVyZS1uYW1lJ1xuICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBlbnRyeS5uYW1lXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBqY2VsLmh0bWwgZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWVcbiAgICAgICAgZWwuYXBwZW5kIHRwbFxuXG4gICAgICApLnByb21pc2UoKS5kb25lIC0+XG4gICAgICAgIEJhc2FsLmNvbXBsZXRlKClcblxuICBnZXRTdHJ1Y3R1cmVzOiAoY29tcGxldGUpIC0+XG4gICAgQGpzb25wIFwic3RydWN0dXJlc1wiLCBjbGllbnQ6IEBjbGllbnQsIChyZXN1bHQpID0+XG4gICAgICBAc3RydWN0dXJlcyA9IHt9XG4gICAgICBmb3IgaSxzdHJ1Y3R1cmUgb2YgcmVzdWx0LmRhdGFcbiAgICAgICAgQHN0cnVjdHVyZXNbc3RydWN0dXJlLm5hbWVdID0gc3RydWN0dXJlXG4gICAgICBjb21wbGV0ZT8oKVxuXG4gIGpzb25wOiAoZW5kcG9pbnQsIHBhcmFtcywgY29tcGxldGUpIC0+XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSAnQmFzYWwuY2FsbGJhY2snXG5cbiAgICBzY3JpcHQgPSBcIiN7QGRvbWFpbn0vI3tlbmRwb2ludH0/XCIgKyAkLnBhcmFtIHBhcmFtc1xuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlPyhCYXNhbC5kYXRhKVxuICAgICAgQmFzYWwuZGF0YSA9IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChlbClcblxuICBjYWxsYmFjazogKGRhdGEpIC0+XG4gICAgQmFzYWwuZGF0YSA9IGRhdGFcblxuICBlcnJvcjogKG1lc3NhZ2UpIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yIFwiQmFzYWw6ICN7bWVzc2FnZX1cIlxuIiwiY29uZmlnID0ge1wiYmFzYWxcIjp7XCJjbGllbnRcIjpcIjU4MGEyY2Q0NWFhNTliMjEzOTZmMWUxM1wifSxcImJlZXJzXCI6W3tcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgMVwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgMlwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgM1wiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNFwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNVwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNlwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgN1wiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9XSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImdvbGRsaWdodFwiOlwiI2RhYTAyY1wiLFwiZ29sZGRhcmtcIjpcIiNjMDgwMDBcIixcImdyZXk5MFwiOlwiIzFhMWExYlwiLFwiZ3JleTgwXCI6XCIjMzMzMzMwXCIsXCJncmV5NzBcIjpcIiM1MDUwNGRcIixcImdyZXk1MFwiOlwiIzgwODA3ZFwiLFwiZ3JleTMwXCI6XCIjYjNiM2IwXCIsXCJncmV5MTVcIjpcIiNkOWQ5ZDRcIn0sXCJmb250XCI6e1wiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiNjBweFwiLFwibGluZS1oZWlnaHRcIjpcIjcwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCI0cHhcIn0sXCJoMi1saWdodFwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIzMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzhweFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjMycHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzOHB4XCJ9LFwiaDMtbGlnaHRcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwibGluZS1oZWlnaHRcIjpcIjMwcHhcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzBweFwifSxcImg0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkN1dGl2ZVwiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifSxcImg1XCI6e1wiZm9udC1mYW1pbHlcIjpcIkN1dGl2ZVwiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjBweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjRweFwifSxcImJvZHlcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIn0sXCJzbWFsbFwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjBweFwifX0sXCJtZXRhXCI6e1widXJsXCI6XCJodHRwOi8vZ2lsbWFuYnJld2luZy5jb20vXCIsXCJ0aXRsZVwiOlwiR2lsbWFuIEJyZXdpbmcgQ29tcGFueVwiLFwiZGVzY3JpcHRpb25cIjpcIkdpbG1hbiBCcmV3aW5nIENvbXBhbnkgYW5kIFRhcHJvb20sIGJvcm4gYW5kIGJyZXdlZCBpbiBCZXJrZWxleSwgQ2FsaWZvcm5pYS4gRm91bmRlZCBpbiAyMDE2LCB3ZSBzcGVjaWFsaXplIGluIGNyYWZ0IGJlZXJzLCBhbGVzLCBzdG91dHMgYW5kIGxhZ2Vycy4gRHJpbmsgcmVzcG9uc2libHkuXCIsXCJrZXl3b3Jkc1wiOlwiYmVlciwgYWxlLCBjcmFmdCBicmV3LCBzdG91dHMsIGxhZ2Vycywgc3Bpcml0cywgYmVya2VsZXksIGNhbGlmb3JuaWEsIGdpbG1hbiwgYnJld2VyeSwgcHViLCBJQlVzLCB0YXByb29tLCBiYXkgYXJlYVwiLFwidHJhY2tpbmdJRFwiOlwiVUEtNzc3MTQzODktMlwiLFwic2hhcmVcIjpcImltYWdlcy9zaGFyZS5qcGdcIixcInJlcG9cIjpcImh0dHBzOi8vZ2l0aHViLmNvbS9hY2lkamF6ei9naWxtYW5cIixcImFkZHJlc3NcIjp7XCJtYXBcIjpcImh0dHBzOi8vZ29vLmdsL21hcHMvRTM1OFRQNDhXNEcyXCIsXCJzdHJlZXRcIjpcIjkxMiBHaWxtYW4gU3RcIixcImNpdHlcIjpcIkJlcmtlbGV5XCIsXCJzdGF0ZVwiOlwiQ0FcIixcInppcFwiOjkzNzEwLFwiY291bnRyeVwiOlwiVVNcIixcInBob25lXCI6XCIoNTEwKSA1NTYtODcwMVwifSxcImVtYWlsXCI6XCJpbmZvQGdpbG1hbmJyZXdpbmcuY29tXCIsXCJzb2NpYWxcIjp7XCJmYWNlYm9va1wiOlwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0FudmlsQnJld2luZ0NvbXBhbnkvXCIsXCJ0d2l0dGVyXCI6XCJodHRwczovL3R3aXR0ZXIuY29tL0dpbG1hbl9CcmV3aW5nXCIsXCJpbnN0YWdyYW1cIjpcImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vZ2lsbWFuYnJld2luZy9cIn19fTsiLCJJbmRleCA9XG4gIG9wdGlvbnM6IHt9XG4gIGxvYWRlZDogZmFsc2VcbiAgY2FjaGU6XG4gICAgd2luZG93OiBmYWxzZVxuICAgIHN0aWNraWVkOiBmYWxzZVxuICBpOiAtPlxuXG4gICAgQmFzYWwuaSBjb25maWcuYmFzYWwuY2xpZW50LCAtPlxuICAgICAgSW5kZXgubG9hZGVkID0gdHJ1ZVxuICAgICAgSW5kZXguc2xpY2soKVxuXG4gICAgQGNhY2hlLndpbmRvdyA9ICQod2luZG93KVxuICAgIFxuICAgIEBoYW5kbGVycygpXG5cbiAgICBpZiBAY2FjaGUud2luZG93LndpZHRoKCkgPiAxMTkwXG4gICAgICBzZXRJbnRlcnZhbCBAc3RpY2t5LCA1MFxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy50b3AgLmJ1cmdlcicpLmNsaWNrIEBidXJnZXJIYW5kbGVyXG4gICAgJCgnLml0ZW0sIGEuY3RhLCAuYW52aWwnKS5jbGljayBAbWVudUhhbmRsZXJcbiAgICAkKCcuZm9ybSAuY3RhJykuY2xpY2sgQG5ld3NsZXR0ZXJIYW5kbGVyXG5cbiAgICAkKHdpbmRvdykucmVzaXplIEluZGV4LnNsaWNrUmVsb2FkXG5cbiAgc2xpY2s6IC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5sb2FkZWQgaXMgZmFsc2VcblxuICAgIHdpZHRoID0gJChkb2N1bWVudCkud2lkdGgoKVxuICAgIGFtdCA9IE1hdGguZmxvb3Igd2lkdGggLyAzNTBcblxuICAgICQoJy5iZWVybGlzdCA+IC5pbm5lcicpLnNsaWNrXG4gICAgICBpbmZpbml0ZTogdHJ1ZVxuICAgICAgc2xpZGVzVG9TaG93OiBhbXRcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXG5cbiAgc2xpY2tSZWxvYWQ6IC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5sb2FkZWQgaXMgZmFsc2VcblxuICAgIHdpZHRoID0gJChkb2N1bWVudCkud2lkdGgoKVxuICAgIGFtdCA9IE1hdGguZmxvb3Igd2lkdGggLyAzNTBcbiAgICAkKCcuYmVlcmxpc3QgPiAuaW5uZXInKS5zbGljayAndW5zbGljaydcblxuICAgICQoJy5iZWVybGlzdCA+IC5pbm5lcicpLnNsaWNrXG4gICAgICBzZXRQb3NpdGlvbjogdHJ1ZVxuICAgICAgc2xpZGVzVG9TaG93OiBhbXRcblxuICBzdGlja3k6IC0+XG5cbiAgICBzdGlja3lTcG90ID0gMzAwXG5cbiAgICBpZiBJbmRleC5jYWNoZS53aW5kb3cuc2Nyb2xsVG9wKCkgPiBzdGlja3lTcG90IGFuZCBJbmRleC5jYWNoZS5zdGlja2llZCBpcyBmYWxzZVxuICAgICAgXy5vZmYgJy5pbmZvYmFyJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAkKCcuaW5mb2JhcicpLmFkZENsYXNzICdzdHVjaydcbiAgICAgICAgXy5vbiAnLmluZm9iYXInXG4gICAgICAsIDIwMFxuICAgICAgSW5kZXguY2FjaGUuc3RpY2tpZWQgPSB0cnVlXG5cbiAgICBpZiBJbmRleC5jYWNoZS53aW5kb3cuc2Nyb2xsVG9wKCkgPCBzdGlja3lTcG90IGFuZCBJbmRleC5jYWNoZS5zdGlja2llZCBpcyB0cnVlXG4gICAgICBfLm9mZiAnLmluZm9iYXInXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICQoJy5pbmZvYmFyJykucmVtb3ZlQ2xhc3MgJ3N0dWNrJ1xuICAgICAgICBfLm9uICcuaW5mb2JhcidcbiAgICAgICwgMjAwXG4gICAgICBJbmRleC5jYWNoZS5zdGlja2llZCA9IG9mZlxuXG4gIGJ1cmdlckhhbmRsZXI6IC0+XG4gICAgXy5zd2FwICcudG9wID4gLmJ1cmdlcidcbiAgICBfLnN3YXAgJy50b3AgPiAubWVudSdcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICBfLm9mZiAnLnRvcCA+IC5tZW51J1xuICAgIF8ub24gJy50b3AgPiAuYnVyZ2VyJ1xuICAgIGl0ZW0gPSAkKHRoaXMpLmRhdGEgJ2l0ZW0nXG4gICAgJC5zY3JvbGxUbyAkKFwiLiN7aXRlbX1cIiksIDUwMFxuXG4gIG5ld3NsZXR0ZXJIYW5kbGVyOiAtPlxuICAgICQodGhpcykucGFyZW50KCkuc3VibWl0KClcbiIsImNsYXNzIFByZWxvYWRcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICAkKCcubG9hZGluZycpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgY2xhc3NlcyA9ICQoZWwpLmF0dHIoJ2NsYXNzJykuc3BsaXQgJyAnXG4gICAgICBmb3IgY2wgaW4gY2xhc3Nlc1xuICAgICAgICBpZiBjbCBpc250ICdsb2FkaW5nJ1xuICAgICAgICAgIGltYWdlID0gQHN0eWxpbihjbClcbiAgICAgICAgY29uc29sZS5sb2cgJ3VybDogJyArIGltYWdlXG5cbiAgc3R5bGluOiAoY2wpIC0+XG4gICAgY29uc29sZS5sb2cgY2xcbiAgICAkcCA9ICQoXCI8cD48L3A+XCIpLmhpZGUoKS5hZGRDbGFzcyhjbCkuYXBwZW5kVG8oJ2JvZHknKVxuICAgIHVybCA9ICRwLmNzcyAnYmFja2dyb3VuZC1pbWFnZSdcbiAgICAkcC5yZW1vdmUoKVxuICAgIHJldHVybiB1cmxcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
