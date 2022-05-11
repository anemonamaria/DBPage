let overlay = document.querySelector('.modal-overlay');
document.getElementById('addArticle').addEventListener('click', function() {
    overlay.classList.add('modal-visible');
});
document.getElementById('EDITButton').addEventListener('click', function() {
    overlay.classList.add('modal-visible');
});
document.getElementById('cancel').addEventListener('click', function() {
    overlay.classList.remove('modal-visible')
});