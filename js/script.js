let pokemons = [
  {
    id: 1,
    name: "Pikachu",
    type: "Eléctrico",
    icon: "https://img.pokemondb.net/sprites/sun-moon/normal/pikachu-f.png",
    image: "https://img.pokemondb.net/sprites/sun-moon/normal/pikachu-f.png",
    description: "Cuando se enfada, este Pokémon libera inmediatamente la energía almacenada."
  },
  {
    id: 2,
    name: "Charmander",
    type: "Fuego",
    icon: "https://img.pokemondb.net/sprites/sun-moon/normal/charmander-f.png",
    image: "https://img.pokemondb.net/sprites/sun-moon/normal/charmander-f.png",
    description: "Prefiere las cosas calientes. Vapor de la punta de la cola."
  },
  {
    id: 3,
    name: "Bulbasaur",
    type: "Planta",
    icon: "https://img.pokemondb.net/sprites/sun-moon/normal/bulbasaur-f.png",
    image: "https://img.pokemondb.net/sprites/sun-moon/normal/bulbasaur-f.png",
    description: "Lleva una semilla en la espalda desde que nace."
  }
];

let selectedPokemonId = null;

const pokemonGrid = document.getElementById("pokemonGrid");
const searchInput = document.getElementById("searchInput");
const selectedImage = document.getElementById("selectedImage");
const selectedName = document.getElementById("selectedName");
const selectedType = document.getElementById("selectedType");
const selectedDescription = document.getElementById("selectedDescription");
const deleteBtn = document.getElementById("deleteBtn");

const addModal = document.getElementById("addPokemonModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const addPokemonForm = document.getElementById("addPokemonForm");

function renderPokemons(filterText = "") {
  pokemonGrid.innerHTML = "";

  const addCol = document.createElement("div");
  addCol.className = "column is-4";
  addCol.innerHTML = `
    <div class="add-card p-3" id="openAddModalBtn">
      <span class="is-size-3 has-text-weight-bold">+</span>
      <p class="has-text-weight-bold">Añadir</p>
    </div>
  `;
  pokemonGrid.appendChild(addCol);

  document.getElementById("openAddModalBtn").addEventListener("click", () => {
    addModal.classList.add("is-active");
  });

  const filtered = pokemons.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));

  filtered.forEach(pokemon => {
    const col = document.createElement("div");
    col.className = "column is-4";
    col.innerHTML = `
      <div class="pokemon-card" onclick="selectPokemon(${pokemon.id})">
        <figure class="image is-square">
          <img src="${pokemon.icon}" alt="${pokemon.name}">
        </figure>
        <p class="has-text-weight-bold has-text-white mt-1">${pokemon.name}</p>
      </div>
    `;
    pokemonGrid.appendChild(col);
  });
}

function selectPokemon(id) {
  const pokemon = pokemons.find(p => p.id === id);
  if (pokemon) {
    selectedPokemonId = pokemon.id;
    selectedImage.src = pokemon.image;
    selectedName.textContent = pokemon.name;
    selectedType.textContent = pokemon.type;
    selectedDescription.textContent = pokemon.description;
  }
}

deleteBtn.addEventListener("click", () => {
  if (selectedPokemonId === null) {
    alert("Selecciona un Pokémon para eliminar.");
    return;
  }

  pokemons = pokemons.filter(p => p.id !== selectedPokemonId);
  
  selectedImage.src = "[aquí va el link o el archivo de imagen]";
  selectedName.textContent = "Pokémon Seleccionado";
  selectedType.textContent = "Tipo";
  selectedDescription.textContent = "Selecciona un Pokémon para ver su descripción.";
  selectedPokemonId = null;

  renderPokemons(searchInput.value);
});

searchInput.addEventListener("input", (e) => {
  renderPokemons(e.target.value);
});

closeModalBtn.addEventListener("click", () => {
  addModal.classList.remove("is-active");
  addPokemonForm.reset();
});

addPokemonForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newPokemon = {
    id: Date.now(),
    name: document.getElementById("inputName").value,
    type: document.getElementById("inputType").value,
    icon: document.getElementById("inputIcon").value,
    image: document.getElementById("inputGeneralImage").value,
    description: document.getElementById("inputDescription").value
  };

  pokemons.push(newPokemon);
  renderPokemons(searchInput.value);
  addModal.classList.remove("is-active");
  addPokemonForm.reset();
});

renderPokemons();