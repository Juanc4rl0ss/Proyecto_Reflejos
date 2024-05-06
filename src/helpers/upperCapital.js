//convierte primera en mayúscula si el usuario ingresa datos en lowercase se usa en Home.jsx
export function toCapital(string) {
    string = string.trimStart();
  
    //valora espacio final y si sigue cadena, espacio en blanco o nada
    if (string.includes(" ")) {
      let posicion = string.indexOf(" ");
      posicion = posicion + 1;
      if (string.charAt(posicion) != "" && string.charAt(posicion) != " ") {
        console.log(string.charAt(posicion));
  
        string = separarNombreCompuesto(string);
      } else {
        console.log("en else?");
        string = string.trimEnd();
        string = string.charAt(0).toUpperCase() + string.slice(1);
      }
    } else {
      string = string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
  }
  
  //funcion para upperCase inicial de cada parte nombre compuesto
  function separarNombreCompuesto(string) {
    let partirNombre = string.split(" ");
    let upperInicial = "";
    for (let palabra of partirNombre) {
      upperInicial += " " + palabra.charAt(0).toUpperCase() + palabra.slice(1);
    }
    upperInicial = upperInicial.trimStart();
    return upperInicial.trimEnd();
  }