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
  i: function(client) {
    this.client = client;
    return this.getStructures(function() {
      return $(".basal-each").each(function(i, el) {
        var entry, name, ref, results, structure, template, tpl;
        el = $(el);
        structure = el.attr("basal-structure");
        if (Basal.structures[structure] == null) {
          throw new Error("Basal: Structure not found \"" + structure + "\"");
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
      });
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
    Basal.i(config.basal.client);
    this.cache.window = $(window);
    this.handlers();
    width = $(document).width();
    amt = Math.floor(width / 350);
    $('.beerlist > .inner').slick({
      infinite: true,
      slidesToShow: amt,
      slidesToScroll: 1
    });
    if (this.cache.window.width() > 1000) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJiYXNhbC5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtN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QyxDQUFELEVBQUksRUFBSjtBQUNqQixZQUFBO1FBQUEsT0FBQSxHQUFVLENBQUEsQ0FBRSxFQUFGLENBQUssQ0FBQyxJQUFOLENBQVcsT0FBWCxDQUFtQixDQUFDLEtBQXBCLENBQTBCLEdBQTFCO0FBQ1Y7YUFBQSx5Q0FBQTs7VUFDRSxJQUFHLEVBQUEsS0FBUSxTQUFYO1lBQ0UsS0FBQSxHQUFRLEtBQUMsQ0FBQSxNQUFELENBQVEsRUFBUixFQURWOzt1QkFFQSxPQUFPLENBQUMsR0FBUixDQUFZLE9BQUEsR0FBVSxLQUF0QjtBQUhGOztNQUZpQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkI7RUFEVzs7b0JBUWIsTUFBQSxHQUFRLFNBQUMsRUFBRDtBQUNOLFFBQUE7SUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLEVBQVo7SUFDQSxFQUFBLEdBQUssQ0FBQSxDQUFFLFNBQUYsQ0FBWSxDQUFDLElBQWIsQ0FBQSxDQUFtQixDQUFDLFFBQXBCLENBQTZCLEVBQTdCLENBQWdDLENBQUMsUUFBakMsQ0FBMEMsTUFBMUM7SUFDTCxHQUFBLEdBQU0sRUFBRSxDQUFDLEdBQUgsQ0FBTyxrQkFBUDtJQUNOLEVBQUUsQ0FBQyxNQUFILENBQUE7QUFDQSxXQUFPO0VBTEQiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXyA9XG5cbiAgaTogLT5cbiAgICBAY29uc29sZSA9IHNldEludGVydmFsKEBkZXRlY3QuYmluZChAKSwgMjAwKVxuXG4gIHA6XG4gICAgb2ZmaW5nOiBmYWxzZVxuICAgIG9mZnRpbWU6IDBcblxuICB0dXJuOiAoZWwsIHJlbW92ZT1mYWxzZSwgYWRkPWZhbHNlKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiByZW1vdmUgaXNudCBmYWxzZVxuICAgICAgZWwucmVtb3ZlQ2xhc3MocmVtb3ZlKVxuXG4gICAgaWYgYWRkIGlzbnQgZmFsc2VcbiAgICAgIGVsLmFkZENsYXNzKGFkZClcblxuICAgIHJldHVybiB0cnVlXG5cbiAgb2ZmOiAoZWwsIHA9e30pIC0+XG5cbiAgICBpZiBwLm9mZmluZyBhbmQgcC5vZmZ0aW1lID4gMFxuXG4gICAgICBAdHVybiBlbCwgZmFsc2UsICdvZmZpbmcnXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgIEB0dXJuIGVsLCAnb2ZmaW5nJywgZmFsc2VcbiAgICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG4gICAgICAsIHAub2ZmdGltZSoxMDAwICsgMTAwXG5cbiAgICBlbHNlXG4gICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcblxuICAgIHJldHVyblxuXG4gIG9uOiAoZWwsIHApIC0+XG4gICAgQHR1cm4gZWwsICdvZmYnLCAnb24nXG5cbiAgc3dhcDogKGVsLCBwKSAtPlxuXG4gICAgaWYgZWwgbm90IGluc3RhbmNlb2YgalF1ZXJ5XG4gICAgICBlbCA9ICQoZWwpXG5cbiAgICBpZiBlbC5oYXNDbGFzcyAnb2ZmJ1xuICAgICAgQG9uIGVsLCBwXG4gICAgZWxzZVxuICAgICAgQG9mZiBlbCwgcFxuXG4gICAgcmV0dXJuXG5cbiAgZW5jb2RlOiAoc3RyKSAtPlxuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKVxuICAgICAgLnJlcGxhY2UoLyEvZywgJyUyMScpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJTI3JylcbiAgICAgIC5yZXBsYWNlKC9cXCgvZywgJyUyOCcpXG4gICAgICAucmVwbGFjZSgvXFwpL2csICclMjknKVxuICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnJTJBJylcbiAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxuXG4gIHQ6IChjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIC0+XG4gICAgX2dhcS5wdXNoIFsnX3RyYWNrRXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWVdXG5cbiAgcmFuZDogKG1pbiwgbWF4KSAtPlxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICsgbWluXG5cbiAgbGxjOiAtPlxuICAgIGFzY2lpID0gXCJcIlwiXG5cbiAgICAgICVjbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uLi4uLTo6Ly86Oi0uLi4uLi4uLTo6Ojo6Ojo6Ojo6OjotLi4uLi4uLi4tOjovLy86LS5vbW1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi46K3loZGRkZGRkaHkrLS4uLi4vZGRkZGRkZGRkZGRkZCsuLi4uLi4vc2hkZGRkZGRkeW9kbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLWhtbW1oeXl5eWRtbW1oOi4uLi9tbW1taGhoaGhoaGhoKy4uLi46eWRtbWRoeXl5aGRkb29tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLXNzOi0uLi4uLXltbW15Li4uL21tbW0tLS0tLS0tLS0uLi4uOmRtbW1zOi0uLi4tOi8uLW1cbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4ueW1tbXkuLi4vbW1tbS0vK29vbys6LS4uLi55bW1teS06K29vbysvLS4uZFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNtbW1kOi4uLi9tbW1taG1tbW1tbWRoKy4uLmRtbW1zaGRtbW1tbW1ocy1oXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uOnNkbW1keTouLi4uOmhoZGhvKy8vK3ltbW1tKy4uZG1tbWR5by8vK3NkbW1taGhcbiAgICAgIGQuLi4uLi4uLi4uLi4uLi4uLi4tK3lkbW1keS8uLi4uLi4uLS06Li4uLi4uLnNtbW1oLi55bW1tcy4uLi4uLjptbW1tbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi06c2htbW1kcy8tLS0tLS4uLi46cy8tLS4uLi06aG1tbXMuLjpkbW1kLy0uLi4tb21tbW1tXG4gICAgICBtby4uLi4uLi4uLi4uLi4uaG1tbW1tbWhoaGhoaGhoLi4uK2RtbWRoeXl5aGRtbW15LS4uLi9obW1taHl5eWhtbW1kaG1cbiAgICAgIG1kLS4uLi4uLi4uLi4uLi5kZGRkZGRkZGRkZGRkZGQuLi4tK3NoZGRkZGRkZGh5Ly0uLi4uLi1veWRkZGRkZGRobzpkbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLjo6Ojo6Ojo6Ojo6Ojo6Oi4uLi4uLi4tOi8vLzo6LS4uLi4uLi4uLi4uLTovLy86LS4ub21tXG4gICAgICBtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cblxuICAgICAgOjogc3ludGFjdGljIHN1Z2FyIGJ5IDI1NlxuICAgICAgOjogaHR0cDovLzI1Ni5pby9cbiAgICAgIDo6ICN7Y29uZmlnLm1ldGEucmVwb31cbiAgICBcIlwiXCJcbiAgICBjb25zb2xlLmxvZyBhc2NpaSwgXCJjb2xvcjogZ3JleTsgZm9udC1mYW1pbHk6IE1lbmxvLCBtb25vc3BhY2U7XCJcblxuICBkZXRlY3Q6IC0+XG4gICAgaWYgKCgod2luZG93Lm91dGVySGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0KSA+IDEwMCkgfHwgKCh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoKSA+IDEwMCkpXG4gICAgICBAbGxjKClcbiAgICAgIGNsZWFySW50ZXJ2YWwgQGNvbnNvbGVcblxuXy5pKClcbiIsIkJhc2FsID1cblxuICBkb21haW46ICdodHRwOi8vYmFzYWwudGVjaC9hcGknXG4gIGNsaWVudDogZmFsc2VcblxuICBkYXRhOiBmYWxzZVxuICBzdHJ1Y3R1cmVzOiBmYWxzZVxuXG4gIGk6IChjbGllbnQpIC0+XG5cbiAgICBAY2xpZW50ID0gY2xpZW50XG5cbiAgICBAZ2V0U3RydWN0dXJlcyAtPlxuXG4gICAgICAkKFwiLmJhc2FsLWVhY2hcIikuZWFjaCAoaSwgZWwpIC0+XG5cbiAgICAgICAgZWwgPSAkKGVsKVxuICAgICAgICBzdHJ1Y3R1cmUgPSBlbC5hdHRyKFwiYmFzYWwtc3RydWN0dXJlXCIpXG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yIFwiQmFzYWw6IFN0cnVjdHVyZSBub3QgZm91bmQgXFxcIiN7c3RydWN0dXJlfVxcXCJcIiBpZiAhQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdP1xuXG4gICAgICAgIHRlbXBsYXRlID0gZWwuY2hpbGRyZW4oKS5yZW1vdmUoKVxuXG4gICAgICAgIGZvciBvd24gbmFtZSwgZW50cnkgb2YgQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdLmVudHJpZXNcbiAgICAgICAgICB0cGwgPSB0ZW1wbGF0ZS5jbG9uZSgpXG4gICAgICAgICAgdHBsLmZpbmQoJyonKS5lYWNoIChjaSwgY2VsKSAtPlxuICAgICAgICAgICAgamNlbCA9ICQoY2VsKVxuICAgICAgICAgICAgbmFtZSA9IGpjZWwuYXR0cignYmFzYWwtbmFtZScpXG4gICAgICAgICAgICB0eXBlID0gamNlbC5hdHRyKCdiYXNhbC10eXBlJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlIGlmIG5hbWUgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICBpZiB0eXBlIGlzbnQgdW5kZWZpbmVkXG4gICAgICAgICAgICAgIHN3aXRjaCB0eXBlXG4gICAgICAgICAgICAgICAgd2hlbiAnY3NzLWJhY2tncm91bmQnXG4gICAgICAgICAgICAgICAgICBqY2VsLmNzcyAnYmFja2dyb3VuZC1pbWFnZScsIFwidXJsKCN7ZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWV9KVwiXG4gICAgICAgICAgICAgICAgd2hlbiAnZGF0ZSdcbiAgICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBtb21lbnQoZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWUsICdNTS9ERC9ZWVlZJykuZm9ybWF0IGpjZWwuYXR0cignYmFzYWwtZGF0ZWZvcm1hdCcpXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgaWYgbmFtZSBpcyAnc3RydWN0dXJlLW5hbWUnXG4gICAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5Lm5hbWVcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGpjZWwuaHRtbCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuICAgICAgICAgIGVsLmFwcGVuZCB0cGxcblxuICBnZXRTdHJ1Y3R1cmVzOiAoY29tcGxldGUpIC0+XG4gICAgQGpzb25wIFwic3RydWN0dXJlc1wiLCBjbGllbnQ6IEBjbGllbnQsIChyZXN1bHQpID0+XG4gICAgICBAc3RydWN0dXJlcyA9IHt9XG4gICAgICBmb3IgaSxzdHJ1Y3R1cmUgb2YgcmVzdWx0LmRhdGFcbiAgICAgICAgQHN0cnVjdHVyZXNbc3RydWN0dXJlLm5hbWVdID0gc3RydWN0dXJlXG4gICAgICBjb21wbGV0ZT8oKVxuXG4gIGpzb25wOiAoZW5kcG9pbnQsIHBhcmFtcywgY29tcGxldGUpIC0+XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSAnQmFzYWwuY2FsbGJhY2snXG5cbiAgICBzY3JpcHQgPSBcIiN7QGRvbWFpbn0vI3tlbmRwb2ludH0/XCIgKyAkLnBhcmFtIHBhcmFtc1xuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlPyhCYXNhbC5kYXRhKVxuICAgICAgQmFzYWwuZGF0YSA9IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChlbClcblxuICBjYWxsYmFjazogKGRhdGEpIC0+XG4gICAgQmFzYWwuZGF0YSA9IGRhdGFcbiIsImNvbmZpZyA9IHtcImJhc2FsXCI6e1wiY2xpZW50XCI6XCI1ODBhMmNkNDVhYTU5YjIxMzk2ZjFlMTNcIn0sXCJiZWVyc1wiOlt7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDFcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDJcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDNcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDRcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDVcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDZcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDdcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifV0sXCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJnb2xkbGlnaHRcIjpcIiNkYWEwMmNcIixcImdvbGRkYXJrXCI6XCIjYzA4MDAwXCIsXCJncmV5OTBcIjpcIiMxYTFhMWJcIixcImdyZXk4MFwiOlwiIzMzMzMzMFwiLFwiZ3JleTcwXCI6XCIjNTA1MDRkXCIsXCJncmV5NTBcIjpcIiM4MDgwN2RcIixcImdyZXkzMFwiOlwiI2IzYjNiMFwiLFwiZ3JleTE1XCI6XCIjZDlkOWQ0XCJ9LFwiZm9udFwiOntcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjYwcHhcIixcImxpbmUtaGVpZ2h0XCI6XCI3MHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiNHB4XCJ9LFwiaDItbGlnaHRcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMzJweFwiLFwibGluZS1oZWlnaHRcIjpcIjM4cHhcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCIzMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzhweFwifSxcImgzLWxpZ2h0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzMHB4XCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwibGluZS1oZWlnaHRcIjpcIjMwcHhcIn0sXCJoNFwiOntcImZvbnQtZmFtaWx5XCI6XCJDdXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIn0sXCJoNVwiOntcImZvbnQtZmFtaWx5XCI6XCJDdXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCI0cHhcIn0sXCJib2R5XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCJ9LFwic21hbGxcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIn19LFwibWV0YVwiOntcInVybFwiOlwiaHR0cDovL2dpbG1hbmJyZXdpbmcuY29tL1wiLFwidGl0bGVcIjpcIkdpbG1hbiBCcmV3aW5nIENvbXBhbnlcIixcImRlc2NyaXB0aW9uXCI6XCJHaWxtYW4gQnJld2luZyBDb21wYW55IGFuZCBUYXByb29tLCBib3JuIGFuZCBicmV3ZWQgaW4gQmVya2VsZXksIENhbGlmb3JuaWEuIEZvdW5kZWQgaW4gMjAxNiwgd2Ugc3BlY2lhbGl6ZSBpbiBjcmFmdCBiZWVycywgYWxlcywgc3RvdXRzIGFuZCBsYWdlcnMuIERyaW5rIHJlc3BvbnNpYmx5LlwiLFwia2V5d29yZHNcIjpcImJlZXIsIGFsZSwgY3JhZnQgYnJldywgc3RvdXRzLCBsYWdlcnMsIHNwaXJpdHMsIGJlcmtlbGV5LCBjYWxpZm9ybmlhLCBnaWxtYW4sIGJyZXdlcnksIHB1YiwgSUJVcywgdGFwcm9vbSwgYmF5IGFyZWFcIixcInRyYWNraW5nSURcIjpcIlVBLTc3NzE0Mzg5LTJcIixcInNoYXJlXCI6XCJpbWFnZXMvc2hhcmUuanBnXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovZ2lsbWFuXCIsXCJhZGRyZXNzXCI6e1wibWFwXCI6XCJodHRwczovL2dvby5nbC9tYXBzL0UzNThUUDQ4VzRHMlwiLFwic3RyZWV0XCI6XCI5MTIgR2lsbWFuIFN0XCIsXCJjaXR5XCI6XCJCZXJrZWxleVwiLFwic3RhdGVcIjpcIkNBXCIsXCJ6aXBcIjo5MzcxMCxcImNvdW50cnlcIjpcIlVTXCIsXCJwaG9uZVwiOlwiKDUxMCkgNTU2LTg3MDFcIn0sXCJlbWFpbFwiOlwiaW5mb0BnaWxtYW5icmV3aW5nLmNvbVwiLFwic29jaWFsXCI6e1wiZmFjZWJvb2tcIjpcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9BbnZpbEJyZXdpbmdDb21wYW55L1wiLFwidHdpdHRlclwiOlwiaHR0cHM6Ly90d2l0dGVyLmNvbS9HaWxtYW5fQnJld2luZ1wiLFwiaW5zdGFncmFtXCI6XCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2dpbG1hbmJyZXdpbmcvXCJ9fX07IiwiSW5kZXggPVxuICBvcHRpb25zOiB7fVxuICBjYWNoZTpcbiAgICB3aW5kb3c6IGZhbHNlXG4gICAgc3RpY2tpZWQ6IGZhbHNlXG4gIGk6IC0+XG5cbiAgICBCYXNhbC5pIGNvbmZpZy5iYXNhbC5jbGllbnRcblxuICAgIEBjYWNoZS53aW5kb3cgPSAkKHdpbmRvdylcbiAgICBcbiAgICBAaGFuZGxlcnMoKVxuXG4gICAgd2lkdGggPSAkKGRvY3VtZW50KS53aWR0aCgpXG5cbiAgICBhbXQgPSBNYXRoLmZsb29yIHdpZHRoIC8gMzUwXG5cbiAgICAkKCcuYmVlcmxpc3QgPiAuaW5uZXInKS5zbGlja1xuICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgIHNsaWRlc1RvU2hvdzogYW10XG4gICAgICBzbGlkZXNUb1Njcm9sbDogMVxuXG4gICAgaWYgQGNhY2hlLndpbmRvdy53aWR0aCgpID4gMTAwMFxuICAgICAgc2V0SW50ZXJ2YWwgQHN0aWNreSwgNTBcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAYnVyZ2VySGFuZGxlclxuICAgICQoJy5pdGVtLCBhLmN0YSwgLmFudmlsJykuY2xpY2sgQG1lbnVIYW5kbGVyXG4gICAgJCgnLmZvcm0gLmN0YScpLmNsaWNrIEBuZXdzbGV0dGVySGFuZGxlclxuXG5cbiAgc3RpY2t5OiAtPlxuXG4gICAgc3RpY2t5U3BvdCA9IDMwMFxuXG4gICAgaWYgSW5kZXguY2FjaGUud2luZG93LnNjcm9sbFRvcCgpID4gc3RpY2t5U3BvdCBhbmQgSW5kZXguY2FjaGUuc3RpY2tpZWQgaXMgZmFsc2VcbiAgICAgIF8ub2ZmICcuaW5mb2JhcidcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgJCgnLmluZm9iYXInKS5hZGRDbGFzcyAnc3R1Y2snXG4gICAgICAgIF8ub24gJy5pbmZvYmFyJ1xuICAgICAgLCAyMDBcbiAgICAgIEluZGV4LmNhY2hlLnN0aWNraWVkID0gdHJ1ZVxuXG4gICAgaWYgSW5kZXguY2FjaGUud2luZG93LnNjcm9sbFRvcCgpIDwgc3RpY2t5U3BvdCBhbmQgSW5kZXguY2FjaGUuc3RpY2tpZWQgaXMgdHJ1ZVxuICAgICAgXy5vZmYgJy5pbmZvYmFyJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICAkKCcuaW5mb2JhcicpLnJlbW92ZUNsYXNzICdzdHVjaydcbiAgICAgICAgXy5vbiAnLmluZm9iYXInXG4gICAgICAsIDIwMFxuICAgICAgSW5kZXguY2FjaGUuc3RpY2tpZWQgPSBvZmZcblxuICBidXJnZXJIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgXy5vZmYgJy50b3AgPiAubWVudSdcbiAgICBfLm9uICcudG9wID4gLmJ1cmdlcidcbiAgICBpdGVtID0gJCh0aGlzKS5kYXRhICdpdGVtJ1xuICAgICQuc2Nyb2xsVG8gJChcIi4je2l0ZW19XCIpLCA1MDBcblxuICBuZXdzbGV0dGVySGFuZGxlcjogLT5cbiAgICAkKHRoaXMpLnBhcmVudCgpLnN1Ym1pdCgpXG4iLCJjbGFzcyBQcmVsb2FkXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgJCgnLmxvYWRpbmcnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGNsYXNzZXMgPSAkKGVsKS5hdHRyKCdjbGFzcycpLnNwbGl0ICcgJ1xuICAgICAgZm9yIGNsIGluIGNsYXNzZXNcbiAgICAgICAgaWYgY2wgaXNudCAnbG9hZGluZydcbiAgICAgICAgICBpbWFnZSA9IEBzdHlsaW4oY2wpXG4gICAgICAgIGNvbnNvbGUubG9nICd1cmw6ICcgKyBpbWFnZVxuXG4gIHN0eWxpbjogKGNsKSAtPlxuICAgIGNvbnNvbGUubG9nIGNsXG4gICAgJHAgPSAkKFwiPHA+PC9wPlwiKS5oaWRlKCkuYWRkQ2xhc3MoY2wpLmFwcGVuZFRvKCdib2R5JylcbiAgICB1cmwgPSAkcC5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnXG4gICAgJHAucmVtb3ZlKClcbiAgICByZXR1cm4gdXJsXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
