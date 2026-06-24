import { useEffect, useState } from 'react';
import { FaArrowLeft, FaTimes, FaCamera, FaSearch } from 'react-icons/fa';
import { LazyImage } from './LazyImage';

const photographyData = {
  '蝶恋花': {
    cover: '1.png',
    images: ['1.png', '2.png', '3.png', '4.png', '5.png']
  },
  '人像': {
    cover: '1.png',
    images: ['1.png', '2.png', '3.png', '4.png']
  }
};

export default function PhotographyGallery({ isOpen, onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  
  // Preload images for a category
  const preloadImages = (category, images) => {
    const promises = images.map(img => {
      return new Promise((resolve) => {
        const preloadImg = new Image();
        preloadImg.onload = resolve;
        preloadImg.onerror = resolve;
        preloadImg.src = `/分类/摄影摄像/${category}/${img}`;
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
  
  const handleNavigate = async (newIndex) => {
    setImgLoaded(false);
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.src = `/分类/摄影摄像/${selectedPhoto.category}/${selectedPhoto.images[newIndex]}`;
    setSelectedPhoto(prev => ({ ...prev, currentIndex: newIndex }));
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
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {};
  }, [selectedPhoto, isOpen]);

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
            <FaCamera className="photo-icon" />
            <div>
              <h1 className="photo-gallery-title">摄影摄像</h1>
              <p className="photo-gallery-subtitle">人像摄影与产品摄影作品</p>
            </div>
          </div>
          
          {Object.entries(photographyData).map(([category, data]) => (
            <div key={category} className="photo-section">
              <h2>{category}</h2>
              <div className="photo-grid">
                <div 
                  className="photo-item" 
                  onClick={() => handleSelectCategory(category, data)}
                >
                  <LazyImage 
                    src={`/分类/摄影摄像/${category}/${data.cover}`} 
                    alt={category} 
                  />
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
              src={`/分类/摄影摄像/${selectedPhoto.category}/${selectedPhoto.images[selectedPhoto.currentIndex]}`} 
              alt={`${selectedPhoto.category}${selectedPhoto.currentIndex + 1}`}
              style={{ opacity: imgLoaded ? 1 : 0 }} 
            />
            <div className="lightbox-nav">
              <button onClick={() => handleNavigate(selectedPhoto.currentIndex > 0 ? selectedPhoto.currentIndex - 1 : selectedPhoto.images.length - 1)}>
                &lt;
              </button>
              <span>{selectedPhoto.currentIndex + 1} / {selectedPhoto.images.length}</span>
              <button onClick={() => handleNavigate(selectedPhoto.currentIndex < selectedPhoto.images.length - 1 ? selectedPhoto.currentIndex + 1 : 0)}>
                &gt;
              </button>
            </div>
            {isLoading && <div className="lightbox-loading">加载中...</div>}
          </div>
        </div>
      )}
    </div>
  );
}
