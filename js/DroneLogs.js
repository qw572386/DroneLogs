$(document).on("pagecreate", "#app", function() {
  $("#dayList").on("tap", "li", function() {
    window.localStorage.setItem("day", $(this).index() + 1);
  });
});
$(document).on("pageshow", "#editLog", function() {
  $("#dayNumber").html(window.localStorage.getItem("day"));
});
$(document).on("pagecreate", "#editLog", function() {
  var dateFormat = function (fmt,date) { 
    var o = {   
      "M+" : date.getMonth()+1,
      "d+" : date.getDate(),
      "h+" : date.getHours(),
      "m+" : date.getMinutes(),
      "s+" : date.getSeconds(),
      "q+" : Math.floor((date.getMonth()+3)/3),
      "S"  : date.getMilliseconds() 
    };   
    if(/(y+)/.test(fmt)) 
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
      if(new RegExp("("+ k +")").test(fmt))   
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
  }
  var random = function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
  }
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
    if ($('#serial').val().length !== 4) {
      alert('Drone id code must be 4 numbers');
      canSave = false;
    }
    if (!$('#pilot').val()) {
      alert('Drone pilot must be a non empty name string');
      canSave = false;
    }
    if (canSave) {
      var currentDay = window.localStorage.getItem('day');
      var logData = window.localStorage.getItem('day' + currentDay) || '';
      var newLog = dateFormat('M/d/yyyy hh:mm:ss', new Date()) + ',' + random(-180, 180) + ',' + random(-180, 180) + ',' + $('#serial').val() + ',' + $('#pilot').val() + ',' + $('#key').val() + ',' + $('#contract').val() + ',' + $('#category').val();
      if (logData) {
        window.localStorage.setItem('day'+currentDay, logData + ';' + newLog);
      } else {
        window.localStorage.setItem('day'+currentDay, newLog);
      }
      $("#logForm")[0].reset();
      alert('Log saved');
    } else {
      alert('Log not saved. Please fix problems and try again.');
    }
    return false;
  });
});
$(document).on("pageshow", "#logger", function() {
  var currentDay = window.localStorage.getItem('day');
  $("#loggerDayNumber").html(currentDay);
  var loggers = window.localStorage.getItem('day' + currentDay);
  if (loggers) {
    loggers.split(';').forEach(function(item) {
      $('#logListView').append('<li>' + item + '</li>');
    })
  } else {
    $('#logListView').html('');
  }
});
$(document).on("pagecreate", "#sendConfirm", function() {
  $("#ensureSend").on("tap", function() {
    alert('Logs send');
    window.location.href="#editLog";
  });
});
