var getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var videoId = window.location.href.match(/id_(.*).html/)[1];

var player = new YKU.Player('player',{
  styleid: '0',
  client_id: 'c8031340c8cbe983',
  vid: videoId,
  autoplay: true,
  events:{
    onPlayerReady: function(){
    },
    onPlayStart: function(){
      var time = getParameterByName('jump')
      if (!time) time = 0;
      seekTo(time)
    },
    onPlayEnd: function(){
    }
  }
});
function seekTo(s){
  player.seekTo(s);
}
function playVideo(){
  player.playVideo();
}
function pauseVideo(){
  player.pauseVideo();
}
function currentTime(){
  return player.currentTime();
}
