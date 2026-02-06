(() => {
    // Routes
    // All Characters
    // One Movie by ID
    // https://swapi.info/api/people
    // https://swapi.info/api/films

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

    function getCharacters() {
        showLoading();

        fetch(`${baseUrl}people`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
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

        })
        .then(function() {
            const links = document.querySelectorAll("#character-box li a");
            links.forEach(function(link) {
                link.addEventListener("click", getMovie);
            });
        })
        .catch(function(error) {
            hideLoading();
            console.log("Character error:", error);
        });
    }

    function getMovie(event) {
        event.preventDefault();
        showLoading();

        const filmUrl = event.currentTarget.dataset.film;
        const movieUrl = filmUrl.startsWith("http") ? filmUrl : `${baseUrl}${filmUrl}`;

        fetch(movieUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(movie) {
            hideLoading();

            movieCon.innerHTML = "";

            const clone = movieTemplate.content.cloneNode(true);
            const title = clone.querySelector(".movie-title");
            const crawl = clone.querySelector(".movie-crawl");
            const poster = clone.querySelector(".movie-poster");

            title.textContent = movie.title;
            crawl.textContent = movie.opening_crawl;
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

        .catch(function(error) {
            hideLoading();
            console.log("Movie error:", error);
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
