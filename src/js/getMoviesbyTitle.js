const apiHost = 'moviesdatabase.p.rapidapi.com';
const apiKey ='3d071accc4msh352f4c833b68dc9p15fa3ajsnb4f5ab7855c3';
const baseUrl = "https://moviesdatabase.p.rapidapi.com/titles/search/title/";
const searchMovie = document.getElementById("searchMovie");
const queryParam = "?limit=15&info=base_info&page=";


document.addEventListener('submit', () => {
	getMovie();
});

const getMovie = async () => {
    document.querySelector(".movies-container").innerHTML="";
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': apiKey,
			'X-RapidAPI-Host': apiHost
		}
	};

	let fetchPage=1;
	const response = await fetch(baseUrl+searchMovie.value+queryParam+fetchPage, options);
	
	const {results} = await response.json();
	console.log(results);
	let hasYear,hasImg;
	
	for(let i=0;i<results.length;i++){
		const movieCard=document.createElement("div-movie-card");
		if(results[i].titleType.id=="movie"){
		if(results[i].releaseYear){
			hasYear=`
			<div class="releaseYear">${results[i].releaseYear.year}</div>
			`
		}else{
			hasYear=`<div></div>`;
		}
			
		if(results[i].primaryImage){
			hasImg=`
			<a href="#"><img src="${results[i].primaryImage.url}" class="movieImg"></a>
			`
		}else{
			hasImg=`<div></div>`;
		}
		movieCard.innerHTML= `
		${hasImg}
		<div id="movieID" hidden>${results[i].id}</div>
		<div class="movieTitle">${results[i].titleText.text}</div>
		${hasYear}
		`
		document.querySelector(".movies-container").appendChild(movieCard);
	}
	}
	
	
}


