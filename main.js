
let isAuth = false;
let users = [];

document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.tagName === 'A'){
        route(event)
        handleLocation()
    }
})


const route = (event) => {
    window.history.pushState({},'',event.target.href)
}
const routes = {
    '/':'main.html',
    // '/registration':'registration.html',
    // '/login':'login.html'
}
const handleLocation = async (event) =>{
    const path = window.location.pathname;
    if(path === '/login'){
        document.querySelector('.wrap').innerHTML =`<div class="block">
        <h1 class="title">LogIn</h1>
        <form action="" class="form" name="login">
            <div class="input-wrap">
                <label for="login" class="input-label">Login</label>
                <input type="text" class="input" id="login">
            </div>
            <div class="input-wrap">
                <label for="password" class="input-label">password</label>
                <input type="password" class="input" id="password">
            </div>
            <button class="btn">Send</button>
        </form>
    </div>`
    }else if(path==='/registration'){
        document.querySelector('.wrap').innerHTML =`<div class="block">
        <h1 class="title">Reg</h1>
        <form action="" class="form" name="reg">
            <div class="input-wrap">
                <label for="login" class="input-label">Login</label>
                <input type="text" class="input" id="login">
            </div>
            <div class="input-wrap">
                <label for="email" class="input-label">Email</label>
                <input type="email" class="input" id="email">
            </div>
            <div class="input-wrap">
                <label for="password" class="input-label">password</label>
                <input type="password" class="input" id="password">
            </div>
            <div class="input-wrap">
                <label for="password2" class="input-label">Repit pass</label>
                <input type="password" class="input" id="password2">
            </div>
            <button class="btn_reg">Send</button>
        </form>
    </div>`
    }else if(path === '/posts'){
        document.querySelector('.wrap').innerHTML = '<h1>Мои посты</h1>'
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(data=>data.json())
        .then(data=>printPosts(data))
    }else if(path === '/comments'){
    document.querySelector('.wrap').innerHTML = '<h1>Комементарии</h1>'
    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(data=>data.json())
    .then(data=>printComments(data))
    }else{
        const html = await fetch(routes[path]).then(data => data.text());
        document.querySelector('.wrap').innerHTML = html;
    }
}
function printComments(comments){
    comments.forEach(comment =>{
        return document.querySelector('.wrap').insertAdjacentHTML('beforeend',`
        <div >
            <h4 class='title'>${comment.name}</h4>
            <p class='text'>${comment.body}</p>
        </div>
        <hr>`)
    })
}
function printPosts(posts){
    posts.forEach(post => {
        return document.querySelector('.wrap').insertAdjacentHTML('beforeend',`
        <div >
            <h4 class='title'>${post.title}</h4>
            <p class='text'>${post.body}</p>
        </div>
        <hr>`)
    })
}
window.onpopstate = handleLocation;

window.route = route;
handleLocation();

let user = {
    login: 'user',
    password:'123'
}



document.addEventListener('click', (event)=>{
    if (event.target.classList.contains('btn')){
        let form = document.forms.login,
        login = form.elements[0].value,
        psw = form.elements[1].value;

    event.preventDefault();
    if (login === user.login && psw === user.password){
        isAuth = true;
        console.log(isAuth)
    }else{
        isAuth = false;
        console.log(isAuth)
    }
    }
})

document.addEventListener('click', (event)=>{
    if (event.target.classList.contains('btn_reg')){
        let form = document.forms.reg,
            login = form.elements[0].value,
            email = form.elements[1].value,
            psw = form.elements[2].value,
            psw2 = form.elements[3].value;

    event.preventDefault();
    if (psw === psw2 && psw != ''){
        users.push({login,email,psw})
        isAuth = true;
    }else{
        isAuth = false;
    }
    console.log(users)
    }
})




