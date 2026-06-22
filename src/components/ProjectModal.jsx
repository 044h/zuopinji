import { useEffect, useRef, useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo('.modal-content',
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !project) return null;

  const handlePrev = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : project.images.length - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < project.images.length - 1 ? prev + 1 : 0);
  };

  return (
    <div className="project-modal-overlay" ref={modalRef} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-header">
          <span className="modal-category">{project.category}</span>
          <h2>{project.title}</h2>
          <p>{project.desc}</p>
        </div>

        <div className="modal-image-container">
          {project.images && project.images.length > 1 && (
            <button className="modal-nav prev" onClick={handlePrev}>
              <FaChevronLeft />
            </button>
          )}
          
          <img 
            src={project.images[currentIndex]} 
            alt={`${project.title} - ${currentIndex + 1}`}
            className="modal-image"
          />
          
          {project.images && project.images.length > 1 && (
            <button className="modal-nav next" onClick={handleNext}>
              <FaChevronRight />
            </button>
          )}
        </div>

        {project.images && project.images.length > 1 && (
          <div className="modal-thumbnails">
            {project.images.map((img, idx) => (
              <button
                key={idx}
                className={`modal-thumb ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img src={img} alt={`缩略图 ${idx + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
