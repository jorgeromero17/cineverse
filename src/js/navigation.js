window.addEventListener('DOMContentLoaded',navigator,false)
window.addEventListener('hashchange',navigator,false)

function navigator() {

    if(location.hash.startsWith('#trends')){
        console.log('Estoy en TRENDS');
    }
    else if(location.hash.startsWith('#movies')){
        showMoviesPage()
    }
    else if(location.hash.startsWith('#tv-shows')){
        ShowShowsPage()
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

    goHomeBtn.classList.remove('active-nav-item')
    goMoviesBtn.classList.add('active-nav-item')
    goTVShowsBtn.classList.remove('active-nav-item')
}

function ShowShowsPage() {
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

    goHomeBtn.classList.remove('active-nav-item')
    goMoviesBtn.classList.remove('active-nav-item')
    goTVShowsBtn.classList.add('active-nav-item')
}