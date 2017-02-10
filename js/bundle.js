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
  domain: '//basal.tech/api',
  client: false,
  data: false,
  structures: false,
  complete: false,
  i: function(client, complete) {
    this.complete = complete;
    this.client = client;
    return this.getStructures((function(_this) {
      return function() {
        _this.loop();
        return _this.entry();
      };
    })(this));
  },
  entry: function() {
    return $('.basal-entry').each(function(i, el) {
      var attr, bkey, entity, entityName, entry, key, name, ref, results, structure;
      el = $(el);
      structure = el.attr('basal-structure');
      name = el.attr('basal-name');
      entityName = el.attr('basal-entity');
      attr = el.attr('basal-attr');
      if (Basal.structures[structure] == null) {
        Basal.error("Structure not found \"" + structure + "\"");
      }
      ref = Basal.structures[structure].entries;
      results = [];
      for (key in ref) {
        entry = ref[key];
        if (entry.active !== true) {
          continue;
        }
        if (name === entry.name) {
          results.push((function() {
            var ref1, results1;
            ref1 = entry.entities;
            results1 = [];
            for (bkey in ref1) {
              entity = ref1[bkey];
              if (entity.name === entityName) {
                if (attr) {
                  el.attr(attr, entity.value);
                  results1.push(console.log(attr));
                } else {
                  results1.push(el.html(entity.value));
                }
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          })());
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  },
  loop: function() {
    return $('.basal-loop').each(function(i, el) {
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
        if (entry.active !== true) {
          continue;
        }
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
    script = ("" + document.location.protocol + this.domain + "/" + endpoint + "?") + $.param(params);
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
    throw new Error("basal: " + message);
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
    "trackingID": "UA-91047717-1",
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
    "email": "info@gilmanbrew.com",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJiYXNhbC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtN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QUUsU0FBRixDQUFZLENBQUMsSUFBYixDQUFBLENBQW1CLENBQUMsUUFBcEIsQ0FBNkIsRUFBN0IsQ0FBZ0MsQ0FBQyxRQUFqQyxDQUEwQyxNQUExQztJQUNMLEdBQUEsR0FBTSxFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQO0lBQ04sRUFBRSxDQUFDLE1BQUgsQ0FBQTtBQUNBLFdBQU87RUFMRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiQmFzYWwgPVxuXG4gIGRvbWFpbjogJy8vYmFzYWwudGVjaC9hcGknXG4gIGNsaWVudDogZmFsc2VcblxuICBkYXRhOiBmYWxzZVxuICBzdHJ1Y3R1cmVzOiBmYWxzZVxuXG4gIGNvbXBsZXRlOiBmYWxzZVxuXG4gIGk6IChjbGllbnQsIGNvbXBsZXRlKSAtPlxuXG4gICAgQGNvbXBsZXRlID0gY29tcGxldGVcblxuICAgIEBjbGllbnQgPSBjbGllbnRcblxuICAgIEBnZXRTdHJ1Y3R1cmVzID0+XG4gICAgICBAbG9vcCgpXG4gICAgICBAZW50cnkoKVxuXG4gIGVudHJ5OiAtPlxuICAgICQoJy5iYXNhbC1lbnRyeScpLmVhY2ggKGksIGVsKSAtPlxuXG4gICAgICBlbCA9ICQoZWwpXG4gICAgICBzdHJ1Y3R1cmUgPSBlbC5hdHRyICdiYXNhbC1zdHJ1Y3R1cmUnXG4gICAgICBuYW1lID0gZWwuYXR0ciAnYmFzYWwtbmFtZSdcbiAgICAgIGVudGl0eU5hbWUgPSBlbC5hdHRyICdiYXNhbC1lbnRpdHknXG4gICAgICBhdHRyID0gZWwuYXR0ciAnYmFzYWwtYXR0cidcblxuICAgICAgQmFzYWwuZXJyb3IoXCJTdHJ1Y3R1cmUgbm90IGZvdW5kIFxcXCIje3N0cnVjdHVyZX1cXFwiXCIpIGlmICFCYXNhbC5zdHJ1Y3R1cmVzW3N0cnVjdHVyZV0/XG5cbiAgICAgIGZvciBrZXksIGVudHJ5IG9mIEJhc2FsLnN0cnVjdHVyZXNbc3RydWN0dXJlXS5lbnRyaWVzXG4gICAgICAgIGNvbnRpbnVlIGlmIGVudHJ5LmFjdGl2ZSBpc250IHRydWVcbiAgICAgICAgaWYgbmFtZSBpcyBlbnRyeS5uYW1lXG4gICAgICAgICAgZm9yIGJrZXksIGVudGl0eSBvZiBlbnRyeS5lbnRpdGllc1xuICAgICAgICAgICAgaWYgZW50aXR5Lm5hbWUgaXMgZW50aXR5TmFtZVxuICAgICAgICAgICAgICBpZiBhdHRyXG4gICAgICAgICAgICAgICAgZWwuYXR0ciBhdHRyLCBlbnRpdHkudmFsdWVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBhdHRyXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlbC5odG1sIGVudGl0eS52YWx1ZVxuXG4gIGxvb3A6IC0+XG5cbiAgICAkKCcuYmFzYWwtbG9vcCcpLmVhY2goIChpLCBlbCkgLT5cblxuICAgICAgZWwgPSAkKGVsKVxuICAgICAgc3RydWN0dXJlID0gZWwuYXR0cihcImJhc2FsLXN0cnVjdHVyZVwiKVxuXG4gICAgICBCYXNhbC5lcnJvcihcIlN0cnVjdHVyZSBub3QgZm91bmQgXFxcIiN7c3RydWN0dXJlfVxcXCJcIikgaWYgIUJhc2FsLnN0cnVjdHVyZXNbc3RydWN0dXJlXT9cblxuICAgICAgdGVtcGxhdGUgPSBlbC5jaGlsZHJlbigpLnJlbW92ZSgpXG5cbiAgICAgIGZvciBvd24gbmFtZSwgZW50cnkgb2YgQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdLmVudHJpZXNcbiAgICAgICAgY29udGludWUgaWYgZW50cnkuYWN0aXZlIGlzbnQgdHJ1ZVxuICAgICAgICB0cGwgPSB0ZW1wbGF0ZS5jbG9uZSgpXG4gICAgICAgIHRwbC5maW5kKCcqJykuZWFjaCAoY2ksIGNlbCkgLT5cbiAgICAgICAgICBqY2VsID0gJChjZWwpXG4gICAgICAgICAgbmFtZSA9IGpjZWwuYXR0cignYmFzYWwtbmFtZScpXG4gICAgICAgICAgdHlwZSA9IGpjZWwuYXR0cignYmFzYWwtdHlwZScpXG4gICAgICAgICAgbmFtZXMgPSBqY2VsLmF0dHIoJ2Jhc2FsLW5hbWVzJyk/LnNwbGl0ICcsJ1xuICAgICAgICAgIHR5cGVzID0gamNlbC5hdHRyKCdiYXNhbC10eXBlcycpPy5zcGxpdCAnLCdcblxuICAgICAgICAgIHJldHVybiB0cnVlIGlmIG5hbWUgaXMgdW5kZWZpbmVkIGFuZCBuYW1lcyBpcyB1bmRlZmluZWRcblxuICAgICAgICAgIGlmIG5hbWVzIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgbmFtZXMgPSBbbmFtZV1cbiAgICAgICAgICAgIHR5cGVzID0gW3R5cGVdXG5cbiAgICAgICAgICBmb3IgbmFtZSwgaSBpbiBuYW1lc1xuICAgICAgICAgICAgdHlwZSA9IHR5cGVzW2ldXG5cbiAgICAgICAgICAgIGlmIHR5cGUgaXNudCB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3dpdGNoIHR5cGVcbiAgICAgICAgICAgICAgICB3aGVuICdjc3MtYmFja2dyb3VuZCdcbiAgICAgICAgICAgICAgICAgIGpjZWwuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZX0pXCJcbiAgICAgICAgICAgICAgICB3aGVuICdkYXRlJ1xuICAgICAgICAgICAgICAgICAgamNlbC5odG1sIG1vbWVudChlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZSwgJ01NL0REL1lZWVknKS5mb3JtYXQgamNlbC5hdHRyKCdiYXNhbC1kYXRlZm9ybWF0JylcbiAgICAgICAgICAgICAgICB3aGVuICdpbWFnZSdcbiAgICAgICAgICAgICAgICAgIGpjZWwuYXR0ciAnc3JjJywgZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWVcbiAgICAgICAgICAgICAgICB3aGVuICd0ZXh0J1xuICAgICAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG4gICAgICAgICAgICAgICAgd2hlbiAnaHJlZidcbiAgICAgICAgICAgICAgICAgIGpjZWwuYXR0ciAnaHJlZicsIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgaWYgbmFtZSBpcyAnc3RydWN0dXJlLW5hbWUnXG4gICAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5Lm5hbWVcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuICAgICAgICBlbC5hcHBlbmQgdHBsXG5cbiAgICAgICkucHJvbWlzZSgpLmRvbmUgLT5cbiAgICAgICAgQmFzYWwuY29tcGxldGUoKVxuXG4gIGdldFN0cnVjdHVyZXM6IChjb21wbGV0ZSkgLT5cbiAgICBAanNvbnAgXCJzdHJ1Y3R1cmVzXCIsIGNsaWVudDogQGNsaWVudCwgKHJlc3VsdCkgPT5cbiAgICAgIEBzdHJ1Y3R1cmVzID0ge31cbiAgICAgIGZvciBpLHN0cnVjdHVyZSBvZiByZXN1bHQuZGF0YVxuICAgICAgICBAc3RydWN0dXJlc1tzdHJ1Y3R1cmUubmFtZV0gPSBzdHJ1Y3R1cmVcbiAgICAgIGNvbXBsZXRlPygpXG5cbiAganNvbnA6IChlbmRwb2ludCwgcGFyYW1zLCBjb21wbGV0ZSkgLT5cblxuICAgIHBhcmFtcy5jYWxsYmFjayA9ICdCYXNhbC5jYWxsYmFjaydcblxuICAgIHNjcmlwdCA9IFwiI3tkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbH0je0Bkb21haW59LyN7ZW5kcG9pbnR9P1wiICsgJC5wYXJhbSBwYXJhbXNcblxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgIGVsLnNyYyA9IHNjcmlwdFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnICwgKGUpIC0+XG4gICAgICBjb21wbGV0ZT8oQmFzYWwuZGF0YSlcbiAgICAgIEJhc2FsLmRhdGEgPSBmYWxzZVxuICAgICwgZmFsc2VcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoZWwpXG5cbiAgY2FsbGJhY2s6IChkYXRhKSAtPlxuICAgIEJhc2FsLmRhdGEgPSBkYXRhXG5cbiAgZXJyb3I6IChtZXNzYWdlKSAtPlxuICAgIHRocm93IG5ldyBFcnJvciBcImJhc2FsOiAje21lc3NhZ2V9XCJcbiIsImNvbmZpZyA9IHtcImJhc2FsXCI6e1wiY2xpZW50XCI6XCI1ODBhMmNkNDVhYTU5YjIxMzk2ZjFlMTNcIn0sXCJiZWVyc1wiOlt7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDFcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDJcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDNcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDRcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDVcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDZcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDdcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifV0sXCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJnb2xkbGlnaHRcIjpcIiNkYWEwMmNcIixcImdvbGRkYXJrXCI6XCIjYzA4MDAwXCIsXCJncmV5OTBcIjpcIiMxYTFhMWJcIixcImdyZXk4MFwiOlwiIzMzMzMzMFwiLFwiZ3JleTcwXCI6XCIjNTA1MDRkXCIsXCJncmV5NTBcIjpcIiM4MDgwN2RcIixcImdyZXkzMFwiOlwiI2IzYjNiMFwiLFwiZ3JleTE1XCI6XCIjZDlkOWQ0XCJ9LFwiZm9udFwiOntcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjYwcHhcIixcImxpbmUtaGVpZ2h0XCI6XCI3MHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiNHB4XCJ9LFwiaDItbGlnaHRcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMzJweFwiLFwibGluZS1oZWlnaHRcIjpcIjM4cHhcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCIzMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzhweFwifSxcImgzLWxpZ2h0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzMHB4XCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwibGluZS1oZWlnaHRcIjpcIjMwcHhcIn0sXCJoNFwiOntcImZvbnQtZmFtaWx5XCI6XCJDdXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIn0sXCJoNVwiOntcImZvbnQtZmFtaWx5XCI6XCJDdXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCI0cHhcIn0sXCJib2R5XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCJ9LFwic21hbGxcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIn19LFwibWV0YVwiOntcInVybFwiOlwiaHR0cDovL2dpbG1hbmJyZXdpbmcuY29tL1wiLFwidGl0bGVcIjpcIkdpbG1hbiBCcmV3aW5nIENvbXBhbnlcIixcImRlc2NyaXB0aW9uXCI6XCJHaWxtYW4gQnJld2luZyBDb21wYW55IGFuZCBUYXByb29tLCBib3JuIGFuZCBicmV3ZWQgaW4gQmVya2VsZXksIENhbGlmb3JuaWEuIEZvdW5kZWQgaW4gMjAxNiwgd2Ugc3BlY2lhbGl6ZSBpbiBjcmFmdCBiZWVycywgYWxlcywgc3RvdXRzIGFuZCBsYWdlcnMuIERyaW5rIHJlc3BvbnNpYmx5LlwiLFwia2V5d29yZHNcIjpcImJlZXIsIGFsZSwgY3JhZnQgYnJldywgc3RvdXRzLCBsYWdlcnMsIHNwaXJpdHMsIGJlcmtlbGV5LCBjYWxpZm9ybmlhLCBnaWxtYW4sIGJyZXdlcnksIHB1YiwgSUJVcywgdGFwcm9vbSwgYmF5IGFyZWFcIixcInRyYWNraW5nSURcIjpcIlVBLTkxMDQ3NzE3LTFcIixcInNoYXJlXCI6XCJpbWFnZXMvc2hhcmUuanBnXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovZ2lsbWFuXCIsXCJhZGRyZXNzXCI6e1wibWFwXCI6XCJodHRwczovL2dvby5nbC9tYXBzL0UzNThUUDQ4VzRHMlwiLFwic3RyZWV0XCI6XCI5MTIgR2lsbWFuIFN0XCIsXCJjaXR5XCI6XCJCZXJrZWxleVwiLFwic3RhdGVcIjpcIkNBXCIsXCJ6aXBcIjo5MzcxMCxcImNvdW50cnlcIjpcIlVTXCIsXCJwaG9uZVwiOlwiKDUxMCkgNTU2LTg3MDFcIn0sXCJlbWFpbFwiOlwiaW5mb0BnaWxtYW5icmV3LmNvbVwiLFwic29jaWFsXCI6e1wiZmFjZWJvb2tcIjpcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9BbnZpbEJyZXdpbmdDb21wYW55L1wiLFwidHdpdHRlclwiOlwiaHR0cHM6Ly90d2l0dGVyLmNvbS9HaWxtYW5fQnJld2luZ1wiLFwiaW5zdGFncmFtXCI6XCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2dpbG1hbmJyZXdpbmcvXCJ9fX07IiwiSW5kZXggPVxuICBvcHRpb25zOiB7fVxuICBsb2FkZWQ6IGZhbHNlXG4gIGNhY2hlOlxuICAgIHdpbmRvdzogZmFsc2VcbiAgICBzdGlja2llZDogZmFsc2VcbiAgaTogLT5cblxuICAgIEJhc2FsLmkgY29uZmlnLmJhc2FsLmNsaWVudCwgLT5cbiAgICAgIEluZGV4LmxvYWRlZCA9IHRydWVcbiAgICAgIEluZGV4LnNsaWNrKClcblxuICAgIEBjYWNoZS53aW5kb3cgPSAkKHdpbmRvdylcbiAgICBcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgaWYgQGNhY2hlLndpbmRvdy53aWR0aCgpID4gMTE5MFxuICAgICAgc2V0SW50ZXJ2YWwgQHN0aWNreSwgNTBcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAYnVyZ2VySGFuZGxlclxuICAgICQoJy5pdGVtLCBhLmN0YSwgLmFudmlsJykuY2xpY2sgQG1lbnVIYW5kbGVyXG4gICAgJCgnLmZvcm0gLmN0YScpLmNsaWNrIEBuZXdzbGV0dGVySGFuZGxlclxuXG4gICAgJCh3aW5kb3cpLnJlc2l6ZSBJbmRleC5zbGlja1JlbG9hZFxuXG4gIHNsaWNrOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgubG9hZGVkIGlzIGZhbHNlXG5cbiAgICB3aWR0aCA9ICQoZG9jdW1lbnQpLndpZHRoKClcbiAgICBhbXQgPSBNYXRoLmZsb29yIHdpZHRoIC8gMzUwXG5cbiAgICAkKCcuYmVlcmxpc3QgPiAuaW5uZXInKS5zbGlja1xuICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgIHNsaWRlc1RvU2hvdzogYW10XG4gICAgICBzbGlkZXNUb1Njcm9sbDogMVxuXG4gIHNsaWNrUmVsb2FkOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgubG9hZGVkIGlzIGZhbHNlXG5cbiAgICB3aWR0aCA9ICQoZG9jdW1lbnQpLndpZHRoKClcbiAgICBhbXQgPSBNYXRoLmZsb29yIHdpZHRoIC8gMzUwXG4gICAgJCgnLmJlZXJsaXN0ID4gLmlubmVyJykuc2xpY2sgJ3Vuc2xpY2snXG5cbiAgICAkKCcuYmVlcmxpc3QgPiAuaW5uZXInKS5zbGlja1xuICAgICAgc2V0UG9zaXRpb246IHRydWVcbiAgICAgIHNsaWRlc1RvU2hvdzogYW10XG5cbiAgc3RpY2t5OiAtPlxuXG4gICAgc3RpY2t5U3BvdCA9IDMwMFxuXG4gICAgaWYgSW5kZXguY2FjaGUud2luZG93LnNjcm9sbFRvcCgpID4gc3RpY2t5U3BvdCBhbmQgSW5kZXguY2FjaGUuc3RpY2tpZWQgaXMgZmFsc2VcbiAgICAgIF8ub2ZmICcuaW5mb2JhcidcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgJCgnLmluZm9iYXInKS5hZGRDbGFzcyAnc3R1Y2snXG4gICAgICAgIF8ub24gJy5pbmZvYmFyJ1xuICAgICAgLCAyMDBcbiAgICAgIEluZGV4LmNhY2hlLnN0aWNraWVkID0gdHJ1ZVxuXG4gICAgaWYgSW5kZXguY2FjaGUud2luZG93LnNjcm9sbFRvcCgpIDwgc3RpY2t5U3BvdCBhbmQgSW5kZXguY2FjaGUuc3RpY2tpZWQgaXMgdHJ1ZVxuICAgICAgXy5vZmYgJy5pbmZvYmFyJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAkKCcuaW5mb2JhcicpLnJlbW92ZUNsYXNzICdzdHVjaydcbiAgICAgICAgXy5vbiAnLmluZm9iYXInXG4gICAgICAsIDIwMFxuICAgICAgSW5kZXguY2FjaGUuc3RpY2tpZWQgPSBvZmZcblxuICBidXJnZXJIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgXy5vZmYgJy50b3AgPiAubWVudSdcbiAgICBfLm9uICcudG9wID4gLmJ1cmdlcidcbiAgICBpdGVtID0gJCh0aGlzKS5kYXRhICdpdGVtJ1xuICAgICQuc2Nyb2xsVG8gJChcIi4je2l0ZW19XCIpLCA1MDBcblxuICBuZXdzbGV0dGVySGFuZGxlcjogLT5cbiAgICAkKHRoaXMpLnBhcmVudCgpLnN1Ym1pdCgpXG4iLCJjbGFzcyBQcmVsb2FkXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgJCgnLmxvYWRpbmcnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGNsYXNzZXMgPSAkKGVsKS5hdHRyKCdjbGFzcycpLnNwbGl0ICcgJ1xuICAgICAgZm9yIGNsIGluIGNsYXNzZXNcbiAgICAgICAgaWYgY2wgaXNudCAnbG9hZGluZydcbiAgICAgICAgICBpbWFnZSA9IEBzdHlsaW4oY2wpXG4gICAgICAgIGNvbnNvbGUubG9nICd1cmw6ICcgKyBpbWFnZVxuXG4gIHN0eWxpbjogKGNsKSAtPlxuICAgIGNvbnNvbGUubG9nIGNsXG4gICAgJHAgPSAkKFwiPHA+PC9wPlwiKS5oaWRlKCkuYWRkQ2xhc3MoY2wpLmFwcGVuZFRvKCdib2R5JylcbiAgICB1cmwgPSAkcC5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnXG4gICAgJHAucmVtb3ZlKClcbiAgICByZXR1cm4gdXJsXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
