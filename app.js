// sticky navbar
window.addEventListener('scroll', () => {
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0)
});
const homePage = document.querySelector('.main');
const aside = document.getElementsByTagName('aside');
const asideBtn = document.querySelector('#aside-btn');
const asideSpans = document.querySelectorAll('.aside-span');
const asideNoneLinks = document.querySelectorAll('.aside-non-links');
//game-details-section
const gameDetailsSection = document.querySelector('.game-details-section');
//profile section
const profileSection = document.querySelector('.profile-section');
const favSection  = document.querySelector('.fav-section');
const freeToPlaySection = document.querySelector('.free-to-play_container');
const newsSection = document.querySelector('.news-section');

// console.log(aside);
// console.log(window.location);

asideBtn.addEventListener('click', () => {
    console.log('clicked');
    if (asideBtn.innerHTML == '<i class="fa-solid fa-angle-left"></i>'){
    asideBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    aside[0].classList.remove('show-aside');
    aside[0].classList.add('hide-aside');

    if(window.location.pathname == '/index.html'){
        // console.log(homePage)
        homePage.classList.remove('shrink-section');
        homePage.classList.add('expand-section');
    };
    
    if(window.location.pathname == "/gameDetails.html"){
    gameDetailsSection.classList.remove('shrink-game-details');
    gameDetailsSection.classList.add('expand-game-details');
    };

    if(window.location.pathname == "/profile.html"){
    profileSection.classList.remove('shrink-section');
    profileSection.classList.add('expand-section');
    };

    if(window.location.pathname == "/favourites.html"){
    favSection.classList.remove('shrink-section');
    favSection.classList.add('expand-section');
    };

    if(window.location.pathname == "/freeToPlay.html"){
    freeToPlaySection.classList.remove('shrink-section');
    freeToPlaySection.classList.add('expand-section');
    };

    if(window.location.pathname == "/news.html"){
    newsSection.classList.remove('shrink-section');
    newsSection.classList.add('expand-section');
    };
    }

    else{

    asideBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>'
    aside[0].classList.remove('hide-aside');
    aside[0].classList.add('show-aside');


    if(window.location.pathname == "/gameDetails.html"){
    gameDetailsSection.classList.remove('expand-game-details');
    gameDetailsSection.classList.add('shrink-game-details');
    };

    if(window.location.pathname == '/index.html'){
        homePage.classList.remove('expand-section');
        homePage.classList.add('shrink-section');
    };

    if(window.location.pathname == '/profile.html'){
        profileSection.classList.remove('expand-section');
        profileSection.classList.add('shrink-section');
    };

    if(window.location.pathname == '/favourites.html'){
        favSection.classList.remove('expand-section');
        favSection.classList.add('shrink-section');
    };
    
    if(window.location.pathname == '/freeToPlay.html'){
        freeToPlaySection.classList.remove('expand-section');
        freeToPlaySection.classList.add('shrink-section');
    };

    if(window.location.pathname == '/news.html'){
        newsSection.classList.remove('expand-section');
        newsSection.classList.add('shrink-section');
    };
   }


    asideSpans.forEach((allE) => {
        // console.log(allE);
        if ( aside[0].classList.contains('hide-aside')){
            allE.classList.add('remove');
        }else {
            allE.classList.remove('remove');
        }
        
    });

    asideNoneLinks.forEach((allE) => {
        if ( aside[0].classList.contains('hide-aside')){
            allE.classList.add('remove');
        }else {
            allE.classList.remove('remove');
        }
    });
});

// login / create account

const loginBtn = document.querySelector('.login-btn');
const closeLoginBtn = document.querySelector('#close-login');
const loginContent = document.querySelector('.login-content');

loginBtn.addEventListener('click', () => {
    if(loginContent.classList.contains('close-login')){
        loginContent.classList.remove('close-login');
        loginContent.classList.add('open-login');
    }
});

closeLoginBtn.addEventListener('click', () => {
    loginContent.classList.remove('open-login');
    loginContent.classList.add('close-login');
})


// login functions

// let accountsArray = [];
function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    createAccountForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const userName = document.querySelector('#signupUsername').value;
        const userEmail = document.querySelector('#signupEmail').value;
        const userPassword = document.querySelector('#signupPassword').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;
        const formMessage = createAccountForm.querySelector('.form__message');
        const formInputs = document.querySelectorAll('.form__input');
        let validation = true;


        if(userName == '' || userEmail == '' || userPassword == '' || confirmPassword == ''){
            setFormMessage(createAccountForm, "error", "please fill all the inputs"); 
        }
        else if (userPassword != confirmPassword) {
            clearInputError(formMessage);
            setFormMessage(createAccountForm, 'error', 'please check the confirm password');
        }
        else {
            clearInputError(formMessage);

            if (localStorage.getItem('accounts') == null){
                localStorage.setItem('accounts', '[]');
            };

            var oldAccounts = JSON.parse(localStorage.getItem('accounts'));

            if (localStorage.getItem('accounts') != null){
                oldAccounts.map((account) => {
                    if (userName == account.name){
                        setFormMessage(createAccountForm, 'error', 'username already exicts');
                        validation = false;
                    };
                });      
            };
            if(validation){
                clearInputError(formMessage);
                // create acc
                let account = {
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    profilePic: './images/default-profile.jpg',
                    about: '',
                    country: '',
                    fav: [],
                    friends: []
                };

                //push acc to the array
                oldAccounts.push(account);
                localStorage.setItem('accounts', JSON.stringify(oldAccounts));

                // clear the data from the inputs.
                formInputs.forEach(input => {
                    input.value = '';
                });
                setFormMessage(createAccountForm, 'success', 'your account was created successfully Please login');
            }

        }
        });
        // login form
        loginForm.addEventListener("submit", e => {
            e.preventDefault();
            const loginUserName = document.querySelector('#login-userName').value;
            const loginPassword = document.querySelector('#login-password').value;
            const loginFormMessage = loginForm.querySelector('.form__message');
            const formInputs = document.querySelectorAll('.form__input');
            let validation = false;
            // console.log(formMessage);
            if (loginUserName == '' || loginPassword == ''){
               clearInputError(loginFormMessage);
               setFormMessage(loginForm, "error", "please fill all the inputs"); 
            }
            else {
                usersAccounts = JSON.parse(localStorage.getItem('accounts'));
                // userAcc = usersAccounts.filter((account) => {return (account.name === loginUserName || account.email === loginUserName) && account.password === loginPassword});
                verify = usersAccounts.filter((account) => {
                    if((account.name === loginUserName || account.email === loginUserName) && account.password === loginPassword){
                        validation = true;
                        // return account;
                    };
                });
               
                
                if (!validation){
                    clearInputError(loginFormMessage);
                    setFormMessage(loginForm, "error", "Invalid username/password combination");
                }
                else {

                    //get the logged in acc array
                    userAcc = usersAccounts.filter((account) => {return (account.name === loginUserName || account.email === loginUserName) && account.password === loginPassword});
                    // console.log(userAcc);

                    //clear the inputs
                    formInputs.forEach(input => {
                    input.value = '';
                     });
                    clearInputError(loginFormMessage);
                    setFormMessage(loginForm, "success", "logged in successfully");

                    // save the logged in acc to the localStorage
                    localStorage.setItem('loggedInAcc', JSON.stringify(userAcc));
                    if(window.location.pathname == '/profile.html'){
                        window.location.reload();
                    };

                    if(window.location.pathname == '/favourites.html'){
                        window.location.reload();
                    }
                    
                }
            }

        });
    
        document.querySelectorAll(".form__input").forEach(inputElement => {
            inputElement.addEventListener("blur", e => {
                if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 4) {
                    setInputError(inputElement, "Username must be at least 4 characters in length");
                };

                if ((e.target.id === "signupPassword" || e.target.id === "confirmPassword")  && e.target.value.length > 0 && e.target.value.length < 8) {
                    setInputError(inputElement, "password must be at least 8 characters in length");
                }
            });
    
            inputElement.addEventListener("input", e => {
                clearInputError(inputElement);
            });
        });
    })




    // side bar
    sidebar();
function sidebar() {
    const closeSidebar = document.querySelector("#close-button");
    const openSidebar = document.querySelector(".toggle-sidebar")
    const sideBar = document.querySelector(".sidebar");

    closeSidebar.addEventListener("click", () => {
        sideBar.classList.toggle("close-sidebar");
        sideBar.classList.remove("open-sidebar");
    })
    
    openSidebar.addEventListener("click", () => {
    
        asideSpans.forEach((allE) => {
            // console.log(allE);
            allE.classList.remove('remove');
        });
    
        asideNoneLinks.forEach((allE) => {
            allE.classList.remove('remove');
        });
    
        if(sideBar.classList.contains("close-sidebar"))
        {
            sideBar.classList.remove("close-sidebar"); 
        }
        sideBar.classList.toggle("open-sidebar");
    });
}



function loader() {
    const loaderSection = document.querySelector('.center-body');
    loaderSection.classList.remove('remove');
        window.addEventListener('load', () => {
            loaderSection.classList.add('remove');
        })
}