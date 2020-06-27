$('.slogan').dblclick(replaceSlogan);

var timeoutId = 0;
$('.slogan').on('mousedown', function() {
    timeoutId = setTimeout(replaceSlogan, 1000);
}).on('mouseup mouseleave', function() {
    clearTimeout(timeoutId);
});

function replaceSlogan() {
  $('.slogan').html(prompt('Enter text'));
}
