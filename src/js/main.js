// import { $,isFirefox,token,dayBtnTS,weekBtnTS,movieBtnPS,tvBtnPS,movieBtnTRS,tvBtnTRS, } from './utilities.js'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer '+token,
    }
});

/**
 * Obtiene la imagen de fondo.
 *
 * @param {string} media - Tipo de medio ('tv' o 'movie').
 * @param {string} list - Lista de opciones disponibles: 'now_playing', 'popular', 'top_rated'.
 * @param {string} elementId - ID del elemento.
 * @param {boolean} isHome - Indica si es la página de inicio.
 * 
 */
async function getBrackgroundImage(media,list,elementId,isHome){ //list: now_playing,popular,top_rated
    const [data1, data2] = await Promise.all([
        api(`${media}/${list}?page=1`),
        api(`${media}/${list}?page=2`)
    ]);

    const results = [...data1.data.results,...data2.data.results]
    
    const indexBackdrop = Math.floor(Math.random()*40);
    
    const urlImg = `https://image.tmdb.org/t/p/original${results[indexBackdrop].backdrop_path}`
    
    const header = $(elementId)
    header.style.backgroundImage = `url('${urlImg}')`   
    
    if (isHome) return
    renderHeader(header,results[indexBackdrop],media)
}

function renderHeader(header,result,media){

    const title = media === 'tv' ? result.name : result.title
    const overview = result.overview

    console.log(result)

    const mediaHederContainer = document.createElement('div')
    mediaHederContainer.classList.add('mediaHeader-container')

    const div = document.createElement('div')
    div.classList.add('w-[80%]')

    const mediaHeaderTitle = document.createElement('h2')
    mediaHeaderTitle.classList.add('mediaHeader-title')
    mediaHeaderTitle.innerText = title

    const mediaHeaderDescription = document.createElement('p')
    mediaHeaderDescription.classList.add('mediaHeader-description')
    mediaHeaderDescription.innerText = overview

    const mediaHeaderButton = document.createElement('button')
    mediaHeaderButton.classList.add('mediaHeader-btn-info')
    
    const btnIcon = document.createElement('i')
    btnIcon.classList.add('fa-solid','fa-circle-info','mr-1')

    const buttonText = document.createTextNode('More Information');

    mediaHeaderButton.appendChild(btnIcon);
    mediaHeaderButton.appendChild(buttonText);

    header.appendChild(mediaHederContainer)
    mediaHederContainer.appendChild(div)
    div.appendChild(mediaHeaderTitle)
    div.appendChild(mediaHeaderDescription)
    div.appendChild(mediaHeaderButton)
}

async function getTrending(time) {
    const {data} = await api(`trending/all/${time}`)
    const results = data.results
    
    renderMoviesPoster(results,'#trendingSection')
}

async function getPopular(media) {
    const {data} = await api(`${media}/popular`)
    const results = data.results
    
    renderMoviesPoster(results,'#popularSection')
}

async function getTopRated(media) {
    const {data} = await api(`${media}/top_rated`)
    const results = data.results
    
    renderMoviesPoster(results,'#topRatedSection')
}

function renderMoviesPoster(results,sectionId){

    const section = $(sectionId)
    section.innerHTML = '';

    results.forEach(media => {
        const img = document.createElement('img')

        img.classList.add("movie-poster")
        img.setAttribute('alt',media.title)
        img.setAttribute('src','https://image.tmdb.org/t/p/w300/'+media.poster_path)
        
        section.appendChild(img)
    })
}

async function getMovieGenres(){
    const {data} = await api(`/genre/movie/list?language=en`)
    const genres = data.genres

    const genresContainer = $('#movieGenresContainer')
    renderGenres(genres,genresContainer)
}

async function getTVGenres(){
    const {data} = await api(`/genre/tv/list?language=en`)
    const genres = data.genres

    const genresContainer = $('#tvGenresContainer')
    renderGenres(genres,genresContainer)
}

function renderGenres(genres,genresContainer){

    genresContainer.innerHTML = '';
    genres.forEach( genre => {

        const cardGenre = document.createElement('div')
        cardGenre.classList.add('card-genre')

        const iconGenre = document.createElement('i')
        const nameGenre = document.createElement('p')
        const bgGenre = document.createElement('div')

        nameGenre.innerText = genre.name
        iconGenre.classList.add('fa-solid',getGenreIconClass(genre.name))
        bgGenre.classList.add('bg-genre')

        cardGenre.appendChild(iconGenre)
        cardGenre.appendChild(nameGenre)
        cardGenre.appendChild(bgGenre)

        genresContainer.appendChild(cardGenre)
    })
}

function getGenreIconClass(genreName) {
    const genreIconMap = {
        'Action & Adventure': 'fa-crosshairs',
        'Action': 'fa-person-rifle',
        'Adventure': 'fa-compass',
        'Animation': 'fa-splotch',
        'Comedy': 'fa-face-grin-squint',
        'Soap': 'fa-soap',
        'Crime': 'fa-gun',
        'Documentary': 'fa-file-video',
        'Drama': 'fa-masks-theater',
        'Family': 'fa-users',
        'Kids': 'fa-children',
        'Fantasy': 'fa-hat-wizard',
        'Sci-Fi & Fantasy': 'fa-robot',
        'History': 'fa-book',
        'Horror': 'fa-face-flushed',
        'Music': 'fa-music',
        'Mystery': 'fa-user-secret',
        'Romance': 'fa-face-grin-hearts',
        'Science Fiction': 'fa-atom',
        'TV Movie': 'fa-desktop',
        'News': 'fa-newspaper', 
        'Reality': 'fa-users-viewfinder', 
        'Talk': 'fa-microphone-lines', 
        'Thriller': 'fa-face-frown-open',
        'War': 'fa-person-military-rifle',
        'War & Politics': 'fa-flag-usa',
        'Western': 'fa-hat-cowboy',
    };    

    // Devuelve la clase de icono correspondiente o una clase predeterminada si no se encuentra
    return genreIconMap[genreName] || 'fa-film'; //una clase predeterminada si el género no está en el mapa
}

function changeTreding(time){

    getTrending(time)

    if(time==='day'){
        dayBtnTS.classList.add('active-button-selection')
        weekBtnTS.classList.remove('active-button-selection')
    } else {
        weekBtnTS.classList.add('active-button-selection')
        dayBtnTS.classList.remove('active-button-selection')
    }
}

function changePopular(media){

    getPopular(media)

    if(media==='movie'){
        movieBtnPS.classList.add('active-button-selection')
        tvBtnPS.classList.remove('active-button-selection')
    } else {
        tvBtnPS.classList.add('active-button-selection')
        movieBtnPS.classList.remove('active-button-selection')
    }
}

function changeTopRated(media){

    getTopRated(media)

    if(media==='movie'){
        movieBtnTRS.classList.add('active-button-selection')
        tvBtnTRS.classList.remove('active-button-selection')
    } else {
        tvBtnTRS.classList.add('active-button-selection')
        movieBtnTRS.classList.remove('active-button-selection')
    }
}

function addScrollbarStylingFirefox() {
    const section = [] 
    section.push($('#trendingSection'))
    section.push($('#popularSection'))
    section.push($('#topRatedSection'))
    section.push($('#movieGenresSection'))
    section.push($('#tvGenresSection'))

    section.forEach( s => {
        if(isFirefox){
            s.classList.remove('hover:pb-[10px]')
        }
    })
}


dayBtnTS.onclick = function() {
    changeTreding('day');
};

weekBtnTS.onclick = function() {
    changeTreding('week');
};

movieBtnPS.onclick = function() {
    changePopular('movie');
};

tvBtnPS.onclick = function() {
    changePopular('tv');
};

movieBtnTRS.onclick = function() {
    changeTopRated('movie');
};

tvBtnTRS.onclick = function() {
    changeTopRated('tv');
};

(function (){
    addScrollbarStylingFirefox()
})()
