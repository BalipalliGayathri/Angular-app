(function($) {
  'use strict';
  var iconTochange;

  dragula([document.getElementById("profile-list-left"), document.getElementById("profile-list-right"),
    document.getElementById("profile-list-left-one"), document.getElementById("profile-list-right-one")

  ])
  dragula([document.getElementById("profile-list-left-1"), document.getElementById("profile-list-right-1"),
    document.getElementById("profile-list-left-one-1"), document.getElementById("profile-list-right-one-1")

  ])
  dragula([document.getElementById("profile-list-left-2"), document.getElementById("profile-list-right-2"),
      document.getElementById("profile-list-left-one-2"), document.getElementById("profile-list-right-one-2")

    ])
    .on('drop', function(el) {
      console.log($(el));
      iconTochange = $(el).find('.mdi');
      if (iconTochange.hasClass('mdi-check')) {
        iconTochange.removeClass('mdi-check').addClass('mdi-check-all ');
      }
      else if (iconTochange.hasClass('mdi-check-all')) {
        iconTochange.removeClass('mdi-check-all').addClass('mdi-check ');
      }
    })


})(jQuery);
