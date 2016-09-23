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

var config;

config = {
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
    "title": "title placeholder",
    "description": "description placeholder",
    "keywords": "keywords",
    "trackingID": "UA-77714389-1",
    "share": "img/share.jpg",
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
  i: function() {
    var amt, width;
    this.handlers();
    width = $(document).width();
    amt = Math.floor(width / 350);
    return $('.beerlist > .inner').slick({
      infinite: true,
      slidesToShow: amt,
      slidesToScroll: 1
    });
  },
  handlers: function() {
    $('.top .burger').click(this.burgerHandler);
    $('.menu .item, a.cta').click(this.menuHandler);
    return $('.form .cta').click(this.newsletterHandler);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtNQUZTLENBQVgsRUFHRSxD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QUFILENBQU8sa0JBQVA7SUFDTixFQUFFLENBQUMsTUFBSCxDQUFBO0FBQ0EsV0FBTztFQUxEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIl8gPVxuXG4gIGk6IC0+XG4gICAgQGNvbnNvbGUgPSBzZXRJbnRlcnZhbChAZGV0ZWN0LmJpbmQoQCksIDIwMClcblxuICBwOlxuICAgIG9mZmluZzogZmFsc2VcbiAgICBvZmZ0aW1lOiAwXG5cbiAgdHVybjogKGVsLCByZW1vdmU9ZmFsc2UsIGFkZD1mYWxzZSkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgcmVtb3ZlIGlzbnQgZmFsc2VcbiAgICAgIGVsLnJlbW92ZUNsYXNzKHJlbW92ZSlcblxuICAgIGlmIGFkZCBpc250IGZhbHNlXG4gICAgICBlbC5hZGRDbGFzcyhhZGQpXG5cbiAgICByZXR1cm4gdHJ1ZVxuXG4gIG9mZjogKGVsLCBwPXt9KSAtPlxuXG4gICAgaWYgcC5vZmZpbmcgYW5kIHAub2ZmdGltZSA+IDBcblxuICAgICAgQHR1cm4gZWwsIGZhbHNlLCAnb2ZmaW5nJ1xuICAgICAgc2V0VGltZW91dCAtPlxuICAgICAgICBAdHVybiBlbCwgJ29mZmluZycsIGZhbHNlXG4gICAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuICAgICAgLCBwLm9mZnRpbWUqMTAwMCArIDEwMFxuXG4gICAgZWxzZVxuICAgICAgQHR1cm4gZWwsICdvbicsICdvZmYnXG5cbiAgICByZXR1cm5cblxuICBvbjogKGVsLCBwKSAtPlxuICAgIEB0dXJuIGVsLCAnb2ZmJywgJ29uJ1xuXG4gIHN3YXA6IChlbCwgcCkgLT5cblxuICAgIGlmIGVsIG5vdCBpbnN0YW5jZW9mIGpRdWVyeVxuICAgICAgZWwgPSAkKGVsKVxuXG4gICAgaWYgZWwuaGFzQ2xhc3MgJ29mZidcbiAgICAgIEBvbiBlbCwgcFxuICAgIGVsc2VcbiAgICAgIEBvZmYgZWwsIHBcblxuICAgIHJldHVyblxuXG4gIGVuY29kZTogKHN0cikgLT5cbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgICAgIC5yZXBsYWNlKC8hL2csICclMjEnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyUyNycpXG4gICAgICAucmVwbGFjZSgvXFwoL2csICclMjgnKVxuICAgICAgLnJlcGxhY2UoL1xcKS9nLCAnJTI5JylcbiAgICAgIC5yZXBsYWNlKC9cXCovZywgJyUyQScpXG4gICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcblxuICB0OiAoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSAtPlxuICAgIF9nYXEucHVzaCBbJ190cmFja0V2ZW50JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlXVxuXG4gIHJhbmQ6IChtaW4sIG1heCkgLT5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSArIG1pblxuXG4gIGxsYzogLT5cbiAgICBhc2NpaSA9IFwiXCJcIlxuXG4gICAgICAlY21tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuICAgICAgbW1vLi4uLi4uLi4uLi4uLi4uLi06Oi8vOjotLi4uLi4uLi06Ojo6Ojo6Ojo6Ojo6LS4uLi4uLi4uLTo6Ly8vOi0ub21tXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uOit5aGRkZGRkZGh5Ky0uLi4uL2RkZGRkZGRkZGRkZGQrLi4uLi4uL3NoZGRkZGRkZHlvZG1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi1obW1taHl5eXlkbW1taDouLi4vbW1tbWhoaGhoaGhoaCsuLi4uOnlkbW1kaHl5eWhkZG9vbVxuICAgICAgbS0uLi4uLi4uLi4uLi4uLi1zczotLi4uLi15bW1teS4uLi9tbW1tLS0tLS0tLS0tLi4uLjpkbW1tczotLi4uLTovLi1tXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLnltbW15Li4uL21tbW0tLytvb28rOi0uLi4ueW1tbXktOitvb28rLy0uLmRcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzbW1tZDouLi4vbW1tbWhtbW1tbW1kaCsuLi5kbW1tc2hkbW1tbW1taHMtaFxuICAgICAgaC4uLi4uLi4uLi4uLi4uLi4uLi4uLjpzZG1tZHk6Li4uLjpoaGRobysvLyt5bW1tbSsuLmRtbW1keW8vLytzZG1tbWhoXG4gICAgICBkLi4uLi4uLi4uLi4uLi4uLi4uLSt5ZG1tZHkvLi4uLi4uLi0tOi4uLi4uLi5zbW1taC4ueW1tbXMuLi4uLi46bW1tbW1cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tOnNobW1tZHMvLS0tLS0uLi4uOnMvLS0uLi4tOmhtbW1zLi46ZG1tZC8tLi4uLW9tbW1tbVxuICAgICAgbW8uLi4uLi4uLi4uLi4uLmhtbW1tbW1oaGhoaGhoaC4uLitkbW1kaHl5eWhkbW1teS0uLi4vaG1tbWh5eXlobW1tZGhtXG4gICAgICBtZC0uLi4uLi4uLi4uLi4uZGRkZGRkZGRkZGRkZGRkLi4uLStzaGRkZGRkZGRoeS8tLi4uLi4tb3lkZGRkZGRkaG86ZG1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi46Ojo6Ojo6Ojo6Ojo6OjouLi4uLi4uLTovLy86Oi0uLi4uLi4uLi4uLi06Ly8vOi0uLm9tbVxuICAgICAgbW1tLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4vbW1tXG5cbiAgICAgIDo6IHN5bnRhY3RpYyBzdWdhciBieSAyNTZcbiAgICAgIDo6IGh0dHA6Ly8yNTYuaW8vXG4gICAgICA6OiAje2NvbmZpZy5tZXRhLnJlcG99XG4gICAgXCJcIlwiXG4gICAgY29uc29sZS5sb2cgYXNjaWksIFwiY29sb3I6IGdyZXk7IGZvbnQtZmFtaWx5OiBNZW5sbywgbW9ub3NwYWNlO1wiXG5cbiAgZGV0ZWN0OiAtPlxuICAgIGlmICgoKHdpbmRvdy5vdXRlckhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCkgPiAxMDApIHx8ICgod2luZG93Lm91dGVyV2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgPiAxMDApKVxuICAgICAgQGxsYygpXG4gICAgICBjbGVhckludGVydmFsIEBjb25zb2xlXG5cbl8uaSgpXG4iLCJjb25maWcgPSB7XCJiZWVyc1wiOlt7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDFcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDJcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDNcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDRcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDVcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDZcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifSx7XCJpbWFnZVwiOlwiYmVlci5qcGdcIixcIm5hbWVcIjpcIkdpbG1hbiBQaWxzbmVyIDdcIixcImluZm9cIjpcIkFCVjogNC41JSAtIElCVVM6IDE2XCIsXCJkZXNjcmlwdGlvblwiOlwiQSBzaG9ydCBkZXNjcmlwdGlvbiBnb2VzIGhlcmUsIGxvcmVtIGlwc3VtIHNpdCBhbWV0IGxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IGxvcmVtLlwifV0sXCJjb2xvclwiOntcIndoaXRlMVwiOlwiI2ZmZmZmZlwiLFwiYmxhY2sxXCI6XCIjMDAwMDAwXCIsXCJnb2xkbGlnaHRcIjpcIiNkYWEwMmNcIixcImdvbGRkYXJrXCI6XCIjYzA4MDAwXCIsXCJncmV5OTBcIjpcIiMxYTFhMWJcIixcImdyZXk4MFwiOlwiIzMzMzMzMFwiLFwiZ3JleTcwXCI6XCIjNTA1MDRkXCIsXCJncmV5NTBcIjpcIiM4MDgwN2RcIixcImdyZXkzMFwiOlwiI2IzYjNiMFwiLFwiZ3JleTE1XCI6XCIjZDlkOWQ0XCJ9LFwiZm9udFwiOntcImgxXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjYwcHhcIixcImxpbmUtaGVpZ2h0XCI6XCI3MHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiNHB4XCJ9LFwiaDItbGlnaHRcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMzJweFwiLFwibGluZS1oZWlnaHRcIjpcIjM4cHhcIn0sXCJoMlwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCIzMnB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzhweFwifSxcImgzLWxpZ2h0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzMHB4XCJ9LFwiaDNcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiMjRweFwiLFwibGluZS1oZWlnaHRcIjpcIjMwcHhcIn0sXCJoNFwiOntcImZvbnQtZmFtaWx5XCI6XCJDdXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMThweFwiLFwibGluZS1oZWlnaHRcIjpcIjI0cHhcIixcImxldHRlci1zcGFjaW5nXCI6XCIycHhcIn0sXCJoNVwiOntcImZvbnQtZmFtaWx5XCI6XCJDdXRpdmVcIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIixcImxldHRlci1zcGFjaW5nXCI6XCI0cHhcIn0sXCJib2R5XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCJ9LFwic21hbGxcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtc2l6ZVwiOlwiMTRweFwiLFwibGluZS1oZWlnaHRcIjpcIjIwcHhcIn19LFwibWV0YVwiOntcInVybFwiOlwiaHR0cDovL2dpbG1hbmJyZXdpbmcuY29tL1wiLFwidGl0bGVcIjpcInRpdGxlIHBsYWNlaG9sZGVyXCIsXCJkZXNjcmlwdGlvblwiOlwiZGVzY3JpcHRpb24gcGxhY2Vob2xkZXJcIixcImtleXdvcmRzXCI6XCJrZXl3b3Jkc1wiLFwidHJhY2tpbmdJRFwiOlwiVUEtNzc3MTQzODktMVwiLFwic2hhcmVcIjpcImltZy9zaGFyZS5qcGdcIixcInJlcG9cIjpcImh0dHBzOi8vZ2l0aHViLmNvbS9hY2lkamF6ei9naWxtYW5cIixcImFkZHJlc3NcIjp7XCJtYXBcIjpcImh0dHBzOi8vZ29vLmdsL21hcHMvRTM1OFRQNDhXNEcyXCIsXCJzdHJlZXRcIjpcIjkxMiBHaWxtYW4gU3RcIixcImNpdHlcIjpcIkJlcmtlbGV5XCIsXCJzdGF0ZVwiOlwiQ0FcIixcInppcFwiOjkzNzEwLFwiY291bnRyeVwiOlwiVVNcIixcInBob25lXCI6XCIoNTEwKSA1NTYtODcwMVwifSxcImVtYWlsXCI6XCJpbmZvQGdpbG1hbmJyZXdpbmcuY29tXCIsXCJzb2NpYWxcIjp7XCJmYWNlYm9va1wiOlwiaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0FudmlsQnJld2luZ0NvbXBhbnkvXCIsXCJ0d2l0dGVyXCI6XCJodHRwczovL3R3aXR0ZXIuY29tL0dpbG1hbl9CcmV3aW5nXCIsXCJpbnN0YWdyYW1cIjpcImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vZ2lsbWFuYnJld2luZy9cIn19fTsiLCJJbmRleCA9XG4gIG9wdGlvbnM6IHt9XG4gIGk6IC0+XG4gICAgQGhhbmRsZXJzKClcblxuICAgIHdpZHRoID0gJChkb2N1bWVudCkud2lkdGgoKVxuXG4gICAgYW10ID0gTWF0aC5mbG9vciB3aWR0aCAvIDM1MFxuXG4gICAgJCgnLmJlZXJsaXN0ID4gLmlubmVyJykuc2xpY2tcbiAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICBzbGlkZXNUb1Nob3c6IGFtdFxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcblxuICBoYW5kbGVyczogLT5cbiAgICAkKCcudG9wIC5idXJnZXInKS5jbGljayBAYnVyZ2VySGFuZGxlclxuICAgICQoJy5tZW51IC5pdGVtLCBhLmN0YScpLmNsaWNrIEBtZW51SGFuZGxlclxuICAgICQoJy5mb3JtIC5jdGEnKS5jbGljayBAbmV3c2xldHRlckhhbmRsZXJcblxuICBidXJnZXJIYW5kbGVyOiAtPlxuICAgIF8uc3dhcCAnLnRvcCA+IC5idXJnZXInXG4gICAgXy5zd2FwICcudG9wID4gLm1lbnUnXG5cblxuICBtZW51SGFuZGxlcjogLT5cbiAgICBfLm9mZiAnLnRvcCA+IC5tZW51J1xuICAgIF8ub24gJy50b3AgPiAuYnVyZ2VyJ1xuICAgIGl0ZW0gPSAkKHRoaXMpLmRhdGEgJ2l0ZW0nXG4gICAgJC5zY3JvbGxUbyAkKFwiLiN7aXRlbX1cIiksIDUwMFxuXG4gIG5ld3NsZXR0ZXJIYW5kbGVyOiAtPlxuICAgICQodGhpcykucGFyZW50KCkuc3VibWl0KClcbiIsImNsYXNzIFByZWxvYWRcblxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICAkKCcubG9hZGluZycpLmVhY2ggKGksIGVsKSA9PlxuICAgICAgY2xhc3NlcyA9ICQoZWwpLmF0dHIoJ2NsYXNzJykuc3BsaXQgJyAnXG4gICAgICBmb3IgY2wgaW4gY2xhc3Nlc1xuICAgICAgICBpZiBjbCBpc250ICdsb2FkaW5nJ1xuICAgICAgICAgIGltYWdlID0gQHN0eWxpbihjbClcbiAgICAgICAgY29uc29sZS5sb2cgJ3VybDogJyArIGltYWdlXG5cbiAgc3R5bGluOiAoY2wpIC0+XG4gICAgY29uc29sZS5sb2cgY2xcbiAgICAkcCA9ICQoXCI8cD48L3A+XCIpLmhpZGUoKS5hZGRDbGFzcyhjbCkuYXBwZW5kVG8oJ2JvZHknKVxuICAgIHVybCA9ICRwLmNzcyAnYmFja2dyb3VuZC1pbWFnZSdcbiAgICAkcC5yZW1vdmUoKVxuICAgIHJldHVybiB1cmxcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
