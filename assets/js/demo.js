/**
 * demo.js
 * https://coidea.website
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, COIDEA
 * https://coidea.website
 */

  // masonry ====================
  var $grid = $('.grid').masonry({
    itemSelector: '.masonry__item'
  });
  $grid.imagesLoaded()
    .progress( function() {
      $grid.masonry();
    })
    .done( function() {
      $('.loader').addClass('is-loaded');
    });

  // smooth scroll ====================
  $(function(){
    
    var $window = $(window),
        scrollTime = 0.8,
        scrollDistance = 240;
      
    $window.on("mousewheel DOMMouseScroll touchmove", function(event){
      
      event.preventDefault();	  
      var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3,
          scrollTop = $window.scrollTop(),
          finalScroll = scrollTop - parseInt(delta*scrollDistance);
        
      TweenMax.to($window, scrollTime, {
        scrollTo : { y: finalScroll, autoKill:true },
        ease: Power4.easeOut,
        autoKill: true,
        overwrite: 5							
      });     
    });
  });

  // main timeline
  $(".masonry__item").each(function(index, element){
    var timeline = new TimelineMax();
    timeline.fromTo($(this), .35, { autoAlpha: 0.15 }, { autoAlpha: 1, ease:Power4.easeInOut })
            .set($(this), { className: "+=active" })
            .staggerTo('.masonry__item', .35, { scale: 0.85, opacity: 0.05, ease:Power4.easeInOut }, "-=.05", "-=.30")
            .to($(this), .35, { zIndex: 15, rotation: 15, scale: 1.35, ease: Back.easeOut.config(1.7) })
            .fromTo($(this).find('.background'), .35, { autoAlpha: 0, rotation: -15, scale: 1.5 }, { autoAlpha: 0.15, rotation: 0, scale: 1.75, ease:Power4.easeInOut }, "-=.35")
            .fromTo($(this).find('h2'), .35, { autoAlpha: 0.15, rotation: 0 }, { autoAlpha: 1, rotation: 0, ease:Power4.easeInOut }, "-=.35")
            .set($(this).find('.detail'), { className: "+=detail-active" })
            .fromTo($(this).find('.detail'), .35, { autoAlpha: 0, rotation: 0 }, { autoAlpha: 1, rotation: 0, ease:Power4.easeInOut }, "-=.35")
            .paused(true)
            .reversed(true);
    this.animation = timeline;
    // trigger
    $('.close-detail-view').on('click', function() {
      $(this).removeClass('active');
      timeline.reverse();
    });
  });

  $('.masonry__item').on('click', function() {
    if( $('.close-detail-view').hasClass('active') ) {
      $('.close-detail-view').removeClass('active');
    } else {
      $('.close-detail-view').addClass('active');
    }
    this.animation.reversed() ? this.animation.play() : this.animation.reverse();
  });

  // animation on scroll
  var controller = new ScrollMagic.Controller(),
      items = Array.prototype.slice.call(document.querySelectorAll(".masonry__item")),
      self = this;
      items.forEach(function(self) {
        var sceneTimelineIn = new TimelineMax(),
            sceneTimelineOut = new TimelineMax();
        sceneTimelineIn
          .fromTo(self, .35, {y: 120}, {y: 0}, self);
        sceneTimelineOut
          .fromTo(self, .35, {y: 0}, {y: -120}, self);

        var sceneIn = new ScrollMagic.Scene({
            triggerElement: self,
            triggerHook: "onEnter",
            duration: $(window).height() / 2,
            offset: -60
        })
        .setTween(sceneTimelineIn)
        .setClassToggle(self, "centered")
        .addTo(controller);
        
        var sceneOut = new ScrollMagic.Scene({
            triggerElement: self,
            triggerHook: "onLeave",
            duration: $(window).height() / 2,
            offset: 60
        })
        .setTween(sceneTimelineOut)
        .setClassToggle(self, "centered")
        .addTo(controller);
  });

  // hover on active
  $('.masonry__item').each(function(i, el) {
    
    var hoverTimeline = new TimelineMax({
      paused: true
    });

    hoverTimeline.fromTo($(this).find('.circle2 > span'), .35, { x: 0 }, { x: 100, ease:Power4.easeInOut })
                  .fromTo($(this).find('.circle1'), .35, { x: 0 }, { x: 24, ease:Power4.easeInOut }, "-=.20");
    
    
    $(document).on("mouseenter", ".detail-active", function() {
      hoverTimeline.play();
    });

    $(document).on("mouseleave", ".detail-active", function() {
      hoverTimeline.reverse();
    });

  });

  // fast fix for resize window and refresh view, attention: not use in production!
  (function () {
    var width = window.innerWidth;

    window.addEventListener('resize', function () {
       if (window.innerWidth !== width) {
           window.location.reload(true);
       }
    });
  })();
