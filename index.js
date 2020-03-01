import './news-article.js';
import { topHeadlinesUrl } from './newsApi.js';

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
  categories.forEach((category) => {
    getNews(category, country, false);
  });
  registerSW();
});

async function getNews(category, country, isSearched, searchTxt) {
  var res;
  if(isSearched){
    res = await fetch('http://newsapi.org/v2/everything?qInTitle='+searchTxt+'&apiKey=45b42b4a800c4b6cb7da2ce682ad6866&pageSize=100');
  }else{
    res = await fetch('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey=45b42b4a800c4b6cb7da2ce682ad6866&category='+category+'&pageSize=7');
  }
  const json = await res.json();

  const main = document.querySelector('main');
  var para = document.createElement("div");
  para.style.cssText = 'text-align: center; font-style: italic; margin-top: 89px; font-size: 51px; background-color: antiquewhite;';
  var node = document.createTextNode(category || 'Search by: '+lastValue);
  para.appendChild(node);
  main.appendChild(para);
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
