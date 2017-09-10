var $window = jQuery(window);
jQuery(document).ready(function () {
  // Add body-small class if window less than 768px
  if (jQuery(this).width() < 769) {
    jQuery('body').addClass('body-small');
  } else {
    jQuery('body').removeClass('body-small');
  }


  // Collapse ibox function
  jQuery(document).on('click', '.collapse-link', function () {
    var ibox = jQuery(this).closest('div.ibox');
    var button = jQuery(this).find('i');
    var content = ibox.find('div.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
      ibox.resize();
      ibox.find('[id^=map-]').resize();
    }, 50);
  });

  // Minimalize menu
  jQuery(document).on('click', '.navbar-minimalize', function (e) {
    e.preventDefault();
    jQuery('body').toggleClass('mini-navbar');
    smoothlyMenu();
  });

  $window.scroll(function() {
    var $widgetAction = jQuery('.widget-action-bottom');
    if($window.scrollTop() + $window.height() === jQuery(document).height()) {
     if ($widgetAction) {
       $widgetAction.addClass('is-bottom');
     }
    } else {
     if ($widgetAction) {
       $widgetAction.removeClass('is-bottom');
     }
    }
    setPageWrapper();
  });
  setPageWrapper();
});

// Minimalize menu when screen is less than 768px
$window.bind('resize', function () {
  if (jQuery(this).width() < 769) {
    jQuery('body').addClass('body-small')
  } else {
    jQuery('body').removeClass('body-small')
  }
  setPageWrapper();
});

function setPageWrapper() {
  jQuery('#page-wrapper').css({'min-height': $window.height()});
  // var $widgetAction = jQuery('.widget-action-bottom');
  // if ($window.height() >= jQuery(document).height()) {
  //   if ($widgetAction) {
  //     $widgetAction.addClass('is-bottom');
  //   }
  // }
}

function smoothlyMenu() {
  if (!jQuery('body').hasClass('mini-navbar') || jQuery('body').hasClass('body-small')) {
    // Hide menu in order to smoothly turn on when maximize menu
    jQuery('#side-menu').hide();
    // For smoothly turn on menu
    setTimeout(
      function () {
        jQuery('#side-menu').fadeIn(400);
      }, 200);
  } else if (jQuery('body').hasClass('fixed-sidebar')) {
    jQuery('#side-menu').hide();
    setTimeout(
      function () {
        jQuery('#side-menu').fadeIn(400);
      }, 100);
  } else {
    // Remove all inline style from jquery fadeIn function to reset menu state
    jQuery('#side-menu').removeAttr('style');
  }
}
