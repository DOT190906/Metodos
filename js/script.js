let edad = parseInt(prompt("Por favor, ingresa tu edad:"));

switch (true) {
    case (edad <= 17):
        alert("Eres un niño.");
        break;
    case (edad === 18):
        alert("Eres un adolescente.");
        break;
    case (edad >= 19):
        alert("Eres un adulto.");   
    break;
    default:
        alert("Edad no válida.");
        break;
}  

