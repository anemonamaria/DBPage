// Declare main variable - get main element by id
let overlay = document.querySelector('.modal-overlay');

let addArticle = document.getElementById('addArticle');
let saveBttn = document.getElementById('save');
let cancelBttn = document.getElementById('cancel');
let body = document.getElementById('body');
let main = document.getElementById('main');

let titleElem = document.getElementById('titleF');
let tagElem = document.getElementById('tagF');
let authorElem = document.getElementById('authorF');
let dateElem = document.getElementById('dateF');
let imgElem = document.getElementById('imageF');

let contentElem = document.getElementById('contentF');
document.getElementById('addArticle').addEventListener('click', function () {
    overlay.classList.add('modal-visible');
});
document.getElementById('EDITButton').addEventListener('click', function () {
    overlay.classList.add('modal-visible');
});
document.getElementById('cancel').addEventListener('click', function () {
    overlay.classList.remove('modal-visible')
});


// Fetch the articles list
function getArticlesFromServer() {
    fetch('http://localhost:3000/articles')
        .then(function (response) {
            response.json().then(function (articles) {
                renderArticles(articles);
            });
        });
};

// Add article
function addArticleToServer() {
    fetch('http://localhost:3000/articles', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            title: titleElem.value,
            tag: tagElem.value,
            author: authorElem.value,
            date: dateElem.value,
            imgUrl: imgElem.value,
            content: contentElem.value
        })
    }).then(function () {
        getArticlesFromServer();
        resetForm();
        closeModal();
    });
}

// Delete article from server
function deleteArticleFromServer(id) {
    fetch(`http://localhost:3000/articles/${id}`, {
        method: 'DELETE',
    }).then(function () {
        getArticlesFromServer();
    });
}

// Update article
function updateArticleToServer(id) {
    fetch(`http://localhost:3000/articles/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            title: titleElem.value,
            tag: tagElem.value,
            author: authorElem.value,
            date: dateElem.value,
            imgUrl: imgElem.value,
            content: contentElem.value
        })
    }).then(function () {
        getArticlesFromServer();

        resetForm();

        closeModal();
    });
}

// Copy edited article information to form and add event listener on Update button
function openAddModal() {
    clearsaveBttnEvents();

    saveBttn.addEventListener('click', function () {
        addArticleToServer()
    });
}

// Copy edited article information to form and add event listener on Update button
function openEditModal(article) {
    titleElem.value = article.title;
    tagElem.value = article.tag;
    authorElem.value = article.author;
    dateElem.value = article.date;
    imgElem.value = article.imgUrl;
    contentElem.value = article.content;

    clearsaveBttnEvents();
    saveBttn.addEventListener('click', function () {
        updateArticleToServer(article.id)
    });
    body.className = 'modal-visible';
}

// Remove articles list if exist
function removeOldArticlesFromDOM() {
    while (main.hasChildNodes()) {
        main.removeChild(main.lastChild);
    }
}

function createArticleDOMNode(article) {

    let title = document.createElement('h1');
    title.className = "title";
    title.textContent = article.title;

    let info = document.createElement('div');
    info.className = "info-item";
    info.textContent = article.tag;

    let author = document.createElement('div');
    author.className = "info-name";
    author.textContent = article.author;

    let madeBy = document.createElement('div');
    madeBy.className = "info-item";
    madeBy.textContent = 'Added By ';
    madeBy.appendChild(author)

    let date = document.createElement('div');
    date.className = "info-date";
    date.textContent = article.date;

    let nav = document.createElement('nav');
    nav.className = "navigation-info";
    nav.appendChild(info);
    nav.appendChild(madeBy);
    nav.appendChild(date);

    let editButtton = document.createElement('button');
    editButtton.className = "EDButton";
    editButtton.id = "EDITButton";
    editButtton.textContent = 'Edit';

    let deleteButton = document.createElement('button');
    deleteButton.className = "EDButton";
    deleteButton.textContent = 'Delete';

    let EDButtons = document.createElement('div');
    EDButtons.className = "EDButton-container";
    EDButtons.appendChild(editButtton);
    EDButtons.appendChild(deleteButton);

    let img = document.createElement('img');
    img.src = article.imgUrl;

    let text = document.createElement('p');
    text.textContent = article.content;

    let divOfPs = document.createElement('div');
    divOfPs.className = "text-container";
    divOfPs.appendChild(text);

    let articles = document.createElement('article');
    articles.appendChild(title);
    articles.appendChild(nav);
    articles.appendChild(EDButtons);
    articles.appendChild(img);
    articles.appendChild(divOfPs);

    return articles;
}

// Create DOM objects and append them to DOM
function renderArticles(articles) {

    removeOldArticlesFromDOM();

    articles.forEach(element => {
        main.appendChild(createArticleDOMNode(element));
    });
}

// Reset form values
function resetForm() {
    titleElem.value = '';
    tagElem.value = '';
    authorElem.value = '';
    dateElem.value = '';
    imgElem.value = '';
    contentElem.value = '';
}

//  Remove Save Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearsaveBttnEvents() {
    let newUpdateButton = saveBttn.cloneNode(true);
    saveBttn.parentNode.replaceChild(newUpdateButton, saveBttn);
    saveBttn = document.getElementById('save');
}

// Close modal
function closeModal() {
    body.className = '';
}

addArticle.addEventListener('click', openAddModal);
cancelBttn.addEventListener('click', closeModal);

document.getElementById('EDITButton')
    .addEventListener('click', openEditModal);

document.getElementById('DELETEButton')
    .addEventListener('click', openEditModal);
getArticlesFromServer();