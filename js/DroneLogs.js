$(document).on("pagecreate", "#app", function() {
  $("#dayList").on("tap", "li", function() {
    window.localStorage.setItem("day", $(this).index() + 1);
  });
});
$(document).on("pagebeforeshow", "#editLog", function() {
  $("#dayNumber").html(window.localStorage.getItem("day"));
});
$(document).on("pagecreate", "#editLog", function() {
  $("#reset").on("tap", function() {
    $("#logForm")[0].reset();
  });
  var reloadPage = function(day) {
    window.localStorage.setItem("day", day);
    $("#dayNumber").html(day);
    $("#logForm")[0].reset();
  };
  $("#next").on("tap", function() {
    var nextDay = Number(window.localStorage.getItem("day")) + 1;
    if (nextDay > 5) {
      nextDay = 1;
    }
    reloadPage(nextDay);
  });
  $("#previous").on("tap", function() {
    var prevDay = Number(window.localStorage.getItem("day")) - 1;
    if (prevDay < 1) {
      prevDay = 5;
    }
    reloadPage(prevDay);
  });
  $("#saveLogger").on("tap", function() {
    var canSave = true;
    
    return false;
  });
});
$(document).on("pagebeforeshow", "#logger", function() {
  $("#loggerDayNumber").html(window.localStorage.getItem("day"));
});
