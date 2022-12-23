const form = document.querySelector('form')
const inputBox = form[0]
const submitBtn = form[1]
const userList = document.querySelector('#user-list')
const repoList = document.querySelector('#repos-list')

form.addEventListener('submit', search)

function search(e) {
    e.preventDefault();
    fetch(`https://api.github.com/search/users?q=${inputBox.value}`)
    .then(response => response.json())
    .then(data => display(data))
    .catch(error => alert(error))
    form.reset();
}

function display(data){
    userList.innerHTML = ""
    repoList.innerHTML = ""
    data.items.forEach(element => {
        const name = element.login
        const searchItem = document.createElement('li')
        searchItem.innerHTML = `
            <img class="pic" src="${element.avatar_url}" /> 
            <br> 
            <span>${name}</span> 
            <a href="${element.html_url}" target="_blank" rel="noopener noreferrer">Profile</a>
        `
        searchItem.querySelector('span').addEventListener('click', select)
        userList.appendChild(searchItem)
    });
}

function select(e) {
    e.preventDefault();
    const login = e.target.textContent
    const title = document.createElement('h3')
    title.textContent = `${login}'s Repos`
    
    fetch(`https://api.github.com/users/${login}/repos`)
    .then(response => response.json())
    .then(data => repo(data, title))
    .catch(error => alert(error));
}

function repo(data, title){
    repoList.innerHTML = ""
    repoList.appendChild(title)
    data.forEach(element => {
        const name = element.name
        const repo = document.createElement('li')
        repo.textContent = name
        repoList.appendChild(repo)
    })
}