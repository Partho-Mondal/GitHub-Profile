const APIURL = "https://api.github.com/users/";
const main = document.querySelector('#main');
const searchBox = document.querySelector('#search');

const getUser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    console.log(data);
    const card = `
    <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Profile Photo">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers} <strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos} <strong>Repos</strong></li>
                </ul>

                <div id="repos">
                    
                </div>
            </div>
        </div>
    `;

    main.innerHTML = card;
    getRepos(username);
}

// initial call 
getUser("justforlearning2024");

const getRepos = async(username) => {
    const repos = document.querySelector('#repos');
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach(
        (item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem);
        }
    )
}

const formSunmit = () => {
    if(searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false;
}

searchBox.addEventListener(
    "focusout", 
    function() {
        formSunmit();
    }
)
