// popup.js
(function($) {
  var body = $('body');
  // body내부에 팝업상자 만들기
  body.prepend('<div id="popupBox"><div class="pop_in"><button tabindex="1" type="button">close</button><p></p></div></div>');

  var popup = $('#popupBox');
  var popIn = popup.children('.pop_in');


  popup.css({position:'fixed', top:0, left:0, zIndex:5000, backgroundColor:'rgba(255,255,255,0.9)', width:'100%', height:'auto', boxSizing:'border-box', padding:'1rem', boxShadow:'1px 1px 10px #aaa'});
  popIn.css({width:'auto', maxWidth:'1000px', margin:'auto'});
  var closeBtn = popIn.find('button');
  closeBtn.css({padding:'0.5rem', backgroundColor:'#d1000a', color:'#fff', fontWeight:'bold', borderRadius:'0.3rem', float:'right'});

  closeBtn.on('focus',function() {
    $(this).css({backgroundColor:'#F6A7BA'});
  });
  closeBtn.on('blur',function() {
    $(this).css({backgroundColor:'#d1000a'});
  });

  closeBtn.on('click',function(e) {
    e.preventDefault();
    popup.remove();
  });

  var narr = popIn.find('p');
  narr.html('본 사이트는 어떠한 경우라도 상업 및 영리를 목적으로 제작된 페이지가 아니며, <br /> 취업을 목적으로 한 개인 포트폴리오 사이트임을 알려드립니다. <br /> 문제가 되거나, 수정을 원하신다면 메일로 연락주시면 조취를 취하도록 하겠습니다. <br /> sow5252@gmail.com <br /> 사용된 이미지의 출처는 아래 링크를 통해 확인하세요. <br /> <a tabindex="1" href="./image_link.html" target="_blank">이미지 출처 확인하기<a>');
  narr.find('a').css({color:'#d1000a', fontWeight:'bold'});
  narr.find('a').on('focus',function() {
    $(this).css({color:'#fff', outline:0, padding:'0.3rem', borderRadius:'0.2rem'}); 
  });
  narr.find('a').on('blur',function() {  
    $(this).css({color:'#d1000a'}); 
  });

  $(window).on('scroll',function() {
    var scrollResult = $(this).scrollTop();
    if(scrollResult >= 50){
      popup.slideUp(300);
    }else{
      popup.slideDown(300);
    }
  });

  var rwd = function(){
    var rwdW = parseInt($(window).width());
    var mob  = 480;
    var tab  = 960;
    var pc   = 1366;

    if(rwdW <= mob){
      // mobile

    }else if(mob < rwdW && rwdW < tab){
      // tab

    }else if(tab <= rwdW && rwdW < pc){
      // pc

    }else{
      // pcFull

    }

  }; // //rwd()
rwd();
// parseInt() 주어진값을 정수형 숫자로 변환처리
// 예: 40px  -> parseInt(40px)  -> 40
// 예2: 43.3 ->  parseInt(43.3) -> 43
  var $w = parseInt($(window).width());
  $(window).on('resize',function(){
    var nowW = $(window).width();
    if($w !== nowW){
      location.reload();
      rwd();
// 리로드-사이즈 바뀔떄마다 새로고침으로 적용
// 아래꺼-비동기처럼 변화를 주겠다
    }
  });

})(this.jQuery);