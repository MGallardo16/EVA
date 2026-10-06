export function dominioValido(correo) {
  return correo.endsWith("@gmail.com") ||
         correo.endsWith("@duocuc.cl") ||
         correo.endsWith("@profesor.duocuc.cl");
}