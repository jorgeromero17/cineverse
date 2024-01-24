window.addEventListener('DOMContentLoaded',navigator,false)
window.addEventListener('hashchange',navigator,false)

function navigator() {

    paginationNumber = 1;

    if(location.hash.startsWith('#category')){
        showCategoryPage()
    }
    else if(location.hash.startsWith('#movies')){
        showMoviesPage()
    }
    else if(location.hash.startsWith('#tv-shows')){
        showShowsPage()
    } else {
        showHomePage()
    }
}

goHomeBtn.onclick = function() {
    location.hash = ''
}

logoBtn.onclick = function() {
    location.hash = ''
}


goMoviesBtn.onclick = function() {
    location.hash = '#movies'
}

goTVShowsBtn.onclick = function() {
    location.hash = '#tv-shows'
}

function showHomePage() {
    getBrackgroundImage('movie','popular','#header1',true) 
    changeTreding('day')
    changePopular('movie')
    changeTopRated('movie')

    principalHeader.style.display = 'block'

    trending.style.display = 'block'
    popular.style.display = 'block'
    rated.style.display = 'block'

    movieHeader.style.display = 'none'
    movieGenres.style.display = 'none'

    tvHeader.style.display = 'none'
    tvGenres.style.display = 'none'

    byGenres.style.display = 'none'

    goHomeBtn.classList.add('active-nav-item')
    goMoviesBtn.classList.remove('active-nav-item')
    goTVShowsBtn.classList.remove('active-nav-item')
}
function showMoviesPage() {
    getBrackgroundImage('movie','now_playing','#movieHeader',false)   
    getMovieGenres()

    principalHeader.style.display = 'none'

    trending.style.display = 'none'
    popular.style.display = 'none'
    rated.style.display = 'none'

    movieHeader.style.display = 'block'
    movieGenres.style.display = 'block'
    
    tvHeader.style.display = 'none'
    tvGenres.style.display = 'none'

    byGenres.style.display = 'none'

    goHomeBtn.classList.remove('active-nav-item')
    goMoviesBtn.classList.add('active-nav-item')
    goTVShowsBtn.classList.remove('active-nav-item')
}

function showShowsPage() {
    getBrackgroundImage('tv','top_rated','#tvHeader',false)
    getTVGenres()  

    principalHeader.style.display = 'none'

    trending.style.display = 'none'
    popular.style.display = 'none'
    rated.style.display = 'none'

    movieHeader.style.display = 'none'
    movieGenres.style.display = 'none'
    
    tvHeader.style.display = 'block'
    tvGenres.style.display = 'block'

    byGenres.style.display = 'none'

    goHomeBtn.classList.remove('active-nav-item')
    goMoviesBtn.classList.remove('active-nav-item')
    goTVShowsBtn.classList.add('active-nav-item')
}

function showCategoryPage () {

    showMovieByCategories()

    principalHeader.style.display = 'none'

    trending.style.display = 'none'
    popular.style.display = 'none'
    rated.style.display = 'none'

    movieHeader.style.display = 'none'
    movieGenres.style.display = 'none'
    
    tvHeader.style.display = 'none'
    tvGenres.style.display = 'none'

    byGenres.style.display = 'block'

    goHomeBtn.classList.remove('active-nav-item')
    goMoviesBtn.classList.remove('active-nav-item')
    goTVShowsBtn.classList.remove('active-nav-item')
}

function showMovieByCategories() {
    let urlDataId = location.hash.split('=')[1]
    const [genreId,genreName] = urlDataId.split('-')

    const byGenresTitle = $('#byGenresTitle')
    byGenresTitle.innerText = genreName

    paginationNumber < 2 ? btnPagPrev.style.display = 'none' : btnPagPrev.style.display = 'block'

    getByGenre(paginationNumber,genreId,genreName)
}

btnPagNext.onclick = function() {
    paginationNumber++
    showMovieByCategories()
};

btnPagPrev.onclick = function() {
    paginationNumber--
    showMovieByCategories()
};