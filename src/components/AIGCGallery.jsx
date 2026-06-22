import { useEffect, useState } from 'react';
import { FaArrowLeft, FaTimes, FaRobot, FaPlay } from 'react-icons/fa';
import { LazyImage } from './LazyImage';

const aigcData = {
  'The Last Text': {
    cover: '展示图.png',
    video: 'The Last Text.mp4'
  },
  '残卷': {
    cover: '展示图.png',
    video: '残卷.mp4'
  }
};

export default function AIGCGallery({ isOpen, onClose }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
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
        if (selectedVideo) setSelectedVideo(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedVideo, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="photo-gallery-overlay" onClick={() => !selectedVideo && onClose()}>
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
            <FaRobot className="photo-icon" />
            <div>
              <h1 className="photo-gallery-title">AIGC作品</h1>
              <p className="photo-gallery-subtitle">AI生成艺术与创意视觉作品</p>
            </div>
          </div>
          
          {Object.entries(aigcData).map(([category, data]) => (
            <div key={category} className="photo-section">
              <h2>{category}</h2>
              <div className="photo-grid">
                <div 
                  className="photo-item" 
                  onClick={() => setSelectedVideo({ category, video: data.video })}
                >
                  <LazyImage src={`/分类/aigc/${category}/${data.cover}`} alt={category} />
                  <div className="photo-overlay">
                    <FaPlay />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedVideo && (
        <div className="photo-lightbox" onClick={() => setSelectedVideo(null)}>
          <button className="lightbox-close" onClick={() => setSelectedVideo(null)}>
            <FaTimes />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-video-container">
              <video 
                src={`/分类/aigc/${selectedVideo.category}/${selectedVideo.video}`}
                controls
                autoPlay
                className="lightbox-video"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
