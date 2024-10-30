'use client'

import { ReactNode, useRef, useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import ArrowBackIcon from '../icons/ArrowBackIcon';
import ArrowForwardIcon from '../icons/ArrowForwardIcon';

// Interfaz para las propiedades esperadas del componente Carousel
interface CarouselProps {
    children: ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true); // Indica si el carrusel está al inicio
    const [isAtEnd, setIsAtEnd] = useState(false); // Indica si el carrusel está al final
    const [isDragging, setIsDragging] = useState(false); // Controla si se está realizando el arrastre
    const [startX, setStartX] = useState(0); // Almacena la posición inicial del arrastre en X
    const [scrollLeft, setScrollLeft] = useState(0); // Almacena la posición de desplazamiento inicial del carrusel

    // Función para iniciar el arrastre al hacer clic o tocar
    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true); // Activa el modo de arrastre
        const startXValue = e.type === 'mousedown' 
            ? (e as React.MouseEvent).pageX 
            : (e as React.TouchEvent).touches[0].pageX;
        setStartX(startXValue); // Guarda la posición inicial en X
        setScrollLeft(carouselRef.current!.scrollLeft); // Guarda el desplazamiento inicial del carrusel
    };

    // Función para manejar el desplazamiento del carrusel durante el arrastre
    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return; // Si no se está arrastrando, no hace nada
        e.preventDefault();
        const currentX = e.type === 'mousemove' 
            ? (e as React.MouseEvent).pageX 
            : (e as React.TouchEvent).touches[0].pageX;
        const distance = currentX - startX; // Calcula la distancia de arrastre
        carouselRef.current!.scrollLeft = scrollLeft - distance; // Actualiza la posición de desplazamiento
    };

    // Función que desactiva el modo de arrastre
    const handleMouseUp = () => {
        setIsDragging(false); // Finaliza el arrastre
    };

    // Función para desplazarse hacia la izquierda con un clic en el botón de flecha izquierda
    const handleScrollLeft = () => {
        if (carouselRef.current) {
            const newScrollPosition = carouselRef.current.scrollLeft - 300; // Define el nuevo desplazamiento a la izquierda
            carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' }); // Mueve el carrusel
        }
    };

    // Función para desplazarse hacia la derecha con un clic en el botón de flecha derecha
    const handleScrollRight = () => {
        if (carouselRef.current) {
            const newScrollPosition = carouselRef.current.scrollLeft + 300; // Define el nuevo desplazamiento a la derecha
            carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' }); // Mueve el carrusel
        }
    };

    // Función para verificar la posición de desplazamiento del carrusel
    const checkScrollPosition = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setIsAtStart(scrollLeft === 0); // Marca si el carrusel está al inicio
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // Marca si el carrusel está al final
        }
    };

    // Efecto para añadir y eliminar el evento de scroll para la verificación de la posición del carrusel
    useEffect(() => {
        const carouselElement = carouselRef.current;

        if (carouselElement) {
            checkScrollPosition(); // Verifica la posición inicial al montar el componente
            carouselElement.addEventListener('scroll', checkScrollPosition); // Añade evento de scroll
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('scroll', checkScrollPosition); // Limpia el evento al desmontar
            }
        };
    }, []);

    // Efecto para verificar la posición cuando cambian los elementos del carrusel
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            checkScrollPosition(); // Verifica la posición después de un cambio de contenido
        }, 100);

        return () => clearTimeout(timeoutId); // Limpia el temporizador al desmontar
    }, [children]);

    return (
        <div
            className={styles.carousel}
            onMouseDown={handleMouseDown} // Inicio de arrastre con ratón
            onMouseMove={handleMouseMove} // Movimiento de arrastre con ratón
            onMouseUp={handleMouseUp} // Fin de arrastre con ratón
            onMouseLeave={handleMouseUp} // Fin de arrastre al salir del contenedor
            onTouchStart={handleMouseDown} // Inicio de arrastre táctil
            onTouchMove={handleMouseMove} // Movimiento de arrastre táctil
            onTouchEnd={handleMouseUp} // Fin de arrastre táctil
        >
            {/* Botón de flecha izquierda que aparece solo si no estamos al inicio */}
            {!isAtStart && (
                <button 
                    className={`${styles.scrollButton} ${styles.leftButton}`} 
                    onClick={handleScrollLeft}
                >
                    <ArrowBackIcon />
                </button>
            )}
            <div ref={carouselRef} className={styles.carouselContainer}>
                {/* Contenedor que almacena los elementos del carrusel */}
                <div className={styles.carouselContent}>{children}</div>
            </div>
            {/* Botón de flecha derecha que aparece solo si no estamos al final */}
            {!isAtEnd && (
                <button 
                    className={`${styles.scrollButton} ${styles.rightButton}`} 
                    onClick={handleScrollRight}
                >
                    <ArrowForwardIcon />
                </button>
            )}
        </div>
    );
}
