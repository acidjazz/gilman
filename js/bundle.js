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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJiYXNhbC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtN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SCxDQUFBO0FBQ0EsV0FBTztFQUxEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJCYXNhbCA9XG5cbiAgZG9tYWluOiAnaHR0cDovL2Jhc2FsLnRlY2gvYXBpJ1xuICBjbGllbnQ6IGZhbHNlXG5cbiAgZGF0YTogZmFsc2VcbiAgc3RydWN0dXJlczogZmFsc2VcblxuICBjb21wbGV0ZTogZmFsc2VcblxuICBpOiAoY2xpZW50LCBjb21wbGV0ZSkgLT5cblxuICAgIEBjb21wbGV0ZSA9IGNvbXBsZXRlXG5cbiAgICBAY2xpZW50ID0gY2xpZW50XG5cbiAgICBAZ2V0U3RydWN0dXJlcyA9PlxuICAgICAgQGxvb3AoKVxuICAgICAgQGVudHJ5KClcblxuICBlbnRyeTogLT5cbiAgICAkKCcuYmFzYWwtZW50cnknKS5lYWNoIChpLCBlbCkgLT5cblxuICAgICAgZWwgPSAkKGVsKVxuICAgICAgc3RydWN0dXJlID0gZWwuYXR0ciAnYmFzYWwtc3RydWN0dXJlJ1xuICAgICAgbmFtZSA9IGVsLmF0dHIgJ2Jhc2FsLW5hbWUnXG4gICAgICBlbnRpdHlOYW1lID0gZWwuYXR0ciAnYmFzYWwtZW50aXR5J1xuICAgICAgYXR0ciA9IGVsLmF0dHIgJ2Jhc2FsLWF0dHInXG5cbiAgICAgIEJhc2FsLmVycm9yKFwiU3RydWN0dXJlIG5vdCBmb3VuZCBcXFwiI3tzdHJ1Y3R1cmV9XFxcIlwiKSBpZiAhQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdP1xuXG4gICAgICBmb3Iga2V5LCBlbnRyeSBvZiBCYXNhbC5zdHJ1Y3R1cmVzW3N0cnVjdHVyZV0uZW50cmllc1xuICAgICAgICBpZiBuYW1lIGlzIGVudHJ5Lm5hbWVcbiAgICAgICAgICBmb3IgYmtleSwgZW50aXR5IG9mIGVudHJ5LmVudGl0aWVzXG4gICAgICAgICAgICBpZiBlbnRpdHkubmFtZSBpcyBlbnRpdHlOYW1lXG4gICAgICAgICAgICAgIGlmIGF0dHJcbiAgICAgICAgICAgICAgICBlbC5hdHRyIGF0dHIsIGVudGl0eS52YWx1ZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIGF0dHJcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVsLmh0bWwgZW50aXR5LnZhbHVlXG5cbiAgbG9vcDogLT5cblxuICAgICQoJy5iYXNhbC1sb29wJykuZWFjaCggKGksIGVsKSAtPlxuXG4gICAgICBlbCA9ICQoZWwpXG4gICAgICBzdHJ1Y3R1cmUgPSBlbC5hdHRyKFwiYmFzYWwtc3RydWN0dXJlXCIpXG5cbiAgICAgIEJhc2FsLmVycm9yKFwiU3RydWN0dXJlIG5vdCBmb3VuZCBcXFwiI3tzdHJ1Y3R1cmV9XFxcIlwiKSBpZiAhQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdP1xuXG4gICAgICB0ZW1wbGF0ZSA9IGVsLmNoaWxkcmVuKCkucmVtb3ZlKClcblxuICAgICAgZm9yIG93biBuYW1lLCBlbnRyeSBvZiBCYXNhbC5zdHJ1Y3R1cmVzW3N0cnVjdHVyZV0uZW50cmllc1xuICAgICAgICB0cGwgPSB0ZW1wbGF0ZS5jbG9uZSgpXG4gICAgICAgIHRwbC5maW5kKCcqJykuZWFjaCAoY2ksIGNlbCkgLT5cbiAgICAgICAgICBqY2VsID0gJChjZWwpXG4gICAgICAgICAgbmFtZSA9IGpjZWwuYXR0cignYmFzYWwtbmFtZScpXG4gICAgICAgICAgdHlwZSA9IGpjZWwuYXR0cignYmFzYWwtdHlwZScpXG4gICAgICAgICAgbmFtZXMgPSBqY2VsLmF0dHIoJ2Jhc2FsLW5hbWVzJyk/LnNwbGl0ICcsJ1xuICAgICAgICAgIHR5cGVzID0gamNlbC5hdHRyKCdiYXNhbC10eXBlcycpPy5zcGxpdCAnLCdcblxuICAgICAgICAgIHJldHVybiB0cnVlIGlmIG5hbWUgaXMgdW5kZWZpbmVkIGFuZCBuYW1lcyBpcyB1bmRlZmluZWRcblxuICAgICAgICAgIGlmIG5hbWVzIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgbmFtZXMgPSBbbmFtZV1cbiAgICAgICAgICAgIHR5cGVzID0gW3R5cGVdXG5cbiAgICAgICAgICBmb3IgbmFtZSwgaSBpbiBuYW1lc1xuICAgICAgICAgICAgdHlwZSA9IHR5cGVzW2ldXG5cbiAgICAgICAgICAgIGlmIHR5cGUgaXNudCB1bmRlZmluZWRcbiAgICAgICAgICAgICAgc3dpdGNoIHR5cGVcbiAgICAgICAgICAgICAgICB3aGVuICdjc3MtYmFja2dyb3VuZCdcbiAgICAgICAgICAgICAgICAgIGpjZWwuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZX0pXCJcbiAgICAgICAgICAgICAgICB3aGVuICdkYXRlJ1xuICAgICAgICAgICAgICAgICAgamNlbC5odG1sIG1vbWVudChlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZSwgJ01NL0REL1lZWVknKS5mb3JtYXQgamNlbC5hdHRyKCdiYXNhbC1kYXRlZm9ybWF0JylcbiAgICAgICAgICAgICAgICB3aGVuICdpbWFnZSdcbiAgICAgICAgICAgICAgICAgIGpjZWwuYXR0ciAnc3JjJywgZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWVcbiAgICAgICAgICAgICAgICB3aGVuICd0ZXh0J1xuICAgICAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG4gICAgICAgICAgICAgICAgd2hlbiAnaHJlZidcbiAgICAgICAgICAgICAgICAgIGpjZWwuYXR0ciAnaHJlZicsIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgaWYgbmFtZSBpcyAnc3RydWN0dXJlLW5hbWUnXG4gICAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5Lm5hbWVcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuICAgICAgICBlbC5hcHBlbmQgdHBsXG5cbiAgICAgICkucHJvbWlzZSgpLmRvbmUgLT5cbiAgICAgICAgQmFzYWwuY29tcGxldGUoKVxuXG4gIGdldFN0cnVjdHVyZXM6IChjb21wbGV0ZSkgLT5cbiAgICBAanNvbnAgXCJzdHJ1Y3R1cmVzXCIsIGNsaWVudDogQGNsaWVudCwgKHJlc3VsdCkgPT5cbiAgICAgIEBzdHJ1Y3R1cmVzID0ge31cbiAgICAgIGZvciBpLHN0cnVjdHVyZSBvZiByZXN1bHQuZGF0YVxuICAgICAgICBAc3RydWN0dXJlc1tzdHJ1Y3R1cmUubmFtZV0gPSBzdHJ1Y3R1cmVcbiAgICAgIGNvbXBsZXRlPygpXG5cbiAganNvbnA6IChlbmRwb2ludCwgcGFyYW1zLCBjb21wbGV0ZSkgLT5cblxuICAgIHBhcmFtcy5jYWxsYmFjayA9ICdCYXNhbC5jYWxsYmFjaydcblxuICAgIHNjcmlwdCA9IFwiI3tAZG9tYWlufS8je2VuZHBvaW50fT9cIiArICQucGFyYW0gcGFyYW1zXG5cbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcbiAgICBlbC5zcmMgPSBzY3JpcHRcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyICdsb2FkJyAsIChlKSAtPlxuICAgICAgY29tcGxldGU/KEJhc2FsLmRhdGEpXG4gICAgICBCYXNhbC5kYXRhID0gZmFsc2VcbiAgICAsIGZhbHNlXG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKGVsKVxuXG4gIGNhbGxiYWNrOiAoZGF0YSkgLT5cbiAgICBCYXNhbC5kYXRhID0gZGF0YVxuXG4gIGVycm9yOiAobWVzc2FnZSkgLT5cbiAgICB0aHJvdyBuZXcgRXJyb3IgXCJiYXNhbDogI3ttZXNzYWdlfVwiXG4iLCJjb25maWcgPSB7XCJiYXNhbFwiOntcImNsaWVudFwiOlwiNTgwYTJjZDQ1YWE1OWIyMTM5NmYxZTEzXCJ9LFwiYmVlcnNcIjpbe1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciAxXCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciAyXCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciAzXCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciA0XCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciA1XCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciA2XCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciA3XCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn1dLFwiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiZ29sZGxpZ2h0XCI6XCIjZGFhMDJjXCIsXCJnb2xkZGFya1wiOlwiI2MwODAwMFwiLFwiZ3JleTkwXCI6XCIjMWExYTFiXCIsXCJncmV5ODBcIjpcIiMzMzMzMzBcIixcImdyZXk3MFwiOlwiIzUwNTA0ZFwiLFwiZ3JleTUwXCI6XCIjODA4MDdkXCIsXCJncmV5MzBcIjpcIiNiM2IzYjBcIixcImdyZXkxNVwiOlwiI2Q5ZDlkNFwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCI2MHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiNzBweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjRweFwifSxcImgyLWxpZ2h0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjMycHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzOHB4XCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiMzJweFwiLFwibGluZS1oZWlnaHRcIjpcIjM4cHhcIn0sXCJoMy1saWdodFwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzBweFwifSxcImgzXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzMHB4XCJ9LFwiaDRcIjp7XCJmb250LWZhbWlseVwiOlwiQ3V0aXZlXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiaDVcIjp7XCJmb250LWZhbWlseVwiOlwiQ3V0aXZlXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyMHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiNHB4XCJ9LFwiYm9keVwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwifSxcInNtYWxsXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyMHB4XCJ9fSxcIm1ldGFcIjp7XCJ1cmxcIjpcImh0dHA6Ly9naWxtYW5icmV3aW5nLmNvbS9cIixcInRpdGxlXCI6XCJHaWxtYW4gQnJld2luZyBDb21wYW55XCIsXCJkZXNjcmlwdGlvblwiOlwiR2lsbWFuIEJyZXdpbmcgQ29tcGFueSBhbmQgVGFwcm9vbSwgYm9ybiBhbmQgYnJld2VkIGluIEJlcmtlbGV5LCBDYWxpZm9ybmlhLiBGb3VuZGVkIGluIDIwMTYsIHdlIHNwZWNpYWxpemUgaW4gY3JhZnQgYmVlcnMsIGFsZXMsIHN0b3V0cyBhbmQgbGFnZXJzLiBEcmluayByZXNwb25zaWJseS5cIixcImtleXdvcmRzXCI6XCJiZWVyLCBhbGUsIGNyYWZ0IGJyZXcsIHN0b3V0cywgbGFnZXJzLCBzcGlyaXRzLCBiZXJrZWxleSwgY2FsaWZvcm5pYSwgZ2lsbWFuLCBicmV3ZXJ5LCBwdWIsIElCVXMsIHRhcHJvb20sIGJheSBhcmVhXCIsXCJ0cmFja2luZ0lEXCI6XCJVQS03NzcxNDM4OS0yXCIsXCJzaGFyZVwiOlwiaW1hZ2VzL3NoYXJlLmpwZ1wiLFwicmVwb1wiOlwiaHR0cHM6Ly9naXRodWIuY29tL2FjaWRqYXp6L2dpbG1hblwiLFwiYWRkcmVzc1wiOntcIm1hcFwiOlwiaHR0cHM6Ly9nb28uZ2wvbWFwcy9FMzU4VFA0OFc0RzJcIixcInN0cmVldFwiOlwiOTEyIEdpbG1hbiBTdFwiLFwiY2l0eVwiOlwiQmVya2VsZXlcIixcInN0YXRlXCI6XCJDQVwiLFwiemlwXCI6OTM3MTAsXCJjb3VudHJ5XCI6XCJVU1wiLFwicGhvbmVcIjpcIig1MTApIDU1Ni04NzAxXCJ9LFwiZW1haWxcIjpcImluZm9AZ2lsbWFuYnJldy5jb21cIixcInNvY2lhbFwiOntcImZhY2Vib29rXCI6XCJodHRwczovL3d3dy5mYWNlYm9vay5jb20vQW52aWxCcmV3aW5nQ29tcGFueS9cIixcInR3aXR0ZXJcIjpcImh0dHBzOi8vdHdpdHRlci5jb20vR2lsbWFuX0JyZXdpbmdcIixcImluc3RhZ3JhbVwiOlwiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9naWxtYW5icmV3aW5nL1wifX19OyIsIkluZGV4ID1cbiAgb3B0aW9uczoge31cbiAgbG9hZGVkOiBmYWxzZVxuICBjYWNoZTpcbiAgICB3aW5kb3c6IGZhbHNlXG4gICAgc3RpY2tpZWQ6IGZhbHNlXG4gIGk6IC0+XG5cbiAgICBCYXNhbC5pIGNvbmZpZy5iYXNhbC5jbGllbnQsIC0+XG4gICAgICBJbmRleC5sb2FkZWQgPSB0cnVlXG4gICAgICBJbmRleC5zbGljaygpXG5cbiAgICBAY2FjaGUud2luZG93ID0gJCh3aW5kb3cpXG4gICAgXG4gICAgQGhhbmRsZXJzKClcblxuICAgIGlmIEBjYWNoZS53aW5kb3cud2lkdGgoKSA+IDExOTBcbiAgICAgIHNldEludGVydmFsIEBzdGlja3ksIDUwXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnRvcCAuYnVyZ2VyJykuY2xpY2sgQGJ1cmdlckhhbmRsZXJcbiAgICAkKCcuaXRlbSwgYS5jdGEsIC5hbnZpbCcpLmNsaWNrIEBtZW51SGFuZGxlclxuICAgICQoJy5mb3JtIC5jdGEnKS5jbGljayBAbmV3c2xldHRlckhhbmRsZXJcblxuICAgICQod2luZG93KS5yZXNpemUgSW5kZXguc2xpY2tSZWxvYWRcblxuICBzbGljazogLT5cblxuICAgIHJldHVybiB0cnVlIGlmIEluZGV4LmxvYWRlZCBpcyBmYWxzZVxuXG4gICAgd2lkdGggPSAkKGRvY3VtZW50KS53aWR0aCgpXG4gICAgYW10ID0gTWF0aC5mbG9vciB3aWR0aCAvIDM1MFxuXG4gICAgJCgnLmJlZXJsaXN0ID4gLmlubmVyJykuc2xpY2tcbiAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICBzbGlkZXNUb1Nob3c6IGFtdFxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcblxuICBzbGlja1JlbG9hZDogLT5cblxuICAgIHJldHVybiB0cnVlIGlmIEluZGV4LmxvYWRlZCBpcyBmYWxzZVxuXG4gICAgd2lkdGggPSAkKGRvY3VtZW50KS53aWR0aCgpXG4gICAgYW10ID0gTWF0aC5mbG9vciB3aWR0aCAvIDM1MFxuICAgICQoJy5iZWVybGlzdCA+IC5pbm5lcicpLnNsaWNrICd1bnNsaWNrJ1xuXG4gICAgJCgnLmJlZXJsaXN0ID4gLmlubmVyJykuc2xpY2tcbiAgICAgIHNldFBvc2l0aW9uOiB0cnVlXG4gICAgICBzbGlkZXNUb1Nob3c6IGFtdFxuXG4gIHN0aWNreTogLT5cblxuICAgIHN0aWNreVNwb3QgPSAzMDBcblxuICAgIGlmIEluZGV4LmNhY2hlLndpbmRvdy5zY3JvbGxUb3AoKSA+IHN0aWNreVNwb3QgYW5kIEluZGV4LmNhY2hlLnN0aWNraWVkIGlzIGZhbHNlXG4gICAgICBfLm9mZiAnLmluZm9iYXInXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICQoJy5pbmZvYmFyJykuYWRkQ2xhc3MgJ3N0dWNrJ1xuICAgICAgICBfLm9uICcuaW5mb2JhcidcbiAgICAgICwgMjAwXG4gICAgICBJbmRleC5jYWNoZS5zdGlja2llZCA9IHRydWVcblxuICAgIGlmIEluZGV4LmNhY2hlLndpbmRvdy5zY3JvbGxUb3AoKSA8IHN0aWNreVNwb3QgYW5kIEluZGV4LmNhY2hlLnN0aWNraWVkIGlzIHRydWVcbiAgICAgIF8ub2ZmICcuaW5mb2JhcidcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgJCgnLmluZm9iYXInKS5yZW1vdmVDbGFzcyAnc3R1Y2snXG4gICAgICAgIF8ub24gJy5pbmZvYmFyJ1xuICAgICAgLCAyMDBcbiAgICAgIEluZGV4LmNhY2hlLnN0aWNraWVkID0gb2ZmXG5cbiAgYnVyZ2VySGFuZGxlcjogLT5cbiAgICBfLnN3YXAgJy50b3AgPiAuYnVyZ2VyJ1xuICAgIF8uc3dhcCAnLnRvcCA+IC5tZW51J1xuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgIF8ub2ZmICcudG9wID4gLm1lbnUnXG4gICAgXy5vbiAnLnRvcCA+IC5idXJnZXInXG4gICAgaXRlbSA9ICQodGhpcykuZGF0YSAnaXRlbSdcbiAgICAkLnNjcm9sbFRvICQoXCIuI3tpdGVtfVwiKSwgNTAwXG5cbiAgbmV3c2xldHRlckhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5zdWJtaXQoKVxuIiwiY2xhc3MgUHJlbG9hZFxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgICQoJy5sb2FkaW5nJykuZWFjaCAoaSwgZWwpID0+XG4gICAgICBjbGFzc2VzID0gJChlbCkuYXR0cignY2xhc3MnKS5zcGxpdCAnICdcbiAgICAgIGZvciBjbCBpbiBjbGFzc2VzXG4gICAgICAgIGlmIGNsIGlzbnQgJ2xvYWRpbmcnXG4gICAgICAgICAgaW1hZ2UgPSBAc3R5bGluKGNsKVxuICAgICAgICBjb25zb2xlLmxvZyAndXJsOiAnICsgaW1hZ2VcblxuICBzdHlsaW46IChjbCkgLT5cbiAgICBjb25zb2xlLmxvZyBjbFxuICAgICRwID0gJChcIjxwPjwvcD5cIikuaGlkZSgpLmFkZENsYXNzKGNsKS5hcHBlbmRUbygnYm9keScpXG4gICAgdXJsID0gJHAuY3NzICdiYWNrZ3JvdW5kLWltYWdlJ1xuICAgICRwLnJlbW92ZSgpXG4gICAgcmV0dXJuIHVybFxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
