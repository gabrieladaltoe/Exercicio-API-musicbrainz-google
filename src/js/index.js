import '../styles/main.scss'

import credentials from './credentials'
import google_image_search from './resources/google'
import musicbrainz_artists_search from './resources/musicbrainz'

// manipulação do DOM
musicbrainz_artists_search()
google_image_search()

const form = document.querySelector("#search form")
const input = document.querySelector("input")
const content = document.getElementById("content")
const imgBg = document.getElementById("bg")
const main = document.querySelector("main")

form.addEventListener("submit", function(event){
    event.preventDefault()
    const query = input.value
    imgBg.style.opacity = 0
    content.innerHTML = `<p>Carregando...</p>`
    


    musicbrainz_artists_search(query)
        .then(function(mb_data){
            content.style.height = "auto"

            google_image_search(mb_data.name)
                .then(function(g_data){
                    imgBg.style.opacity = 1
                    content.innerHTML = ""


                    imgBg.src = g_data
                    imgBg.onload = function(){


                    const h1 = document.createElement("h1")
                    h1.textContent = mb_data.name
                    const h3 = document.createElement("h3")
                    h3.textContent = mb_data.life_span
                    const p = document.createElement("p")
                    p.textContent = mb_data.area


                    content.appendChild(h1)
                    content.appendChild(h3)
                    content.appendChild(p)

                    content.style.height = h1.clientHeight + h3.clientHeight + p.clientHeight + 80 + "px"
                    main.style.width = input.clientWidth + main.style.padding * 2 + "px"


                }
                   
                })
                .catch(function(error){
                    console.error(error)
                    const erro_msd = error  === "Nenhum resultado encontrado" ? error : "Erro de conexão"
                    content.innerHTML `<p>${error_msg}`
                })
        })
        .catch(function(error){
            console.error(error)
            const erro_msd = error  === "Nenhum resultado encontrado" ? error : "Erro de conexão"
            content.innerHTML `<p>${error_msg}`
         })

})

