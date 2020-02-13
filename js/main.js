$(document).ready(() => {
   $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      getMovies(searchText);
      e.preventDefault();
   });
});

// Fonction pour chercher un film avec une requête
// Url de recherche 
// clé personnel de l'utilisation de l'API
// query= film recherché , par exemple : query=avengers
function getMovies(searchText) {
   axios.get('https://api.themoviedb.org/3/search/movie?api_key=f33cd318f5135dba306176c13104506a&query=' + searchText)
      .then((response) => {
         console.log(response);
         let movies = response.data.results;
         let output = '';
         // Pour chaque film , afficher le titre 'movie.Title', et l'image 'movie.Poster_path'
         $.each(movies, (index, movie) => {
            output += `
      <div class="col-md-3">
      <div class="well text-center">
      <img src="${ 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path}">
      <h5>${movie.title}</h5>
      <a onclick="movieSelected(${movie.id})" class="btn btn-primary" href="#">Détails</a>
      </div>
      </div>`;
      // Evenement , au clique sur détail , on affiche la page détail , en appellant l'id avec la fonction movieSelected
         });
         $('#movies').html(output);
      })

      // Cas de l'erreur
      .catch((err) => {
         console.log(err);
      });
}

function movieSelected(id) {
   sessionStorage.setItem('movieId', id);
   window.location = 'movie.html';
   return false;
}


// Page movie , détail du film
function getMovie() {
   let movieId = sessionStorage.getItem('movieId');

   console.log('movieId',movieId);
// Concaténation avec la variable movieID , pour obtenir l'id de chaque film
   axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=f33cd318f5135dba306176c13104506a')
      .then((response) => {
         console.log(response);
         let movie = response.data;

         let output = `
      <div class="row">
      <div class="col-md-4 sm-6">
      <img src="${'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path}">

      </div>
      <div class="col-md-8 sm-6">
      <h3>${movie.title}</h3>
      <ul class="list-group">
      <li class="list-group-item"><strong>Titre: </strong> ${movie.title}
      <li class="list-group-item"><strong>Date de sortie: </strong> ${movie.release_date}
      <li class="list-group-item"><strong>Languages : </strong> ${movie.original_language}
      <li class="list-group-item"><strong>Votes : </strong> ${movie.vote_average}
      <li class="list-group-item"><strong>Popularité : </strong> ${movie.popularity}
      <li class="list-group-item"><strong>Budget du film: </strong> ${movie.budget}
      </ul>

      <div class="col-md-4 m-2">
      <a href="index.html" class="btn btn-primary mt-4">Retour</a>
      </div>
      </div>

      
      </div> 
     
     
      `;

      $('#movie').html(output);
      })
      // Cas de l'erreur
      .catch((err) => {
         console.log(err);
      });
}

