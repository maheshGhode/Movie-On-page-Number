let cl = console.log;

const searchName = document.getElementById('searchName')
const searchNum = document.getElementById('searchNum')
const MovieCard = document.getElementById('MovieCard')

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
// cl(API_URL)
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const templating = (array) =>{
    let result = '';
    array.forEach((ele) => {
        result += `
        <div class="col-md-3 mb-4">
            <div class="card">
                <div class="card-body moives">
                    <figure>
                    <img src="${IMG_PATH}${ele.poster_path}" alt="${ele.original_title}" class="img">
                    </figure>
                    <figcaption class="caption">
                        <div class="row">
                            <div class="col-md-8">
                                <h3>${ele.original_title}</h3>
                            </div>
                            <div class="col-md-4">
                                <span class="${Oncolor(ele.vote_average)} color">
                                ${ele.vote_average}
                                </span>
                            </div>
                        </div>
                    </figcaption>
                    <div class="overview">
                        <h3>${ele.original_title}</h3>
                        <p>${ele.overview}</p>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    MovieCard.innerHTML = result;
}



function MakeApiCall(url,MethodName,objBody){
    return fetch(url,{
        method : MethodName,
        body : objBody,
        headers : {
            "Content-type": "application/json; charset = UTF-8"
        }
    })
    .then(res => res.json())
    .catch(cl)
}

MakeApiCall(API_URL,'GET')
  .then(data =>{
    let postArray = data.results;
    templating(postArray)
  })
  .catch(cl)


function Oncolor(rank){
    if(rank >= 8){
        return 'green'
    }else if(rank >= 6){
        return 'orange'
    }else if(rank >= 3){
        return 'red'
    }
}  

const NameSearchHandler = (e) => {
    // cl('event triggred')
    let MovieSearch = e.target.value.toLowerCase().trim()
    let searchMovieUrl = localStorage.getItem('UpdatedUrl');
    // cl(MovieSearch)
    MakeApiCall(searchMovieUrl,'GET')
     .then(res => {
        postArray = res.results;
        let NewRes = postArray.filter(ele => ele.title.toLowerCase().trim().includes(MovieSearch))
        templating(NewRes)
     })
     .catch(cl)
}

const MoviePageHandler = (e) => {
    cl('event triggred')
    let NumpageUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${e.target.value}`;
    // cl(NumpageUrl)
    localStorage.setItem('UpdatedUrl',NumpageUrl);
    MakeApiCall(NumpageUrl,'GET')
     .then(res => {
        postArray = res.results
        templating(postArray)
     })
     .catch(cl)
}


searchName.addEventListener('keyup',NameSearchHandler);
searchNum.addEventListener('keyup',MoviePageHandler)