    
//     const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '275f828320mshfa957aade3ba680p1bcc9ajsn90054cc44742',
// 		'X-RapidAPI-Host': 'videogames-news2.p.rapidapi.com'
// 	}
// };

// fetch('https://videogames-news2.p.rapidapi.com/videogames_news/recent', options)
// 	.then(response => response.json())
// 	// .then(response => console.log(response))
//     .then(response => latestNews(response))
// 	.catch(err => console.error(err));


//     function latestNews(array) {
    //     let displayFreeGames = array.map( (news) => {
        //         return `
        //         <article class="game_news">
        //             <img src="${news.image}" alt="" />
        //             <div className="info">
        //                 <h2>${news.title}</h2>
        //                 <p>${news.description}</p>
        //                 <a target="__blank" href="${news.link}">Read More</a>
        //                 <h4>Release date: ${news.date}</h4>
        //             </div>
        
        //         </article>
        //         `;
        //     }).join('');
        //     gameNewsSection.innerHTML += displayFreeGames
        // };
        sidebar();
        loader();
        
        // const loader = document.querySelector('.center-body');
        // window.addEventListener('DOMContentLoaded', () => {
        //     loader.classList.add('remove');
        // })
        const gameNewsSection = document.querySelector('.news-section');
        

        const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '275f828320mshfa957aade3ba680p1bcc9ajsn90054cc44742',
		'X-RapidAPI-Host': 'mmo-games.p.rapidapi.com'
	}
};

fetch('https://mmo-games.p.rapidapi.com/latestnews', options)
	.then(response => response.json())
	// .then(response => console.log(response))
	.then(response => latestNews(response))
	.catch(err => console.error(err));

        function latestNews(array) {
    let displayFreeGames = array.map( (news) => {
        return `
        <article class="game_news">
        <img src="${news.main_image}"></img>
        <div class="content_info" >${news.article_content}</div>
        <a class="news-details" target="__blank" href="${news.article_url}">Read More</a>
        </article>
        `;
    }).join('');
    gameNewsSection.innerHTML += displayFreeGames
};