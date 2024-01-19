import { $,token,dayBtnTS,weekBtnTS,movieBtnPS,tvBtnPS,movieBtnTRS,tvBtnTRS, } from './utilities.js'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer '+token,
    }
});

async function renderBackgroundSite() {
    const {data} = await api(`trending/movie/week`)
    const results = data.results

    const indexBackdrop = Math.floor(Math.random()*20);

    const urlImg = `https://image.tmdb.org/t/p/original${results[indexBackdrop].backdrop_path}`
    
    const header = $('header')
    header.style.backgroundImage = `url('${urlImg}')`
    console.log(header,urlImg)
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
    renderBackgroundSite();
    changeTreding('day');
    changePopular('movie');
    changeTopRated('movie');
})()