$(function(){
  var $readMoreLink = $(".read-more");

  $readMoreLink.on("click", (notE) => {
    notE.preventDefault();
    $(this).parent().next("div").show();
    $(this).remove();
  });
});
