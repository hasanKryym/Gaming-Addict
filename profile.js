
if(localStorage.getItem('loggedInAcc') != null){
    function displayProfileInfo() {
        const profileSection = document.querySelector('.profile-section');

        user = JSON.parse(localStorage.getItem('loggedInAcc'));

        userAccount = user[0];

        // console.log(userAccount);

        let profileData = `
            <div class="center-profile">
        <div class="top">
          <div class="round-img">
            <img
              class="round"
              src="${userAccount.profilePic}"
              alt="user"
            />
          </div>
        </div>
      </div>
      <div class="right-profile">
        <div class="card-container">
          <!-- <span class="pro">PRO</span> -->
          <img
            class="round"
            src="${userAccount.profilePic}"
            alt="user"
          />
          <h3>${userAccount.name}</h3>
          <h6>${userAccount.country}</h6>
          <p id="about-profile">
            ${userAccount.about}
          </p>
          <div class="buttons">
            <button id="edit-profile-btn" class="primary">Edit profile</button>
            <button id="logout-btn" class="primary ghost">logout</button>
          </div>

          <div class="edit-profile remove">
              <h4>About</h4>
              <textarea
                name="about"
                id="profile-about"
                cols="40"
                rows="12"
              >${userAccount.about}</textarea>
              <br />
              <h4>Country</h4>
              <input
                class="profile-edit_inputs"
                id="profile-country"
                type="text"
                value="${userAccount.country}"
              />

              <h4>Change password</h4>
              <input
                class="profile-edit_inputs"
                id="change-password"
                type="password"
              />

              <h4>Change email</h4>
              <input class="profile-edit_inputs" id="change-email" type="email" />

              <div class="buttons">
              <button id="save-profile-btn" class="primary">save</button>
              <button id="cancel-btn" class="primary ghost">cancel</button>
              </div>
            </div>
          <!-- <div class="skills">
            <h6>Games</h6>
            <ul>
              <li>UI / UX</li>
              <li>Front End Development</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Node</li>
            </ul>
          </div> -->
        </div>
      </div>
        `;

        profileSection.innerHTML = profileData;
    }

    displayProfileInfo();

    const logoutBtn = document.querySelector('#logout-btn');
    
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInAcc');
        window.location.reload();
    });

    const editProfile = document.querySelector('.edit-profile');
    const editBtn = document.querySelector('#edit-profile-btn');
    const cancelBtn = document.querySelector('#cancel-btn');
    const saveBtn = document.querySelector('#save-profile-btn');
    const editInputs = document.querySelectorAll('.profile-edit_inputs');
    const aboutProfile = document.querySelector('#profile-about');

    editBtn.addEventListener('click', () => {
        editProfile.classList.remove('remove');
    });

    cancelBtn.addEventListener('click', () => {
        aboutProfile.value = '';
        //clear inputs value
        editInputs.forEach((input) => {
            input.value = '';
        });
        
        editProfile.classList.add('remove');
    });

    saveBtn.addEventListener('click', () => {
        const newCountry = document.querySelector('#profile-country').value;
        const newPassword = document.querySelector('#change-password').value;
        const newEmail = document.querySelector('#change-email').value;
        let submit = true;
        let passwordChange = false;
        let emailChange = false;

        let userAcc = JSON.parse(localStorage.getItem('loggedInAcc'));
        let accountsArr = JSON.parse(localStorage.getItem('accounts'));
        // userAcc = userAcc[0];
    
            userAcc[0].about = aboutProfile.value;

            userAcc[0].country = newCountry;

            if (newPassword != ''){
                if (newPassword.length >= 8){
                    userAcc[0].password = newPassword;
                    passwordChange = true;
                }
                else {
                    alert('password must be at least 8 characters in length');
                    submit = false;
                };
            }

        if (newEmail != ''){
            userAcc[0].email = newEmail;
            emailChange = true;
        };
        if (submit){
            for (let i =0; i < accountsArr.length; i++){
                if(userAcc[0].name === accountsArr[i].name){
                    if (passwordChange){
                        accountsArr[i].password = newPassword;
                    };

                    if (emailChange) {
                        accountsArr[i].email = newEmail;
                    };

                    accountsArr[i].about = aboutProfile.value;
                    accountsArr[i].country = newCountry;
                    break;
                }
            };
            localStorage.setItem('accounts', JSON.stringify(accountsArr));
            // console.log(accountsArr);
            localStorage.setItem('loggedInAcc', JSON.stringify(userAcc));
            window.location.reload();
        }
        
    });


}
