// //vanilla.js 原生Js

// let LANG = 'zh-tw';
// let isLoading = false;
// let nowIndex= 0;
// const container = document.querySelector('.row');
// const title = document.getElementById('title');
// const chBtn = document.getElementById('ch-btn');
// const enBtn =document.getElementById('en-btn');
// const koBtn =document.getElementById('ko-btn');

// chBtn.addEventListener('click', function(){
//   changeLang('zh-tw');
// });

// enBtn.addEventListener('click', function(){
//   changeLang('en');
// });


// koBtn.addEventListener('click', function(){
//   changeLang('ko');
// });

// function changeLang(lang){
//   title.textContent = window.I18N[lang]['TITLE'];
//   LANG = lang;
//   container.innerHTML = '';
//   appendData(LANG);
 
// }
// function getData(lang, cb){
//   const clientId = 'yhv54xfjqv18wkh4uvdxm6g85ga1hi';
//   const limit = 20;
//   isLoading = true;

  
// var request = new XMLHttpRequest();
// request.open('GET', `https://api.twitch.tv/kraken/streams/?client_id=${clientId}&game=League%20of%20Legends&limit=${limit}&offset=${nowIndex}&language=${lang}`,true);
// request.onload = function(){
//   if(request.readyState === 4  && request.status === 200) {
//     let resp = JSON.parse(request.responseText);
//     cb(null, resp);
//     console.log(resp);
//   }else {
//    cb(1);
//   }
// };
// request.send();
//  }

// function appendData(lang){
//   getData(lang,(err, data) => {
//     // const {streams} = data;
//       const streams = data.streams;
//       if(err){
//         console.log(err);
//       }else{
//         const $row = document.querySelector('.row');
//         for(let stream of streams) {
//           const div =document.createElement('div');
//           $row.appendChild(div);
//           div.outerHTML = getColumn(stream);
//         }  
//         nowIndex +=10;
//         isLoading = false;
//       }
     
//   });
// }

// document.addEventListener('DOMContentLoaded',function(){
//   appendData(LANG);
//   window.addEventListener('scroll',function(){
//    let scrollHeight = document.documentElement.scrollTop;
//         // 所見畫面視窗的高度
//         let windowInnerHeight = window.innerHeight;
//         // 實際頁面總高
//         let totalHeight = document.documentElement.scrollHeight;
//         // 判斷頁面滑到快底部時，及觸發裡面的程式
//         if (scrollHeight + windowInnerHeight >= totalHeight - 200) {
//       if(!isLoading){
//         appendData(LANG);
//       }
//     }
//   });
// });
//   // return 每一個 col 的 html
// function getColumn(data) {
//   return `
//   <div class="column">
//     <div class="preview">
//     <a class="link" href="${data.channel.url}" target="_blank">
//     <img src="${data.preview.large}"/>
//     </a>
//     <div class="live-tag">
//     <i class="fas fa-circle"></i>
//       ${data.stream_type}
//     </div>
//     <div class="views">
//       ${turnToK(data.viewers)} viewers
//     </div>
   
//     </div>
//     <div class="bottom"> 
//       <div class="logo">
//         <img src="${data.channel.logo}" />
//       </div>
//       <div class="description">
//         <div class="title">
//           <a class="link" href="${data.channel.url}" target="_blank">
//             ${data.channel.status}
//           </a>   
//         </div>
//         <div class="name">
//           <a class="link" href="${data.channel.url}/videos" target="_blank">
//             ${data.channel.display_name}
//           </a>   
//         </div>
//         <div class="game-name">
//         ${data.game}
//         </div>   
//       </div>
//     </div>
//   </div>
//     `;
//   }


// function intlFormat(num)
// {
//   return new Intl.NumberFormat().format(Math.round(num*10)/10);
// }
// function turnToK(num)
// {
//   if(num >= 1000000)
//     return `${intlFormat(num/1000000)}M`;  
//     //return intlFormat(num/1000000)+'M';  ES5
//   if(num >= 1000)
//     return `${intlFormat(num/1000)}K`;
//     //return intlFormat(num/1000)+'K'; ES5
//     return `${intlFormat(num)}`;
// }






let LANG  = 'zh-tw';
let isLoading = false;
let nowIndex= 0;

function changeLang(lang){
  $('.menu #language-change').text(window.I18N[lang]['TITLE']);
  LANG = lang;
  $('.row').empty();
  $('.sidebar-bottom').empty();
  nowIndex= 0;
  appendData(LANG);
  appendSideBarData();
}
$('#ch-btn').on('click',function(){
  changeLang('zh-tw');
  
});
$('#en-btn').on('click',function(){
  changeLang('en'); 
});

$('#ko-btn').on('click',function(){
  changeLang('ko'); 
});


function getData(lang,cb){
    const clientId = 'yhv54xfjqv18wkh4uvdxm6g85ga1hi';
    const limit = 12;
    isLoading = true;
    $.ajax({
      type: "GET",
      async: true,
      //21779
      //url:'https://api.twitch.tv/helix/streams/',
       url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=League%20of%20Legends&offset='+ nowIndex + '&limit=' + limit + '&language=' + lang ,
      //headers:{'Client-ID': clientId},
      success: (response) => {
        console.log(response);
        cb(null, response);
      },
      error: (err) => {
        cb(err);
      }
    })
  }
  function appendData(lang){
    
  getData(lang,(err, data) => {
    // const {streams} = data;
    if (err) {

    } else {
      
      const streams = data.streams;
      
      const $row = $('.row');
      const $sidebar =$('.sidebar-bottom');
      const count = streams.length - 6; //要顯示6個 一開始limit是12  12-6=6
      for(const stream of streams) {
        $row.append(getColumn(stream));
        
      }  
      // for(let i=0;i<count;i++){
      //   $sidebar.append(getSideBar(streams[i]));
      // }

      nowIndex +=12; 
      isLoading = false;
    }
  });
}



$(document).ready(function(){
    appendData(LANG);
    
    $(window).scroll(function(){
      if($(window).scrollTop() + $(window).height() > $(document).height() -200) {
        if(!isLoading){
          appendData(LANG);
        }
      }  
  })
});

 // return 每一個 col 的 html
 function getColumn(data) {
  return `
  <div class="column">
    <div class="preview">
    <a class="link" href="${data.channel.url}" target="_blank">
    <div class="plaecholder"></div>
    <img src="${data.preview.large}"/>
    </a>
    <div class="live-tag">
    <i class="fas fa-circle"></i>
      ${data.stream_type}
    </div>
    <div class="views">
      ${turnToK(data.viewers)} viewers
    </div>
   
    </div>
    <div class="bottom"> 
      <div class="logo">
        <img src="${data.channel.logo}" />
      </div>
      <div class="description">
        <div class="title">
          <a class="link" href="${data.channel.url}" target="_blank">
            ${data.channel.status}
          </a>   
        </div>
        <div class="name">
          <a class="link" href="${data.channel.url}/videos" target="_blank">
            ${data.channel.display_name}
          </a>   
        </div>
        <div class="game-name">
        ${data.game}
        </div>   
      </div>
    </div>
  </div>
    `;
  }
  function intlFormat(num)
  {
    return new Intl.NumberFormat().format(Math.round(num*10)/10);
  }
  function turnToK(num)
  {
    if(num >= 1000000)
      return `${intlFormat(num/1000000)}M`;  
      //return intlFormat(num/1000000)+'M';  ES5
    if(num >= 1000)
      return `${intlFormat(num/1000)}K`;
      //return intlFormat(num/1000)+'K'; ES5
      return `${intlFormat(num)}`;

  }

/*左邊sidebar的資料獲取*/ 
appendSideBarData();

function getSideBarData(callb){
  const clientId = 'yhv54xfjqv18wkh4uvdxm6g85ga1hi';
  const limit = 6;
  $.ajax({
    type: "GET",
    async: true,
     url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&limit=' + limit ,
    success: (res) => {
      console.log('這是'+res);
      callb(null, res);
    },
    error: (err) => {
      callb(err);
    }
  })
}
function appendSideBarData(){
getSideBarData((err, data) => {
  // const {streams} = data;
  if (err) {

  } else {
    const streamm = data.streams;
    const $sidebar =$('.sidebar-bottom');
    for(const strea of streamm){
      $sidebar.append(getSideBar(strea));
    }
  }
});
}

function getSideBar(data) {
  return `
  <div class="side">
  <a class="link" href="${data.channel.url}" target="_blank">
    <div class="side-logo"><img src="${data.channel.logo}" /></div>
    <div class="side-info">
      <div class="side-title">${data.channel.display_name}</div>
      <div class="side-game">${data.game}<div class="side-view"><i id="circle" class="fas fa-circle"></i>${
      parseInt(data.viewers).toLocaleString()}</div></div>
      
    </div> 
  </a>   
  </div>
  `;
}


$('.show-and-hide-btn').on('click', function () {
  $('.row-container').toggleClass('row-container-active');
  $('.left').toggleClass('left-active');
  $('.sidebar-top').toggleClass('sidebar-top-active');
  $('.side-info').toggleClass('side-info-active');
  $('.fa-caret-right').toggleClass('fa-caret-right-active');
  $('.fa-caret-left').toggleClass('fa-caret-left-active');
});
