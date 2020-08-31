$(document).ready(function () {
  var w = $(window).outerWidth();
  var h = $(window).outerHeight();
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  //Adaptive functions
  $(window).resize(function (event) {
    adaptive_function();
  });
  function adaptive_header(w, h) {
    var headerMenu = $(".header-menu");
    var headerLang = $(".header-top-lang");
    if (w < 767) {
      if (!headerLang.hasClass("done")) {
        headerLang.addClass("done").appendTo(headerMenu);
      }
    } else {
      if (headerLang.hasClass("done")) {
        headerLang.removeClass("done").prependTo($(".header-top"));
      }
    }
    if (w < 767) {
      if (!$(".header-bottom-menu").hasClass("done")) {
        $(".header-bottom-menu").addClass("done").appendTo(headerMenu);
      }
    } else {
      $.each($(".header-bottom-menu"), function (index, val) {
        if ($(this).hasClass("header-bottom-menu--right")) {
          if ($(this).hasClass("done")) {
            $(this)
              .removeClass("done")
              .prependTo($(".header-bottom__column").eq(2));
          }
        } else {
          if ($(this).hasClass("done")) {
            $(this)
              .removeClass("done")
              .prependTo($(".header-bottom__column").eq(0));
          }
        }
      });
    }
  }
  function adaptive_function() {
    var w = $(window).outerWidth();
    var h = $(window).outerHeight();
    adaptive_header(w, h);
  }
  adaptive_function();
  function map(n) {
    google.maps.Map.prototype.setCenterWithOffset = function (
      latlng,
      offsetX,
      offsetY
    ) {
      var map = this;
      var ov = new google.maps.OverlayView();
      ov.onAdd = function () {
        var proj = this.getProjection();
        var aPoint = proj.fromLatLngToContainerPixel(latlng);
        aPoint.x = aPoint.x + offsetX;
        aPoint.y = aPoint.y + offsetY;
        map.panTo(proj.fromContainerPixelToLatLng(aPoint));
        //map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
      };
      ov.draw = function () {};
      ov.setMap(this);
    };
    var markers = new Array();
    var infowindow = new google.maps.InfoWindow({
      //pixelOffset: new google.maps.Size(-230,250)
    });
    var locations = [[new google.maps.LatLng(53.819055, 27.8813694)]];
    var options = {
      zoom: 10,
      panControl: false,
      mapTypeControl: false,
      center: locations[0][0],
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    var map = new google.maps.Map(document.getElementById("map"), options);
    var icon = {
      url: "img/icons/map.svg",
      scaledSize: new google.maps.Size(18, 20),
      anchor: new google.maps.Point(9, 10),
    };
    for (var i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
        //icon:icon,
        position: locations[i][0],
        map: map,
      });
      markers.push(marker);
    }
  }
  if ($("#map").length > 0) {
    map();
  }
  //FORMS
  function forms() {
    //SELECT
    if ($("select").length > 0) {
      function selectscrolloptions() {
        var scs = 100;
        var mss = 50;
        if (isMobile.any()) {
          scs = 10;
          mss = 1;
        }
        var opt = {
          cursorcolor: "#2078e5",
          cursorwidth: "3px",
          background: "",
          autohidemode: false,
          bouncescroll: false,
          cursorborderradius: "0px",
          scrollspeed: scs,
          mousescrollstep: mss,
          directionlockdeadzone: 0,
          cursorborder: "0px solid #fff",
        };
        return opt;
      }

      function select() {
        $.each($("select"), function (index, val) {
          var ind = index;
          $(this).hide();
          if ($(this).parent(".select-block").length == 0) {
            $(this).wrap(
              "<div class='select-block " +
                $(this).attr("class") +
                "-select-block'></div>"
            );
          } else {
            $(this).parent(".select-block").find(".select").remove();
          }
          var milti = "";
          var check = "";
          var sblock = $(this).parent(".select-block");
          var soptions =
            "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
          if ($(this).attr("multiple") == "multiple") {
            milti = "multiple";
            check = "check";
          }
          $.each($(this).find("option"), function (index, val) {
            if ($(this).attr("value") != "") {
              soptions =
                soptions +
                "<div data-value='" +
                $(this).attr("value") +
                "' class='select-options__value_" +
                ind +
                " select-options__value value_" +
                $(this).val() +
                " " +
                $(this).attr("class") +
                " " +
                check +
                "'>" +
                $(this).html() +
                "</div>";
            } else if ($(this).parent().attr("data-label") == "on") {
              if (sblock.find(".select__label").length == 0) {
                sblock.prepend(
                  '<div class="select__label">' + $(this).html() + "</div>"
                );
              }
            }
          });
          soptions = soptions + "</div></div></div>";
          if ($(this).attr("data-type") == "search") {
            sblock.append(
              "<div data-type='search' class='select_" +
                ind +
                " select" +
                " " +
                $(this).attr("class") +
                "__select " +
                milti +
                "'>" +
                "<div class='select-title'>" +
                "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
                "<input data-value='" +
                $(this).find('option[selected="selected"]').html() +
                "' class='select-title__value value_" +
                $(this).find('option[selected="selected"]').val() +
                "' />" +
                "</div>" +
                soptions +
                "</div>"
            );
            $(".select_" + ind)
              .find("input.select-title__value")
              .jcOnPageFilter({
                parentSectionClass: "select-options_" + ind,
                parentLookupClass: "select-options__value_" + ind,
                childBlockClass: "select-options__value_" + ind,
              });
          } else {
            sblock.append(
              "<div class='select_" +
                ind +
                " select" +
                " " +
                $(this).attr("class") +
                "__select " +
                milti +
                "'>" +
                "<div class='select-title'>" +
                "<div class='select-title__arrow ion-ios-arrow-down'></div>" +
                "<div class='select-title__value value_" +
                $(this).find('option[selected="selected"]').val() +
                "'>" +
                $(this).find('option[selected="selected"]').html() +
                "</div>" +
                "</div>" +
                soptions +
                "</div>"
            );
          }
          if ($(this).find('option[selected="selected"]').val() != "") {
            sblock.find(".select").addClass("focus");
          }
          if ($(this).attr("data-req") == "on") {
            $(this).addClass("req");
          }
          $(".select_" + ind + " .select-options-scroll").niceScroll(
            ".select-options-list",
            selectscrolloptions()
          );
        });
      }
      select();

      $("body").on("keyup", "input.select-title__value", function () {
        $(".select")
          .not($(this).parents(".select"))
          .removeClass("active")
          .find(".select-options")
          .slideUp(50);
        $(this).parents(".select").addClass("active");
        $(this)
          .parents(".select")
          .find(".select-options")
          .slideDown(50, function () {
            $(this).find(".select-options-scroll").getNiceScroll().resize();
          });
        $(this).parents(".select-block").find("select").val("");
      });
      $("body").on("click", ".select", function () {
        if (!$(this).hasClass("disabled")) {
          $(".select")
            .not(this)
            .removeClass("active")
            .find(".select-options")
            .slideUp(50);
          $(this).toggleClass("active");
          $(this)
            .find(".select-options")
            .slideToggle(50, function () {
              $(this).find(".select-options-scroll").getNiceScroll().resize();
            });

          //	var input=$(this).parent().find('select');
          //removeError(input);

          if ($(this).attr("data-type") == "search") {
            if (!$(this).hasClass("active")) {
              searchselectreset();
            }
            $(this).find(".select-options__value").show();
          }
        }
      });
      $("body").on("click", ".select-options__value", function () {
        if ($(this).parents(".select").hasClass("multiple")) {
          if ($(this).hasClass("active")) {
            if (
              $(this).parents(".select").find(".select-title__value span")
                .length > 0
            ) {
              $(this)
                .parents(".select")
                .find(".select-title__value")
                .append(
                  '<span data-value="' +
                    $(this).data("value") +
                    '">, ' +
                    $(this).html() +
                    "</span>"
                );
            } else {
              $(this)
                .parents(".select")
                .find(".select-title__value")
                .data(
                  "label",
                  $(this).parents(".select").find(".select-title__value").html()
                );
              $(this)
                .parents(".select")
                .find(".select-title__value")
                .html(
                  '<span data-value="' +
                    $(this).data("value") +
                    '">' +
                    $(this).html() +
                    "</span>"
                );
            }
            $(this)
              .parents(".select-block")
              .find("select")
              .find("option")
              .eq($(this).index() + 1)
              .prop("selected", true);
            $(this).parents(".select").addClass("focus");
          } else {
            $(this)
              .parents(".select")
              .find(".select-title__value")
              .find('span[data-value="' + $(this).data("value") + '"]')
              .remove();
            if (
              $(this).parents(".select").find(".select-title__value span")
                .length == 0
            ) {
              $(this)
                .parents(".select")
                .find(".select-title__value")
                .html(
                  $(this)
                    .parents(".select")
                    .find(".select-title__value")
                    .data("label")
                );
              $(this).parents(".select").removeClass("focus");
            }
            $(this)
              .parents(".select-block")
              .find("select")
              .find("option")
              .eq($(this).index() + 1)
              .prop("selected", false);
          }
          return false;
        }

        if ($(this).parents(".select").attr("data-type") == "search") {
          $(this)
            .parents(".select")
            .find(".select-title__value")
            .val($(this).html());
          $(this)
            .parents(".select")
            .find(".select-title__value")
            .attr("data-value", $(this).html());
        } else {
          $(this)
            .parents(".select")
            .find(".select-title__value")
            .attr(
              "class",
              "select-title__value value_" + $(this).data("value")
            );
          $(this)
            .parents(".select")
            .find(".select-title__value")
            .html($(this).html());
        }

        $(this)
          .parents(".select-block")
          .find("select")
          .find("option")
          .removeAttr("selected");
        if ($.trim($(this).data("value")) != "") {
          $(this)
            .parents(".select-block")
            .find("select")
            .val($(this).data("value"));
          $(this)
            .parents(".select-block")
            .find("select")
            .find('option[value="' + $(this).data("value") + '"]')
            .attr("selected", "selected");
        } else {
          $(this).parents(".select-block").find("select").val($(this).html());
          $(this)
            .parents(".select-block")
            .find("select")
            .find('option[value="' + $(this).html() + '"]')
            .attr("selected", "selected");
        }

        if ($(this).parents(".select-block").find("select").val() != "") {
          $(this).parents(".select-block").find(".select").addClass("focus");
        } else {
          $(this).parents(".select-block").find(".select").removeClass("focus");

          $(this).parents(".select-block").find(".select").removeClass("err");
          $(this).parents(".select-block").parent().removeClass("err");
          $(this)
            .parents(".select-block")
            .removeClass("err")
            .find(".form__error")
            .remove();
        }
        if (!$(this).parents(".select").data("tags") != "") {
          if (
            $(this)
              .parents(".form-tags")
              .find(
                '.form-tags__item[data-value="' + $(this).data("value") + '"]'
              ).length == 0
          ) {
            $(this)
              .parents(".form-tags")
              .find(".form-tags-items")
              .append(
                '<a data-value="' +
                  $(this).data("value") +
                  '" href="" class="form-tags__item">' +
                  $(this).html() +
                  '<span class="fa fa-times"></span></a>'
              );
          }
        }
        $(this).parents(".select-block").find("select").change();

        if (
          $(this).parents(".select-block").find("select").data("update") == "on"
        ) {
          select();
        }
      });
      $(document).on("click touchstart", function (e) {
        if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
          $(".select").removeClass("active");
          $(".select-options").slideUp(50, function () {});
          searchselectreset();
        }
      });
      $(document).on("keydown", function (e) {
        if (e.which == 27) {
          $(".select").removeClass("active");
          $(".select-options").slideUp(50, function () {});
          searchselectreset();
        }
      });
    }
    //FIELDS
    $("input,textarea").focus(function () {
      if ($(this).val() == $(this).attr("data-value")) {
        $(this).addClass("focus");
        $(this).parent().addClass("focus");
        if ($(this).attr("data-type") == "pass") {
          $(this).attr("type", "password");
        }
        $(this).val("");
      }
      removeError($(this));
    });
    $("input[data-value], textarea[data-value]").each(function () {
      if (this.value == "" || this.value == $(this).attr("data-value")) {
        this.value = $(this).attr("data-value");
        if (
          $(this).hasClass("l") &&
          $(this).parent().find(".form__label").length == 0
        ) {
          $(this)
            .parent()
            .append(
              '<div class="form__label">' +
                $(this).attr("data-value") +
                "</div>"
            );
        }
      }
      if (this.value != $(this).attr("data-value") && this.value != "") {
        $(this).addClass("focus");
        $(this).parent().addClass("focus");
        if (
          $(this).hasClass("l") &&
          $(this).parent().find(".form__label").length == 0
        ) {
          $(this)
            .parent()
            .append(
              '<div class="form__label">' +
                $(this).attr("data-value") +
                "</div>"
            );
        }
      }

      $(this).click(function () {
        if (this.value == $(this).attr("data-value")) {
          if ($(this).attr("data-type") == "pass") {
            $(this).attr("type", "password");
          }
          this.value = "";
        }
      });
      $(this).blur(function () {
        if (this.value == "") {
          this.value = $(this).attr("data-value");
          $(this).removeClass("focus");
          $(this).parent().removeClass("focus");
          if ($(this).attr("data-type") == "pass") {
            $(this).attr("type", "text");
          }
        }
      });
    });
    $(".form-input__viewpass").click(function (event) {
      if ($(this).hasClass("active")) {
        $(this).parent().find("input").attr("type", "password");
      } else {
        $(this).parent().find("input").attr("type", "text");
      }
      $(this).toggleClass("active");
    });

    //CHECK
    $.each($(".check"), function (index, val) {
      if ($(this).find("input").prop("checked") == true) {
        $(this).addClass("active");
      }
    });
    $("body").off("click", ".check", function (event) {});
    $("body").on("click", ".check", function (event) {
      if (!$(this).hasClass("disable")) {
        var target = $(event.target);
        if (!target.is("a")) {
          $(this).toggleClass("active");
          if ($(this).hasClass("active")) {
            $(this).find("input").prop("checked", true);
          } else {
            $(this).find("input").prop("checked", false);
          }
        }
      }
    });

    //RANGE
    if ($("#range").length > 0) {
      $("#range").slider({
        range: true,
        min: 0,
        max: 5000,
        values: [0, 5000],
        slide: function (event, ui) {
          $("#rangefrom").val(ui.values[0]);
          $("#rangeto").val(ui.values[1]);
          $(this)
            .find(".ui-slider-handle")
            .eq(0)
            .html("<span>" + ui.values[0] + "</span>");
          $(this)
            .find(".ui-slider-handle")
            .eq(1)
            .html("<span>" + ui.values[1] + "</span>");
        },
        change: function (event, ui) {
          if (
            ui.values[0] != $("#range").slider("option", "min") ||
            ui.values[1] != $("#range").slider("option", "max")
          ) {
            $("#range").addClass("act");
          } else {
            $("#range").removeClass("act");
          }
        },
      });
      $("#rangefrom").val($("#range").slider("values", 0));
      $("#rangeto").val($("#range").slider("values", 1));

      $("#range")
        .find(".ui-slider-handle")
        .eq(0)
        .html("<span>" + $("#range").slider("option", "min") + "</span>");
      $("#range")
        .find(".ui-slider-handle")
        .eq(1)
        .html("<span>" + $("#range").slider("option", "max") + "</span>");

      $("#rangefrom").bind("change", function () {
        if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
          $(this).val($("#range").slider("option", "max"));
        }
        if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
          $(this).val($("#range").slider("option", "min"));
        }
        $("#range").slider("values", 0, $(this).val());
      });
      $("#rangeto").bind("change", function () {
        if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
          $(this).val($("#range").slider("option", "max"));
        }
        if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
          $(this).val($("#range").slider("option", "min"));
        }
        $("#range").slider("values", 1, $(this).val());
      });
      $("#range").find(".ui-slider-handle").eq(0).addClass("left");
      $("#range").find(".ui-slider-handle").eq(1).addClass("right");
    }
    //ADDFILES
    $(".form-addfile__input").change(function (e) {
      if ($(this).val() != "") {
        var ts = $(this);
        ts.parents(".form-addfile").find("ul.form-addfile-list").html("");
        $.each(e.target.files, function (index, val) {
          if (
            ts
              .parents(".form-addfile")
              .find(
                'ul.form-addfile-list>li:contains("' +
                  e.target.files[index].name +
                  '")'
              ).length == 0
          ) {
            ts.parents(".form-addfile")
              .find("ul.form-addfile-list")
              .append("<li>" + e.target.files[index].name + "</li>");
          }
        });
      }
    });
  }
  forms();

  $(".wrapper").addClass("loaded");

  var act = "click";
  if (isMobile.iOS()) {
    var act = "touchstart";
  }

  $(".header-menu__icon").click(function (event) {
    $(this).toggleClass("active");
    $(".header-menu").toggleClass("active");
    if ($(this).hasClass("active")) {
      $("body").data("scroll", $(window).scrollTop());
    }
    $("body").toggleClass("lock");
    if (!$(this).hasClass("active")) {
      $("body,html").scrollTop(parseInt($("body").data("scroll")));
    }
  });

  $(".goto").click(function () {
    var el = $(this).attr("href").replace("#", "");
    var offset = 0;
    $("body,html").animate(
      { scrollTop: $("." + el).offset().top + offset },
      500,
      function () {}
    );

    if ($(".header-menu").hasClass("active")) {
      $(".header-menu,.header-menu__icon").removeClass("active");
      $("body").removeClass("lock");
    }
    return false;
  });

  function ibg() {
    $.each($(".ibg"), function (index, val) {
      if ($(this).find("img").length > 0) {
        $(this).css(
          "background-image",
          'url("' + $(this).find("img").attr("src") + '")'
        );
      }
    });
  }
  ibg();

  //Клик вне области
  $(document).on("click touchstart", function (e) {
    if (!$(e.target).is(".select *")) {
      $(".select").removeClass("active");
    }
  });

  function scrolloptions() {
    var scs = 100;
    var mss = 50;
    var bns = false;
    if (isMobile.any()) {
      scs = 10;
      mss = 1;
      bns = true;
    }
    var opt = {
      cursorcolor: "#fff",
      cursorwidth: "4px",
      background: "",
      autohidemode: true,
      cursoropacitymax: 0.4,
      bouncescroll: bns,
      cursorborderradius: "0px",
      scrollspeed: scs,
      mousescrollstep: mss,
      directionlockdeadzone: 0,
      cursorborder: "0px solid #fff",
    };
    return opt;
  }
  function scroll() {
    $(".scroll-body").niceScroll(".scroll-list", scrolloptions());
  }
  if (navigator.appVersion.indexOf("Mac") != -1) {
  } else {
    if ($(".scroll-body").length > 0) {
      scroll();
    }
  }
});
