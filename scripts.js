let img, canvas, textColor = "yellow", slogan, backgroundSrc;

let images = [
  "patterns/3.png",
  "patterns/2.png",
  "patterns/1.png"
];

let slogans = [
  "SLOGAN",
  "АСЯНЫ БОСАТ"
];

function preload() {
  helveticaBold = loadFont('HelveticaNeueBold.ttf');
}

function setup() {
  canvas = createCanvas(1080, 1080);
  canvas.hide();
  document.getElementById('fileInput').addEventListener('change', handleFile);

  document.getElementById('download').addEventListener('click', download);

  function download() {
    saveCanvas('corpe', 'png');
  }

  randomizeSlogan();

  changeBackground(images[parseInt(Math.random() * images.length)]);

}

function randomizeSlogan() {
  var otherSlogans = slogans.filter(function(a) {return a != slogan})
  slogan = otherSlogans[parseInt(Math.random() * otherSlogans.length)];
  return slogan;
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

function changeSlogan(t) {
  $('.preview').html(t);

  setTimeout(function() {
    textSize(108); // 1080 * 10%
    textFont(helveticaBold);
    fill(textColor);
    textAlign(CENTER, CENTER);
    text(t, width/2, height/2);
  },0);
}

function changeSloganAndResetBackground(t) {
  t = typeof t === 'string' ? t : randomizeSlogan();
  slogan = t;
  changeBackground(backgroundSrc); // keep same bg
}

function changeBackground(src) {
  backgroundSrc = src;
  $('.preview').css('background-image', 'url(' + src + ')')
               .css('opacity', 1);
  img = loadImage(src, function(i) {
    image(i, 0, 0, width, height);
    $('.preview').height($('.preview').width());
    changeSlogan(slogan)
  });      
}

document.addEventListener("DOMContentLoaded", function() {

  $('.preview').click(changeSloganAndResetBackground);

  $('.text-colors a').click(function changeColor() {
    textColor = $(this).css('color');
    $('.preview').css('color', textColor);
    changeSloganAndResetBackground(slogan);
  });

  $('.clipboard').click(function() { navigator.clipboard.writeText("#СправедливостьДляАси") });

  $('.backgrounds img').click(function() { changeBackground(this.src); });

});
