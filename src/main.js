import './style.scss';
import $ from 'jquery';


(function(){
  TopGames();
  $('.btn-1').on('click', function(){
    $(".row").empty();
    TopGames();
  });
  $('.btn-2').on('click', function(){
    $(".row").empty();
    changeToLiveStreams()
  });

  function TopGames(){
    $.ajax({
      url:'https://api.twitch.tv/helix/games/top',
      method:'get',
      dataType:'json',
      data:{},
      headers:{'Client-ID':'yhv54xfjqv18wkh4uvdxm6g85ga1hi'}
    }).done(function(res){
      console.log(res);
      const streams = res.data;
      for(const gameTop of streams){
      $('.row').append(getColumn(gameTop));
      console.log(gameTop);
      }
    }).fail(function(err){
      console.log(err);
    });
    function getColumn(data) {
      let newurl = data.box_art_url
      .replace("{width}",'200')
      .replace("{height}",'200');
      data.box_art_url = newurl;
    return `
    <div class="column">  
    <div class="preview">
    <a class="link" href="https://www.twitch.tv/directory/game/${data.name}"  target="_blank">
    <img src="${data.box_art_url}"/>
    </a>
    </div>
      <div class="bottom"> 
        <h4 class="game-name">
        ${data.name}
        </h4>
        <a class="link" href="https://www.twitch.tv/directory/game/${data.name}" target="_blank">
          <button class="game-streams">
            ${data.name} Streams
          </button>
        </a>
      </div>
    </div>
      `;
    }
  }
 
  function changeToLiveStreams(){
    $.ajax({
      url:'https://api.twitch.tv/helix/streams',
      method:'get',
      dataType:'json',
      data:{},
      headers:{'Client-ID':'yhv54xfjqv18wkh4uvdxm6g85ga1hi'}
    }).done(function(res){
      console.log(res);
      const item = res.data;
      for(const LiveStreams of item){
        $('.row').append(getLiveColumn(LiveStreams));
      }
    }).fail(function(err){
      console.log(err);
    })

    function getLiveColumn(data) {
      let newurl = data.thumbnail_url
      .replace("{width}",'200')
      .replace("{height}",'200');
      data.thumbnail_url = newurl;
    return `
  <div class="column">
    <div class="preview">
    <a class="link" href="https://www.twitch.tv/${data.user_name}" target="_blank">
      <img src="${data.thumbnail_url}"/>
      </a>
    </div>
      <div class="bottom"> 
        <h4 class="game-name">
        ${data.user_name}
        </h4>
        <p class="viewer">
        ${data.viewer_count} live viewers
        </p>
        <a class="link" href="https://www.twitch.tv/${data.user_name}" target="_blank">
          <button class="game-streams">
            ${data.user_name}'s stream
          </button>
        </a>
      </div>
  </div>
      `;
    }
    
  }
})();
