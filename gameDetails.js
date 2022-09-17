// get the data from games.js
var details = sessionStorage.getItem('gameDetails');
// console.log(details);

gameDetailsSection = document.querySelector('.game-details-section');
gameDetailsSection.innerHTML = details;
window.addEventListener('DOMContentLoaded', () => {
    // make the btns on game card responsive
    changeBtn() ; 

});

const favBtn = document.querySelector('#fav-btn');

favBtn.addEventListener('click', () => {
    // console.log(favBtn);
    let loggedInAccArr = JSON.parse(localStorage.getItem('loggedInAcc'));
    if (loggedInAccArr != null){

        const clickedGameName = favBtn.parentElement.parentElement.querySelector('h3').innerHTML.trim();
        // console.log(clickedGameName);
    
        let gameCardArr = games.filter((game) => {return game.name == clickedGameName});
    
        gameCard = gameCardArr[0];
        // console.log(gameCard);
        
        let flag = true;
        let favArrayLength = loggedInAccArr[0].fav.length;
    
        if(favArrayLength != 0){
            for(let i =0; i<favArrayLength; i++){
                if(loggedInAccArr[0].fav[i].name == clickedGameName){
                    flag = false;
                    break;
                }
            };
        };
    
        if(flag){
            loggedInAccArr[0].fav.push(gameCard);
            
            localStorage.setItem('loggedInAcc', JSON.stringify(loggedInAccArr));
            // console.log(loggedInAccArr);
            
            let accountsArr = JSON.parse(localStorage.getItem('accounts'));
        
            for (let i =0; i < accountsArr.length; i++){
                        if(accountsArr[i].name == loggedInAccArr[0].name){
                            // accountsArr[i].fav.push(gameCard);
                            accountsArr[i].fav.push(gameCard);
                            break;
                        }
                    };
        
                    localStorage.setItem('accounts', JSON.stringify(accountsArr));

                    favBtn.innerHTML = 'Done';
        }else {
            alert('Game already excists in favourites list');
        }
    }else {
        alert('please login');
    }
    
});

   // side bar

 closeSidebar = document.querySelector("#close-button");
 openSidebar = document.querySelector(".toggle-sidebar")
 sideBar = document.querySelector(".sidebar");

closeSidebar.addEventListener("click", () => {
    sideBar.classList.toggle("close-sidebar");
    sideBar.classList.remove("open-sidebar");
})

openSidebar.addEventListener("click", () => {
    if(sideBar.classList.contains("close-sidebar"))
    {
        sideBar.classList.remove("close-sidebar"); 
    }
    sideBar.classList.toggle("open-sidebar");
})