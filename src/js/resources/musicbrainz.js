import axios from 'axios'

function musicbrainz_artists_search(search) {
    return new Promise(function (resolve, reject) {
        axios.get(`http://musicbrainz.org/ws/2/artist/?query=${search}&fmt=json`)
        
        .then(function (response) {
            const search_result = response.data.artists[0]

            if (search_result) {
                resolve({
                    name: search_result.name,
                    life_span: `${search_result["life-span"].begin} - ${search_result["life-span"].ended ? search_result["life-span"].end : "Presente"}`,
                    area: search_result.area ? search_result.area.name : ""
                })
            } else {
                reject("Nenhum resultado encontrado")
            }

        })
        .catch(function (error) {
            reject(error)
        })
    })
}
  
export default musicbrainz_artists_search


// const nome = response.data.artists[0].area.name
// const local = response.data.artists[0].area.name
// const dataInicio = response.data.artists[0]["life-span"].begin
// const dataFim = response.data.artists[0]["life-span"].end
// const fimBoolean = response.data.artists[0]["life-span"].ended

// let dataFinal = ""
// if (fimBoolean == true) {
//     dataFinal = dataFim
//     return dataFinal
// } else if (fimBoolean == false) {
//     dataFinal = "Presente"
// }

// content.innerHTML = ""
// content.innerHTML =+ `<h1>${nome}</h1><h3>${dataInicio} ${dataFinal}</h3><p>${local}</p>`