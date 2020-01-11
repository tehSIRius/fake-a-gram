function initSettings () {
    document.getElementById('settingsForm').addEventListener('submit', function (e) {
        e.preventDefault();

        saveSettings();
    });

    document.getElementById('resetForm').addEventListener('submit', function (e) {
        e.preventDefault();

        resetSettings();
    });
}

function saveSettings () {
    var color = document.getElementById('accentColor').value;
    var compact = document.getElementById('compact').checked;
    var textColor = document.getElementById('textColor').checked;

    if (compact) {
        compact = 'on';
    }
    else {
        compact = null;
    }

    if (textColor) {
        textColor = 'on';
    }
    else {
        textColor = null;
    }

    var request = new XMLHttpRequest();
    var params = 'type=settings&accentColor=' + encodeURI(color) + '&compact=' + encodeURI(compact) + '&textColor=' + encodeURI(textColor);

    request.open('POST', 'interaction.php', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.replace('/');
        }
    }
}

function resetSettings() {
    var request = new XMLHttpRequest();
    var params = 'type=reset';

    request.open('POST', 'interaction.php', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(params);

    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.replace('/');
        }
    }
}