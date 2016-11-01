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
        return _this.each();
      };
    })(this));
  },
  each: function() {
    return $(".basal-each").each(function(i, el) {
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
                  jcel.attr('href', entry.entities[name].value);
                  results1.push(console.log(entry.entities[name].value));
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
  processTypes: function(types, jcel) {
    return jcel;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJiYXNhbC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtN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QUZpQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkI7RUFEVzs7b0JBUWIsTUFBQSxHQUFRLFNBQUMsRUFBRDtBQUNOLFFBQUE7SUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLEVBQVo7SUFDQSxFQUFBLEdBQUssQ0FBQSxDQUFFLFNBQUYsQ0FBWSxDQUFDLElBQWIsQ0FBQSxDQUFtQixDQUFDLFFBQXBCLENBQTZCLEVBQTdCLENBQWdDLENBQUMsUUFBakMsQ0FBMEMsTUFBMUM7SUFDTCxHQUFBLEdBQU0sRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUDtJQUNOLEVBQUUsQ0FBQyxNQUFILENBQUE7QUFDQSxXQUFPO0VBTEQiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuXy5pKClcbiIsIkJhc2FsID1cblxuICBkb21haW46ICdodHRwOi8vYmFzYWwudGVjaC9hcGknXG4gIGNsaWVudDogZmFsc2VcblxuICBkYXRhOiBmYWxzZVxuICBzdHJ1Y3R1cmVzOiBmYWxzZVxuXG4gIGNvbXBsZXRlOiBmYWxzZVxuXG4gIGk6IChjbGllbnQsIGNvbXBsZXRlKSAtPlxuXG4gICAgQGNvbXBsZXRlID0gY29tcGxldGVcblxuICAgIEBjbGllbnQgPSBjbGllbnRcblxuICAgIEBnZXRTdHJ1Y3R1cmVzID0+XG4gICAgICBAZWFjaCgpXG5cbiAgZWFjaDogLT5cblxuICAgICQoXCIuYmFzYWwtZWFjaFwiKS5lYWNoKCAoaSwgZWwpIC0+XG5cbiAgICAgIGVsID0gJChlbClcbiAgICAgIHN0cnVjdHVyZSA9IGVsLmF0dHIoXCJiYXNhbC1zdHJ1Y3R1cmVcIilcblxuICAgICAgQmFzYWwuZXJyb3IoXCJTdHJ1Y3R1cmUgbm90IGZvdW5kIFxcXCIje3N0cnVjdHVyZX1cXFwiXCIpIGlmICFCYXNhbC5zdHJ1Y3R1cmVzW3N0cnVjdHVyZV0/XG5cbiAgICAgIHRlbXBsYXRlID0gZWwuY2hpbGRyZW4oKS5yZW1vdmUoKVxuXG4gICAgICBmb3Igb3duIG5hbWUsIGVudHJ5IG9mIEJhc2FsLnN0cnVjdHVyZXNbc3RydWN0dXJlXS5lbnRyaWVzXG4gICAgICAgIHRwbCA9IHRlbXBsYXRlLmNsb25lKClcbiAgICAgICAgdHBsLmZpbmQoJyonKS5lYWNoIChjaSwgY2VsKSAtPlxuICAgICAgICAgIGpjZWwgPSAkKGNlbClcbiAgICAgICAgICBuYW1lID0gamNlbC5hdHRyKCdiYXNhbC1uYW1lJylcbiAgICAgICAgICB0eXBlID0gamNlbC5hdHRyKCdiYXNhbC10eXBlJylcbiAgICAgICAgICBuYW1lcyA9IGpjZWwuYXR0cignYmFzYWwtbmFtZXMnKT8uc3BsaXQgJywnXG4gICAgICAgICAgdHlwZXMgPSBqY2VsLmF0dHIoJ2Jhc2FsLXR5cGVzJyk/LnNwbGl0ICcsJ1xuXG4gICAgICAgICAgcmV0dXJuIHRydWUgaWYgbmFtZSBpcyB1bmRlZmluZWQgYW5kIG5hbWVzIGlzIHVuZGVmaW5lZFxuXG4gICAgICAgICAgaWYgbmFtZXMgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICBuYW1lcyA9IFtuYW1lXVxuICAgICAgICAgICAgdHlwZXMgPSBbdHlwZV1cblxuICAgICAgICAgIGZvciBuYW1lLCBpIGluIG5hbWVzXG4gICAgICAgICAgICB0eXBlID0gdHlwZXNbaV1cblxuICAgICAgICAgICAgaWYgdHlwZSBpc250IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzd2l0Y2ggdHlwZVxuICAgICAgICAgICAgICAgIHdoZW4gJ2Nzcy1iYWNrZ3JvdW5kJ1xuICAgICAgICAgICAgICAgICAgamNlbC5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgje2VudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlfSlcIlxuICAgICAgICAgICAgICAgIHdoZW4gJ2RhdGUnXG4gICAgICAgICAgICAgICAgICBqY2VsLmh0bWwgbW9tZW50KGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlLCAnTU0vREQvWVlZWScpLmZvcm1hdCBqY2VsLmF0dHIoJ2Jhc2FsLWRhdGVmb3JtYXQnKVxuICAgICAgICAgICAgICAgIHdoZW4gJ2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgamNlbC5hdHRyICdzcmMnLCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuICAgICAgICAgICAgICAgIHdoZW4gJ3RleHQnXG4gICAgICAgICAgICAgICAgICBqY2VsLmh0bWwgZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWVcbiAgICAgICAgICAgICAgICB3aGVuICdocmVmJ1xuICAgICAgICAgICAgICAgICAgamNlbC5hdHRyICdocmVmJywgZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWVcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgaWYgbmFtZSBpcyAnc3RydWN0dXJlLW5hbWUnXG4gICAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5Lm5hbWVcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuICAgICAgICBlbC5hcHBlbmQgdHBsXG5cbiAgICAgICkucHJvbWlzZSgpLmRvbmUgLT5cbiAgICAgICAgQmFzYWwuY29tcGxldGUoKVxuXG4gIHByb2Nlc3NUeXBlczogKHR5cGVzLCBqY2VsKSAtPlxuICAgIHJldHVybiBqY2VsXG5cbiAgZ2V0U3RydWN0dXJlczogKGNvbXBsZXRlKSAtPlxuICAgIEBqc29ucCBcInN0cnVjdHVyZXNcIiwgY2xpZW50OiBAY2xpZW50LCAocmVzdWx0KSA9PlxuICAgICAgQHN0cnVjdHVyZXMgPSB7fVxuICAgICAgZm9yIGksc3RydWN0dXJlIG9mIHJlc3VsdC5kYXRhXG4gICAgICAgIEBzdHJ1Y3R1cmVzW3N0cnVjdHVyZS5uYW1lXSA9IHN0cnVjdHVyZVxuICAgICAgY29tcGxldGU/KClcblxuICBqc29ucDogKGVuZHBvaW50LCBwYXJhbXMsIGNvbXBsZXRlKSAtPlxuXG4gICAgcGFyYW1zLmNhbGxiYWNrID0gJ0Jhc2FsLmNhbGxiYWNrJ1xuXG4gICAgc2NyaXB0ID0gXCIje0Bkb21haW59LyN7ZW5kcG9pbnR9P1wiICsgJC5wYXJhbSBwYXJhbXNcblxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgIGVsLnNyYyA9IHNjcmlwdFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnICwgKGUpIC0+XG4gICAgICBjb21wbGV0ZT8oQmFzYWwuZGF0YSlcbiAgICAgIEJhc2FsLmRhdGEgPSBmYWxzZVxuICAgICwgZmFsc2VcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoZWwpXG5cbiAgY2FsbGJhY2s6IChkYXRhKSAtPlxuICAgIEJhc2FsLmRhdGEgPSBkYXRhXG5cbiAgZXJyb3I6IChtZXNzYWdlKSAtPlxuICAgIHRocm93IG5ldyBFcnJvciBcIkJhc2FsOiAje21lc3NhZ2V9XCJcbiIsImNvbmZpZyA9IHtcImJhc2FsXCI6e1wiY2xpZW50XCI6XCI1ODBhMmNkNDVhYTU5YjIxMzk2ZjFlMTNcIn0sXCJiZWVyc1wiOlt7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDFcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDJcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDNcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDRcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDVcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDZcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDdcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifV0sXCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJnb2xkbGlnaHRcIjpcIiNkYWEwMmNcIixcImdvbGRkYXJrXCI6XCIjYzA4MDAwXCIsXCJncmV5OTBcIjpcIiMxYTFhMWJcIixcImdyZXk4MFwiOlwiIzMzMzMzMFwiLFwiZ3JleTcwXCI6XCIjNTA1MDRkXCIsXCJncmV5NTBcIjpcIiM4MDgwN2RcIixcImdyZXkzMFwiOlwiI2IzYjNiMFwiLFwiZ3JleTE1XCI6XCIjZDlkOWQ0XCJ9LFwiZm9udFwiOntcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjYwcHhcIixcImxpbmUtaGVpZ2h0XCI6XCI3MHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiNHB4XCJ9LFwiaDItbGlnaHRcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMzJweFwiLFwibGluZS1oZWlnaHRcIjpcIjM4cHhcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCIzMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzhweFwifSxcImgzLWxpZ2h0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzMHB4XCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwibGluZS1oZWlnaHRcIjpcIjMwcHhcIn0sXCJoNFwiOntcImZvbnQtZmFtaWx5XCI6XCJDdXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIn0sXCJoNVwiOntcImZvbnQtZmFtaWx5XCI6XCJDdXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCI0cHhcIn0sXCJib2R5XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCJ9LFwic21hbGxcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIn19LFwibWV0YVwiOntcInVybFwiOlwiaHR0cDovL2dpbG1hbmJyZXdpbmcuY29tL1wiLFwidGl0bGVcIjpcIkdpbG1hbiBCcmV3aW5nIENvbXBhbnlcIixcImRlc2NyaXB0aW9uXCI6XCJHaWxtYW4gQnJld2luZyBDb21wYW55IGFuZCBUYXByb29tLCBib3JuIGFuZCBicmV3ZWQgaW4gQmVya2VsZXksIENhbGlmb3JuaWEuIEZvdW5kZWQgaW4gMjAxNiwgd2Ugc3BlY2lhbGl6ZSBpbiBjcmFmdCBiZWVycywgYWxlcywgc3RvdXRzIGFuZCBsYWdlcnMuIERyaW5rIHJlc3BvbnNpYmx5LlwiLFwia2V5d29yZHNcIjpcImJlZXIsIGFsZSwgY3JhZnQgYnJldywgc3RvdXRzLCBsYWdlcnMsIHNwaXJpdHMsIGJlcmtlbGV5LCBjYWxpZm9ybmlhLCBnaWxtYW4sIGJyZXdlcnksIHB1YiwgSUJVcywgdGFwcm9vbSwgYmF5IGFyZWFcIixcInRyYWNraW5nSURcIjpcIlVBLTc3NzE0Mzg5LTJcIixcInNoYXJlXCI6XCJpbWFnZXMvc2hhcmUuanBnXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovZ2lsbWFuXCIsXCJhZGRyZXNzXCI6e1wibWFwXCI6XCJodHRwczovL2dvby5nbC9tYXBzL0UzNThUUDQ4VzRHMlwiLFwic3RyZWV0XCI6XCI5MTIgR2lsbWFuIFN0XCIsXCJjaXR5XCI6XCJCZXJrZWxleVwiLFwic3RhdGVcIjpcIkNBXCIsXCJ6aXBcIjo5MzcxMCxcImNvdW50cnlcIjpcIlVTXCIsXCJwaG9uZVwiOlwiKDUxMCkgNTU2LTg3MDFcIn0sXCJlbWFpbFwiOlwiaW5mb0BnaWxtYW5icmV3aW5nLmNvbVwiLFwic29jaWFsXCI6e1wiZmFjZWJvb2tcIjpcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9BbnZpbEJyZXdpbmdDb21wYW55L1wiLFwidHdpdHRlclwiOlwiaHR0cHM6Ly90d2l0dGVyLmNvbS9HaWxtYW5fQnJld2luZ1wiLFwiaW5zdGFncmFtXCI6XCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2dpbG1hbmJyZXdpbmcvXCJ9fX07IiwiSW5kZXggPVxuICBvcHRpb25zOiB7fVxuICBsb2FkZWQ6IGZhbHNlXG4gIGNhY2hlOlxuICAgIHdpbmRvdzogZmFsc2VcbiAgICBzdGlja2llZDogZmFsc2VcbiAgaTogLT5cblxuICAgIEJhc2FsLmkgY29uZmlnLmJhc2FsLmNsaWVudCwgLT5cbiAgICAgIEluZGV4LmxvYWRlZCA9IHRydWVcbiAgICAgIEluZGV4LnNsaWNrKClcblxuICAgIEBjYWNoZS53aW5kb3cgPSAkKHdpbmRvdylcbiAgICBcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgaWYgQGNhY2hlLndpbmRvdy53aWR0aCgpID4gMTE5MFxuICAgICAgc2V0SW50ZXJ2YWwgQHN0aWNreSwgNTBcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAYnVyZ2VySGFuZGxlclxuICAgICQoJy5pdGVtLCBhLmN0YSwgLmFudmlsJykuY2xpY2sgQG1lbnVIYW5kbGVyXG4gICAgJCgnLmZvcm0gLmN0YScpLmNsaWNrIEBuZXdzbGV0dGVySGFuZGxlclxuXG4gICAgJCh3aW5kb3cpLnJlc2l6ZSBJbmRleC5zbGlja1JlbG9hZFxuXG4gIHNsaWNrOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgubG9hZGVkIGlzIGZhbHNlXG5cbiAgICB3aWR0aCA9ICQoZG9jdW1lbnQpLndpZHRoKClcbiAgICBhbXQgPSBNYXRoLmZsb29yIHdpZHRoIC8gMzUwXG5cbiAgICAkKCcuYmVlcmxpc3QgPiAuaW5uZXInKS5zbGlja1xuICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgIHNsaWRlc1RvU2hvdzogYW10XG4gICAgICBzbGlkZXNUb1Njcm9sbDogMVxuXG4gIHNsaWNrUmVsb2FkOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgubG9hZGVkIGlzIGZhbHNlXG5cbiAgICB3aWR0aCA9ICQoZG9jdW1lbnQpLndpZHRoKClcbiAgICBhbXQgPSBNYXRoLmZsb29yIHdpZHRoIC8gMzUwXG4gICAgJCgnLmJlZXJsaXN0ID4gLmlubmVyJykuc2xpY2sgJ3Vuc2xpY2snXG5cbiAgICAkKCcuYmVlcmxpc3QgPiAuaW5uZXInKS5zbGlja1xuICAgICAgc2V0UG9zaXRpb246IHRydWVcbiAgICAgIHNsaWRlc1RvU2hvdzogYW10XG5cbiAgc3RpY2t5OiAtPlxuXG4gICAgc3RpY2t5U3BvdCA9IDMwMFxuXG4gICAgaWYgSW5kZXguY2FjaGUud2luZG93LnNjcm9sbFRvcCgpID4gc3RpY2t5U3BvdCBhbmQgSW5kZXguY2FjaGUuc3RpY2tpZWQgaXMgZmFsc2VcbiAgICAgIF8ub2ZmICcuaW5mb2JhcidcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgJCgnLmluZm9iYXInKS5hZGRDbGFzcyAnc3R1Y2snXG4gICAgICAgIF8ub24gJy5pbmZvYmFyJ1xuICAgICAgLCAyMDBcbiAgICAgIEluZGV4LmNhY2hlLnN0aWNraWVkID0gdHJ1ZVxuXG4gICAgaWYgSW5kZXguY2FjaGUud2luZG93LnNjcm9sbFRvcCgpIDwgc3RpY2t5U3BvdCBhbmQgSW5kZXguY2FjaGUuc3RpY2tpZWQgaXMgdHJ1ZVxuICAgICAgXy5vZmYgJy5pbmZvYmFyJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAkKCcuaW5mb2JhcicpLnJlbW92ZUNsYXNzICdzdHVjaydcbiAgICAgICAgXy5vbiAnLmluZm9iYXInXG4gICAgICAsIDIwMFxuICAgICAgSW5kZXguY2FjaGUuc3RpY2tpZWQgPSBvZmZcblxuICBidXJnZXJIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgXy5vZmYgJy50b3AgPiAubWVudSdcbiAgICBfLm9uICcudG9wID4gLmJ1cmdlcidcbiAgICBpdGVtID0gJCh0aGlzKS5kYXRhICdpdGVtJ1xuICAgICQuc2Nyb2xsVG8gJChcIi4je2l0ZW19XCIpLCA1MDBcblxuICBuZXdzbGV0dGVySGFuZGxlcjogLT5cbiAgICAkKHRoaXMpLnBhcmVudCgpLnN1Ym1pdCgpXG4iLCJjbGFzcyBQcmVsb2FkXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgJCgnLmxvYWRpbmcnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGNsYXNzZXMgPSAkKGVsKS5hdHRyKCdjbGFzcycpLnNwbGl0ICcgJ1xuICAgICAgZm9yIGNsIGluIGNsYXNzZXNcbiAgICAgICAgaWYgY2wgaXNudCAnbG9hZGluZydcbiAgICAgICAgICBpbWFnZSA9IEBzdHlsaW4oY2wpXG4gICAgICAgIGNvbnNvbGUubG9nICd1cmw6ICcgKyBpbWFnZVxuXG4gIHN0eWxpbjogKGNsKSAtPlxuICAgIGNvbnNvbGUubG9nIGNsXG4gICAgJHAgPSAkKFwiPHA+PC9wPlwiKS5oaWRlKCkuYWRkQ2xhc3MoY2wpLmFwcGVuZFRvKCdib2R5JylcbiAgICB1cmwgPSAkcC5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnXG4gICAgJHAucmVtb3ZlKClcbiAgICByZXR1cm4gdXJsXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
