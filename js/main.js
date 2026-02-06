(() => {
    const charBox = document.querySelector("#character-box");
    const movieTemplate = document.querySelector("#movie-template");
    const movieCon = document.querySelector("#movie-con");
    const loader = document.querySelector("#loader");
    const baseUrl = "https://swapi.info/api/";

    function showLoading() {
        loader.classList.remove("hidden");
        charBox.classList.add("hidden");
    }

    function hideLoading() {
        loader.classList.add("hidden");
        charBox.classList.remove("hidden");
    }

    function setupLinks() {
        const links = document.querySelectorAll("#character-box li a");
        links.forEach(function oClick(link) { 
            link.addEventListener("click", getMovie);
        });
    }

    function convertToJson(response) {
        return response.json();
    }

    function getCharacters() {
        showLoading();

        fetch(`${baseUrl}people`)
            .then(convertToJson) 
            .then(function displayPeople(data) { 
                hideLoading();

                const charList = Array.isArray(data) ? data : data.results;
                const ul = document.createElement("ul");
                const limit = 13;
                const total = charList.length < limit ? charList.length : limit;

                for (let i = 0; i < total; i++) {
                    const character = charList[i];
                    const li = document.createElement("li");
                    const a = document.createElement("a");

                    a.textContent = character.name;
                    a.href = "#";

                    let randomIndex = Math.floor(Math.random() * character.films.length);
                    if (randomIndex >= character.films.length) {
                        randomIndex = character.films.length - 1;
                    }

                    a.dataset.film = character.films[randomIndex];
                    li.appendChild(a);
                    ul.appendChild(li);
                }

                charBox.appendChild(ul);

                gsap.from("#character-box li", {
                    duration: 0.5,
                    opacity: 0,
                    x: -50,
                    stagger: 0.05,
                    ease: "power2.out"
                });
                
                setupLinks(); 
            })
            .catch(function charError(error) {
                hideLoading();
                console.log("Couldnt fetch what you were looking for", error);
            });
    }

    function getMovie(event) {
        event.preventDefault();
        showLoading();

        const filmUrl = event.currentTarget.dataset.film;
        const movieUrl = filmUrl.startsWith("http") ? filmUrl : `${baseUrl}${filmUrl}`;

        fetch(movieUrl)
            .then(convertToJson)
            .then(function displayMovieDetails(movie) {
                hideLoading();
                movieCon.innerHTML = "";

                const clone = movieTemplate.content.cloneNode(true);
                clone.querySelector(".movie-title").textContent = movie.title;
                clone.querySelector(".movie-crawl").textContent = movie.opening_crawl;
                
                const poster = clone.querySelector(".movie-poster");
                poster.src = `images/poster${movie.episode_id}.jpg`;
                poster.alt = `Poster for ${movie.title}`;
                
                movieCon.appendChild(clone);

                const movieElements = document.querySelectorAll(".movie-card, .movie-title, .movie-poster, .movie-crawl");
               
                gsap.from(movieElements, {
                    duration: 0.5,
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            })
            .catch(function charError(error) {
                hideLoading();
                console.log("I had trouble loading the movie details:", error);
            });
    }

    gsap.from(".placeholder-text", {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: "power2.out",
        delay: 0.4
    });

    gsap.from(".logo", {
        duration: 1,
        opacity: 0,
        y: 0,
        ease: "power2.out"
    });

    getCharacters();

})();