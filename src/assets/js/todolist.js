(function($) {
  'use strict';
  $(function() {
    var todoListItem = $('.todo-list');
    var todoListInput = $('.todo-list-input');
    $('.todo-list-add-btn').on("click", function(event) {
      event.preventDefault();

      var item = $(this).prevAll('.todo-list-input').val();

      if (item) {
        
        
        
      todoListItem.append( "<span class='text-small' style='display:inline-block'><strong>@Chandana<span>&nbsp;</span></strong>" + item + "<div class='text-small text-muted' style='line-height:30px'>05 May 2018 05:51 AM" + "</span>"+ "<font style='float: right;margin-right: 4px;margin-top: 10px;'  class='text-small' color='#007bff'>Reply</font></div>");
      
        todoListInput.val("");
      }

    });



  });
})(jQuery);