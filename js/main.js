$(document).ready(function() {

  var twitchChannels = (function(){
    // list of programming related channels
    var channelNames = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "OgamingSC2", "ESL_SC2", "brunofin", "comster404", "cohhcarnage"];

    // channel object template
    var channelTemplate = {
      name: "",
      description: "",
      status: "",
      link: "",
      image: ""
    };

    // cache DOM
    var $channelHTML = $("#channel-template").html();
    var $btnAll = $("#btn-all");
    var $btnOnline = $("#btn-online");
    var $btnOffline = $("#btn-offline");
    var $mainWrapper = $("#main-wrapper");

    // bind events
    $btnAll.on("click", function(e) {
      $mainWrapper.children().each(function() {
        $(this).show();
      });
      $(e.target).addClass('btn-active').siblings().removeClass('btn-active');
    });

    $btnOnline.on("click", function(e) {
      $mainWrapper.children().each(function(index, value) {
        if ($(this).text().match(/Channel offline|Account closed/)) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
      $(e.target).addClass('btn-active').siblings().removeClass('btn-active');
    });

    $btnOffline.on("click", function(e) {
      $mainWrapper.children().each(function() {
        if ($(this).text().match(/Channel offline|Account closed/)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
      $(e.target).addClass('btn-active').siblings().removeClass('btn-active');
    });

    // get streams info from twitch.tv
    function getStreamsInfo() {
      for (var i = 0; i < channelNames.length; i++) {
        $.getJSON("https://api.twitch.tv/kraken/streams/" + channelNames[i] + "?callback=?" , parseStreamsInfo);
      }
    }

    // parse streams info received and render on screen
    function parseStreamsInfo(data) {
      // create new object from channelTemplate
      var channel = Object.create(channelTemplate);
      // populate object properties
      if (data.error == "Unprocessable Entity") {
        channel.name = data.message.slice(data.message.indexOf("'") + 1, data.message.lastIndexOf("'"));
        channel.description = "Account closed";
        channel.image = "./img/twitch-logo.png";
        channel.link = "https://secure.twitch.tv";
        // render closed Account
        render(channel);
      } else {
        channel.name = data._links.self.slice(data._links.self.lastIndexOf("/") + 1);
        if (data.stream !== null) {
          channel.description = data.stream.channel.status;
          channel.link = data.stream.channel.url;
          channel.image = data.stream.channel.logo;
          // if stream is online we have all the information
          render(channel);
        } else {
          $.getJSON(data._links.channel, parseChannelData.bind(channel)); // if stream is offline get channel info to obtain remaining info
        }
      }
    }

    // parse channel info received and render on screen
    function parseChannelData(channel, status , data) {
      channel.description="Channel offline";
      channel.link = data.responseJSON.url;
      if (data.responseJSON.logo !== null) {
        channel.image = data.responseJSON.logo;
      } else {
        channel.image = "./img/twitch-logo.png";
      }
      // now we have all the info fir these too
      render(channel);
    }

    // display information on screen
    function render(channel) {
        $mainWrapper.append(Mustache.render($channelHTML, channel));
    }

    return {
      init: getStreamsInfo
    };
  })();

  // render information received
  twitchChannels.init();
});
