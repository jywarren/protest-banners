let img, 
  canvas, 
  textColor = "yellow", 
  slogan, 
  backgroundSrc,
  fontScale = 0.09;

let images = [
  "/patterns/k1",
  "/patterns/k2",
  "/patterns/k3",
  "/patterns/k4",
  "/patterns/k5",
  "/patterns/k6",
  "/patterns/k7",
  "/patterns/k8",
  "/patterns/k9",
  "/patterns/k10",
  "/patterns/k11",
  "/patterns/k12",
  "/patterns/k13",
  "/patterns/k14",
  "/patterns/k15",
  "/patterns/k16",
  "/patterns/k17"
];

let slogans = {
"en": [
"JUSTICE\nFOR ASYA",
"FREE\nASYA",
"SHE ACTED\nAGAINST\nPOLICE\nVIOLENCE",
"I PROTEST\nWHERE I WISH",
"I NEED NO\nPERMISSION\nTO SPEAK",
"PROTEST\nIS\nHEALTHY",
"GET YOUR\nKNEES\nOFF\nOUR\nNECKS",
"OUR TAXES – \nYOUR WAGES",
"POLICE,\nPROTECT\nTHE PEOPLE,\nNOT\nTHE STATE",
"LOOK OUT:\nFREEDOM\nAT STAKE",
"SILENCE\n=\nCOMPLICITY",
"MY BANNER\nNEEDS\nNO APPROVAL"
],

"ru": [
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
],

"kz": [
"АСЯҒА\nӘДІЛДІК",
"АСЯНЫ\nБОСАТ",
"БАС КИІМ\nТҮСІРГЕНІ –\nЗОРЛЫҚ-\nЗОМБЫЛЫҚҚА\nЖАУАП",
"МИТИНГ\nОРНЫН\nӨЗІМ\nТАҢДАЙМЫН",
"СӨЙЛЕУ\nҮШІН РҰҚСАТ\nҚАЖЕТ ЕМЕС",
"МИТИНГ–\nПАЙДАЛЫ",
"ПОЛИЦИЯ,\nҚОЛЫМДЫЗДЫ\nҚАЙЫРМА",
"БІЗ ТӨЛЕГЕН\nСАЛЫҚ –\nСІЗГЕ ЖАЛАҚЫ",
"ПОЛИЦИЯ,\nБИЛІКТІ ЕМЕС,\nХАЛЫҚТЫ\nҚОРҒА",
"КӨЗІҢДІ АШ –\nБҰЛ\nБОСТАНДЫҚ\nМӘСЕЛЕСІ",
"ҮНСІЗ БОЛУ\n=\nҚАТЫСУ",
"ПЛАКАТ\nЖАЗУ –\nӨЗ ЕРКІМ"
]};

let lang = "ru";
if (document.URL.search('/en/') !== -1) {
  lang = "en";
} else if (document.URL.search('/kz/') !== -1) {
  lang = "kz";
}
slogans = slogans[lang];

function preload() {
  helveticaBold = loadFont('/HelveticaNeue-Bold-Wobbly.ttf');
}

function setup() {

  $('.lang').find('.'+lang).addClass('active');

  images = images.sort(function() {
    return .5 - Math.random();
  });

  images.forEach(function(src) {
    $('.backgrounds .scroll').append('<a href="javascript:void(0);"><img src="' + src + 's.jpg" /></a> ');
  });

  $('.backgrounds img').click(
    function() { changeBackground(this.src.replace('s.jpg','.jpg'));
  });

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
    // display Safari download hint
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
                   navigator.userAgent &&
                   navigator.userAgent.indexOf('CriOS') == -1 &&
                   navigator.userAgent.indexOf('FxiOS') == -1;
    if (isSafari) {
      $('.saved').show();
      setTimeout(function() { $('.saved').hide() }, 15000);
    }
    saveCanvas('korpe', 'jpg');
  }

  randomizeSlogan();
  $($('.carousel-dots i')[slogans.indexOf(slogan)]).addClass('active');
  changeBackground(images[parseInt(Math.random() * images.length)] + '.jpg');

  $('.preview, #canvas').click(changeSloganAndResetBackground);

  $('.text-colors a').click(function changeColor() {
    textColor = $(this).css('color');
    $('.preview').css('color', textColor);
    changeSloganAndResetBackground(slogan);
  });

  $('.clipboard').click(function() { navigator.clipboard.writeText("#СправедливостьДляАси #JusticeForAsya #ПолицияБезНасилия #МитингЭтоПолезно #ProtestKorpe") });

}



// UTILITY FUNCTIONS

function handleFile(e) {
  if (e.target.files.length > 0) {
    var file = p5.File._load(e.target.files[0], function(file) {
      if (file.type === 'image' || file.type.split('/')[0] === 'image') {

        var img = createImg(file.data, 'your uploaded pattern');

        img.hide();

        // build a canvas and try to use glfx to halftone it
        loadImage(img.elt.src, function(i) {

          // try to crop a square
          var squareImg = i.get(0, (img.height - img.width)/2, img.width, img.width)
          i.resize(img.width, img.width)
          i.copy(squareImg, 0, 0, img.width, img.width, 0, 0, img.width, img.width)

          var fxcanvas = fx.canvas(1024, 1024);
          var texture = fxcanvas.texture(i.canvas);
          fxcanvas.draw(texture)
                  .denoise(80)
                  .brightnessContrast(0.1, 0.09)
                  .vibrance(0.4)
                  .colorHalftone(320, 239.5, 0.31, 2.3)
                  .update();
          changeBackground(canvasToBlobUrl(fxcanvas));
        });
        // fallback in case halftoning doesn't work:
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

//    canvas.drawingContext.globalAlpha = 0.7;
    text(t, width/2, height/2);
//    canvas.drawingContext.globalAlpha = 1;
/*
//    blendMode(SOFT_LIGHT);
//    blendMode(OVERLAY);
    blendMode(SCREEN);
    text(t, width/2, height/2);
    blendMode(BLEND);
 */
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
  var img = loadImage(src, function(i) {

    // try to crop a square
    var squareImg = i.get(0, (i.height - i.width)/2, i.width, i.width)
    i.resize(i.width, i.width)
    i.copy(squareImg, 0, 0, i.width, i.width, 0, 0, i.width, i.width)

    image(i, 0, 0, width, height);
    $('.preview').height($('.preview').width());
    changeSlogan(slogan)
  });
}



// http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

function canvasToBlobUrl(canvas) {
  var blob = dataURItoBlob(canvas.toDataURL('image/png'));
  return window.URL.createObjectURL(blob);
}
