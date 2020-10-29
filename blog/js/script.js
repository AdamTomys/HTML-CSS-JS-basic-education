'use strict';

const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

function generateTitleLinks() {
    /* remove contents of titleList */
    let titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = "";
    let html = "";
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let eachArticle of articles) {
        /* get the artile id */
        const eachArticleId = eachArticle.getAttribute("id");
        console.log(eachArticleId);
        /* find and get the title element */
        const eachArticleTitle = eachArticle.querySelector(optTitleSelector).innerHTML;
        console.log(eachArticleTitle);
        /* create HTML of the link */
        const linkHTML = "<li><a href='#" + eachArticleId + "'><span>" + eachArticleTitle + "</span></a></li>";
        /* insert link into titleList */
        html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
        link.addEventListener('click', titleClickHandler);
    }
}

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let link of activeLinks) {
        link.classList.remove("active");
    }

    /* add class 'active' to the clicked link */
    console.log(clickedElement);
    clickedElement.classList.add("active");

    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll("article.active");
    for (let article of activeArticles) {
        article.classList.remove("active");
    }

    /* get 'href' attribute from the clicked link */
    let clickedArticleHref = clickedElement.getAttribute("href");

    /* find the correct article using the selector (value of 'href' attribute) */
    let newArticle = document.querySelector(clickedArticleHref);

    /* add class 'active' to the correct article */
    newArticle.classList.add("active");
}

generateTitleLinks();



