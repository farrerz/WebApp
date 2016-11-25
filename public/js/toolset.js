var verifyInput = function(e, id){
  var item = $(id);
  if (item.val().length < 1){
      item.addClass("rw-invalid");
      e.preventDefault();
  }else{
      item.removeClass("rw-invalid");
  }
}
