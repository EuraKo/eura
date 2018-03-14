/* Inizializzazione HammerJS */
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

function cmove(dir){
  var n_planet = 6, next_id;
  var prev, next;
  var top = $("#pl"+ planet_id);
  var orbit = $(".planet_container");
  
  top.removeClass("pt");
  
  if(planet_id == 0){
    prev = $("#pl"+ (n_planet-1));
    next = $("#pl"+ (planet_id+1)%n_planet);
  }else{
    prev = $("#pl"+ (planet_id-1));
    next = $("#pl"+ (planet_id+1)%n_planet);
  }
  
  if(dir == "prev"){
    next_id = (planet_id + 1) % n_planet;
    angle -= 45;
    next.addClass("pt");
    planet_id++;
  }else{
    if(planet_id == 0){
      next_id = 7;
      planet_id = 7;
    }else{
      next_id = planet_id-1;
      --planet_id;
    }
    angle += 45;
    prev.addClass("pt");
  }
  
  $(".active").removeClass("active");
  $("#p" + planet_id).addClass("active");
  $(".info_back h1").text(planet[next_id]);
  
  if(swiped_top){
    $('.info_back h1').each(function(){
      $(this).html(planet[planet_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    
    anime.timeline({})
    .add({
      targets: '.info_back h1',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 100
    })
    .add({
      targets: '.info_back h1 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: function(el, i) {
        return 500 + 30 * i;
      }
    });
  }
  
  $('.title').each(function(){
    $(this).html(planet[next_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({})
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
  
  $('.pn').each(function(){
    $(this).html(planet[next_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
  });
  
  anime.timeline({})
  .add({
    targets: '.pn .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: function(el, i) {
      return 500 + 30 * i;
    }
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
      $(".planet_photo").css("background-image", "url(" + photo_planet[next_id] +")"); 
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
}

// modal창 버튼 삽입
$(".citem").children("h1").prepend(' <div class="citem_btn"><button type="button"><i class="fas fa-minus"></i></button></div>');

//  닫고열기
$("#open_menu").on("click", function(){
  $(".menu").show();
});

$(".close").on("click", function(){
  $(".menu").hide();
});

$(".more").on("click", function(){
  swiped_top = true;
  openmodal();
});

$(".citem_btn").on("click",function(){
  closemodal();

});
// 함수만들기
function openmodal(){
  anime.timeline({})
  .add({
    targets: '.carousel',
    translateY: ["100%", 0],
    bottom: '0',
    duration: 600,
    easing: 'easeOutQuad',
  });
  
    $('.info_back h1').each(function(){
      $(this).html(planet[planet_id].replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
    
    anime.timeline({})
    .add({
      targets: '.info_back h1',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 100
    })
    .add({
      targets: '.info_back h1 .letter',
      translateX: [40,0],
      translateZ: 0,
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: function(el, i) {
        return 500 + 30 * i;
      }
    });
}

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
}


// 배열
var photo_planet = ["../img/my_logo.svg", "../img/my_logo.svg", "../img/fes_fish_pic.png", "../img/logo-color.svg", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Jewel_of_the_Solar_System.jpg/1280px-Jewel_of_the_Solar_System.jpg", "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/275px-Neptune_Full.jpg", "http://annesastronomynews.com/wp-content/uploads/2012/02/Mercury-has-a-large-iron-core-which-generates-a-magnetic-field-and-is-heavily-cratered-with-regions-of-smooth-plains.-It-has-no-natural-satellites-and-no-substantial-atmosphere.jpg", "https://www.universetoday.com/wp-content/uploads/2008/10/Venus-e1489179310371.jpg"];
var planet = ["euraweb", "resume", "winter", "mefactory", "kozel", "identify", "neptune", "mercury"];