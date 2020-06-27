let img, canvas;

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.hide();
  document.getElementById('fileInput').addEventListener('change', handleFile);
}

function draw() {
}

function handleFile(e) {
  if (e.target.files.length > 0) {
    var file = p5.File._load(e.target.files[0], function(file) {
      if (file.type === 'image' || file.type.split('/')[0] === 'image') {
        img = createImg(file.data, 'your uploaded pattern');
        img.hide();
        changeBackground(img.elt.src);
      } else {
        img = null;
      }
    });
  }
}

function changeBackground(src) {
  $('.preview img').attr('src', src);
  $('.preview').height($('.preview img').width());
  img = loadImage(src, function(i) {
    image(i, 0, 0, width, height);
  });      
}

document.addEventListener("DOMContentLoaded", function() {

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

  $('.backgrounds img').click(function() { changeBackground(this.src); });

});
