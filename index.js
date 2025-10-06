const wrapper = document.querySelector('.wrapper')
const container = document.querySelector('.container')
const searchPokemon = document.querySelector('#search')
let baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
let fragment = document.createDocumentFragment()

window.addEventListener('load', async () => {
    const temp = await fetchPokemon(baseUrl)
    const response = temp.results
    console.log(response)

    let promises = []
    for (let i = 0; i < response.length; i++) {
        promises.push(fetchPokemon(response[i].url))
    }
    console.log(promises);

    const finalData = await Promise.all(promises)
    for (let a = 0; a < finalData.length; a++) {
        showData(finalData[a])
        container.append(fragment)
    }
    console.log(finalData);

})
async function fetchPokemon(url) {
    try {
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}
fetchPokemon();


function showData(obj) {

    let box = document.createElement("div");
    box.classList.add("boxData", "flip-card");

    let innerBox = document.createElement("div");
    innerBox.classList.add("flip-card-inner")

    let frontBox = document.createElement("div");
    frontBox.classList.add("flip-card-front")

    let backBox = document.createElement("div");
    backBox.classList.add("flip-card-back")

    let img = document.createElement("img");
    img.src = obj.sprites.other.dream_world.front_default;

    let name = document.createElement("h3");
    name.innerText = obj.name;

    frontBox.append(img, name)

    let backText = document.createElement("p");
    backText.innerText = `ID: ${obj.id} 
                          Height: ${obj.height}
                          Weight: ${obj.weight}`;
    backBox.append(backText);

    innerBox.append(frontBox, backBox)
    box.append(innerBox);
    fragment.append(box);
}

searchPokemon.addEventListener('keyup', searchThePokemon)
function searchThePokemon(e) {
    let userSearch = e.target.value
    let pokemonBoxes = document.querySelectorAll('.boxData')
    for (let a = 0; a < pokemonBoxes.length; a++) {
        let theBox = pokemonBoxes[a]
        let text = theBox.querySelector('.flip-card-front h3').innerText

        if (text.includes(userSearch)) {
            theBox.style.display = "block"
        }
        else
            theBox.style.display = 'none'

    }
}