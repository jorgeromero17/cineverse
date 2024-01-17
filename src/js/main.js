import { apiKey } from './config.js'
const URL = 'https://api.themoviedb.org/3/'

const $ = selector => document.querySelector(selector)

async function getTrending(media,sectionId) {
    const res = await fetch(URL+`trending/${media}/day?api_key=${apiKey}`)
    const data = await res.json()
    
    const results = data.results
    
    results.forEach(media => {
        const trendingSection = $(sectionId)
        const img = document.createElement('img')

        img.classList.add("h-72","mr-5")
        img.setAttribute('alt',media.title)
        img.setAttribute('src','https://image.tmdb.org/t/p/w300/'+media.poster_path)
        
        trendingSection.appendChild(img)
    })
}


// (function (){
//     getTrending('movie','#trendingMovies')
//     getTrending('tv','#trendingTV')
// })()