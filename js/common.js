let $delayTime = 1000;

$(window).on("load", function() {
  let $loadingAnim = $("#loadingAnim"),
    $body = $("body");

  setTimeout(function() {
    $body.addClass("loaded");

    $loadingAnim.find(".loadingAnim_line").on("transitionend", function(e) {
      $(this)
        .parent()
        .remove();
    });
  }, $delayTime);
});
