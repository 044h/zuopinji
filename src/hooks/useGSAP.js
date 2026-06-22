import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGSAPAnimations() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Opening Animation - Hero Section
      const heroTl = gsap.timeline({ delay: 0.5 });
      
      heroTl.fromTo('.hero-mask', 
        { scaleX: 1, transformOrigin: 'left center' },
        { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }
      );
      
      heroTl.fromTo('.hero-title', 
        { y: 80, opacity: 0, scaleY: 1.5, filter: 'blur(10px)' },
        { y: 0, opacity: 1, scaleY: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power4.out' },
        '-=0.6'
      );
      
      heroTl.fromTo('.hero-subtitle', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      heroTl.fromTo('.hero-nav', 
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power3.out' },
        '-=1'
      );

      heroTl.fromTo('.hero-scroll', 
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );

      // Section animations using batch processing
      const sectionAnimations = [
        {
          id: '#about',
          tagOffset: 150,
          cardSelector: '.about-card > div, .about-card > section',
          cardStagger: 0.15
        },
        {
          id: '#experience',
          tagOffset: 150,
          cardSelector: '.experience-card',
          cardStagger: 0.2,
          cardXOffset: -60
        },
        {
          id: '#projects',
          tagOffset: 150,
          cardSelector: '.project-card',
          cardStagger: 0,
          perCard: true
        },
        {
          id: '#skills',
          tagOffset: 150,
          cardSelector: '.skill-card',
          cardStagger: 0.1,
          rotateY: 15
        },
        {
          id: '#contact',
          tagOffset: 150,
          cardSelector: '.contact-method, .contact-subtitle',
          cardStagger: 0.15
        }
      ];

      sectionAnimations.forEach(({ id, tagOffset, cardSelector, cardStagger, cardXOffset, perCard, rotateY }) => {
        const section = document.querySelector(id);
        if (!section) return;

        const sectionTag = section.querySelector('.section-tag');
        if (sectionTag) {
          gsap.fromTo(sectionTag,
            { y: tagOffset, opacity: 0, scale: 1.3, filter: 'blur(20px)' },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1.8,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
                once: true
              }
            }
          );
        }

        const cards = document.querySelectorAll(cardSelector);
        if (cards.length > 0) {
          if (perCard) {
            cards.forEach(card => {
              gsap.fromTo(card,
                { y: 120, opacity: 0, scale: 0.92 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 1.4,
                  ease: 'power3.out',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    once: true
                  }
                }
              );

              const img = card.querySelector('.project-image img');
              if (img) {
                gsap.fromTo(img,
                  { scale: 1.4, y: -20 },
                  {
                    scale: 1,
                    y: 0,
                    duration: 1.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                      trigger: card,
                      start: 'top 85%',
                      toggleActions: 'play none none reverse',
                      once: true
                    }
                  }
                );
              }
            });
          } else {
            gsap.fromTo(cards,
              { 
                y: 100, 
                opacity: 0, 
                x: cardXOffset || 0,
                scale: rotateY ? 0.9 : 1,
                rotateY: rotateY || 0
              },
              {
                y: 0,
                x: 0,
                opacity: 1,
                scale: 1,
                rotateY: 0,
                duration: 1.2,
                stagger: cardStagger,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 70%',
                  toggleActions: 'play none none reverse',
                  once: true
                }
              }
            );
          }
        }
      });

      // Info cards
      const infoCards = document.querySelectorAll('.about-info-card, .about-stat-card');
      if (infoCards.length > 0) {
        gsap.fromTo(infoCards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.about-info',
              start: 'top 75%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );
      }

      // Dividers
      const dividers = document.querySelectorAll('.galaxy-divider');
      if (dividers.length > 0) {
        gsap.fromTo(dividers,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0.2,
            scrollTrigger: {
              trigger: dividers[0].parentNode,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              once: true
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
