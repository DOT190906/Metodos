
"use strict";

// LISTA INICIAL DE POKÉMON
let pokemons = [
  {
    id: 1,
    name: "Pikachu",
    type: "Eléctrico",
    image: "https://static.wikia.nocookie.net/espokemon/images/2/21/Imagen_Pt.png/revision/latest?cb=20170317021908",
    description:
      "Cuando se enfada, este Pokémon libera inmediatamente la energía almacenada."
  },
  {
    id: 2,
    name: "Charmander",
    type: "Fuego",
    image: "https://static.wikia.nocookie.net/espokemon/images/2/21/Imagen_Pt.png/revision/latest?cb=20170317021908",
    description:
      "La llama de la punta de su cola indica su estado de ánimo y su salud."
  },
  {
    id: 3,
    name: "Bulbasaur",
    type: "Planta/Veneno",
    image: "https://static.wikia.nocookie.net/espokemon/images/2/21/Imagen_Pt.png/revision/latest?cb=20170317021908",
    description:
      "Lleva una semilla en la espalda desde que nace."
  }
];

// POKÉMON SELECCIONADO
let selectedPokemonId = null;

// ELEMENTOS HTML
const pokemonGrid = document.getElementById("pokemonGrid");
const searchInput = document.getElementById("searchInput");

const selectedImage = document.getElementById("selectedImage");
const selectedName = document.getElementById("selectedName");
const selectedType = document.getElementById("selectedType");
const selectedDescription =
  document.getElementById("selectedDescription");

const deleteBtn = document.getElementById("deleteBtn");

const addModal = document.getElementById("addPokemonModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBackground = document.getElementById("modalBackground");
const addPokemonForm = document.getElementById("addPokemonForm");

// CAMPOS DEL FORMULARIO
const inputName = document.getElementById("inputName");
const inputType = document.getElementById("inputType");
const inputGeneralImage = document.getElementById("inputGeneralImage");
const inputDescription = document.getElementById("inputDescription");


// MOSTRAR LOS POKÉMON EN LA CUADRÍCULA
function renderPokemons(filterText = "") {
  pokemonGrid.innerHTML = "";

  const search = filterText.trim().toLocaleLowerCase("es");

  // FILTRAR POR NOMBRE
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLocaleLowerCase("es").includes(search)
  );

  // CREAR UNA TARJETA POR CADA POKÉMON
  filteredPokemons.forEach((pokemon) => {
    const card = document.createElement("div");

    card.className = "pokemon-card";

    if (pokemon.id === selectedPokemonId) {
      card.classList.add("selected");
    }

    card.textContent = pokemon.name;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      "Seleccionar a " + pokemon.name
    );

    card.addEventListener("click", () => {
      selectPokemon(pokemon.id);
    });

    // Permitir seleccionar con Enter o espacio
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectPokemon(pokemon.id);
      }
    });

    pokemonGrid.appendChild(card);
  });

  // MOSTRAR MENSAJE SI NO HAY RESULTADOS
  if (filteredPokemons.length === 0) {
    const message = document.createElement("p");
    message.className = "no-results";
    message.textContent = "No se encontraron Pokémon.";
    pokemonGrid.appendChild(message);
  }

  // TARJETA PARA AÑADIR UN NUEVO POKÉMON
  const addCard = document.createElement("div");

  addCard.className = "pokemon-card add-card";
  addCard.tabIndex = 0;
  addCard.setAttribute("role", "button");
  addCard.setAttribute("aria-label", "Añadir Pokémon");

  const plus = document.createElement("span");
  plus.className = "plus";
  plus.textContent = "+";

  const addText = document.createElement("span");
  addText.textContent = "Añadir";

  addCard.appendChild(plus);
  addCard.appendChild(addText);

  addCard.addEventListener("click", openAddModal);

  addCard.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAddModal();
    }
  });

  pokemonGrid.appendChild(addCard);
}


// SELECCIONAR UN POKÉMON
function selectPokemon(id) {
  const pokemon = pokemons.find((item) => item.id === id);

  if (!pokemon) {
    return;
  }

  selectedPokemonId = pokemon.id;

  selectedName.textContent = pokemon.name;
  selectedType.textContent = pokemon.type;
  selectedDescription.textContent = pokemon.description;

  // Evitar una imagen rota cuando no se ha proporcionado una
  const imagePath = pokemon.image.trim();

  selectedImage.onerror = () => {
    selectedImage.hidden = true;
    selectedImage.removeAttribute("src");
  };

  if (imagePath !== "") {
    selectedImage.hidden = false;
    selectedImage.src = imagePath;
  } else {
    selectedImage.hidden = true;
    selectedImage.removeAttribute("src");
  }

  renderPokemons(searchInput.value);
}


// RESTABLECER EL PANEL DERECHO
function resetSelectedPokemon() {
  selectedPokemonId = null;

  selectedImage.hidden = true;
  selectedImage.removeAttribute("src");

  selectedName.textContent = "Pokémon Seleccionado";
  selectedType.textContent = "Tipo";

  selectedDescription.textContent =
    "Selecciona un Pokémon para ver su descripción.";

  renderPokemons(searchInput.value);
}


// ABRIR LA VENTANA DE AÑADIR
function openAddModal() {
  addModal.classList.add("is-active");
  inputName.focus();
}


// CERRAR LA VENTANA DE AÑADIR
function closeAddModal() {
  addModal.classList.remove("is-active");
  addPokemonForm.reset();
}


// BUSCADOR
searchInput.addEventListener("input", (event) => {
  renderPokemons(event.target.value);
});


// BOTÓN ELIMINAR
deleteBtn.addEventListener("click", () => {
  if (selectedPokemonId === null) {
    alert("Primero selecciona un Pokémon para eliminar.");
    return;
  }

  const pokemon = pokemons.find(
    (item) => item.id === selectedPokemonId
  );

  if (!pokemon) {
    return;
  }

  const confirmed = confirm(
    "¿Seguro que deseas eliminar a " + pokemon.name + "?"
  );

  if (!confirmed) {
    return;
  }

  pokemons = pokemons.filter(
    (item) => item.id !== selectedPokemonId
  );

  resetSelectedPokemon();
});


// BOTONES PARA CERRAR LA VENTANA
closeModalBtn.addEventListener("click", closeAddModal);
modalBackground.addEventListener("click", closeAddModal);


// AÑADIR UN NUEVO POKÉMON
addPokemonForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = inputName.value.trim();
  const type = inputType.value.trim();
  const image = inputGeneralImage.value.trim();
  const description = inputDescription.value.trim();

  if (!name || !type || !description) {
    alert("Completa el nombre, el tipo y la descripción.");
    return;
  }

  // EVITAR NOMBRES REPETIDOS
  const duplicate = pokemons.some(
    (pokemon) =>
      pokemon.name.toLocaleLowerCase("es") ===
      name.toLocaleLowerCase("es")
  );

  if (duplicate) {
    alert("Ya existe un Pokémon con ese nombre.");
    return;
  }

  const newPokemon = {
    id: Date.now(),
    name: name,
    type: type,
    image: image,
    description: description
  };

  pokemons.push(newPokemon);

  closeAddModal();

  // Mostrar el nuevo Pokémon aunque hubiera una búsqueda activa
  searchInput.value = "";

  renderPokemons();

  // Seleccionar automáticamente el Pokémon recién añadido
  selectPokemon(newPokemon.id);
});


// INICIAR LA POKÉDEX
renderPokemons();
