const formname = document.getElementById("news-search");
const searchnews = document.getElementById("searchnews");
const newsadd = document.getElementById("news-articles");


const Key = "c0cb9e7b6589474c8c1a2d08d81f048c";
const Search_URL = "https://newsapi.org/v2/everything?q="

async function getNews(url) {
    const res = await fetch(url);
    const data = await res.json();
    showNews(data.articles);
}

function showNews(data) {
    newsadd.innerHTML = ``;
    data.forEach(news => {
        const { author, title, description, url, urlToImage, publishedAt, content } = news;
        const newsdata = document.createElement('div');
        newsdata.classList.add('col-sm-5');
        newsdata.classList.add('news-article');

        newsdata.innerHTML = `
        <img src=${urlToImage} alt="">
        <div>
            <h3>${title}</h3>
            <p>${description}</p>
                <div style="display: flex;">
                    <p><small>${publishedAt}</small></p>
                    <a href=${url}>Full Article</a>
                </div>
        </div>
        `
        newsadd.appendChild(newsdata);
    })
}

function SearchNews() {
    const query = searchnews.value;
    console.log(query);

    if (query) {
        getNews(Search_URL + query + "&apiKey=" + Key);
    }
    else {
        getNews(Search_URL + "all" + "&apiKey=" + Key);
    }
}