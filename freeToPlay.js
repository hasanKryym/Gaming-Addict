loader();
sidebar();
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '275f828320mshfa957aade3ba680p1bcc9ajsn90054cc44742',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', options)
	.then(response => response.json())
    // .then(response => console.log(response))
	.then(response => freeGames(response))
	.catch(err => console.error(err));

    const freeToPlayContainer = document.querySelector('.free-to-play_container');

function freeGames(array) {
    let displayFreeGames = array.map( (game) => {
        return `
        <div class="game">
          <img src="${game.thumbnail}" alt="" />
          <div class="content">
            <h4>${game.title}</h4>
            <div class="progress-line"><span></span></div>
            <div class="info">
              <p>
                Price <br />
                <span>$0</span>
              </p>
              <a target="_blank" href="${game.game_url}" >Read More</a>
            </div>
          </div>
        </div>
        `;
    }).join('');
    freeToPlayContainer.innerHTML = displayFreeGames
};