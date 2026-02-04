(() => {
    // Routes
    // Search for movie
    // One Movie by ID
    // https://www.omdbapi.com/?s=speed&apikey=9b104672

    // one movie by id 
    // https://www.omdbapi.com/?i=tt0462448&apikey=9b104672

    const movieBox = document.querySelector("#movie-box");
    const reviewTemplate = document.querySelector("#review-template");
    const reviewCon = document.querySelector("#review-con");
    const baseUrl = 'https://www.omdbapi.com/';
    const apiKey = 'apikey=9b104672';

    function getMovies() {
        fetch(`${baseUrl}?s=speed&${apiKey}`)
        .then(response => response.json())
        .then(function(response) {
            console.log(response.Search);
            const movies = response.Search;

            const ul = document.createElement("ul");

             movies.forEach(movie => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                const img = document.createElement("img");
                a.textContent = movie.Title;
                a.dataset.review = movie.imdbID;
                img.src = movie.Poster;
                li.appendChild(img);
                li.appendChild(a);
                ul.appendChild(li);
              })
              movieBox.appendChild(ul);
        })
        .then(function(){
            const links = document.querySelectorAll("#movie-box li a");
            console.log(links);
            links.forEach(function(link){
                link.addEventListener("click", getReview);
            })
        })
        .catch(function(err){
            // works for me as a dev
            console.log(err);
            // we should write a meaningful message to the DOM
        });
    }

     // https://www.omdbapi.com/?i=tt0462448&apikey=9b104672

    function getReview(e) {
       console.log(e.currentTarget.dataset.review);
       const reviewID = e.currentTarget.dataset.review;
       fetch(`${baseUrl}?i=${reviewID}&plot=full&${apiKey}`)
       .then(response => response.json())
       .then(function(response){
        reviewCon.innerHTML = "";
        console.log(response);
        const clone = reviewTemplate.content.cloneNode(true);
        const reviewDescription = clone.querySelector(".review-description");
        const reviewHeading = clone.querySelector(".review-heading");
        const reviewRating = clone.querySelector(".review-rating");

        reviewDescription.innerHTML = response.Plot;
        reviewHeading.innerHTML = response.Title;
        reviewRating.innerHTML = `Rating: ${response.imdbRating}`;

        reviewCon.appendChild(clone);

       })
       .catch(function(error){
        console.log(error);
       })
    }
    getMovies();

})();
