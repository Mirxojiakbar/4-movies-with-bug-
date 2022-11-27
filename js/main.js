"use strict"
movies.splice(100)

// {
//     "title": "Patton Oswalt: Annihilation",
//     "year": 2017,
//     "categories": [
//       "Uncategorized"
//     ],
//     "imdbId": "tt7026230",
//     "imdbRating": 7.4,
//     "runtime": 66,
//     "language": "English",
//     "youtubeId": "4hZi5QaMBFc",
//     "summary": "Patton Oswald, despite a personal tragedy, produces his best standup yet. Focusing on the tribulations of the Trump era and life after the loss of a loved one, Patton Oswald continues his journey to contribute joy to the world.",
//     "smallThumbnail": "http://i3.ytimg.com/vi/4hZi5QaMBFc/hqdefault.jpg",
//     "bigThumbnail": "http://i3.ytimg.com/vi/4hZi5QaMBFc/maxresdefault.jpg"
//   },




// !!!!!!!!!!!!!!!!!!!!!!Normalizing!!!!!!!!!!!!!!!!!!!!!!
const Moovies = movies.map((movies) => {
    return {
        title: movies.title,
        year: movies.year,
        language: movies.language,
        category: movies.categories,
        id: movies.imdbId,
        time: `  Soat:${Math.floor(movies.runtime / 60)}, daqiqa:${movies.runtime % 60}`,
        summary: movies.summary,
        link: `https://www.youtube.com/embed/${movies.youtubeId}`,
        maxImg: movies.bigThumbnail,
        minImg: movies.smallThumbnail,
        rating: movies.imdbRating
    }
})
console.log(Moovies);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//!!!!!!!!!!!!!!!!!!!!!!Rendering!!!!!!!!!!!!!!!!!!!!!!!!!!!!


function renderMoovies() {
    Moovies.forEach((el) => {
        const card = createElement('div', 'card shadow-lg', `
        
        <div class="card">
        <img src="${el.minImg}" alt="img">
        <div class="card-body">
        <h4 class="card-title">
            ${el.title}
        </h4>
        <ul class="list-unstyled"> 
            <li>
                <strong>Year:${el.year}</strong>
            </li>
            <li>
                <strong>Language:${el.language}</strong>
            </li>
            <li>
                <strong>Rating:${el.rating}</strong>
            </li>
            <li>
                <strong>Category:${el.category}</strong>
            </li>
            <li>
                <strong>Runtime:${el.time}</strong>
            </li>
        </ul>

        <div class="social d-flex">
            <a href="${el.link}" target="blank_" class="btn btn-danger m-2">Trailers</a>
            <button class="btn btn-info m-2" data-read="${el.id}">Read more . . .</button>

            <button class="btn btn-dark m-2" data-add="${el.id}">Add Bookmark</button>
        </div>
        </div>
    </div>

`);
        $('.wrapper').appendChild(card)
    })
}
renderMoovies()


////////////////////////////////2-dars///////////////////////////////



////!!!!!!!!!!!!!!!!!!!!!!Finging!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!(func)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const findFilm = (regexp, rating = 0, categories) => {

    // console.log(regexp);
    // console.log(rating);
    // console.log(categories);

    if (categories == 'All') {
        return Moovies.filter((film) => {
            return film.title.match(regexp) && film.rating >= rating
        })
    } else if (categories == 'all') {
        return Moovies.filter((film) => {
            return film.title.match(regexp) && film.rating >= rating
        })
    }
    return Moovies.filter((film) => {
        return film.title.match(regexp) && film.rating >= rating && film.category.includes(categories);
    })

}
//!!!!!!!!!!!!!!!!!!!!!!!!(func)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!(By name)!!!!!!!!!!!!!!!!!!!!!!!!!!
// let setting = 'skfjdfop odjoadso  dsksdlkjfksdj  kdkjfkajkasd dsldjo'
// console.log(setting.match(/s/gi));    

$('.search').addEventListener('click', () => {

    $('.wrapper').innerHTML = `<span class="loader"></span>`;

    const searchValue = $('#filmName').value;
    const filmRating = $('#filmRating').value;
    const filmCategory = $('#category').value

    const regexp = new RegExp(searchValue, "gi")
    const searchResult = findFilm(regexp, filmRating, filmCategory)


    setTimeout(() => {
        if (searchResult.length > 0) {
            searchResultsRender(searchResult)
            $('.res').textContent = searchResult.length

        }
        else {
            $('.wrapper').innerHTML = '<h1 class="text-white">Malumot topilmadi!</h1>'
            $('.res').textContent = searchResult.length
        }
    }, 1000)
})




function searchResultsRender(data = []) {
    $('.wrapper').innerHTML = "";
    data.forEach((el) => {
        const card = createElement('div', 'card shadow-lg', `
        
        <div class="card">
        <img src="${el.minImg}" alt="img">
        <div class="card-body">
        <h4 class="card-title">
            ${el.title}
        </h4>
        <ul class="list-unstyled"> 
            <li>
                <strong>Year:${el.year}</strong>
            </li>
            <li>
                <strong>Language:${el.language}</strong>
            </li>
            <li>
                <strong>Rating:${el.rating}</strong>
            </li>
            <li>
                <strong>Category:${el.category}</strong>
            </li>
            <li>
                <strong>Runtime:${el.time}</strong>
            </li>
        </ul>

        <div class="social d-flex">
            <a href="${el.link}" target="blank_" class="btn btn-danger m-2">Trailers</a>
            <button class="btn btn-info r_more m-2"  data-read="${el.id}">Read more . . .</button>

            <button class="btn btn-dark m-2"  data-add="${el.id}">Add Bookmark</button>
        </div>
        </div>
    </div>

`);
        $('.wrapper').appendChild(card)
    })


}
//!!!!!!!!!!!!!!!!!!!!!!!!(By name)!!!!!!!!!!!!!!!!!!!!!!!!!!

////////////////////////////////2-dars///////////////////////////////

////////////////////////////////3-dars///////////////////////////////



////////////////////////////////3-dars///////////////////////////////
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(Categories)!!!!!!!!!!!!!!!!!!!!!!!!!
const dynamicCategory = () => {
    let category = [];

    Moovies.forEach((e) => {
        e.category.forEach((el) => {
            if (!category.includes(el)) {
                category.push(el);
            }
        });
    });

    category.sort();
    category.unshift("All");
    category.forEach((el) => {
        const option = createElement("option", "item-option", el);
        $("#category").appendChild(option);
    });
};

dynamicCategory();
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(Categories)!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!(modal window!)!!!!!!!!!!!!!!!!!!!!
// console.log(film);
// for(let i = 0; i<20;i++){
//     const cards=document.createElement('div');
//     cards.dataset.info=`abc${i}`
// }

$('.wrapper').addEventListener('click', (e) => {

    if (e.target.classList.contains("btn-info")) {
        const idMovie = e.target.getAttribute('data-read')
        console.log(idMovie);
        showModal(idMovie);
        $('.modal-window').classList.remove('modal-hide')
    }
})

function showModal(ID) {
    const filmItem = Moovies.filter(e => {
        return e.id == ID;
    })

filmItem.forEach((e)=>{


    const row = createElement('div', 'row',`
    <div class="row m-3">
    <div class="col-md-4 text-center">
                  <img src="${e.minIMG}" alt="cover" class="img-fluid w-100">
               </div>
               <div class="col-md-6 ">
                  <h4 class="text-primary ">${e.title}</h4>
                  <ul class="list-group">
                     <li class="list-group-item">Rating : ${e.rating} </li>
                     <li class="list-group-item">Year: ${e.year}</li>
                     <li class="list-group-item">Runtime: ${e.time} </li>
                     <li class="list-group-item">Category:${e.category} </li>
                  </ul>
                  <div class="col-md-12 mt-4">
                     <h4 class="text-danger ">
                        ${e.title}
                     </h4>
                     <p class="big_text">
                        ${e.summary}
                     </p>
                  </div>
               </div>
            </div>
    </div>

            

    `);
    $('.modal-content').appendChild(row)
    
})
}

$('.btn-close').addEventListener('click', () => {
    $('.modal-window').classList.add('modal-hide')
    $('.modal-content').innerHTML = "";
})












//--------------------book mark----------------
$(".wrapper").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-dark")) {
       const idMovie = e.target.getAttribute("data-add");
       addBookmark(idMovie)
    }
 });
 
 const bookmark = [];
 
 function addBookmark(ID) {
   
    const filmItem = Moovies.filter((e) => {
       return e.id == ID;
    });
 
  
    if(!bookmark.includes(filmItem[0])){
       bookmark.push(filmItem[0])
    }else{
       alert('avval qo\'shilgan')
    }
 
    // const inLocal = localStorage.setItem('bookmark', JSON.stringify(bookmark))
    // const take = localStorage.getItem(JSON.stringify(bookmark))
    // console.log(take);
 }