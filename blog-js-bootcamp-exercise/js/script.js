'use strict';

function generateTitleLinks(customSelector = '') {

  const optAllTitleLinkSelector = '.titles',
    optPostTitleSelector = '.post-title',
    optEachArticleSelector = 'article';

  let titleList = document.querySelector(optAllTitleLinkSelector);
  let HTMLCompleteContent = '';

  const articles = document.querySelectorAll(optEachArticleSelector + customSelector);
  for (let eachArticle of articles) {
    const eachArticleId = eachArticle.getAttribute('id');
    const eachArticleTitle = eachArticle.querySelector(optPostTitleSelector).innerHTML;
    const eachHTMLContent = '<li><a href=\'#' + eachArticleId + '\'>' + eachArticleTitle + '</a></li>';
    HTMLCompleteContent = HTMLCompleteContent + eachHTMLContent;
  }
  titleList.innerHTML = HTMLCompleteContent;

  const titleLinks = document.querySelectorAll(optAllTitleLinkSelector + ' a');
  for (let eachLink of titleLinks) {
    eachLink.addEventListener('click', displayCorrectArticle);
  }

}

generateTitleLinks();

function displayCorrectArticle(event) {

  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let link of activeLinks) {
    link.classList.remove('active');
  }
  clickedElement.classList.add('active');
  const activeArticle = document.querySelector('article.active');
  activeArticle.classList.remove('active');
  const newArticleId = clickedElement.getAttribute('href');
  let newArticle = document.querySelector(newArticleId);
  newArticle.classList.add('active');
  addClickListenersToTags();
}

const optArticleSelector = 'article',
  optArticleTagsSelector = '.post-tags .list';

function generateTags() {
  /* find all articles */
  let articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let eachArticle of articles) {
  /* find tags wrapper */
    let currentTagWrapper = eachArticle.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let currentArticleTagsHtml = '';
    /* get tags from data-tags attribute and split tags into array */
    let dataTags = eachArticle.getAttribute('data-tags').split(' ');
    /* START LOOP: for each tag */
    for (let eachTag of dataTags) {
    /* generate HTML of the link */
      const htmlInner = '<li><a href="#tag-' + eachTag + '">' + eachTag + '</a></li> ';
      /* add generated code to html variable */
      currentArticleTagsHtml = currentArticleTagsHtml + htmlInner;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    currentTagWrapper.innerHTML = currentArticleTagsHtml;
    /* END LOOP: for every article: */
  }
}

generateTags();

function generateAuthors() {
  let articles = document.querySelectorAll(optArticleSelector);
  for (let eachArticle of articles) {
    /* find author wrapper */
      let currentAuthorWrapper = eachArticle.querySelector('.post-author');
      /* get authors from data-authors attribute and split tags into array */
      let dataAuthor = eachArticle.getAttribute('data-author');
      /* generate HTML of the link */
      const authorHTML = '<a href="#author-' + dataAuthor + '">' + dataAuthor + '</a>';
      currentAuthorWrapper.innerHTML = authorHTML;
    }
}

generateAuthors();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  let tagLinks = document.querySelectorAll('article.active .post-tags .list a.active');
  /* START LOOP: for each active tag link */
  for(let eachTag of tagLinks) {
  /* remove class active */
    eachTag.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const filteredTags = document.querySelectorAll('.post-tags .list a');
  /* START LOOP: for each found tag link and add class active to it */
  for (let eachFilteredTag of filteredTags) {
    if(eachFilteredTag.getAttribute('href') == href) {
      eachFilteredTag.classList.add('active');
      /* END LOOP: for each found tag link */
    }
  }
/* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('article .post-tags .list a');
  console.log(tagLinks);
  /* START LOOP: for each link */
  for(let eachTagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    eachTagLink.addEventListener('click', tagClickHandler);
  }
}

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this.querySelector('a');
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  console.log(author);
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('article .post-author');
  for(let eachLink of authorLinks) {
    eachLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
