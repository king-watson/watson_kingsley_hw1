(() => {
    const charBox = document.querySelector("#character-box");
    const movieTemplate = document.querySelector("#movie-template");
    const movieCon = document.querySelector("#movie-con");
    const loader = document.querySelector("#loader");
    
    // SWAPI Base URL
    const baseUrl = 'https://swapi.info/api';

    function showLoading() { loader.classList.remove('hidden'); }
    function hideLoading() { loader.classList.add('hidden'); }

    function getCharacters() {
        showLoading();
        fetch(`${baseUrl}/people`)
            .then(response => response.json())
            .then(characters => {
                const ul = document.createElement("ul");

            
                characters.slice(0, 10).forEach(char => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    
                    a.textContent = char.name;
                    a.dataset.movieUrl = char.films[0]; 
                    a.href = "#";

                    a.addEventListener("click", getMovieDetail);
                    
                    li.appendChild(a);
                    ul.appendChild(li);
                });
                charBox.appendChild(ul);
                hideLoading();
            })
            .catch(err => {
                hideLoading();
                handleError("Failed to load characters.");
            });
    }

    function getMovieDetail(e) {
        e.preventDefault();
        const movieUrl = e.currentTarget.dataset.movieUrl;
        
        showLoading();
        movieCon.innerHTML = ""; 

        fetch(movieUrl)
            .then(response => response.json())
            .then(movie => {
                const clone = movieTemplate.content.cloneNode(true);
                
                clone.querySelector(".movie-title").textContent = movie.title;
                clone.querySelector(".movie-crawl").textContent = movie.opening_crawl;
                
                const poster = clone.querySelector(".movie-poster");
                const movieID = movie.url.split('/').filter(Boolean).pop(); 
                poster.src = `images/poster_${movieID}.jpg`; 

                movieCon.appendChild(clone);

                // ADD GSAP ANIMATION HERE
                // gsap.from(".movie-card", { opacity: 0, y: 20, duration: 0.5 });
                
                hideLoading();
            })
            .catch(err => {
                hideLoading();
                handleError("Could not retrieve movie details.");
            });
    }

    function handleError(msg) {
        const errorMsg = document.createElement("p");
        errorMsg.textContent = msg;
        movieCon.appendChild(errorMsg);
    }

    getCharacters();
})();