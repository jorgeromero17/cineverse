const $ = selector => document.querySelector(selector)

const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

const apiKey = '08eebcbae99f8c7060c27ec592d47322'
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGVlYmNiYWU5OWY4YzcwNjBjMjdlYzU5MmQ0NzMyMiIsInN1YiI6IjY1YTU3NDdhOGEwZTliMDEyYmI0OGQ5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TTbDhDEOVwnmTifegRFVv6XBgwp9_UM_S6Ab_5Ct-iU'

const dayBtnTS = $('#dayButtonTrendingSection')
const weekBtnTS = $('#weekButtonTrendingSection')

const  movieBtnPS = $('#movieButtonPopularSection')
const  tvBtnPS = $('#tvButtonPopularSection')

const  movieBtnTRS = $('#movieButtonTopRatedSection')
const  tvBtnTRS = $('#tvButtonTopRatedSection')


export { $,isFirefox, apiKey,token,dayBtnTS,weekBtnTS,movieBtnPS,tvBtnPS,movieBtnTRS,tvBtnTRS, };
