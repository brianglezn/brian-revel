import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Función de middleware que se ejecuta antes de procesar cada solicitud en las rutas especificadas en `matcher`.
// Se utiliza para manejar la redirección de usuarios según su estado de autenticación.
export function middleware(request: NextRequest) {
    // Intenta obtener el valor de la cookie 'token' del usuario para verificar si está autenticado.
    const token = request.cookies.get('token')?.value;

    // Definimos las rutas que no requieren autenticación.
    const unprotectedPaths = ['/login', '/register'];

    // Si el usuario está autenticado (token presente) y está intentando acceder a una de las rutas no protegidas,
    // como la página de login o registro, se redirige al usuario a la página principal ("/") para evitar que acceda
    // a estas rutas mientras ya está autenticado.
    if (token && unprotectedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Si el usuario no está autenticado (sin token) y está intentando acceder a una ruta protegida (que no es login ni registro),
    // se le redirige a la página de inicio de sesión ("/login").
    if (!token && !unprotectedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Si ninguna de las condiciones anteriores se cumple, se permite la continuación de la solicitud normalmente.
    return NextResponse.next();
}

// Configuración de `matcher` para el middleware, que especifica las rutas a las que se aplicará.
// Excluye rutas de la API, de inicio de sesión, registro, archivos internos de Next.js, y el icono favicon.
export const config = {
    matcher: ['/((?!api|login|register|_next|favicon.ico).*)'], // Aplica a todas las rutas excepto las especificadas.
};
