console.log("1. Cuenta del 1 al 10");
for (let numero = 1; numero <= 10; numero++) {
    console.log(numero);
}

console.log("2. Solo los números pares");
for (let numero = 1; numero <= 10; numero++) {
    if (numero % 2 === 0) {
        console.log(numero);
    }
}

console.log("3. Recorre un arreglo");
const favoritos = ["Visual Studio Code", "JavaScript", "HTML", "CSS"];
for (let indice = 0; indice < favoritos.length; indice++) {
    console.log(favoritos[indice]);
}

console.log("4. Cuenta regresiva con while");
let cuenta = 5;
while (cuenta >= 1) {
    console.log(cuenta);
    cuenta--;
}


