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
  cache: {
    window: false,
    stickied: false
  },
  i: function() {
    var amt, width;
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
  },
  events: function(result) {
    var date, event, i, len, ref, results, template;
    ref = result.data;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      event = ref[i];
      template = $('.eventlist > #template').clone();
      date = moment(event.entities[2].value, "MM/DD/YYYY");
      template.find('.date > .month').html(date.format("MMM"));
      template.find('.date > .day').html(date.format("DD"));
      template.find('.title').html(event.name);
      template.find('.description').html(event.entities[0].value);
      template.find('.image').css('background-image', "url(" + event.entities[1].value + ")");
      results.push($('.eventlist').append(template.html()));
    }
    return results;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjI1Ni5jb2ZmZWUiLCJjb25maWcuY29mZmVlIiwiaW5kZXguY29mZmVlIiwicHJlbG9hZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxDQUFBLEdBRUU7RUFBQSxDQUFBLEVBQUcsU0FBQTtXQUNELElBQUMsQ0FBQSxPQUFELEdBQVcsV0FBQSxDQUFZLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFhLElBQWIsQ0FBWixFQUE2QixHQUE3QjtFQURWLENBQUg7RUFHQSxDQUFBLEVBQ0U7SUFBQSxNQUFBLEVBQVEsS0FBUjtJQUNBLE9BQUEsRUFBUyxDQURUO0dBSkY7RUFPQSxJQUFBLEVBQU0sU0FBQyxFQUFELEVBQUssTUFBTCxFQUFtQixHQUFuQjs7TUFBSyxTQUFPOzs7TUFBTyxNQUFJOztJQUUzQixJQUFHLENBQUEsQ0FBQSxFQUFBLFlBQWtCLE1BQWxCLENBQUg7TUFDRSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUYsRUFEUDs7SUFHQSxJQUFHLE1BQUEsS0FBWSxLQUFmO01BQ0UsRUFBRSxDQUFDLFdBQUgsQ0FBZSxNQUFmLEVBREY7O0lBR0EsSUFBRyxHQUFBLEtBQVMsS0FBWjtNQUNFLEVBQUUsQ0FBQyxRQUFILENBQVksR0FBWixFQURGOztBQUdBLFdBQU87RUFYSCxDQVBOO0VBb0JBLEdBQUEsRUFBSyxTQUFDLEVBQUQsRUFBSyxDQUFMOztNQUFLLElBQUU7O0lBRVYsSUFBRyxDQUFDLENBQUMsTUFBRixJQUFhLENBQUMsQ0FBQyxPQUFGLEdBQVksQ0FBNUI7TUFFRSxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxLQUFWLEVBQWlCLFFBQWpCO01BQ0EsVUFBQSxDQUFXLFNBQUE7UUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLEVBQU4sRUFBVSxRQUFWLEVBQW9CLEtBQXBCO2VBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxFQUFOLEVBQVUsSUFBVixFQUFnQixLQUFoQjtNQUZTLENBQVgsRUFHRSxD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LEtBQUssQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsS0FBekIsR0FBK0IsR0FBL0U7bUJBQ0EsQ0FBQSxDQUFFLFlBQUYsQ0FBZSxDQUFDLE1BQWhCLENBQXVCLFFBQVEsQ0FBQyxJQUFULENBQUEsQ0FBdkI7QUFSRjs7RUFETSxDQTdEUjs7O0FDREYsSUFBQTs7QUFBTTtFQUVTLGlCQUFBO0lBQ1gsQ0FBQSxDQUFFLFVBQUYsQ0FBYSxDQUFDLElBQWQsQ0FBbUIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLENBQUQsRUFBSSxFQUFKO0FBQ2pCLFlBQUE7UUFBQSxPQUFBLEdBQVUsQ0FBQSxDQUFFLEVBQUYsQ0FBSyxDQUFDLElBQU4sQ0FBVyxPQUFYLENBQW1CLENBQUMsS0FBcEIsQ0FBMEIsR0FBMUI7QUFDVjthQUFBLHlDQUFBOztVQUNFLElBQUcsRUFBQSxLQUFRLFNBQVg7WUFDRSxLQUFBLEdBQVEsS0FBQyxDQUFBLE1BQUQsQ0FBUSxFQUFSLEVBRFY7O3VCQUVBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBQSxHQUFVLEtBQXRCO0FBSEY7O01BRmlCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQjtFQURXOztvQkFRYixNQUFBLEdBQVEsU0FBQyxFQUFEO0FBQ04sUUFBQTtJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksRUFBWjtJQUNBLEVBQUEsR0FBSyxDQUFBLENBQUUsU0FBRixDQUFZLENBQUMsSUFBYixDQUFBLENBQW1CLENBQUMsUUFBcEIsQ0FBNkIsRUFBN0IsQ0FBZ0MsQ0FBQyxRQUFqQyxDQUEwQyxNQUExQztJQUNMLEdBQUEsR0FBTSxFQUFFLENBQUMsR0FBSCxDQUFPLGtCQUFQO0lBQ04sRUFBRSxDQUFDLE1BQUgsQ0FBQTtBQUNBLFdBQU87RUFMRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJfID1cblxuICBpOiAtPlxuICAgIEBjb25zb2xlID0gc2V0SW50ZXJ2YWwoQGRldGVjdC5iaW5kKEApLCAyMDApXG5cbiAgcDpcbiAgICBvZmZpbmc6IGZhbHNlXG4gICAgb2ZmdGltZTogMFxuXG4gIHR1cm46IChlbCwgcmVtb3ZlPWZhbHNlLCBhZGQ9ZmFsc2UpIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIHJlbW92ZSBpc250IGZhbHNlXG4gICAgICBlbC5yZW1vdmVDbGFzcyhyZW1vdmUpXG5cbiAgICBpZiBhZGQgaXNudCBmYWxzZVxuICAgICAgZWwuYWRkQ2xhc3MoYWRkKVxuXG4gICAgcmV0dXJuIHRydWVcblxuICBvZmY6IChlbCwgcD17fSkgLT5cblxuICAgIGlmIHAub2ZmaW5nIGFuZCBwLm9mZnRpbWUgPiAwXG5cbiAgICAgIEB0dXJuIGVsLCBmYWxzZSwgJ29mZmluZydcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgQHR1cm4gZWwsICdvZmZpbmcnLCBmYWxzZVxuICAgICAgICBAdHVybiBlbCwgJ29uJywgJ29mZidcbiAgICAgICwgcC5vZmZ0aW1lKjEwMDAgKyAxMDBcblxuICAgIGVsc2VcbiAgICAgIEB0dXJuIGVsLCAnb24nLCAnb2ZmJ1xuXG4gICAgcmV0dXJuXG5cbiAgb246IChlbCwgcCkgLT5cbiAgICBAdHVybiBlbCwgJ29mZicsICdvbidcblxuICBzd2FwOiAoZWwsIHApIC0+XG5cbiAgICBpZiBlbCBub3QgaW5zdGFuY2VvZiBqUXVlcnlcbiAgICAgIGVsID0gJChlbClcblxuICAgIGlmIGVsLmhhc0NsYXNzICdvZmYnXG4gICAgICBAb24gZWwsIHBcbiAgICBlbHNlXG4gICAgICBAb2ZmIGVsLCBwXG5cbiAgICByZXR1cm5cblxuICBlbmNvZGU6IChzdHIpIC0+XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gICAgICAucmVwbGFjZSgvIS9nLCAnJTIxJylcbiAgICAgIC5yZXBsYWNlKC8nL2csICclMjcnKVxuICAgICAgLnJlcGxhY2UoL1xcKC9nLCAnJTI4JylcbiAgICAgIC5yZXBsYWNlKC9cXCkvZywgJyUyOScpXG4gICAgICAucmVwbGFjZSgvXFwqL2csICclMkEnKVxuICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXG5cbiAgdDogKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkgLT5cbiAgICBfZ2FxLnB1c2ggWydfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZV1cblxuICByYW5kOiAobWluLCBtYXgpIC0+XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgKyBtaW5cblxuICBsbGM6IC0+XG4gICAgYXNjaWkgPSBcIlwiXCJcblxuICAgICAgJWNtbW0vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi9tbW1cbiAgICAgIG1tby4uLi4uLi4uLi4uLi4uLi4tOjovLzo6LS4uLi4uLi4tOjo6Ojo6Ojo6Ojo6Oi0uLi4uLi4uLi06Oi8vLzotLm9tbVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLjoreWhkZGRkZGRoeSstLi4uLi9kZGRkZGRkZGRkZGRkKy4uLi4uLi9zaGRkZGRkZGR5b2RtXG4gICAgICBtby4uLi4uLi4uLi4uLi4taG1tbWh5eXl5ZG1tbWg6Li4uL21tbW1oaGhoaGhoaGgrLi4uLjp5ZG1tZGh5eXloZGRvb21cbiAgICAgIG0tLi4uLi4uLi4uLi4uLi4tc3M6LS4uLi4teW1tbXkuLi4vbW1tbS0tLS0tLS0tLS4uLi46ZG1tbXM6LS4uLi06Ly4tbVxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi55bW1teS4uLi9tbW1tLS8rb29vKzotLi4uLnltbW15LTorb29vKy8tLi5kXG4gICAgICBoLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi46c21tbWQ6Li4uL21tbW1obW1tbW1tZGgrLi4uZG1tbXNoZG1tbW1tbWhzLWhcbiAgICAgIGguLi4uLi4uLi4uLi4uLi4uLi4uLi46c2RtbWR5Oi4uLi46aGhkaG8rLy8reW1tbW0rLi5kbW1tZHlvLy8rc2RtbW1oaFxuICAgICAgZC4uLi4uLi4uLi4uLi4uLi4uLi0reWRtbWR5Ly4uLi4uLi4tLTouLi4uLi4uc21tbWguLnltbW1zLi4uLi4uOm1tbW1tXG4gICAgICBtLS4uLi4uLi4uLi4uLi4uLTpzaG1tbWRzLy0tLS0tLi4uLjpzLy0tLi4uLTpobW1tcy4uOmRtbWQvLS4uLi1vbW1tbW1cbiAgICAgIG1vLi4uLi4uLi4uLi4uLi5obW1tbW1taGhoaGhoaGguLi4rZG1tZGh5eXloZG1tbXktLi4uL2htbW1oeXl5aG1tbWRobVxuICAgICAgbWQtLi4uLi4uLi4uLi4uLmRkZGRkZGRkZGRkZGRkZC4uLi0rc2hkZGRkZGRkaHkvLS4uLi4uLW95ZGRkZGRkZGhvOmRtXG4gICAgICBtbW8uLi4uLi4uLi4uLi4uOjo6Ojo6Ojo6Ojo6Ojo6Li4uLi4uLi06Ly8vOjotLi4uLi4uLi4uLi4tOi8vLzotLi5vbW1cbiAgICAgIG1tbS8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uL21tbVxuXG4gICAgICA6OiBzeW50YWN0aWMgc3VnYXIgYnkgMjU2XG4gICAgICA6OiBodHRwOi8vMjU2LmlvL1xuICAgICAgOjogI3tjb25maWcubWV0YS5yZXBvfVxuICAgIFwiXCJcIlxuICAgIGNvbnNvbGUubG9nIGFzY2lpLCBcImNvbG9yOiBncmV5OyBmb250LWZhbWlseTogTWVubG8sIG1vbm9zcGFjZTtcIlxuXG4gIGRldGVjdDogLT5cbiAgICBpZiAoKCh3aW5kb3cub3V0ZXJIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQpID4gMTAwKSB8fCAoKHdpbmRvdy5vdXRlcldpZHRoIC0gd2luZG93LmlubmVyV2lkdGgpID4gMTAwKSlcbiAgICAgIEBsbGMoKVxuICAgICAgY2xlYXJJbnRlcnZhbCBAY29uc29sZVxuXG5fLmkoKVxuIiwiY29uZmlnID0ge1wiYmVlcnNcIjpbe1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciAxXCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciAyXCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciAzXCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciA0XCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciA1XCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciA2XCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn0se1wiaW1hZ2VcIjpcImJlZXIuanBnXCIsXCJuYW1lXCI6XCJHaWxtYW4gUGlsc25lciA3XCIsXCJpbmZvXCI6XCJBQlY6IDQuNSUgLSBJQlVTOiAxNlwiLFwiZGVzY3JpcHRpb25cIjpcIkEgc2hvcnQgZGVzY3JpcHRpb24gZ29lcyBoZXJlLCBsb3JlbSBpcHN1bSBzaXQgYW1ldCBsb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCBsb3JlbS5cIn1dLFwiY29sb3JcIjp7XCJ3aGl0ZTFcIjpcIiNmZmZmZmZcIixcImJsYWNrMVwiOlwiIzAwMDAwMFwiLFwiZ29sZGxpZ2h0XCI6XCIjZGFhMDJjXCIsXCJnb2xkZGFya1wiOlwiI2MwODAwMFwiLFwiZ3JleTkwXCI6XCIjMWExYTFiXCIsXCJncmV5ODBcIjpcIiMzMzMzMzBcIixcImdyZXk3MFwiOlwiIzUwNTA0ZFwiLFwiZ3JleTUwXCI6XCIjODA4MDdkXCIsXCJncmV5MzBcIjpcIiNiM2IzYjBcIixcImdyZXkxNVwiOlwiI2Q5ZDlkNFwifSxcImZvbnRcIjp7XCJoMVwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC13ZWlnaHRcIjpcIjcwMFwiLFwiZm9udC1zaXplXCI6XCI2MHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiNzBweFwiLFwibGV0dGVyLXNwYWNpbmdcIjpcIjRweFwifSxcImgyLWxpZ2h0XCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjMycHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzOHB4XCJ9LFwiaDJcIjp7XCJmb250LWZhbWlseVwiOlwiS2FybGFcIixcImZvbnQtd2VpZ2h0XCI6XCI3MDBcIixcImZvbnQtc2l6ZVwiOlwiMzJweFwiLFwibGluZS1oZWlnaHRcIjpcIjM4cHhcIn0sXCJoMy1saWdodFwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIyNHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMzBweFwifSxcImgzXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXdlaWdodFwiOlwiNzAwXCIsXCJmb250LXNpemVcIjpcIjI0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIzMHB4XCJ9LFwiaDRcIjp7XCJmb250LWZhbWlseVwiOlwiQ3V0aXZlXCIsXCJmb250LXNpemVcIjpcIjE4cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyNHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiMnB4XCJ9LFwiaDVcIjp7XCJmb250LWZhbWlseVwiOlwiQ3V0aXZlXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyMHB4XCIsXCJsZXR0ZXItc3BhY2luZ1wiOlwiNHB4XCJ9LFwiYm9keVwiOntcImZvbnQtZmFtaWx5XCI6XCJLYXJsYVwiLFwiZm9udC1zaXplXCI6XCIxOHB4XCIsXCJsaW5lLWhlaWdodFwiOlwiMjRweFwifSxcInNtYWxsXCI6e1wiZm9udC1mYW1pbHlcIjpcIkthcmxhXCIsXCJmb250LXNpemVcIjpcIjE0cHhcIixcImxpbmUtaGVpZ2h0XCI6XCIyMHB4XCJ9fSxcIm1ldGFcIjp7XCJ1cmxcIjpcImh0dHA6Ly9naWxtYW5icmV3aW5nLmNvbS9cIixcInRpdGxlXCI6XCJ0aXRsZSBwbGFjZWhvbGRlclwiLFwiZGVzY3JpcHRpb25cIjpcImRlc2NyaXB0aW9uIHBsYWNlaG9sZGVyXCIsXCJrZXl3b3Jkc1wiOlwia2V5d29yZHNcIixcInRyYWNraW5nSURcIjpcIlVBLTc3NzE0Mzg5LTFcIixcInNoYXJlXCI6XCJpbWcvc2hhcmUuanBnXCIsXCJyZXBvXCI6XCJodHRwczovL2dpdGh1Yi5jb20vYWNpZGphenovZ2lsbWFuXCIsXCJhZGRyZXNzXCI6e1wibWFwXCI6XCJodHRwczovL2dvby5nbC9tYXBzL0UzNThUUDQ4VzRHMlwiLFwic3RyZWV0XCI6XCI5MTIgR2lsbWFuIFN0XCIsXCJjaXR5XCI6XCJCZXJrZWxleVwiLFwic3RhdGVcIjpcIkNBXCIsXCJ6aXBcIjo5MzcxMCxcImNvdW50cnlcIjpcIlVTXCIsXCJwaG9uZVwiOlwiKDUxMCkgNTU2LTg3MDFcIn0sXCJlbWFpbFwiOlwiaW5mb0BnaWxtYW5icmV3aW5nLmNvbVwiLFwic29jaWFsXCI6e1wiZmFjZWJvb2tcIjpcImh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9BbnZpbEJyZXdpbmdDb21wYW55L1wiLFwidHdpdHRlclwiOlwiaHR0cHM6Ly90d2l0dGVyLmNvbS9HaWxtYW5fQnJld2luZ1wiLFwiaW5zdGFncmFtXCI6XCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL2dpbG1hbmJyZXdpbmcvXCJ9fX07IiwiSW5kZXggPVxuICBvcHRpb25zOiB7fVxuICBjYWNoZTpcbiAgICB3aW5kb3c6IGZhbHNlXG4gICAgc3RpY2tpZWQ6IGZhbHNlXG4gIGk6IC0+XG5cbiAgICBAY2FjaGUud2luZG93ID0gJCh3aW5kb3cpXG4gICAgXG4gICAgQGhhbmRsZXJzKClcblxuICAgIHdpZHRoID0gJChkb2N1bWVudCkud2lkdGgoKVxuXG4gICAgYW10ID0gTWF0aC5mbG9vciB3aWR0aCAvIDM1MFxuXG4gICAgJCgnLmJlZXJsaXN0ID4gLmlubmVyJykuc2xpY2tcbiAgICAgIGluZmluaXRlOiB0cnVlXG4gICAgICBzbGlkZXNUb1Nob3c6IGFtdFxuICAgICAgc2xpZGVzVG9TY3JvbGw6IDFcblxuICAgIGlmIEBjYWNoZS53aW5kb3cud2lkdGgoKSA+IDEwMDBcbiAgICAgIHNldEludGVydmFsIEBzdGlja3ksIDUwXG5cbiAgaGFuZGxlcnM6IC0+XG4gICAgJCgnLnRvcCAuYnVyZ2VyJykuY2xpY2sgQGJ1cmdlckhhbmRsZXJcbiAgICAkKCcuaXRlbSwgYS5jdGEsIC5hbnZpbCcpLmNsaWNrIEBtZW51SGFuZGxlclxuICAgICQoJy5mb3JtIC5jdGEnKS5jbGljayBAbmV3c2xldHRlckhhbmRsZXJcblxuXG4gIHN0aWNreTogLT5cblxuICAgIHN0aWNreVNwb3QgPSAzMDBcblxuICAgIGlmIEluZGV4LmNhY2hlLndpbmRvdy5zY3JvbGxUb3AoKSA+IHN0aWNreVNwb3QgYW5kIEluZGV4LmNhY2hlLnN0aWNraWVkIGlzIGZhbHNlXG4gICAgICBfLm9mZiAnLmluZm9iYXInXG4gICAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAgICQoJy5pbmZvYmFyJykuYWRkQ2xhc3MgJ3N0dWNrJ1xuICAgICAgICBfLm9uICcuaW5mb2JhcidcbiAgICAgICwgMjAwXG4gICAgICBJbmRleC5jYWNoZS5zdGlja2llZCA9IHRydWVcblxuICAgIGlmIEluZGV4LmNhY2hlLndpbmRvdy5zY3JvbGxUb3AoKSA8IHN0aWNreVNwb3QgYW5kIEluZGV4LmNhY2hlLnN0aWNraWVkIGlzIHRydWVcbiAgICAgIF8ub2ZmICcuaW5mb2JhcidcbiAgICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICAgJCgnLmluZm9iYXInKS5yZW1vdmVDbGFzcyAnc3R1Y2snXG4gICAgICAgIF8ub24gJy5pbmZvYmFyJ1xuICAgICAgLCAyMDBcbiAgICAgIEluZGV4LmNhY2hlLnN0aWNraWVkID0gb2ZmXG5cbiAgYnVyZ2VySGFuZGxlcjogLT5cbiAgICBfLnN3YXAgJy50b3AgPiAuYnVyZ2VyJ1xuICAgIF8uc3dhcCAnLnRvcCA+IC5tZW51J1xuXG4gIG1lbnVIYW5kbGVyOiAtPlxuICAgIF8ub2ZmICcudG9wID4gLm1lbnUnXG4gICAgXy5vbiAnLnRvcCA+IC5idXJnZXInXG4gICAgaXRlbSA9ICQodGhpcykuZGF0YSAnaXRlbSdcbiAgICAkLnNjcm9sbFRvICQoXCIuI3tpdGVtfVwiKSwgNTAwXG5cbiAgbmV3c2xldHRlckhhbmRsZXI6IC0+XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5zdWJtaXQoKVxuXG4gIGV2ZW50czogKHJlc3VsdCkgLT5cbiAgICBmb3IgZXZlbnQgaW4gcmVzdWx0LmRhdGFcbiAgICAgIHRlbXBsYXRlID0gJCgnLmV2ZW50bGlzdCA+ICN0ZW1wbGF0ZScpLmNsb25lKClcbiAgICAgIGRhdGUgPSBtb21lbnQoZXZlbnQuZW50aXRpZXNbMl0udmFsdWUsIFwiTU0vREQvWVlZWVwiKVxuICAgICAgdGVtcGxhdGUuZmluZCgnLmRhdGUgPiAubW9udGgnKS5odG1sIGRhdGUuZm9ybWF0KFwiTU1NXCIpXG4gICAgICB0ZW1wbGF0ZS5maW5kKCcuZGF0ZSA+IC5kYXknKS5odG1sIGRhdGUuZm9ybWF0KFwiRERcIilcbiAgICAgIHRlbXBsYXRlLmZpbmQoJy50aXRsZScpLmh0bWwgZXZlbnQubmFtZVxuICAgICAgdGVtcGxhdGUuZmluZCgnLmRlc2NyaXB0aW9uJykuaHRtbCBldmVudC5lbnRpdGllc1swXS52YWx1ZVxuICAgICAgdGVtcGxhdGUuZmluZCgnLmltYWdlJykuY3NzICdiYWNrZ3JvdW5kLWltYWdlJywgXCJ1cmwoI3tldmVudC5lbnRpdGllc1sxXS52YWx1ZX0pXCJcbiAgICAgICQoJy5ldmVudGxpc3QnKS5hcHBlbmQgdGVtcGxhdGUuaHRtbCgpXG4iLCJjbGFzcyBQcmVsb2FkXG5cbiAgY29uc3RydWN0b3I6IC0+XG4gICAgJCgnLmxvYWRpbmcnKS5lYWNoIChpLCBlbCkgPT5cbiAgICAgIGNsYXNzZXMgPSAkKGVsKS5hdHRyKCdjbGFzcycpLnNwbGl0ICcgJ1xuICAgICAgZm9yIGNsIGluIGNsYXNzZXNcbiAgICAgICAgaWYgY2wgaXNudCAnbG9hZGluZydcbiAgICAgICAgICBpbWFnZSA9IEBzdHlsaW4oY2wpXG4gICAgICAgIGNvbnNvbGUubG9nICd1cmw6ICcgKyBpbWFnZVxuXG4gIHN0eWxpbjogKGNsKSAtPlxuICAgIGNvbnNvbGUubG9nIGNsXG4gICAgJHAgPSAkKFwiPHA+PC9wPlwiKS5oaWRlKCkuYWRkQ2xhc3MoY2wpLmFwcGVuZFRvKCdib2R5JylcbiAgICB1cmwgPSAkcC5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnXG4gICAgJHAucmVtb3ZlKClcbiAgICByZXR1cm4gdXJsXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
