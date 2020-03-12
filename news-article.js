class NewsArticle extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }
  set article(article) {
    this.root.innerHTML = `
          <style>
           h2 {
            font-family: Georgia, 'Times New Roman', Times, serif;
            width: 30%;
          }
          
           a,
           a:visited {
            text-decoration: none;
            color: inherit;
          }
          
           img {
            width: 30%;
          }
          </style>
          <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage ? article.urlToImage : ''}">
          </a>`;
  }
}

customElements.define('news-article', NewsArticle);
