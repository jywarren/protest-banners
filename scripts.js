let img, 
  canvas, 
  textColor = "yellow", 
  slogan, 
  backgroundSrc,
  fontScale = 0.09;

let images = [
//  "patterns/3.png",
//  "patterns/2.png",
//  "patterns/1.png"
    "riso/K2d.jpg",
    "riso/K3.png",
    "riso/K4.png",
    "riso/K5.png",
    "riso/K6b.png"
/*
    "riso/K1.jpg",
    "riso/K1b.jpg",
    "riso/K1c.jpg",
    "riso/K1d.jpg",
*/
];

let slogans = [
"СПРАВЕД\nЛИВОСТЬ\nДЛЯ АСИ",
"СВОБОДУ\nАСЕ",
"СБИЛА ФУРАЖКУ\nВ ОТВЕТ\nНА НАСИЛИЕ",
"ПРОТЕСТУЮ\nГДЕ ХОЧУ",
"МНЕ НЕ НУЖНО\nРАЗРЕШЕНИЕ,\nЧТОБЫ ГОВОРИТЬ",
"МИТИНГ\nЭТО\nПОЛЕЗНО",
"ПОЛИЦИЯ,\nНЕ ЗАЛАМЫВАЙ\nНАМ РУКИ",
"НАШИ НАЛОГИ –\nВАШИ ЗАРПЛАТЫ",
"ПОЛИЦЕЙСКИЙ,\nЗАЩИЩАЙ НАРОД,\nА НЕ ВЛАСТЬ",
"НЕ ЗАКРЫВАЙ\nГЛАЗА\n–\nНА КОНУ СВОБОДА",
"МОЛЧАНИЕ\n=\nСОУЧАСТИЕ",
"НЕ АКИМАТУ\nРЕШАТЬ, ЧТО МНЕ\nНА ПЛАКАТЕ\nПИСАТЬ"
];


function preload() {
  helveticaBold = loadFont('HelveticaNeue-Bold-Wobbly.ttf');
}

function setup() {

  canvas = createCanvas(1080, 1080);
  //canvas.hide();
  $('.preview').hide();
  $('.preview').css('font-size', (fontScale * 100) + 'vw');
  canvas.style('width', '100%');
  canvas.style('height', $('#canvas').width() + 'px');
  canvas.parent('canvas');

  document.getElementById('fileInput').addEventListener('change', handleFile);
  document.getElementById('download').addEventListener('click', download);

  function download() {
    saveCanvas('korpe', 'png');
  }

  randomizeSlogan();
  $($('.carousel-dots i')[slogans.indexOf(slogan)]).addClass('active');
  changeBackground(images[parseInt(Math.random() * images.length)]);

}



document.addEventListener("DOMContentLoaded", function() {

  $('.preview, #canvas').click(changeSloganAndResetBackground);

  $('.text-colors a').click(function changeColor() {
    textColor = $(this).css('color');
    $('.preview').css('color', textColor);
    changeSloganAndResetBackground(slogan);
  });

  $('.clipboard').click(function() { navigator.clipboard.writeText("#СправедливостьДляАси #JusticeForAsya #ПолицияБезНасилия #МитингЭтоПолезно #ProtestKorpe") });

  $('.backgrounds img').click(function() { changeBackground(this.src); });

});



// UTILITY FUNCTIONS

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

function randomizeSlogan() {
  var otherSlogans = slogans.filter(function(a) {return a != slogan})
  slogan = otherSlogans[parseInt(Math.random() * otherSlogans.length)];
  return slogan;
}

function nextSlogan() {
  var idx = slogans.indexOf(slogan) + 1;
  if (idx > slogans.length - 1) idx = 0;
  slogan = slogans[idx];
  $('.carousel-dots i').removeClass('active');
  $($('.carousel-dots i')[idx]).addClass('active');
  return slogan;
}

function changeSlogan(t) {
  $('.preview').html(t.replace(/\n/g, '<br />'));

  setTimeout(function() {
    textSize(1080 * fontScale);
    textFont(helveticaBold);
    fill(textColor);
    textAlign(CENTER, CENTER);

    canvas.drawingContext.globalAlpha = 0.7;
    text(t, width/2, height/2);
    canvas.drawingContext.globalAlpha = 1;

//    blendMode(SOFT_LIGHT);
//    blendMode(OVERLAY);
    blendMode(SCREEN);
    text(t, width/2, height/2);
    blendMode(BLEND);
  },0);
}

function changeSloganAndResetBackground(t) {
  t = typeof t === 'string' ? t : nextSlogan();
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
