import './news-article.js';
import { topHeadlinesUrl } from './newsApi.js';

function signup(){
  console.log('singup ::::::::');
  var login=document.querySelector('#login');
  var signup=document.querySelector('#signup');
  login.style.width='0';
  login.style.display='none';
  login.style.transition='.3s';
  signup.style.width='100%';
  signup.style.transition='.3s'; 
}
var login = function(){
  console.log('login ::::::::');
  var login=document.querySelector('#login');
  var signup=document.querySelector('#signup');
  login.style.width='100%';
  login.style.display='block';
  login.style.transition='.3s';
  signup.style.display='none';
  signup.style.transition='.3s'; 
  // body...
};

$("#account").click(function (){
  login();
});

var d = new Date().toString();
//var str = "Thu Mar 12 2020 03:12:55 GMT+0530 (India Standard Time)";
var res = d.split(" G");
var x = res[0].slice(0, res[0].length - 3);
document.getElementById("demo").innerHTML = x;

var lastValue = '';
$("#search").on('change keyup paste', function() {
    if ($(this).val() != '' && $(this).val() != lastValue) {
      $("main").empty();
        lastValue = $(this).val();
        console.log('The text box really changed this time',lastValue);
        getNews(null, null, true, lastValue);
    }else if($(this).val() == ''){
      $("main").empty();
      var country = 'in';
      categories.forEach((category) => {
        getNews(category, country, false, null);
      });
    }
});

//const categories = ['business','entertainment','general','health','science','sports','technology'];
const categories = ['general','sports','science','technology','business','entertainment','health'];

var country = 'in';

$('#countries').change(function(){
  $("main").empty();
  country = $(this).val();
  categories.forEach((category) => {
    getNews(category, $(this).val(), false);
  });
})

window.addEventListener('load', () => {
  var e = document.getElementById("countries");
  //var country = e.options[e.selectedIndex].value;
  categories.forEach((category, index) => {
    // if(index == 0){
    //   $( "#accordionExample" ).append(
    //     '<div class="card">'+
    //       '<div class="card-header" id="heading"'+index+'">'+
    //         '<h2 class="mb-0">'+
    //         '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'+index+'" aria-expanded="true" aria-controls="collapse'+index+'">'+category+
    //         '</button>'+
    //         '</h2>'+
    //       '</div>'+
    //       '<div id="collapse'+index+'" class="collapse show" aria-labelledby="heading'+index+'" data-parent="#accordionExample">'+
    //       '</div>'+
    //     '</div>'
    //   );
    // }else{
      var x = getNews(category, country, false, null, index);
      if(index == 0){
        $('#accordionExample').append(
          '<div class="card">'+
            '<div class="card-header" id="heading"'+index+'">'+
              '<h2 class="mb-0">'+
                '<button style="text-transform: capitalize;" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'+index+'" aria-expanded="true" aria-controls="collapse'+index+'">'+
                  category+
                '</button>'+
              '</h2>'+
            '</div>'+
            '<div id="collapse'+index+'" class="collapse show" aria-labelledby="heading'+index+'" data-parent="#accordionExample">'+
              //'<div class="card-body">'+
                //x+
              //'</div>'+
            '</div>'+
          '</div>'
        );
      }else{
        $('#accordionExample').append(
          '<div class="card">'+
            '<div class="card-header" id="heading"'+index+'">'+
              '<h2 class="mb-0">'+
                '<button style="text-transform: capitalize;" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'+index+'" aria-expanded="true" aria-controls="collapse'+index+'">'+
                  category+
                '</button>'+
              '</h2>'+
            '</div>'+
            '<div id="collapse'+index+'" class="collapse" aria-labelledby="heading'+index+'" data-parent="#accordionExample">'+
              //'<div class="card-body">'+
                //x+
              //'</div>'+
            '</div>'+
          '</div>'
        );
      }
    //}
  });
  registerSW();
});

async function getNews(category, country, isSearched, searchTxt, index) {
  var res;
  if(isSearched){
    res = await fetch('http://newsapi.org/v2/everything?qInTitle='+searchTxt+'&apiKey=45b42b4a800c4b6cb7da2ce682ad6866&pageSize=100');
  }else{
    res = await fetch('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey=45b42b4a800c4b6cb7da2ce682ad6866&category='+category+'&pageSize=7');
  }
  const json = await res.json();

  const main = document.querySelector('#collapse'+index);
  var para = document.createElement("div");
  para.style.cssText = 'text-align: center; font-style: italic; margin-top: 89px; font-size: 51px; background-color: antiquewhite;';
  var node = document.createTextNode(category || 'Search by: '+lastValue);
  para.appendChild(node);
  //main.appendChild(para);
  if (json.articles.length == 0) {
    let noRes = document.createElement("div");
    noRes.style.cssText = 'text-align: center; font-style: italic; margin-top: 89px; font-size: 51px; background-color: antiquewhite;';
    let node = document.createTextNode('No results found. Try other search.');
    noRes.appendChild(node);
    main.appendChild(noRes);
  } else {
    json.articles.forEach(article => {
      const el = document.createElement('news-article');
      el.article = article;
      main.appendChild(el);
    });
  }

  return main;
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}
