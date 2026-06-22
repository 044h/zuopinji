import { useEffect, useState } from 'react';
import { FaArrowLeft, FaTimes, FaPalette, FaSearch } from 'react-icons/fa';
import { LazyImage } from './LazyImage';

const graphicData = {
  '平面设计': {
    cover: '平面设计.png',
    images: ['平面设计.png']
  }
};

export default function GraphicGallery({ isOpen, onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const preloadImages = (category, images) => {
    const promises = images.map(img => {
      return new Promise((resolve) => {
        const preloadImg = new Image();
        preloadImg.onload = resolve;
        preloadImg.onerror = resolve;
        preloadImg.src = `/分类/平面设计/${img}`;
      });
    });
    return Promise.all(promises);
  };
  
  const handleSelectCategory = async (category, data) => {
    setIsLoading(true);
    setImgLoaded(false);
    await preloadImages(category, data.images);
    setSelectedPhoto({ category, images: data.images, currentIndex: 0 });
    setIsLoading(false);
    setImgLoaded(true);
  };
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (selectedPhoto) setSelectedPhoto(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedPhoto, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="photo-gallery-overlay" onClick={() => !selectedPhoto && onClose()}>
      <div className="photo-gallery-content" onClick={e => e.stopPropagation()}>
        <div className="photo-gallery-header">
          <button className="photo-back-btn" onClick={onClose}>
            <FaArrowLeft />
            <span>返回作品集</span>
          </button>
          <button className="photo-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <div className="photo-gallery-body">
          <div className="photo-gallery-intro">
            <FaPalette className="photo-icon" />
            <div>
              <h1 className="photo-gallery-title">平面设计</h1>
              <p className="photo-gallery-subtitle">海报、包装与视觉传达设计</p>
            </div>
          </div>
          
          {Object.entries(graphicData).map(([category, data]) => (
            <div key={category} className="photo-section">
              <h2>{category}</h2>
              <div className="photo-grid">
                <div 
                  className="photo-item" 
                  onClick={() => handleSelectCategory(category, data)}
                >
                  <LazyImage src={`/分类/平面设计/${data.cover}`} alt={category} />
                  <div className="photo-overlay">
                    <FaSearch />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedPhoto && selectedPhoto.images && (
        <div className="photo-lightbox" onClick={() => setSelectedPhoto(null)}>
          <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
            <FaTimes />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img 
              src={`/分类/平面设计/${selectedPhoto.images[selectedPhoto.currentIndex]}`} 
              alt={`${selectedPhoto.category}${selectedPhoto.currentIndex + 1}`}
              style={{ opacity: imgLoaded ? 1 : 0 }} 
            />
            {selectedPhoto.images.length > 1 && (
              <div className="lightbox-nav">
                <button onClick={() => setSelectedPhoto(prev => ({
                  ...prev,
                  currentIndex: prev.currentIndex > 0 ? prev.currentIndex - 1 : prev.images.length - 1
                }))}>
                  &lt;
                </button>
                <span>{selectedPhoto.currentIndex + 1} / {selectedPhoto.images.length}</span>
                <button onClick={() => setSelectedPhoto(prev => ({
                  ...prev,
                  currentIndex: prev.currentIndex < prev.images.length - 1 ? prev.currentIndex + 1 : 0
                }))}>
                  &gt;
                </button>
              </div>
            )}
            {isLoading && <div className="lightbox-loading">加载中...</div>}
          </div>
        </div>
      )}
    </div>
  );
}