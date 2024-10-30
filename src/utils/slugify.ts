// Función que convierte un texto a un formato "slug" amigable para URLs.
// Ejemplo: "Mi Texto de Ejemplo" se convierte en "mi-texto-de-ejemplo".
export function slugify(text: string) {
    return text
        .toString()             // Convierte el texto a cadena de caracteres en caso de no serlo
        .toLowerCase()          // Convierte todos los caracteres a minúsculas para estandarizar
        .trim()                 // Elimina espacios en blanco al inicio y al final del texto
        .replace(/\s+/g, '-')   // Reemplaza cualquier grupo de espacios (1 o más) por un solo guion '-'
        .replace(/[^\w-]+/g, '') // Elimina todos los caracteres que no son alfanuméricos ni guiones
        .replace(/--+/g, '-')   // Reemplaza múltiples guiones consecutivos por un solo guion
        .replace(/^-+/, '')     // Elimina los guiones al inicio del texto, si los hay
        .replace(/-+$/, '');    // Elimina los guiones al final del texto, si los hay
}
