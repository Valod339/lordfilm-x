function btnMenu(){
    const btn = document.querySelector(".nav_btn")
    const menu = document.querySelector(".menu")

    btn.addEventListener("click", (e)=>{
        e.preventDefault()
        menu.classList.toggle("active")
    })
}

function menu(){
    const $doms = document.querySelector(".menus")
    const res = fetch("/categ").then(res => res.json()).
    then(res => {
        for (let i = 0; i < res.length; i++) {
            $doms.innerHTML += `
                <li><a href="/pots/${res[i]._id}">${res[i].title}</a></li>
            `
           
        }
    })
}
menu()


btnMenu()