String.prototype.rot13 = function(){
  return this.replace(/[a-zA-Z]/g, function(c){
    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
};

$(document).ready(function(){
  $(".cover").removeClass("invisible");

  /* Smooth scrolling */
  $('a[href^="#"]').bind('click.smoothscroll',function (e) {
      e.preventDefault();
      var target = this.hash,
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 400, 'swing', function () {
          window.location.hash = target;
      });
  });

  /* Highlighting active menu item */
  var aChildren = $("nav li").children();
    var aArray = [];
    for (var i=0; i < aChildren.length; i++) {
      var aChild = aChildren[i];
      var ahref = $(aChild).attr('href');
      aArray.push(ahref);
    }
    $(window).scroll(function(){
      var windowPos = $(window).scrollTop();
      var windowHeight = $(window).height();
      var docHeight = $(document).height();
      for (var i=0; i < aArray.length; i++) {
        var theID = aArray[i];
        var divPos = $(theID).offset().top;
        var divHeight = $(theID).height();
        if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
          $("a[href='" + theID + "']").addClass("nav_active");
        } else {
          $("a[href='" + theID + "']").removeClass("nav_active");
        }
      }
      if(windowPos + windowHeight == docHeight) {
        if (!$("nav li:last-child a").hasClass("nav_active")) {
          var navActiveCurrent = $(".nav_active").attr("href");
          $("a[href='" + navActiveCurrent + "']").removeClass("nav_active");
          $("nav li:last-child a").addClass("nav_active");
        }
      }
  });

  /* Parallax scrolling */
  var $window = $(window);
  $('section[data-type="background"]').each(function(){
      var $bgobj = $(this);

      $(window).scroll(function() {
          var yPos = -($window.scrollTop() / $bgobj.data('speed') - 250);
          var coords = '50% '+ yPos + 'px';
          $bgobj.css({ backgroundPosition: coords });
      });
  });

  var body = document.body,
      timer;

  window.addEventListener('scroll', function() {
    clearTimeout(timer);
    if(!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover')
    }

    timer = setTimeout(function(){
      body.classList.remove('disable-hover')
    },500);
  }, false);

});
