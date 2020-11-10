'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
  authorsListLink: Handlebars.compile(document.querySelector('#template-authorsList-link').innerHTML)
};

const opt = {
  allTitleLinkSelector: '.titles',
  postTitleSelector: '.post-title',
  articleSelector: 'article',
  articleTagsSelector: '.post-tags .list',
  tagsListSelector: '.tags.list',
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.list.authors',
};

function generateTitleLinks(customSelector = '') {

  let titleList = document.querySelector(opt.allTitleLinkSelector);
  let HTMLCompleteContent = '';

  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  for (let eachArticle of articles) {
    const eachArticleId = eachArticle.getAttribute('id');
    const eachArticleTitle = eachArticle.querySelector(opt.postTitleSelector).innerHTML;
    const linkHTMLData = {id: eachArticleId, title: eachArticleTitle};
    const eachHTMLContent = templates.articleLink(linkHTMLData);
    // const eachHTMLContent = '<li><a href="#' + eachArticleId + '">' + eachArticleTitle + '</a></li>';
    HTMLCompleteContent = HTMLCompleteContent + eachHTMLContent;
  }
  titleList.innerHTML = HTMLCompleteContent;

  const titleLinks = document.querySelectorAll(opt.allTitleLinkSelector + ' a');
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

function calculateTagsParams(tags) {
  const result = {};
  const tagsParams = [];
  for(let eachTag in tags) {
    tagsParams.push(tags[eachTag]);
  }
  const min = Math.min(...tagsParams);
  const max = Math.max(...tagsParams);
  result['min'] = min;
  result['max'] = max;
  return result;
}

function calculateTagClass(count, params) {
  const differece = params.max - params.min;
  const firstClass = differece * 0.2;
  const secondClass = differece * 0.4;
  const thirdClass = differece * 0.6;
  const fourthClass = differece * 0.8;
  if(count >= params.min && count < params.min + firstClass) {
    return opt.cloudClassPrefix + '1';
  }
  if(count >= params.min + firstClass && count < params.min + secondClass) {
    return opt.cloudClassPrefix + '2';
  }
  if(count >= params.min + secondClass && count < params.min + thirdClass) {
    return opt.cloudClassPrefix + '3';
  }
  if(count >= params.min + thirdClass && count < params.min + fourthClass) {
    return opt.cloudClassPrefix + '4';
  }
  if(count >= differece) {
    return opt.cloudClassPrefix + '5';
  }
}

function generateTags() {
  /* Create a new variable with an empty object */
  let allTags = {};
  /* find all articles */
  let articles = document.querySelectorAll(opt.articleSelector);
  /* START LOOP: for every article: */
  for (let eachArticle of articles) {
  /* find tags wrapper */
    let currentTagWrapper = eachArticle.querySelector(opt.articleTagsSelector);
    /* make html variable with empty string */
    let currentArticleTagsHtml = '';
    /* get tags from data-tags attribute and split tags into array */
    let dataTags = eachArticle.getAttribute('data-tags').split(' ');
    /* START LOOP: for each tag */
    for (let eachTag of dataTags) {
    /* generate HTML of the link */
      const linkHTMLData = {id: eachTag, tag: eachTag};
      const htmlInner = templates.tagLink(linkHTMLData);
      // const htmlInner = '<li><a href="#tag-' + eachTag + '">' + eachTag + '</a></li> ';
      /* add generated code to html variable */
      currentArticleTagsHtml = currentArticleTagsHtml + htmlInner;
      /* check if this link is not already in allTags */
      // eslint-disable-next-line no-prototype-builtins
      if(!allTags.hasOwnProperty(eachTag)) {
        /* add tag to allTags object */
        allTags[eachTag] = 1;
      } else {
        allTags[eachTag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    currentTagWrapper.innerHTML = currentArticleTagsHtml;
    /* END LOOP: for every article: */
  }
  /*find list of tags in right column */
  const tagList = document.querySelector(opt.tagsListSelector);
  /* create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};
  // let allTagsHTML = '';
  /* START LOOP: for each tag in allTags */
  for(let eachTag in allTags) {
    /* generate code of a link and add it to allTagsHTML */
    const tagSizeClassResult = calculateTagClass(allTags[eachTag], tagsParams);
    allTagsData.tags.push(
      {
        tag: eachTag,
        count: allTags[eachTag],
        tagSizeClass: tagSizeClassResult
      }
    );
    // allTagsHTML += '<li><a href="#tag-' + eachTag + '" class="' + tagSizeClassResult + '">' + eachTag + '</a></li>';
    /* END LOOP */
  }
  /* add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}

generateTags();

function generateAuthors() {
  let articles = document.querySelectorAll(opt.articleSelector);
  let authors = {};
  for (let eachArticle of articles) {
    /* find author wrapper */
    let currentAuthorWrapper = eachArticle.querySelector('.post-author');
    /* get authors from data-authors attribute and split tags into array */
    let dataAuthor = eachArticle.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTMLData = {id: dataAuthor, authorName: dataAuthor};
    const authorHTML = templates.authorLink(linkHTMLData);
    // const authorHTML = '<a href="#author-' + dataAuthor + '">' + dataAuthor + '</a>';
    currentAuthorWrapper.innerHTML = authorHTML;
    // eslint-disable-next-line no-prototype-builtins
    if(!authors.hasOwnProperty(dataAuthor)) {
      authors[dataAuthor] = 1;
    } else {
      authors[dataAuthor]++;
    }
  }
  let authorsList = document.querySelector(opt.authorsListSelector);
  const allAuthorsData = {authors: []};
  // let authorsListHTMLinner = '';
  for( const eachAuthor in authors) {
    allAuthorsData.authors.push(
      {
        authorName: eachAuthor,
        numberOfArticles: authors[eachAuthor]
      }
    );
    // const currentAuthorHTML = '<li><a href="#"><span class="author-name">' + eachAuthor + ' (' + authors[eachAuthor] + ')' + '</span></a></li>';
    // authorsListHTMLinner += currentAuthorHTML;
  }
  authorsList.innerHTML = templates.authorsListLink(allAuthorsData);
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
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('article .post-author');
  for(let eachLink of authorLinks) {
    eachLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
