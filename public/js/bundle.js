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
      var bkey, entity, entityName, entry, key, name, ref, results, structure;
      el = $(el);
      structure = el.attr('basal-structure');
      name = el.attr('basal-name');
      entityName = el.attr('basal-entity');
      console.log(el);
      if (Basal.structures[structure] == null) {
        Basal.error("Structure not found \"" + structure + "\"");
      }
      ref = Basal.structures[structure].entries;
      results = [];
      for (key in ref) {
        entry = ref[key];
        console.log(entry.name);
        if (name === entry.name) {
          results.push((function() {
            var ref1, results1;
            ref1 = entry.entities;
            results1 = [];
            for (bkey in ref1) {
              entity = ref1[bkey];
              if (entity.name === entityName) {
                results1.push(el.html(entity.value));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJiYXNhbC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtN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PSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJCYXNhbCA9XG5cbiAgZG9tYWluOiAnaHR0cDovL2Jhc2FsLnRlY2gvYXBpJ1xuICBjbGllbnQ6IGZhbHNlXG5cbiAgZGF0YTogZmFsc2VcbiAgc3RydWN0dXJlczogZmFsc2VcblxuICBjb21wbGV0ZTogZmFsc2VcblxuICBpOiAoY2xpZW50LCBjb21wbGV0ZSkgLT5cblxuICAgIEBjb21wbGV0ZSA9IGNvbXBsZXRlXG5cbiAgICBAY2xpZW50ID0gY2xpZW50XG5cbiAgICBAZ2V0U3RydWN0dXJlcyA9PlxuICAgICAgQGxvb3AoKVxuICAgICAgQGVudHJ5KClcblxuICBlbnRyeTogLT5cbiAgICAkKCcuYmFzYWwtZW50cnknKS5lYWNoIChpLCBlbCkgLT5cblxuICAgICAgZWwgPSAkKGVsKVxuICAgICAgc3RydWN0dXJlID0gZWwuYXR0ciAnYmFzYWwtc3RydWN0dXJlJ1xuICAgICAgbmFtZSA9IGVsLmF0dHIgJ2Jhc2FsLW5hbWUnXG4gICAgICBlbnRpdHlOYW1lID0gZWwuYXR0ciAnYmFzYWwtZW50aXR5J1xuICAgICAgY29uc29sZS5sb2cgZWxcblxuICAgICAgQmFzYWwuZXJyb3IoXCJTdHJ1Y3R1cmUgbm90IGZvdW5kIFxcXCIje3N0cnVjdHVyZX1cXFwiXCIpIGlmICFCYXNhbC5zdHJ1Y3R1cmVzW3N0cnVjdHVyZV0/XG5cbiAgICAgIGZvciBrZXksIGVudHJ5IG9mIEJhc2FsLnN0cnVjdHVyZXNbc3RydWN0dXJlXS5lbnRyaWVzXG4gICAgICAgIGNvbnNvbGUubG9nIGVudHJ5Lm5hbWVcbiAgICAgICAgaWYgbmFtZSBpcyBlbnRyeS5uYW1lXG4gICAgICAgICAgZm9yIGJrZXksIGVudGl0eSBvZiBlbnRyeS5lbnRpdGllc1xuICAgICAgICAgICAgaWYgZW50aXR5Lm5hbWUgaXMgZW50aXR5TmFtZVxuICAgICAgICAgICAgICBlbC5odG1sIGVudGl0eS52YWx1ZVxuXG4gIGxvb3A6IC0+XG5cbiAgICAkKCcuYmFzYWwtbG9vcCcpLmVhY2goIChpLCBlbCkgLT5cblxuICAgICAgZWwgPSAkKGVsKVxuICAgICAgc3RydWN0dXJlID0gZWwuYXR0cihcImJhc2FsLXN0cnVjdHVyZVwiKVxuXG4gICAgICBCYXNhbC5lcnJvcihcIlN0cnVjdHVyZSBub3QgZm91bmQgXFxcIiN7c3RydWN0dXJlfVxcXCJcIikgaWYgIUJhc2FsLnN0cnVjdHVyZXNbc3RydWN0dXJlXT9cblxuICAgICAgdGVtcGxhdGUgPSBlbC5jaGlsZHJlbigpLnJlbW92ZSgpXG5cbiAgICAgIGZvciBvd24gbmFtZSwgZW50cnkgb2YgQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdLmVudHJpZXNcbiAgICAgICAgdHBsID0gdGVtcGxhdGUuY2xvbmUoKVxuICAgICAgICB0cGwuZmluZCgnKicpLmVhY2ggKGNpLCBjZWwpIC0+XG4gICAgICAgICAgamNlbCA9ICQoY2VsKVxuICAgICAgICAgIG5hbWUgPSBqY2VsLmF0dHIoJ2Jhc2FsLW5hbWUnKVxuICAgICAgICAgIHR5cGUgPSBqY2VsLmF0dHIoJ2Jhc2FsLXR5cGUnKVxuICAgICAgICAgIG5hbWVzID0gamNlbC5hdHRyKCdiYXNhbC1uYW1lcycpPy5zcGxpdCAnLCdcbiAgICAgICAgICB0eXBlcyA9IGpjZWwuYXR0cignYmFzYWwtdHlwZXMnKT8uc3BsaXQgJywnXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZSBpZiBuYW1lIGlzIHVuZGVmaW5lZCBhbmQgbmFtZXMgaXMgdW5kZWZpbmVkXG5cbiAgICAgICAgICBpZiBuYW1lcyBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgIG5hbWVzID0gW25hbWVdXG4gICAgICAgICAgICB0eXBlcyA9IFt0eXBlXVxuXG4gICAgICAgICAgZm9yIG5hbWUsIGkgaW4gbmFtZXNcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlc1tpXVxuXG4gICAgICAgICAgICBpZiB0eXBlIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN3aXRjaCB0eXBlXG4gICAgICAgICAgICAgICAgd2hlbiAnY3NzLWJhY2tncm91bmQnXG4gICAgICAgICAgICAgICAgICBqY2VsLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7ZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWV9KVwiXG4gICAgICAgICAgICAgICAgd2hlbiAnZGF0ZSdcbiAgICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBtb21lbnQoZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWUsICdNTS9ERC9ZWVlZJykuZm9ybWF0IGpjZWwuYXR0cignYmFzYWwtZGF0ZWZvcm1hdCcpXG4gICAgICAgICAgICAgICAgd2hlbiAnaW1hZ2UnXG4gICAgICAgICAgICAgICAgICBqY2VsLmF0dHIgJ3NyYycsIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG4gICAgICAgICAgICAgICAgd2hlbiAndGV4dCdcbiAgICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuICAgICAgICAgICAgICAgIHdoZW4gJ2hyZWYnXG4gICAgICAgICAgICAgICAgICBqY2VsLmF0dHIgJ2hyZWYnLCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGlmIG5hbWUgaXMgJ3N0cnVjdHVyZS1uYW1lJ1xuICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBlbnRyeS5uYW1lXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBqY2VsLmh0bWwgZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWVcbiAgICAgICAgZWwuYXBwZW5kIHRwbFxuXG4gICAgICApLnByb21pc2UoKS5kb25lIC0+XG4gICAgICAgIEJhc2FsLmNvbXBsZXRlKClcblxuICBnZXRTdHJ1Y3R1cmVzOiAoY29tcGxldGUpIC0+XG4gICAgQGpzb25wIFwic3RydWN0dXJlc1wiLCBjbGllbnQ6IEBjbGllbnQsIChyZXN1bHQpID0+XG4gICAgICBAc3RydWN0dXJlcyA9IHt9XG4gICAgICBmb3IgaSxzdHJ1Y3R1cmUgb2YgcmVzdWx0LmRhdGFcbiAgICAgICAgQHN0cnVjdHVyZXNbc3RydWN0dXJlLm5hbWVdID0gc3RydWN0dXJlXG4gICAgICBjb21wbGV0ZT8oKVxuXG4gIGpzb25wOiAoZW5kcG9pbnQsIHBhcmFtcywgY29tcGxldGUpIC0+XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSAnQmFzYWwuY2FsbGJhY2snXG5cbiAgICBzY3JpcHQgPSBcIiN7QGRvbWFpbn0vI3tlbmRwb2ludH0/XCIgKyAkLnBhcmFtIHBhcmFtc1xuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlPyhCYXNhbC5kYXRhKVxuICAgICAgQmFzYWwuZGF0YSA9IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChlbClcblxuICBjYWxsYmFjazogKGRhdGEpIC0+XG4gICAgQmFzYWwuZGF0YSA9IGRhdGFcblxuICBlcnJvcjogKG1lc3NhZ2UpIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yIFwiYmFzYWw6ICN7bWVzc2FnZX1cIlxuIiwiY29uZmlnID0ge1wiYmFzYWxcIjp7XCJjbGllbnRcIjpcIjU4MGEyY2Q0NWFhNTliMjEzOTZmMWUxM1wifSxcImJlZXJzXCI6W3tcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgMVwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgMlwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgM1wiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNFwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNVwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNlwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgN1wiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9XSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImdvbGRsaWdodFwiOlwiI2RhYTAyY1wiLFwiZ29sZGRhcmtcIjpcIiNjMDgwMDBcIixcImdyZXk5MFwiOlwiIzFhMWExYlwiLFwiZ3JleTgwXCI6XCIjMzMzMzMwXCIsXCJncmV5NzBcIjpcIiM1MDUwNGRcIixcImdyZXk1MFwiOlwiIzgwODA3ZFwiLFwiZ3JleTMwXCI6XCIjYjNiM2IwXCIsXCJncmV5MTVcIjpcIiNkOWQ5ZDRcIn0sXCJmb250XCI6e1wiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiNjBweFwiLFwibGluZS1oZWlnaHRcIjpcIjcwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCI0cHhcIn0sXCJoMi1saWdodFwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIzMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzhweFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjMycHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzOHB4XCJ9LFwiaDMtbGlnaHRcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwibGluZS1oZWlnaHRcIjpcIjMwcHhcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzBweFwifSxcImg0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkN1dGl2ZVwiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifSxcImg1XCI6e1wiZm9udC1mYW1pbHlcIjpcIkN1dGl2ZVwiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjBweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjRweFwifSxcImJvZHlcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIn0sXCJzbWFsbFwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjBweFwifX0sXCJtZXRhXCI6e1widXJsXCI6XCJodHRwOi8vZ2lsbWFuYnJld2luZy5jb20vXCIsXCJ0aXRsZVwiOlwiR2lsbWFuIEJyZXdpbmcgQ29tcGFueVwiLFwiZGVzY3JpcHRpb25cIjpcIkdpbG1hbiBCcmV3aW5nIENvbXBhbnkgYW5kIFRhcHJvb20sIGJvcm4gYW5kIGJyZXdlZCBpbiBCZXJrZWxleSwgQ2FsaWZvcm5pYS4gRm91bmRlZCBpbiAyMDE2LCB3ZSBzcGVjaWFsaXplIGluIGNyYWZ0IGJlZXJzLCBhbGVzLCBzdG91dHMgYW5kIGxhZ2Vycy4gRHJpbmsgcmVzcG9uc2libHkuXCIsXCJrZXl3b3Jkc1wiOlwiYmVlciwgYWxlLCBjcmFmdCBicmV3LCBzdG91dHMsIGxhZ2Vycywgc3Bpcml0cywgYmVya2VsZXksIGNhbGlmb3JuaWEsIGdpbG1hbiwgYnJld2VyeSwgcHViLCBJQlVzLCB0YXByb29tLCBiYXkgYXJlYVwiLFwidHJhY2tpbmdJRFwiOlwiVUEtNzc3MTQzODktMlwiLFwic2hhcmVcIjpcImltYWdlcy9zaGFyZS5qcGdcIixcInJlcG9cIjpcImh0dHBzOi8vZ2l0aHViLmNvbS9hY2lkamF6ei9naWxtYW5cIixcImFkZHJlc3NcIjp7XCJtYXBcIjpcImh0dHBzOi8vZ29vLmdsL21hcHMvRTM1OFRQNDhXNEcyXCIsXCJzdHJlZXRcIjpcIjkxMiBHaWxtYW4gU3RcIixcImNpdHlcIjpcIkJlcmtlbGV5XCIsXCJzdGF0ZVwiOlwiQ0FcIixcInppcFwiOjkzNzEwLFwiY291bnRyeVwiOlwiVVNcIixcInBob25lXCI6XCIoNTEwKSA1NTYtODcwMVwifSxcImVtYWlsXCI6XCJpbmZvQGdpbG1hbmJyZXdpbmcuY29tXCIsXCJzb2NpYWxcIjp7XCJmYWNlYm9va1wiOlwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0FudmlsQnJld2luZ0NvbXBhbnkvXCIsXCJ0d2l0dGVyXCI6XCJodHRwczovL3R3aXR0ZXIuY29tL0dpbG1hbl9CcmV3aW5nXCIsXCJpbnN0YWdyYW1cIjpcImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vZ2lsbWFuYnJld2luZy9cIn19fTsiLCJJbmRleCA9XG4gIG9wdGlvbnM6IHt9XG4gIGxvYWRlZDogZmFsc2VcbiAgY2FjaGU6XG4gICAgd2luZG93OiBmYWxzZVxuICAgIHN0aWNraWVkOiBmYWxzZVxuICBpOiAtPlxuXG4gICAgQmFzYWwuaSBjb25maWcuYmFzYWwuY2xpZW50LCAtPlxuICAgICAgSW5kZXgubG9hZGVkID0gdHJ1ZVxuICAgICAgSW5kZXguc2xpY2soKVxuXG4gICAgQGNhY2hlLndpbmRvdyA9ICQod2luZG93KVxuICAgIFxuICAgIEBoYW5kbGVycygpXG5cbiAgICBpZiBAY2FjaGUud2luZG93LndpZHRoKCkgPiAxMTkwXG4gICAgICBzZXRJbnRlcnZhbCBAc3RpY2t5LCA1MFxuXG4gIGhhbmRsZXJzOiAtPlxuICAgICQoJy50b3AgLmJ1cmdlcicpLmNsaWNrIEBidXJnZXJIYW5kbGVyXG4gICAgJCgnLml0ZW0sIGEuY3RhLCAuYW52aWwnKS5jbGljayBAbWVudUhhbmRsZXJcbiAgICAkKCcuZm9ybSAuY3RhJykuY2xpY2sgQG5ld3NsZXR0ZXJIYW5kbGVyXG5cbiAgICAkKHdpbmRvdykucmVzaXplIEluZGV4LnNsaWNrUmVsb2FkXG5cbiAgc2xpY2s6IC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5sb2FkZWQgaXMgZmFsc2VcblxuICAgIHdpZHRoID0gJChkb2N1bWVudCkud2lkdGgoKVxuICAgIGFtdCA9IE1hdGguZmxvb3Igd2lkdGggLyAzNTBcblxuICAgICQoJy5iZWVybGlzdCA+IC5pbm5lcicpLnNsaWNrXG4gICAgICBpbmZpbml0ZTogdHJ1ZVxuICAgICAgc2xpZGVzVG9TaG93OiBhbXRcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXG5cbiAgc2xpY2tSZWxvYWQ6IC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5sb2FkZWQgaXMgZmFsc2VcblxuICAgIHdpZHRoID0gJChkb2N1bWVudCkud2lkdGgoKVxuICAgIGFtdCA9IE1hdGguZmxvb3Igd2lkdGggLyAzNTBcbiAgICAkKCcuYmVlcmxpc3QgPiAuaW5uZXInKS5zbGljayAndW5zbGljaydcblxuICAgICQoJy5iZWVybGlzdCA+IC5pbm5lcicpLnNsaWNrXG4gICAgICBzZXRQb3NpdGlvbjogdHJ1ZVxuICAgICAgc2xpZGVzVG9TaG93OiBhbXRcblxuICBzdGlja3k6IC0+XG5cbiAgICBzdGlja3lTcG90ID0gMzAwXG5cbiAgICBpZiBJbmRleC5jYWNoZS53aW5kb3cuc2Nyb2xsVG9wKCkgPiBzdGlja3lTcG90IGFuZCBJbmRleC5jYWNoZS5zdGlja2llZCBpcyBmYWxzZVxuICAgICAgXy5vZmYgJy5pbmZvYmFyJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAkKCcuaW5mb2JhcicpLmFkZENsYXNzICdzdHVjaydcbiAgICAgICAgXy5vbiAnLmluZm9iYXInXG4gICAgICAsIDIwMFxuICAgICAgSW5kZXguY2FjaGUuc3RpY2tpZWQgPSB0cnVlXG5cbiAgICBpZiBJbmRleC5jYWNoZS53aW5kb3cuc2Nyb2xsVG9wKCkgPCBzdGlja3lTcG90IGFuZCBJbmRleC5jYWNoZS5zdGlja2llZCBpcyB0cnVlXG4gICAgICBfLm9mZiAnLmluZm9iYXInXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICQoJy5pbmZvYmFyJykucmVtb3ZlQ2xhc3MgJ3N0dWNrJ1xuICAgICAgICBfLm9uICcuaW5mb2JhcidcbiAgICAgICwgMjAwXG4gICAgICBJbmRleC5jYWNoZS5zdGlja2llZCA9IG9mZlxuXG4gIGJ1cmdlckhhbmRsZXI6IC0+XG4gICAgXy5zd2FwICcudG9wID4gLmJ1cmdlcidcbiAgICBfLnN3YXAgJy50b3AgPiAubWVudSdcblxuICBtZW51SGFuZGxlcjogLT5cbiAgICBfLm9mZiAnLnRvcCA+IC5tZW51J1xuICAgIF8ub24gJy50b3AgPiAuYnVyZ2VyJ1xuICAgIGl0ZW0gPSAkKHRoaXMpLmRhdGEgJ2l0ZW0nXG4gICAgJC5zY3JvbGxUbyAkKFwiLiN7aXRlbX1cIiksIDUwMFxuXG4gIG5ld3NsZXR0ZXJIYW5kbGVyOiAtPlxuICAgICQodGhpcykucGFyZW50KCkuc3VibWl0KClcbiIsImNsYXNzIFByZWxvYWRcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICAkKCcubG9hZGluZycpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgY2xhc3NlcyA9ICQoZWwpLmF0dHIoJ2NsYXNzJykuc3BsaXQgJyAnXG4gICAgICBmb3IgY2wgaW4gY2xhc3Nlc1xuICAgICAgICBpZiBjbCBpc250ICdsb2FkaW5nJ1xuICAgICAgICAgIGltYWdlID0gQHN0eWxpbihjbClcbiAgICAgICAgY29uc29sZS5sb2cgJ3VybDogJyArIGltYWdlXG5cbiAgc3R5bGluOiAoY2wpIC0+XG4gICAgY29uc29sZS5sb2cgY2xcbiAgICAkcCA9ICQoXCI8cD48L3A+XCIpLmhpZGUoKS5hZGRDbGFzcyhjbCkuYXBwZW5kVG8oJ2JvZHknKVxuICAgIHVybCA9ICRwLmNzcyAnYmFja2dyb3VuZC1pbWFnZSdcbiAgICAkcC5yZW1vdmUoKVxuICAgIHJldHVybiB1cmxcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
