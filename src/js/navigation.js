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
    }
    else if(location.hash.startsWith('#search')){
        showSearchPage()
    }
    else {
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
    getGenres('movie')

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
    getGenres('tv')  

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

    showMediaByCategories()

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

function showSearchPage() {

    showMediaByCategories(true)

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

function showMediaByCategories(isSearching) {

    const byGenresTitle = $('#byGenresTitle')

    if(isSearching){
        let urlData = location.hash.split('=')[1]
        const query = urlData.split('-').join(' ')
       
        byGenresTitle.innerText = query

        getMediaBySearch(paginationNumber,query)
    } else {
        let urlData = location.hash.split('=')[1]
        const genreId = urlData.split('-')[0]
        //retorna un array dividiendo cuando encuentra guiones, quita el id y devuelve un array sin el y al final lo une en un string con spacio
        const genreName = urlData.split('-').slice(1).join(' ') 

        byGenresTitle.innerText = genreName

        getByGenre(paginationNumber,genreId,genreName)
    }

    paginationNumber < 2 ? btnPagPrev.style.display = 'none' : btnPagPrev.style.display = 'block'
    
}

btnPagNext.onclick = function() {
    paginationNumber++

    location.hash.startsWith('#search') ? showMediaByCategories(true) : showMediaByCategories(false)

    window.scroll(0,0)
};

btnPagPrev.onclick = function() {
    paginationNumber--
    
    location.hash.startsWith('#search') ? showMediaByCategories(true) : showMediaByCategories(false)

    window.scroll(0,0)
};

searchBtn.onclick = function () {
    searchingUrl = searchInput.value.split(' ').join('-')
    location.hash = 'search='+searchingUrl
    searchInput.value = '';
}

byGenresBackBtn.onclick = () => {
    window.history.back()
}