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
  function selfPopupShow(id, tips){
    var popupWrp = $("#"+id+"Popup");
    if(popupWrp.length < 1){
      var popupWrp = $('<div id="'+id+'Popup" data-role="popup" data-theme="b" data-overlay-theme="b" data-dismissible="false" class="ui-popup-container ui-popup-active ui-popup ui-corner-all popup-overlay"></div>');
      // popupWrp.append('<a class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right" onclick="selfPopupClose(\''+id+'\')" href="#">Close</a>');
      // popupWrp.append('<div id="'+id+'" class="ui-content" data-role="main" style="height:400px; overflow:auto"></div>');
     var shtml = '<div data-role="popup" id="'+ id +'" class="ui-content ui-popup ui-body-b ui-overlay-shadow ui-corner-all popup-content" data-theme="b">'+
     '<h3>Alert</h3>'+
     '<p>'+ (tips||'')+'</p>'+
     '<p class="popup-footer"><a href:javascript;>OK</a></p>'+
     '</div>';
      popupWrp.append(shtml);
      popupWrp.appendTo($.mobile.pageContainer);
    }
  }
  $("#saveLogger").on("tap", function() {
    var canSave = true;
    var serial = $('#serial').val();
    if (serial.length !== 4) {
      canSave = false;
      selfPopupShow('schemePage');
    }
    if (!$('#serial').val()) {
      canSave = false;
      selfPopupShow('schemePage');
    }
    selfPopupShow('schemePage');
    return false;
  });
});
$(document).on("pagebeforecreate", "#logger", function() {
  // $("#loggerDayNumber").html(window.localStorage.getItem("day"));
  var loggers = window.localStorage.getItem('day' + window.localStorage.getItem('day'));
  if (loggers) {
    loggers.split(';').forEach(function(item) {
      $('#logListView').append('<li>' + item + '</li>');
    })
  } else {
    $('#logListView').html('');
  }
});
$(document).on("pageshow", "#logger", function() {
  
});
$(document).on("pagecreate", "#logger", function() {
  $("#loggerDayNumber").html(window.localStorage.getItem("day"));
  $("#clearLogs").on("tap", function() {
    window.localStorage.setItem('day' + window.localStorage.getItem('day'), '');
  });
  $("#sendLogs").on("tap", function() {
    window.localStorage.setItem('day' + window.localStorage.getItem('day'), '');
  });
});
