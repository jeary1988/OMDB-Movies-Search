// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$(document).on('deviceready', function() {
    
 $('#mywebsite').on('touchend', function(){
    var optionsArray =[ 
                // For all OS's
				'location=no',
				
				// For Android, iOS & Windows Phone only
				'hidden=yes',
				
				// Android and iOS only
				'clearcache=yes',
				'clearsessioncache=yes',
				
				// iOS only
				// Transition style options are fliphorizontal, crossdissolve or coververtical (Default)
				'transitionstyle=fliphorizontal',
				'toolbar=yes',
				'closebuttoncaption=Exit',
				// Tool bar position options are top or bottom (Default)
				'toolbarposition=top',
				'disallowoverscroll=yes',
				'enableViewportScale=yes',
				'mediaPlaybackRequiresUserAction=yes',
				'allowInlineMediaPlayback=yes',
				'keyboardDisplayRequiresUserAction=no',
				'suppressesIncrementalRendering=yes',
				// Presentation style options are pagesheet, formsheet or fullscreen (Default)
				'presentationstyle=formsheet',

				// Android only
				'zoom=no',
				'hardwareback=no',
				
				// Windows only
				// If location is set to no there be no control presented to user to close IAB window.
				'fullscreen=yes' ];    
    
    var options = optionsArray.join();     
   var jbroswer = window.open('https://www.nasserjeary.com/', '_blank', options);  jbroswer.show();  
    });
    
    
$('#movieForm').on('submit', function(e){
    var searchMovie = $('#movieName').val();
    console.log(searchMovie); 
    fetchMovies(searchMovie);
        e.preventDefault();
  });
  
/*---------------fetch movies------------------*/
    
function fetchMovies(searchMovie){
  $.ajax({
    method:'GET',
    url:'http://www.omdbapi.com/?apikey=80fe09c6&s='+searchMovie
  }).done(function(data){
    console.log(data);  
    var moviesArray = data.Search;
    var output = '';
    $.each(moviesArray, function(index, movie){
      output += `
        <li>

 <a  onclick="movieClicked('${movie.imdbID}')" href="movie.html" class="item-link item-content">
        <div class="item-media"><img src="${movie.Poster}">
        </div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">${movie.Title}</div>
            <div class="item-after"><br><br> ${movie.Year}</div>
          </div>
        </div>
      </a>

    </li>
      `;
    });
    $('#movieslist').html(output);
  });
}
   
    

 }); /*---------end of onDeviceready function ------------*/
    


function movieClicked(id){
  sessionStorage.setItem('movieId', id);
}




myApp.onPageInit('movie', function (page) {
    var movieId = sessionStorage.getItem('movieId');
    getMovie(movieId);

}) /*------- end of movie page scripting -----*/ 

    // Get Single Movie
function getMovie(movieId){
  $.ajax({
    method:'GET',
     url:'http://www.omdbapi.com/?apikey=80fe09c6&i='+movieId
  }).done(function(movie){
   console.log(movie);
    var movieDetails = `
     <div class="card">
          <img src="${movie.Poster}">    
            <ul>
      <li><strong>Genre:</strong> ${movie.Genre}</li><hr>
      <li><strong>Released:</strong> ${movie.Released}</li><hr>
      <li><strong>Runtime:</strong> ${movie.Runtime}</li><ht>
      <li><strong>IMDB Rating:</strong> ${movie.imdbRating}</li><hr>
      <li><strong>IMDB Votes:</strong> ${movie.imdbVotes}</li><hr>
      <li><strong>Actors:</strong> ${movie.Actors}</li><hr>
            </ul>
         
          
          <div class="card-footer"><strong> Director:</strong> ${movie.Director}</div>
        </div>
    `;

    $('#movieDetails').html(movieDetails);
  });
}
    
   

          

  