import './style.scss';
function changetoTopGames(){
  $('.row').empty();
  appendData();
}
function changetoTopLiveStreams(){
  $('.row').empty();
  appendLiveData();
}
$('.btn-1').on('click',function(){
  changetoTopGames();
});
$('.btn-2').on('click',function(){
  changetoTopLiveStreams();
});

function getData(cb){
    const clientId = 'yhv54xfjqv18wkh4uvdxm6g85ga1hi';
    $.ajax({
      type: "GET",
      async: true,
      url: 'https://api.twitch.tv/helix/games/top',
      headers:{'Client-ID': clientId},
      success: (response) => {
        // console.log(response); 
        cb(null, response);
      },
      error: (err) => {
        cb(err);
      }
    })
  }
  function appendData(){
  getData((err, data) => {
    if (err) {
      console.log('err');
    } else {
      const streams = data.data;
      const $row = $('.row');
      for(const stream of streams) {
        $row.append(getColumn(stream));
      }  
    }
  });
}
$(document).ready(function(){
    appendData();
  //   $(window).scroll(function(){     無限滾動
  //     if($(window).scrollTop() + $(window).height() > $(document).height() -200) {
  //       if(!isLoading){
  //         appendData(); 
  //       }
  //     }  
  // })
});
 // return 每一個 col 的 html
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

  
  /*TOP LIVE GAMES*/ 
  function getLiveData(cb){
    const clientId = 'yhv54xfjqv18wkh4uvdxm6g85ga1hi';
    $.ajax({
      type: "GET",
      async: true,
      url: ' https://api.twitch.tv/helix/streams',
      headers:{'Client-ID': clientId},
      success: (response) => {
        console.log(response);
        cb(null, response);
      },
      error: (err) => {
        cb(err);
      }
    })
  }
  function appendLiveData(){
    
  getLiveData((err, data) => {
    if (err) {
      console.log('err');
    } else {
      const streams = data.data;
      const $row = $('.row');
      for(const stream of streams) {
        $row.append(getLiveColumn(stream));
      }  
    }
  });
}
 // return 每一個 col 的 html
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
  



