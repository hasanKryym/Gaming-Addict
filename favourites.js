const favGamesContainer = document.querySelector('#fav-games-container');

let loggedInAccArr = JSON.parse(localStorage.getItem('loggedInAcc'));
if(loggedInAccArr != null){
    window.addEventListener('DOMContentLoaded', () => {
        changeBtn();
    })
    let favArr = loggedInAccArr[0].fav;

    if(favArr.length != 0){
        let displayFavGames = favArr.map((game) => {
            return `
                <div class="game">
          <img src="${game.img}" alt="" />
          <div class="content">
            <h4>${game.name}</h4>
            <div class="progress-line"><span></span></div>
            <div class="info">
              <p>
                Price <br />
                <span>$${game.price}</span>
              </p>
              <button id="${game.name}" class="game-details-btns" >Read More</button>
              </div>
              <button data-gameName="${game.name}" class="remove-fav_game" >Remove</button>
          </div>
        </div>
            `
        }).join('');

        favGamesContainer.innerHTML = displayFavGames;
    }else {
        favGamesContainer.innerHTML = '<a href="./index.html#game_sec" class="game-link" > Add Favourite Games </a>'
    };
    
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    const removeBtn = document.querySelectorAll('.remove-fav_game');
    let index;
    removeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            // console.log(btn.getAttribute('data-gameName'));
            let gameName = btn.getAttribute('data-gameName');
            let favLength = loggedInAccArr[0].fav.length
            for(let i = 0; i < favLength;  i++ ) {
                if(loggedInAccArr[0].fav[i].name == gameName) {
                    loggedInAccArr[0].fav.splice(i, 1);
                    index = i;
                    break;
                };
            };

            for (let i = 0; i <accounts.length; i++) {
                if (accounts[i].name == loggedInAccArr[0].name) {
                    accounts[i].fav.splice(index, 1);
                    break;
                }
            };
            console.log(loggedInAccArr);
            localStorage.setItem('loggedInAcc', JSON.stringify(loggedInAccArr));
            localStorage.setItem('accounts', JSON.stringify(accounts));

            window.location.reload();
        })
    })
 }