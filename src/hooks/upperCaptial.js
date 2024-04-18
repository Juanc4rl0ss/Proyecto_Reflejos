
//convierte primera en mayúscula si el usuario ingresa datos en lowercase se usa en Home.jsx
export function toCapital(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}