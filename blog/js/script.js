"use strict"

generateTitleLinks();

function generateTitleLinks() {

    const optAllTitleLinkSelector = ".titles",
        optPostTitleSelector = ".post-title",
        optEachArticleSelector = "article";

    let titleList = document.querySelector(optAllTitleLinkSelector);
    let HTMLCompleteContent = "";

    const articles = document.querySelectorAll(optEachArticleSelector);
    for (let eachArticle of articles) {
        const eachArticleId = eachArticle.getAttribute("id");
        const eachArticleTitle = eachArticle.querySelector(optPostTitleSelector).innerHTML;
        const eachHTMLContent = "<li><a href='#" + eachArticleId + "'>" + eachArticleTitle + "</a></li>";
        HTMLCompleteContent = HTMLCompleteContent + eachHTMLContent;
    }
    titleList.innerHTML = HTMLCompleteContent;

    const titleLinks = document.querySelectorAll(optAllTitleLinkSelector + " a");
    for (let eachLink of titleLinks) {
        eachLink.addEventListener("click",displayCorrectArticle);
    }

}

function displayCorrectArticle(event) {

    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let link of activeLinks) {
        link.classList.remove("active");
    }
    clickedElement.classList.add("active");
    const activeArticle = document.querySelector("article.active");
    activeArticle.classList.remove("active");
    const newArticleId = clickedElement.getAttribute("href");
    let newArticle = document.querySelector(newArticleId);
    newArticle.classList.add("active");

}