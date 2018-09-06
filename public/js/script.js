let movieList = [];
function getMovies() {
	return fetch('http://localhost:3000/movies').then(response => {
		if (response.ok) {
			return response.json();
		} else {
			reject(new Error('error'));
		}
	}
	).then(function (movies) {
		//const tbody = document.getElementsByTagName("tbody")[0];
		if (null != movies) {
			const tbody = document.getElementById("movies");
			let tbodyInnerHtml = '';
			movies.forEach((movie) => {
				tbodyInnerHtml = tbodyInnerHtml +
					`<tr>
					<td id="movie_${movie.id}">${movie.id}</td>
					<td id="movie_title_${movie.id}">${movie.title}</td>
					<td id="movie_posterpath_${movie.id}">${movie.posterPath}</td>
					<td><button id="myBtn" class="btn btn-primary" type="submit" onClick=addFavourite(${movie.id})>Add Favourites</button></td>
					</tr>`
			});
			console.log("arun checking for tbody " + tbody);
			tbody.innerHTML = tbodyInnerHtml;
			movieList = movies;
			return movies;
		} else {
			reject(new Error('error'));
		}
	}, error => {
		reject(new Error('error'));
	}).catch(function (error) {
		console.log('There has been a problem with your fetch operation: ', error.message);
	});


}
let favouriteMovieList = {};
function getFavourites() {
	return fetch('http://localhost:3000/favourites').then(response => {
		if (response.ok) {
			return response.json();
		} else {
			reject(new Error('error'));
		}
	}
	).then(function (movies) {
		//const tbody = document.getElementsByTagName("tbody")[0];
		if (null != movies) {
			const tbody = document.getElementById("favourites");
			let tbodyInnerHtml = '';
			movies.forEach((movie) => {
				tbodyInnerHtml = tbodyInnerHtml +
					`<tr>
					<td>${movie.title}</td>
					<td>${movie.posterPath}</td>			
					</tr>`
			});
			console.log("arun checking for tbody " + tbody);
			tbody.innerHTML = tbodyInnerHtml;
			console.log("favourites movie list before " + favouriteMovieList);
			favouriteMovieList = movies;
			console.log("favourites movie list " + favouriteMovieList);
			return movies;
		} else {
			reject(new Error('error'));
		}
	}, error => {
		reject(new Error('error'));
	}).catch(function (error) {
		console.log('There has been a problem with your fetch operation: ', error.message);
	});
	// return fetch('http://localhost:3000/favourites').then(response => {
	// 		if (response.ok) {
	// 			return response.json();
	// 		} else {
	// 			throw new Error('error');
	// 		}
	// 	}).then(function(movies){
	// 		if(null != movies){
	// 			const tbody = document.getElementById("favourites");
	// 			let tbodyInnerHtml = '';
	// 			movies.forEach((movie)=>{
	// 				tbodyInnerHtml = tbodyInnerHtml+	
	// 				`<tr>
	// 				<td>${movie.title}</td>
	// 				<td>${movie.posterpath}</td>			
	// 				</tr>`
	// 			});
	// 			tbody.innerHTML = tbodyInnerHtml;
	// 			return movies;
	// 		}else{
	// 			throw new Error('error');
	// 		}	
	// 	}).catch(function(error) {
	// 		console.log('There has been a problem with your fetch operation: ', error.message);
	// 	});

}

function addFavourite(id) {
	//const rowData = document.getElementsByTagName("tr")[id];
	//const selectedRow = rowData.getElementsByTagName("td");
	// const movieId = document.getElementById("movie_"+id).innerHTML;
	// const movieName = document.getElementById("movie_title_"+id).innerHTML;
	// const posterPath = document.getElementById("movie_posterpath_"+id).innerHTML;
	// console.log("row data value "+movieId);
	// const movie = {
	// 	id: movieId,
	// 	title : movieName,
	// 	posterpath : posterPath
	// }
	// let movieId = id;
	// debugger;
	
	let isDuplicate = Object.values(favouriteMovieList).filter(fm => fm.id === id).length > 0;
	// console.log(isDuplicate+"checking is duplicate value");
	// console.log(movieData +"checking is duplicate value" + movieData.id);


	if (!isDuplicate) {
		let movieData = movieList.filter(m => m.id === id)[0];
		return fetch("http://localhost:3000/favourites",
			{
				method: 'POST',
				body: JSON.stringify(movieData),
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				}
			}).then(response => {
				if (response.ok) {
					//return Promise.resolve(response);
					return response.json();
				} else {
					//return Promise.reject(new Error("Some internal error occurred"));
					throw new Error("error");
				}
			}, (error) => {
				console.log("Internal Error Occurred", error.message);
			}).then(response => {
				// location.reload();
				debugger;
				favouriteMovieList.push(response);
				const tbody = document.getElementById("favourites");
			let tbodyInnerHtml = '';
			favouriteMovieList.forEach((movie) => {
				tbodyInnerHtml = tbodyInnerHtml +
					`<tr>
					<td>${movie.title}</td>
					<td>${movie.posterPath}</td>			
					</tr>`
			});
			console.log("arun checking for tbody " + tbody);
			tbody.innerHTML = tbodyInnerHtml;
			return favouriteMovieList;
			}).catch(error => {
				console.log("Internal Error Occurred", error.message);
			})
	} else {
		alert("Movie is already added to favourites");
		throw new Error("Movie is already added to favourites");
	}
	// if(!isDuplicate){
	// return fetch('http://localhost:3000/favourites',{
	// 			method:'POST',
	// 			body:JSON.stringify(movieData),
	// 			headers: {
	// 				"Content-Type": "application/json; charset=utf-8",
	// 			}
	// 		}).then(response => {
	// 		if (response.ok) {
	// 			return response.json();
	// 		} else {
	// 			// reject(new Error('error'));
	// 			throw new Error('error');
	// 		}
	// 	}
	// ).then(function(movies){
	// 		//const tbody = document.getElementsByTagName("tbody")[0];
	// 		// if(null != movies){
	// 		// 	const tbody = document.getElementById("movies");
	// 		// 	let tbodyInnerHtml = '';
	// 		// 	movies.forEach((movie)=>{
	// 		// 		tbodyInnerHtml = tbodyInnerHtml+	
	// 		// 		`<tr>
	// 		// 		<td id="movie_${movie.id}">${movie.id}</td>
	// 		// 		<td id="movie_title_${movie.id}">${movie.title}</td>
	// 		// 		<td id="movie_posterpath_${movie.id}">${movie.posterpath}</td>
	// 		// 		<td><button id="myBtn" class="btn btn-primary" type="submit" onClick=addFavourite(${movie.id})>Add Favourites</button></td>
	// 		// 		</tr>`
	// 		// 	});
	// 		// 	console.log("arun checking for tbody "+ tbody);
	// 		// 	tbody.innerHTML = tbodyInnerHtml;
	// 		// 	movieList = movies;
	// 		// 	return movies;

	// 		// }else{
	// 		// 	reject(new Error('error'));
	// 		// }
	// 		location.reload();
	// 	},error => {
	// 		throw new Error('error');
	// 	}).catch(function(error) {
	// 		console.log('There has been a problem with your fetch operation: ', error.message);
	// 	});
	// }else{
	// 	throw new Error("Movie is already added to favourites");
	// }
}


function addFavourite1(id) { 
	if (!favList.find((y) => y.id === id)) { 
		let  movie = movieList.find((y) => y.id === id); 
		return fetch('http://localhost:3000/favourites', 
			{ method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(movie) 
		}).then((response) => { 
			if (response.ok) { 
				favList.push(movie); 
				displayMovies(document.getElementById('favouritesList'), favList, 'FL'); 
			} return favList; 
		}); 
	} else { 
		throw new Error('Movie is already added to favourites'); 
	} 
}

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


