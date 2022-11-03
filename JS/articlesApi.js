/*
    API [URL] =>  https://jsonplaceholder.typicode.com/comments
*/
let currentArticlesIndex = 0;
let COMMENTS;

async function getArticles() {
    let data = await fetch(`https://jsonplaceholder.typicode.com/comments`);

    return data.json();
}

(async _ => {
    COMMENTS = await getArticles();
    setArticles(8);
})();


function setArticles(artNum = 8) {
    artNum += currentArticlesIndex;

    let fragm = '';

    while (currentArticlesIndex != artNum) {
        fragm += createArticle(COMMENTS[currentArticlesIndex]);

        currentArticlesIndex++;
    }

    window['articles-body'].innerHTML += fragm;
}

// Create Comment 
function createArticle({ body, email, name, postId }) {
    let comment = `
        <div>
            <div class="article card">
            <img src="./IMGs/cat-0${Math.floor(Math.random() * 8) || 1}.jpg" class="card-img-top" alt="${postId}">

            <div class="card-body py-4">
                <h5 class="card-title" title="${name}">
                    ${name}
                </h5>
                <p class="card-text text-muted px-2 mt-3">
                ${body}
                </p>
            </div>

            <a href="mailto:${email}?subject='about article'" title="${email}"
            class="card-footer bg-white d-flex justify-content-between align-items-center py-4 py-md-3 px-4">
                <p class="text-capitalize fw-bold text-primary mb-0">Message Me</p>
                <i class="fas fa-long-arrow-alt-right text-primary"></i>
            </a>
            </div>
        </div>
    `
    return comment;
}

// Add More Articles
articlesMore.addEventListener('click', _ => setArticles());