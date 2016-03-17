$(document).ready(function() {

  var twitchChannels = (function(){
    // list of programming related channels
    var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

    // cache DOM

    // bind events

    // get channels info from twitch.tv
    function getChannelsInfo() {
      // for each element in channels
      $.getJSON("https://api.twitch.tv/kraken/streams/freecodecamp?callback=?" , parseInfo);
    }

    // parse info received and store it in array of objects
    function parseInfo(data) {
      // push object with info into array
    }

    function render() {
      // render list of channels
    }

  })();

  // render information received
  twitchChannels.render();

  // ####### OLD CODE ########## //
  //for (var i = 0; i < channels.length; i++) {
    //console.log('https://api.twitch.tv/kraken/streams/' + channels[i] + '?callback=?');
    //$.getJSON('https://api.twitch.tv/kraken/streams/' + channels[i] + '?callback=?', function(data) {
      //console.log(channels[i], data._links.channel);
    //});
  //}
});
