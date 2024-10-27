'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';
import styles from './Carousel.module.css';
import ArrowBackIcon from '../icons/ArrowBackIcon';
import ArrowForwardIcon from '../icons/ArrowForwardIcon';

interface CarouselProps {
    children: ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const startXValue = e.type === 'mousedown' ? (e as React.MouseEvent).pageX : (e as React.TouchEvent).touches[0].pageX;
        setStartX(startXValue);
        setScrollLeft(carouselRef.current!.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.type === 'mousemove' ? (e as React.MouseEvent).pageX : (e as React.TouchEvent).touches[0].pageX;
        const distance = currentX - startX;
        carouselRef.current!.scrollLeft = scrollLeft - distance;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleScrollLeft = () => {
        if (carouselRef.current) {
            const newScrollPosition = carouselRef.current.scrollLeft - 300;
            carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (carouselRef.current) {
            const newScrollPosition = carouselRef.current.scrollLeft + 300;
            carouselRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
        }
    };

    const checkScrollPosition = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setIsAtStart(scrollLeft === 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        }
    };

    useEffect(() => {
        const carouselElement = carouselRef.current;

        if (carouselElement) {
            checkScrollPosition();
            carouselElement.addEventListener('scroll', checkScrollPosition);
        }

        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    return (
        <div
            className={styles.carousel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
        >
            {!isAtStart && (
                <button className={`${styles.scrollButton} ${styles.leftButton}`} onClick={handleScrollLeft}>
                    <ArrowBackIcon />
                </button>
            )}
            <div ref={carouselRef} className={styles.carouselContainer}>
                <div className={styles.carouselContent}>{children}</div>
            </div>
            {!isAtEnd && (
                <button className={`${styles.scrollButton} ${styles.rightButton}`} onClick={handleScrollRight}>
                    <ArrowForwardIcon />
                </button>
            )}
        </div>
    );
}
