const wrapper = document.querySelector('.wrapper')
const container = document.querySelector('.container')
const searchPokemon = document.querySelector('#search')

async function fetchPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
        const result = await response.json()
        fetchPokemonDetails(result.results)
    } catch (error) {
        console.log(error)
    }
}
fetchPokemon();

async function fetchPokemonDetails(arr) {

    for (let i = 0; i < arr.length; i++) {
        try {
            const response = await fetch(arr[i].url)
            const result = await response.json()
            showData(result)
        } catch (error) {
            console.log(error)
        }
    }
}

function showData(arr) {
    console.log(arr)

    let box = document.createElement("div");
    box.classList.add("boxData", "flip-card");

    let innerBox = document.createElement("div");
    innerBox.classList.add("flip-card-inner")

    let frontBox = document.createElement("div");
    frontBox.classList.add("flip-card-front")

    let backBox = document.createElement("div");
    backBox.classList.add("flip-card-back")

    let img = document.createElement("img");
    img.src = arr.sprites.other.dream_world.front_default;

    let name = document.createElement("h3");
    name.innerText = arr.name;

    frontBox.append(img, name)

    let backText = document.createElement("p");
    backText.innerText = `ID: ${arr.id} 
                          Height: ${arr.height}
                          Weight: ${arr.weight}`;
    backBox.append(backText);

    innerBox.append(frontBox, backBox)
    box.append(innerBox);
    container.append(box);
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