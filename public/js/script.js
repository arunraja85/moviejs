function getMovies() {
	return fetch('http://localhost:3000/movies').then(response => {
			if (response.ok) {
				return response.json();
			} else {
				reject(new Error('error'));
			}
		}
	).then(function(movies){
			//const tbody = document.getElementsByTagName("tbody")[0];
			if(null != movies){
				const tbody = document.getElementById("movies");
				let tbodyInnerHtml = '';
				movies.forEach((movie)=>{
					tbodyInnerHtml = tbodyInnerHtml+	
					`<tr>
					<td id="id">${movie.id}</td>
					<td id="title">${movie.title}</td>
					<td id="posterpath">${movie.posterpath}</td>
					<td><button id="myBtn" class="btn btn-primary" type="submit" onClick=addFavourite(${movie.id})>Add Favourites</button></td>
					</tr>`
				});
				console.log("arun checking for tbody "+ tbody);
				tbody.innerHTML = tbodyInnerHtml;
				return movies;
			}else{
				reject(new Error('error'));
			}
		},error => {
			reject(new Error('error'));
		}).catch(function(error) {
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
).then(function(movies){
		//const tbody = document.getElementsByTagName("tbody")[0];
		if(null != movies){
			const tbody = document.getElementById("favourites");
			let tbodyInnerHtml = '';
				movies.forEach((movie)=>{
					tbodyInnerHtml = tbodyInnerHtml+	
					`<tr>
					<td>${movie.title}</td>
					<td>${movie.posterpath}</td>			
					</tr>`
				});
			console.log("arun checking for tbody "+ tbody);
			tbody.innerHTML = tbodyInnerHtml;
			console.log("favourites movie list before "+favouriteMovieList);
			favouriteMovieList = movies;
			console.log("favourites movie list "+favouriteMovieList);
			return favouriteMovieList;
		}else{
			reject(new Error('error'));
		}
	},error => {
		reject(new Error('error'));
	}).catch(function(error) {
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
//const favouriteMovieList = getFavourites().then(movies => movies).catch(new Error("Unable to retrieve"));

function checkDuplicateInObject(movieId, favouritesMovieList) {
	let isDuplicate = false,
	testObject = {};
  console.log(favouritesMovieList);
  console.log(Array.isArray(favouritesMovieList));
	favouritesMovieList.map((item =>  {
	  let itemPropertyName = item[movieId];    
	  if (itemPropertyName in testObject) {
		testObject[itemPropertyName].duplicate = true;
		item.duplicate = true;
		isDuplicate = true;
	  }
	  else {
		testObject[itemPropertyName] = item;
		delete item.duplicate;
	  }
	}));
  
	return isDuplicate;
  }

function addFavourite(id) {
	const rowData = document.getElementsByTagName("tr")[id];
	const selectedRow = rowData.getElementsByTagName("td");
	const movie = {
		id: selectedRow.id.innerHTML,
		title : selectedRow.title.innerHTML,
		posterpath : selectedRow.posterpath.innerHTML
	}
	// var arra1 = [{"id":1,"name":"kabali"},{"id":2,"name":"kaala"}];

	// var v = 1; 
	// var res = arra1.filter(fm => fm.id === v).length>0;
	// let movieArray = getFavourites().then(response => response).catch(new Error("Favourite list error"));
	console.log("checking for object type "+typeof(favouriteMovieList));
	const arr = Object.values(favouriteMovieList);
	console.log(arr);
	
	// let movieArray1 = JSON.parse(movieArray.then(response));
	let movieId = movie.id;
	let isDuplicate = arr.filter(fm => fm.id === movieId).length>0;
	console.log("arun  duplicate testing "+ isDuplicate);
		// console.log("arun testing "+movie);
	//console.log("arun testing "+getFavourites());
	//console.log("arun testing "+getFavourites().then(mo => mo.json()));
	//console.log("arun testing "+favouriteMovieList);
	//console.log("arun testing "+JSON.stringify(favouriteMovieList));
	//getFavouritesMovieList().forEach(fav -> fav.id = selectedRow.id.innerHTML)
	//let isDuplicate = favouriteMovieList != null ? checkDuplicateInObject(id,JSON.stringify(favouriteMovieList)) : false;
	//console.log(isDuplicate + "checking dupicate value");
	if(!isDuplicate){
		return fetch("http://localhost:3000/favourites",
		{
			method:'POST',
			body:JSON.stringify(movie),
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			}
		}).then(response => {
			if(response.ok){
				return Promise.resolve(getFavourites());
			}else{
				return Promise.reject(new Error("Some internal error occurred"));
			}
		},(error) => {
			console.log("Internal Error Occurred", error.message);
		}
		).then(response => {
			location.reload();
		}).catch(error =>{
			console.log("Internal Error Occurred");
		})
	}else{
		alert("Duplicate error");
		new Error("Duplicate Id Error");
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


