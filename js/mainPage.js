/** ID should be always 0 if only one reCaptcha is loaded. Global value is used just in case. */
var recaptchaID = '';

/**
 * Adds event listeners to Like and Comment forms and also to images
 */
function initMainPage() {
    var likeForms = document.getElementsByClassName('likeForm');

    for (var i = 0; i < likeForms.length; ++i) {
        if (likeForms[i]) {
            likeForms[i].addEventListener('submit', function (e) {
                e.preventDefault();
                sendLike(e.srcElement.post_id.value);
            });
        }
    }

    var commentForms = document.getElementsByClassName('commentForm');

    for (var i = 0; i < commentForms.length; ++i) {
        if (commentForms[i]) {
            commentForms[i].addEventListener('submit', function (e) {
                e.preventDefault();
                sendComment(e.srcElement.post_id_comment.value, e.srcElement.comment.value.trim());
            })
        }
    }

    var imgElements = document.getElementsByClassName('imgPost');

    for (var i = 0; i < imgElements.length; ++i) {
        if (imgElements[i]) {
            imgElements[i].addEventListener('click', function (e) {
                overlay(e.toElement.src);
            });
        }
    }
}

/**
 * Checks whether comment is valid.
 * If valid, the comment is sent to backend and temporarily displayed to the user.
 * Otherwise an alert is displayed.
 * @param  {int} post - id of a post
 * @param  {string} comment
 */
function sendComment(post, comment) {
    if (comment === "" || comment.length > 255) {
        alert('Comment has to be shorter than 255 characters and contain at least one character.')
    }
    else if (post !== null) {
        var request = new XMLHttpRequest();
        var params = 'type=comment&post=' + encodeURI(post) + '&text=' + encodeURI(comment);

        request.open('POST', 'interaction.php', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(params);

        request.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                document.getElementById('comment' + post).value = "";
                var newComment = document.createElement('p');
                newComment.innerText = 'From you just now: ' + comment;

                document.getElementById('commentsOf' + post).appendChild(newComment);
            }
        }
    }
}

/**
 * Sends like request to backend and displays new number of likes.
 * @param  {int} post - id of a post
 */
function sendLike(post) {
    var request = new XMLHttpRequest();
    var params = 'type=like&post=' + encodeURI(post);

    request.open('POST', 'interaction.php', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            document.getElementById('likesOf' + post).innerText = this.responseText;
        }
    }
}

/**
 * Creates an overlay with selected image in center.
 * Has to be dismissed before any other interaction is possible.
 * @param  {string} imgAddress
 */
function overlay(imgAddress) {
    var overlayElement = document.createElement('div');
    overlayElement.id = 'overlay';
    overlayElement.addEventListener('click', overlayOff);
    var imgElement = document.createElement('img');
    imgElement.src = imgAddress;
    imgElement.id = 'overlayImg';
    overlayElement.appendChild(imgElement);

    document.body.appendChild(overlayElement);
}

/**
 * Removes overlay from screen.
 */
function overlayOff() {
    var overlayElement = document.getElementById('overlay');
    overlayElement.parentNode.removeChild(overlayElement);
}