/* Inizializzazione HammerJS */
// var element = document.getElementById('mobile_control');
var element = document.getElementById('mobile_control');
var hammertime = new Hammer(element);

var swiped_top = false;

hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('swipeleft', function(ev) {
  cmove("prev");
});
hammertime.on('swiperight', function(ev) {
  cmove("next");
});
hammertime.on('swipeup', function(ev) {
  swiped_top = true;
  openmodal();
});
hammertime.on('swipedown', function(ev) {
  closemodal();
});
/* * * * * * * * * */

// 배열
var photo_planet = ["../img/my_logo_final.svg",  "../img/my_logo_bk.svg", 
                    "../img/kozel_logo.png",     "../img/logo-color.svg", 
                    "../img/fish-logo.svg",      "../img/resume.jpg"     ];
var planet = ["euraweb", "resume", "kozel", "mefactory", "winter", "identify"];

// =================================================================================


$(".action").on("click", function(){
  cmove($(this).attr('id'));
});

$('.title').each(function(){
  $(this).html("euraweb".replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});


anime.timeline({})
.add({
  targets: '.title',
  opacity: [0,1],
  easing: "easeOutExpo",
  duration: 100
})
.add({
  targets: '.title .letter',
  translateX: [40,0],
  translateZ: 0,
  opacity: [0,1],
  easing: "easeOutExpo",
  duration: 1200,
  delay: function(el, i) {
    return 500 + 30 * i;
  }
});

var angle = 0;
var planet_id = 0;
var next_id;
var n=0;
var plLength = planet.length;
function cmove(dir){
  var n_planet = 6; //next_id;
  var prev, next;
  var top = $("#pl"+ planet_id);
  var orbit = $(".planet_container");
  
  top.removeClass("pt");
/*
  if(planet_id <= 0){
    prev = $("#pl"+ (n_planet-1));
    next = $("#pl"+ (planet_id+1)%n_planet);
    planet_id == planet.length;
  }
  else if(planet_id >= planet.length){
    prev = $("#pl"+ 0);
    next = $("#pl"+ 0);
    planet_id == 0;
  //   // next = $("#pl"+ (planet_id-1));
  //   // prev = $("#pl"+ (planet_id+1)%n_planet);
  }
  else{
    prev = $("#pl"+ (planet_id-1));
    next = $("#pl"+ (planet_id+1)%n_planet);
    // next = $("#pl"+ (planet_id-1));
    // prev = $("#pl"+ (planet_id+1)%n_planet);
  }
*/
// console.log(prev);

// 왼클릭, 오른클릭구분
  /*  
  if(dir == "prev"){
    next_id = (planet_id+1) % n_planet;
    
    angle -= 45;
    next.addClass("pt");
    planet_id++;
  }else{
    next_id == planet_id;

    // if(planet_id == 0){
    //   next_id = planet.length;
    //   planet_id = planet.length;
    // }else if(next_id >= planet.length){
    //   next_id = 0;
    //   --planet_id;
    // }else{
    //   next_id = planet_id-1;
    //   --planet_id;
    // }
    angle += 45;
    prev.addClass("pt");
  }
  n = next_id;
  console.log(next_id); 
  console.log('n: ', n); 
*/


  if(dir == 'prev') {  ++planet_id;  angle -= 45;  }else { --planet_id;  angle += 45;  }

  if(planet_id <= 0){  
    planet_id = plLength-1; }else if(planet_id >= plLength){ planet_id = 0; }
  // console.log(planet_id);

   // prev = $("#pl"+ n_planet);
   // next = $("#pl"+ (planet_id+1) % n_planet);
  var plN = $("#pl"+ planet_id);
  // console.log(plN);
   plN.addClass('pt');


  $(".active").removeClass("active");
  $("#p" + planet_id).addClass("active");
  $(".info_back h1").text(planet[planet_id]);
  
  if(swiped_top){
    $('.info_back h1').each(function(n){ planetIndex($(this), planet_id); });
    
    anime.timeline({})
    .add({ targets: '.info_back h1', opacity: [0,1], easing: "easeOutExpo", duration: 100 })
    .add({ targets: '.info_back h1 .letter', translateX: [40,0], translateZ: 0, opacity: [0,1], easing: "easeOutExpo", duration: 1200,
      delay: function(el, i) { return 500 + 30 * i; }
    });
  } // if
  
  $('.title').each(function(){
    planetIndex($(this), planet_id);
  });
  
  anime.timeline({})
  .add({ targets: '.title .letter', translateX: [40,0], translateZ: 0, opacity: [0,1], easing: "easeOutExpo", duration: 1200,
    delay: function(el, i) { return 500 + 30 * i; }
  });
  
  $('.pn').each(function(){
   planetIndex($(this), planet_id);
  });
  
  anime.timeline({})
  .add({ targets: '.pn .letter', translateX: [40,0], translateZ: 0, opacity: [0,1], easing: "easeOutExpo", duration: 1200,
    delay: function(el, i) { return 500 + 30 * i; }
  });
  
  var ani_dir = (dir == "next") ? "0%" : "100%";
  
  anime.timeline({})
  .add({
    targets: '.planet_photo',
    backgroundPosition: ['50% -75%', ani_dir + 'center'],
    opacity: {
      value: [1,0]
    },
    duration: 700,
    easing: 'easeOutQuad',
    complete: function(anim){
      $(".planet_photo").css("background-image", "url(" + photo_planet[planet_id] +")"); 
    }
  })
  .add({
    targets: '.planet_photo',
    backgroundPosition: ['center', 'center'],
    opacity: [0.2,1],
    duration: 500,
    easing: 'easeOutQuad'
  });
  
  orbit.css("transform", "rotateZ(" + angle + "deg)");
}  // cmove

// modal창 버튼 삽입
$(".citem").children("h1").prepend(' <div class="citem_btn"><button type="button"><i class="fas fa-minus"></i></button></div>');

//  닫고열기
$("#open_menu").on("click", function(){ $(".menu").show(); });
$(".close").on("click", function(){  $(".menu").hide();});
$(".more").on("click", function(){  swiped_top = true;  openmodal(); });
$(".citem_btn").on("click",function(){  closemodal(); });


// 함수만들기
function openmodal(){
  anime.timeline({})
  .add({ targets: '.carousel', translateY: ["100%", 0], bottom: '0', duration: 600, easing: 'easeOutQuad'});
  
  $('.info_back h1').each(function(){ planetIndex($(this), planet_id); });
    
  anime.timeline({})
  .add({ targets: '.info_back h1', opacity: [0,1], easing: "easeOutExpo", duration: 100 })
  .add({ targets: '.info_back h1 .letter', translateX: [40,0], translateZ: 0, opacity: [0,1], easing: "easeOutExpo", duration: 1200,
    delay: function(el, i) { return 500 + 30 * i; }
  });
}// openmodal

function planetIndex(select, num){ 
  select.html(planet[num].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>")); 
}// planetIndex


function closemodal(){
  if(swiped_top){
    anime.timeline({})
    .add({
      targets: '.carousel',
      translateY: [0, "100%"],
      duration: 600,
      easing: 'easeOutQuad',
    });
    swiped_top = false;
  }
}// closemodal


