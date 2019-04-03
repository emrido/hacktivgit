$(document).ready(() => {
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


const myRepos = () => {
    $
        .ajax({
            url: 'http://localhost:3000/users/repos',
            method: 'GET'
        })
        .done((repos) => {
            console.log(repos[0])
            $('#repos').empty()
            for (const repo of repos) {
                $('#repos').append(
                    `
                    <div class="card border-light mb-3">
                      <div class="card-header">My Repo</div>
                      <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text"><a href="${repo.html_url}">${repo.full_name}</a></p>
                      </div>
                    </div>
                    `
                )
            }
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
}

const myStarredRepos = () => {
    $
        .ajax({
            url: 'http://localhost:3000/users/starred',
            method: 'GET'
        })
        .done((repos) => {
            console.log(repos[0])
            $('#repos').empty()
            for (const repo of repos) {
                $('#repos').append(
                    `
                    <div class="card border-light mb-3">
                      <div class="card-header">My Repo</div>
                      <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text"><a href="${repo.html_url}">${repo.full_name}</a></p>
                      </div>
                    </div>
                    `
                )
            }
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
}

const searchRepo = () => {
    const username = $('#username').val()

    $
        .ajax({
            url: `http://localhost:3000/users/${username}/repos`,
            method: 'GET'
        })
        .done((repos) => {
            console.log(repos[0])
            $('#search-result').empty()
            for (const repo of repos) {
                $('#search-result').append(
                    `
                <div class="card border-light mb-3">
                  <div class="card-header">Search Result</div>
                  <div class="card-body">
                    <h5 class="card-title">${repo.name}</h5>
                    <p class="card-text"><a href="${repo.html_url}">${repo.full_name}</a></p>
                  </div>
                </div>
                `
                )
            }
        })
        .fail((jqXHR, textstatus) => {
            console.log('fail', textstatus)
        })
}