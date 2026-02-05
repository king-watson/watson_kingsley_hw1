(() => {

// route 1 get characters 
// https://swapi.info/api/people

// route 2 get a particular movie
// https://swapi.info/api/films/2

 // SWAPI Base URL
    const baseUrl = "https://swapi.info/api/";

  //  const charBox = document.querySelector("#character-box");
  //  const movieTemplate = document.querySelector("#movie-template");
  //  const movieCon = document.querySelector("#movie-con");
  //  const loader = document.querySelector("#loader");
  //  function showLoading() { loader.classList.remove('hidden'); }
  //  function hideLoading() { loader.classList.add('hidden'); }

    function getCharacters() {

        fetch(`${baseUrl}people`)
            .then((res) => res.json())
            .then((characters) => {
                characters.forEach(character => {
                    console.log(character.name);
                    // randomize the number that is picked
                    // figure out the length of the array then pick a number within that range
                    console.log(character.films[0]);

                    // create a ul
                    // create an li
                    // create an a
                    // add a data attribute to the anchor tag that contains a film
                });
            })
            .then(()=> {
                //attach an event listener to each link, calls a new function that makes the second AJAX call
                //function name is getMovie()
            })
            .catch((error) => {
                console.error(error)
            })
    }
            
function getMovie() {
    //need to extract data attribute either using the event object or this
    fetch("https://swapi.info/api/films/1")
    .then((res) => res.json())
    .then((movie) => {
        console.log(`img.src="images/poster${movie.episode_id}.jpg`);
        console.log(movie.title);
        console.log(movie.opening_crawl);
    })
    .catch((error) => {
        console.error(error)
    })
}

    getMovie();
    getCharacters();
})();