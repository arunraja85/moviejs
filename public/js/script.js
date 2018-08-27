function getMovieList(){
	return new Promise((resolve,reject)=> {
		const httpRequest = new XMLHttpRequest();
		httpRequest.open('GET','http://localhost:3000/movies');
		httpRequest.setRequestHeader("content-type","application/json");
		httpRequest.onreadystatechange = function (){
			if(httpRequest.readyState === XMLHttpRequest.DONE) {			
				resolve(JSON.parse(httpRequest.response));
			}else if(httpRequest.status == 500){
				reject(new Error("Internal Server Error Occurred"));
			}
		}
		httpRequest.send();
	});
}

function getFavouritesMovieList(){
	return new Promise((resolve,reject)=> {
		const httpRequest = new XMLHttpRequest();
		httpRequest.open('GET','http://localhost:3000/favourites');
		httpRequest.setRequestHeader("content-type","application/json");
		httpRequest.onreadystatechange = function (){
			if(httpRequest.readyState === XMLHttpRequest.DONE) {			
				resolve(JSON.parse(httpRequest.response));
			}else if(httpRequest.status == 500){
				reject(new Error("Internal Server Error Occurred"));
			}
		}
		httpRequest.send();
	});
}

// function addFavouriteMovie1(movie){
// 	return new Promise((resolve,reject)=>{
// 		const httpRequest = new XMLHttpRequest();
// 		httpRequest.open('post','http://localhost:3000/favourites');
// 		httpRequest.setRequestHeader("content-type","application/json");
// 		httpRequest.onreadystatechange = function (){
// 			if(httpRequest.readyState === XMLHttpRequest.DONE) {			
				
// 			}else if(httpRequest.status == 500){
// 				reject(new Error("Internal Server Error Occurred"));
// 			}
// 		}
// 		httpRequest.send(JSON.stringify);
// 	});
// }

function getMovies() {
	getMovieList().then((movies) => {
		const tbody = document.getElementsByTagName("tbody")[0];
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
		tbody.innerHTML = tbodyInnerHtml;
	}).catch((error) => {
		console.log("Some internale error");
	})
}

function getFavourites() {
	getFavouritesMovieList().then((movies) => {
		const tbody = document.getElementById("favourites");
		let tbodyInnerHtml = '';
		console.log(tbody);
		movies.forEach((movie)=>{
			console.log(movie);
			tbodyInnerHtml = tbodyInnerHtml+	
			`<tr>
			<td>${movie.title}</td>
			<td>${movie.posterpath}</td>			
			</tr>`
		});
		tbody.innerHTML = tbodyInnerHtml;
	}).catch((error) => {
		console.log("Some internale error");
	})
}

function addFavourite(id) {
	const rowData = document.getElementsByTagName("tr")[id];
	const selectedRow = rowData.getElementsByTagName("td");
	const movie = {
		id: selectedRow.id.innerHTML,
		title : selectedRow.title.innerHTML,
		posterpath : selectedRow.posterpath.innerHTML
	}
	//getFavouritesMovieList().forEach(fav -> fav.id = selectedRow.id.innerHTML)
	fetch("http://localhost:3000/favourites",
	{
		method:'POST',
		body:JSON.stringify(movie),
		headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
	}).then(response => {
	 	if(response.ok){
	 		return Promise.resolve(getFavouritesMovieList());
	 	}else{
	 		return Promise.reject(new Error("Some internal error occurred"));
	 	}
	 }).then(response => {
		 location.reload();
	 }).catch(error =>{
		 console.log("Internal Error Occurred");
	 })
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


