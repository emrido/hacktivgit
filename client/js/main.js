$(document).ready(() => {
    preLogin()

    $('#myRepos').on('click', () => {
        myRepos()
    })

    $('#myStarredRepos').on('click', () => {
        myStarredRepos()
    })

    $('#search-repos').submit(() => {
        searchRepo()
    })
});


function myRepos() {
    $
        .ajax({
            url: 'http://localhost:3000/users/repos',
            method: 'GET'
        })
        .done((repos) => {
            let raw = '';
            // console.log(repos[0])

            for (const repo of repos) {
                raw += ` <div class="card border-light mb-3">
                            <div class="card-header">My Repo</div>
                                <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text"><a href="${repo.html_url}">${repo.full_name}</a></p>
                            </div>
                        </div>`
            }

            $('#repos').empty();
            $('#repos').append(raw);
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
}

function myStarredRepos() {
    $
        .ajax({
            url: 'http://localhost:3000/users/starred',
            method: 'GET'
        })
        .done((repos) => {
            let raw = '';
            // console.log(repos[0])

            for (const repo of repos) {
                raw += ` <div class="card border-light mb-3">
                            <div class="card-header">My Starred Repo</div>
                                <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text"><a href="${repo.html_url}">${repo.full_name}</a></p>
                            </div>
                        </div>`
            }

            $('#repos').empty();
            $('#repos').append(raw);
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
}

function searchRepo() {
    event.preventDefault();
    const username = $('#username').val()

    $
        .ajax({
            url: `http://localhost:3000/users/${username}/repos`,
            method: 'GET'
        })
        .done((repos) => {
            let raw = '';
            console.log(repos[0])

            for (const repo of repos) {
                raw += ` <div class="card border-light mb-3">
                            <div class="card-header">${username} Repo</div>
                                <div class="card-body">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text"><a href="${repo.html_url}">${repo.full_name}</a></p>
                            </div>
                        </div>`
            }

            $('#search-result').empty();
            $('#search-result').append(raw);
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
}


function newRepo() {
    event.preventDefault()
    const name = $('#new-repo-name').val()
    const description = $('#new-repo-desc').val()
    
    $
        .ajax({
            url: 'http://localhost:3000/users/repos',
            method: 'POST',
            data: { name, description }
        })
        .done(response => {
            alert('Yeay, New Repo Created')
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
        
}

function onSignIn(googleUser) {
    postLogin()

    const id_token = googleUser.getAuthResponse().id_token;

    $
        .post('http://localhost:3000/users/login', { token: id_token })
        .done((response) => {
            localStorage.setItem('token', response)
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
}

function signOut() {
    postLogout()

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.clear()
    });
}

function preLogin() {
    $('#search-box').hide();
    $('.navbar-nav').hide();
    $('#new-repo-form').hide();
}

function postLogin() {
    $('#login').hide();
    $('#search-box').show();
    $('.navbar-nav').show();
    $('#new-repo-form').show();
}

function postLogout() {
    $('#search-result').empty();
    $('#repos').empty();
    $('#search-box').hide();
    $('.navbar-nav').hide();
    $('#new-repo-form').hide();
    $('#login').show();
}