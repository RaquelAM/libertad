//Slider
$(window).load(function() {
  $('.slider1').flexslider({
    animation: "slide",
    animationLoop: false
  });
  show_element();
});
$(window).load(function() {
  $('.slider2').flexslider({
    animation: "slide",
    initDelay: 3000,
    animationLoop: false
  });
  show_element();
});
//Inicio
$("#entrar").click(function() {
  var user = $("#usuario").val();
  var pass = $("#pass").val();
  if (user == "admin" ) {
    $("#inicio").removeClass("inicioActive");
  }else{
    $(".msjErr").addClass("visible");
    console.log("nel")
  };
  return
});
//AutoScroll
function autoScroll(name) {
  var mov;
   mov = document.getElementById(name).offsetTop ;
  $("html, body").animate({ scrollTop: mov }, {duration: 1000, easing: 'easeInOutCirc'});
}

//Cerrar menu movil
var menuLeft = document.getElementById('cbp-spmenu-s1');
var showLeft = document.getElementById('showLeft');
var body = document.body;
var menuOpen = false;

showLeft.onclick = function() {
    classie.toggle(menuLeft, 'cbp-spmenu-open');
    setInterval(function() {menuOpen = true;}, 100);
    menuOpen = false;
};

body.onclick = function() {
    if (menuOpen) {
        classie.removeClass(menuLeft, 'cbp-spmenu-open');
       menuOpen = false;
    }
};

//Seccion activa
function show_element() {
  $('.contenedor').waypoint({
    handler: function(direccion) {
      $('.nav.active').removeClass("active");
      if(this.element.id == "Tu_Derecho"){
        if(direccion == "down"){
          $(" .tu_derecho").addClass("active");
        }
      }else{
        if(this.element.id == "Quienes_Somos"){
          if(direccion == "down"){
            $(".quienes_somos").addClass("active"); 
          }else{
            $(".tu_derecho").addClass("active");
          }
        }else{
          if(this.element.id == "Tu_Tiempo"){
            if(direccion == "down"){
              $(".tu_tiempo").addClass("active"); 
            }else{
              $(".quienes_somos").addClass("active");
            }
          }else{
            if(direccion == "up"){
                $(".tu_tiempo").addClass("active");
              }else{
                $(".casos_exito").addClass("active");
              }
          }
          
        }
      }
    },
    offset: 47
  });
}
//Modal box
$("#leer1, .revista1").click(function() {
  $("#leer1img").addClass("lightboxActive");
  return
});
$("#close1").click(function() {
  $("#leer1img").removeClass("lightboxActive");
  return
});
$("#leer1img").click(function() {
  $("#leer1img").removeClass("lightboxActive");
  return
});
$("#leer2, .revista2").click(function() {
  $("#leer2img").addClass("lightboxActive");
  return
});
$("#close2").click(function() {
  $("#leer2img").removeClass("lightboxActive");
  return
});
$("#leer3, .revista3").click(function() {
  $("#leer3img").addClass("lightboxActive");
  return
});
$("#close3").click(function() {
  $("#leer3img").removeClass("lightboxActive");
  return
});
$('html').click(function() {
  $("#leer1img, #leer2img, #leer3img, #video").removeClass("lightboxActive");
});
$('#leer1, #leer2, #leer3, .leerImg, #play, .revista1, .revista2, .revista3').click(function(event){
     event.stopPropagation();
});

$("#play").click(function() {
  $("#video").addClass("lightboxActive");
  return
});
$("#close4").click(function() {
  $("#video").removeClass("lightboxActive");
    var div = document.getElementById("video");
    var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
    func =  'pauseVideo';
    iframe.postMessage('{"event":"command","func":"' + func + '","args":""}','*');
  return
});

//Formulario
$("#send").on("click", function(){
  $("#send")[0].disabled = true;
  mail = $("#email")[0].value;
  locationId = $( "#localizacion" ).val();
  var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
  if(mail.length > 5 && mail.length < 50 && expresion.test(mail)){
    $(".error[data-error='mail']").hide();
  }else{
    $(".error[data-error='mail']").show();$("#send").prop("disabled", false);
    $(".error[data-error='succ']").hide();
    return;
  }
  if(locationId != "" ){
    $(".error[data-error='localizacion']").hide();
  }else{
    $(".error[data-error='localizacion']").show();$("#send").prop("disabled", false);
    $(".error[data-error='succ']").hide();
    return;
  }
  $.ajax({
        url: 'https://www.atrapalo.com.mx/user/newsletter/subscription/create',
        type: 'POST',
        dataType: 'json',
        data:{
        email: mail,
        locationId: locationId,
        originId:"3",
        t:"Thu%20Apr%2021%202016%2012:43:38%20GMT+0200%20(CEST)"
        }
      })
      .done(function(data) {
        if (data.messages.user == undefined) {
          $(".error[data-error='succ']").show();$("#send").prop("disabled", false);
        } else{
          console.log(data.messages.user)};
          var msjE = data.messages.user;
          $(".error[data-error='msjError']").show();$("#send").prop("disabled", false);
          $( ".error[data-error='msjError']" ).html( msjE );
        })
      .fail(function(data) {
        $(".error[data-error='error']").show();$("#send").prop("disabled", false);
      })
      .always(function(data) {
      });
});