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
          var jcel, type;
          jcel = $(cel);
          name = jcel.attr('basal-name');
          type = jcel.attr('basal-type');
          if (name === void 0) {
            return true;
          }
          if (type !== void 0) {
            switch (type) {
              case 'css-background':
                return jcel.css('background-image', "url(" + entry.entities[name].value + ")");
              case 'date':
                return jcel.html(moment(entry.entities[name].value, 'MM/DD/YYYY').format(jcel.attr('basal-dateformat')));
              case 'image':
                return jcel.attr('src', entry.entities[name].value);
            }
          } else {
            if (name === 'structure-name') {
              return jcel.html(entry.name);
            } else {
              return jcel.html(entry.entities[name].value);
            }
          }
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
  cache: {
    window: false,
    stickied: false
  },
  i: function() {
    var amt, width;
    Basal.i(config.basal.client, function() {
      return $('.beerlist > .inner').slick({
        infinite: true,
        slidesToShow: amt,
        slidesToScroll: 1
      });
    });
    this.cache.window = $(window);
    this.handlers();
    width = $(document).width();
    amt = Math.floor(width / 350);
    if (this.cache.window.width() > 1190) {
      return setInterval(this.sticky, 50);
    }
  },
  handlers: function() {
    $('.top .burger').click(this.burgerHandler);
    $('.item, a.cta, .anvil').click(this.menuHandler);
    return $('.form .cta').click(this.newsletterHandler);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJiYXNhbC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtN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QTFDO0lBQ0wsR0FBQSxHQUFNLEVBQUUsQ0FBQyxHQUFILENBQU8sa0JBQVA7SUFDTixFQUFFLENBQUMsTUFBSCxDQUFBO0FBQ0EsV0FBTztFQUxEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJCYXNhbCA9XG5cbiAgZG9tYWluOiAnaHR0cDovL2Jhc2FsLnRlY2gvYXBpJ1xuICBjbGllbnQ6IGZhbHNlXG5cbiAgZGF0YTogZmFsc2VcbiAgc3RydWN0dXJlczogZmFsc2VcblxuICBjb21wbGV0ZTogZmFsc2VcblxuICBpOiAoY2xpZW50LCBjb21wbGV0ZSkgLT5cblxuICAgIEBjb21wbGV0ZSA9IGNvbXBsZXRlXG5cbiAgICBAY2xpZW50ID0gY2xpZW50XG5cbiAgICBAZ2V0U3RydWN0dXJlcyA9PlxuICAgICAgQGVhY2goKVxuXG4gIGVhY2g6IC0+XG5cbiAgICAkKFwiLmJhc2FsLWVhY2hcIikuZWFjaCggKGksIGVsKSAtPlxuXG4gICAgICBlbCA9ICQoZWwpXG4gICAgICBzdHJ1Y3R1cmUgPSBlbC5hdHRyKFwiYmFzYWwtc3RydWN0dXJlXCIpXG5cbiAgICAgIEJhc2FsLmVycm9yKFwiU3RydWN0dXJlIG5vdCBmb3VuZCBcXFwiI3tzdHJ1Y3R1cmV9XFxcIlwiKSBpZiAhQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdP1xuXG4gICAgICB0ZW1wbGF0ZSA9IGVsLmNoaWxkcmVuKCkucmVtb3ZlKClcblxuICAgICAgZm9yIG93biBuYW1lLCBlbnRyeSBvZiBCYXNhbC5zdHJ1Y3R1cmVzW3N0cnVjdHVyZV0uZW50cmllc1xuICAgICAgICB0cGwgPSB0ZW1wbGF0ZS5jbG9uZSgpXG4gICAgICAgIHRwbC5maW5kKCcqJykuZWFjaCAoY2ksIGNlbCkgLT5cbiAgICAgICAgICBqY2VsID0gJChjZWwpXG4gICAgICAgICAgbmFtZSA9IGpjZWwuYXR0cignYmFzYWwtbmFtZScpXG4gICAgICAgICAgdHlwZSA9IGpjZWwuYXR0cignYmFzYWwtdHlwZScpXG4gICAgICAgICAgcmV0dXJuIHRydWUgaWYgbmFtZSBpcyB1bmRlZmluZWRcblxuICAgICAgICAgIGlmIHR5cGUgaXNudCB1bmRlZmluZWRcbiAgICAgICAgICAgIHN3aXRjaCB0eXBlXG4gICAgICAgICAgICAgIHdoZW4gJ2Nzcy1iYWNrZ3JvdW5kJ1xuICAgICAgICAgICAgICAgIGpjZWwuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZX0pXCJcbiAgICAgICAgICAgICAgd2hlbiAnZGF0ZSdcbiAgICAgICAgICAgICAgICBqY2VsLmh0bWwgbW9tZW50KGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlLCAnTU0vREQvWVlZWScpLmZvcm1hdCBqY2VsLmF0dHIoJ2Jhc2FsLWRhdGVmb3JtYXQnKVxuICAgICAgICAgICAgICB3aGVuICdpbWFnZSdcbiAgICAgICAgICAgICAgICBqY2VsLmF0dHIgJ3NyYycsIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG5cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiBuYW1lIGlzICdzdHJ1Y3R1cmUtbmFtZSdcbiAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5Lm5hbWVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG4gICAgICAgIGVsLmFwcGVuZCB0cGxcblxuICAgICAgKS5wcm9taXNlKCkuZG9uZSAtPlxuICAgICAgICBCYXNhbC5jb21wbGV0ZSgpXG5cblxuICBnZXRTdHJ1Y3R1cmVzOiAoY29tcGxldGUpIC0+XG4gICAgQGpzb25wIFwic3RydWN0dXJlc1wiLCBjbGllbnQ6IEBjbGllbnQsIChyZXN1bHQpID0+XG4gICAgICBAc3RydWN0dXJlcyA9IHt9XG4gICAgICBmb3IgaSxzdHJ1Y3R1cmUgb2YgcmVzdWx0LmRhdGFcbiAgICAgICAgQHN0cnVjdHVyZXNbc3RydWN0dXJlLm5hbWVdID0gc3RydWN0dXJlXG4gICAgICBjb21wbGV0ZT8oKVxuXG4gIGpzb25wOiAoZW5kcG9pbnQsIHBhcmFtcywgY29tcGxldGUpIC0+XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSAnQmFzYWwuY2FsbGJhY2snXG5cbiAgICBzY3JpcHQgPSBcIiN7QGRvbWFpbn0vI3tlbmRwb2ludH0/XCIgKyAkLnBhcmFtIHBhcmFtc1xuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlPyhCYXNhbC5kYXRhKVxuICAgICAgQmFzYWwuZGF0YSA9IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChlbClcblxuICBjYWxsYmFjazogKGRhdGEpIC0+XG4gICAgQmFzYWwuZGF0YSA9IGRhdGFcblxuICBlcnJvcjogKG1lc3NhZ2UpIC0+XG4gICAgdGhyb3cgbmV3IEVycm9yIFwiQmFzYWw6ICN7bWVzc2FnZX1cIlxuIiwiY29uZmlnID0ge1wiYmFzYWxcIjp7XCJjbGllbnRcIjpcIjU4MGEyY2Q0NWFhNTliMjEzOTZmMWUxM1wifSxcImJlZXJzXCI6W3tcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgMVwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgMlwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgM1wiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNFwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNVwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgNlwiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9LHtcImltYWdlXCI6XCJiZWVyLmpwZ1wiLFwibmFtZVwiOlwiR2lsbWFuIFBpbHNuZXIgN1wiLFwiaW5mb1wiOlwiQUJWOiA0LjUlIC0gSUJVUzogMTZcIixcImRlc2NyaXB0aW9uXCI6XCJBIHNob3J0IGRlc2NyaXB0aW9uIGdvZXMgaGVyZSwgbG9yZW0gaXBzdW0gc2l0IGFtZXQgbG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQgbG9yZW0uXCJ9XSxcImNvbG9yXCI6e1wid2hpdGUxXCI6XCIjZmZmZmZmXCIsXCJibGFjazFcIjpcIiMwMDAwMDBcIixcImdvbGRsaWdodFwiOlwiI2RhYTAyY1wiLFwiZ29sZGRhcmtcIjpcIiNjMDgwMDBcIixcImdyZXk5MFwiOlwiIzFhMWExYlwiLFwiZ3JleTgwXCI6XCIjMzMzMzMwXCIsXCJncmV5NzBcIjpcIiM1MDUwNGRcIixcImdyZXk1MFwiOlwiIzgwODA3ZFwiLFwiZ3JleTMwXCI6XCIjYjNiM2IwXCIsXCJncmV5MTVcIjpcIiNkOWQ5ZDRcIn0sXCJmb250XCI6e1wiaDFcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiNjBweFwiLFwibGluZS1oZWlnaHRcIjpcIjcwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCI0cHhcIn0sXCJoMi1saWdodFwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIzMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzhweFwifSxcImgyXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjMycHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzOHB4XCJ9LFwiaDMtbGlnaHRcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwibGluZS1oZWlnaHRcIjpcIjMwcHhcIn0sXCJoM1wiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzBweFwifSxcImg0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkN1dGl2ZVwiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjJweFwifSxcImg1XCI6e1wiZm9udC1mYW1pbHlcIjpcIkN1dGl2ZVwiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjBweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjRweFwifSxcImJvZHlcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIn0sXCJzbWFsbFwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIxNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjBweFwifX0sXCJtZXRhXCI6e1widXJsXCI6XCJodHRwOi8vZ2lsbWFuYnJld2luZy5jb20vXCIsXCJ0aXRsZVwiOlwiR2lsbWFuIEJyZXdpbmcgQ29tcGFueVwiLFwiZGVzY3JpcHRpb25cIjpcIkdpbG1hbiBCcmV3aW5nIENvbXBhbnkgYW5kIFRhcHJvb20sIGJvcm4gYW5kIGJyZXdlZCBpbiBCZXJrZWxleSwgQ2FsaWZvcm5pYS4gRm91bmRlZCBpbiAyMDE2LCB3ZSBzcGVjaWFsaXplIGluIGNyYWZ0IGJlZXJzLCBhbGVzLCBzdG91dHMgYW5kIGxhZ2Vycy4gRHJpbmsgcmVzcG9uc2libHkuXCIsXCJrZXl3b3Jkc1wiOlwiYmVlciwgYWxlLCBjcmFmdCBicmV3LCBzdG91dHMsIGxhZ2Vycywgc3Bpcml0cywgYmVya2VsZXksIGNhbGlmb3JuaWEsIGdpbG1hbiwgYnJld2VyeSwgcHViLCBJQlVzLCB0YXByb29tLCBiYXkgYXJlYVwiLFwidHJhY2tpbmdJRFwiOlwiVUEtNzc3MTQzODktMlwiLFwic2hhcmVcIjpcImltYWdlcy9zaGFyZS5qcGdcIixcInJlcG9cIjpcImh0dHBzOi8vZ2l0aHViLmNvbS9hY2lkamF6ei9naWxtYW5cIixcImFkZHJlc3NcIjp7XCJtYXBcIjpcImh0dHBzOi8vZ29vLmdsL21hcHMvRTM1OFRQNDhXNEcyXCIsXCJzdHJlZXRcIjpcIjkxMiBHaWxtYW4gU3RcIixcImNpdHlcIjpcIkJlcmtlbGV5XCIsXCJzdGF0ZVwiOlwiQ0FcIixcInppcFwiOjkzNzEwLFwiY291bnRyeVwiOlwiVVNcIixcInBob25lXCI6XCIoNTEwKSA1NTYtODcwMVwifSxcImVtYWlsXCI6XCJpbmZvQGdpbG1hbmJyZXdpbmcuY29tXCIsXCJzb2NpYWxcIjp7XCJmYWNlYm9va1wiOlwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0FudmlsQnJld2luZ0NvbXBhbnkvXCIsXCJ0d2l0dGVyXCI6XCJodHRwczovL3R3aXR0ZXIuY29tL0dpbG1hbl9CcmV3aW5nXCIsXCJpbnN0YWdyYW1cIjpcImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vZ2lsbWFuYnJld2luZy9cIn19fTsiLCJJbmRleCA9XG4gIG9wdGlvbnM6IHt9XG4gIGNhY2hlOlxuICAgIHdpbmRvdzogZmFsc2VcbiAgICBzdGlja2llZDogZmFsc2VcbiAgaTogLT5cblxuICAgIEJhc2FsLmkgY29uZmlnLmJhc2FsLmNsaWVudCwgLT5cbiAgICAgICQoJy5iZWVybGlzdCA+IC5pbm5lcicpLnNsaWNrXG4gICAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICAgIHNsaWRlc1RvU2hvdzogYW10XG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxXG5cbiAgICBAY2FjaGUud2luZG93ID0gJCh3aW5kb3cpXG4gICAgXG4gICAgQGhhbmRsZXJzKClcblxuICAgIHdpZHRoID0gJChkb2N1bWVudCkud2lkdGgoKVxuXG4gICAgYW10ID0gTWF0aC5mbG9vciB3aWR0aCAvIDM1MFxuXG4gICAgaWYgQGNhY2hlLndpbmRvdy53aWR0aCgpID4gMTE5MFxuICAgICAgc2V0SW50ZXJ2YWwgQHN0aWNreSwgNTBcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAYnVyZ2VySGFuZGxlclxuICAgICQoJy5pdGVtLCBhLmN0YSwgLmFudmlsJykuY2xpY2sgQG1lbnVIYW5kbGVyXG4gICAgJCgnLmZvcm0gLmN0YScpLmNsaWNrIEBuZXdzbGV0dGVySGFuZGxlclxuXG5cbiAgc3RpY2t5OiAtPlxuXG4gICAgc3RpY2t5U3BvdCA9IDMwMFxuXG4gICAgaWYgSW5kZXguY2FjaGUud2luZG93LnNjcm9sbFRvcCgpID4gc3RpY2t5U3BvdCBhbmQgSW5kZXguY2FjaGUuc3RpY2tpZWQgaXMgZmFsc2VcbiAgICAgIF8ub2ZmICcuaW5mb2JhcidcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgJCgnLmluZm9iYXInKS5hZGRDbGFzcyAnc3R1Y2snXG4gICAgICAgIF8ub24gJy5pbmZvYmFyJ1xuICAgICAgLCAyMDBcbiAgICAgIEluZGV4LmNhY2hlLnN0aWNraWVkID0gdHJ1ZVxuXG4gICAgaWYgSW5kZXguY2FjaGUud2luZG93LnNjcm9sbFRvcCgpIDwgc3RpY2t5U3BvdCBhbmQgSW5kZXguY2FjaGUuc3RpY2tpZWQgaXMgdHJ1ZVxuICAgICAgXy5vZmYgJy5pbmZvYmFyJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAkKCcuaW5mb2JhcicpLnJlbW92ZUNsYXNzICdzdHVjaydcbiAgICAgICAgXy5vbiAnLmluZm9iYXInXG4gICAgICAsIDIwMFxuICAgICAgSW5kZXguY2FjaGUuc3RpY2tpZWQgPSBvZmZcblxuICBidXJnZXJIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgXy5vZmYgJy50b3AgPiAubWVudSdcbiAgICBfLm9uICcudG9wID4gLmJ1cmdlcidcbiAgICBpdGVtID0gJCh0aGlzKS5kYXRhICdpdGVtJ1xuICAgICQuc2Nyb2xsVG8gJChcIi4je2l0ZW19XCIpLCA1MDBcblxuICBuZXdzbGV0dGVySGFuZGxlcjogLT5cbiAgICAkKHRoaXMpLnBhcmVudCgpLnN1Ym1pdCgpXG4iLCJjbGFzcyBQcmVsb2FkXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgJCgnLmxvYWRpbmcnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGNsYXNzZXMgPSAkKGVsKS5hdHRyKCdjbGFzcycpLnNwbGl0ICcgJ1xuICAgICAgZm9yIGNsIGluIGNsYXNzZXNcbiAgICAgICAgaWYgY2wgaXNudCAnbG9hZGluZydcbiAgICAgICAgICBpbWFnZSA9IEBzdHlsaW4oY2wpXG4gICAgICAgIGNvbnNvbGUubG9nICd1cmw6ICcgKyBpbWFnZVxuXG4gIHN0eWxpbjogKGNsKSAtPlxuICAgIGNvbnNvbGUubG9nIGNsXG4gICAgJHAgPSAkKFwiPHA+PC9wPlwiKS5oaWRlKCkuYWRkQ2xhc3MoY2wpLmFwcGVuZFRvKCdib2R5JylcbiAgICB1cmwgPSAkcC5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnXG4gICAgJHAucmVtb3ZlKClcbiAgICByZXR1cm4gdXJsXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
