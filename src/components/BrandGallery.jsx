import { useEffect, useState } from 'react';
import { FaArrowLeft, FaTimes, FaLightbulb, FaSearch, FaFilePdf, FaDownload } from 'react-icons/fa';
import { LazyImage } from './LazyImage';

const brandData = {
  '养元青《秀发不内卷》': {
    cover: '展示图.jpg',
    pdf: '养元青营销策划.pdf'
  },
  '超能《薄荷味的夏天》': {
    cover: '展示图.png',
    pdf: '超能营销策划案.pdf'
  }
};

export default function BrandGallery({ isOpen, onClose }) {
  const [selectedProject, setSelectedProject] = useState(null);
  
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
        if (selectedProject) setSelectedProject(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="photo-gallery-overlay" onClick={() => !selectedProject && onClose()}>
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
            <FaLightbulb className="photo-icon" />
            <div>
              <h1 className="photo-gallery-title">商业传播策划</h1>
              <p className="photo-gallery-subtitle">品牌策划与传播方案</p>
            </div>
          </div>
          
          {Object.entries(brandData).map(([category, data]) => (
            <div key={category} className="photo-section">
              <h2>{category}</h2>
              <div className="photo-grid">
                <div 
                  className="photo-item" 
                  onClick={() => setSelectedProject({ category, data })}
                >
                  <LazyImage 
                    src={`/分类/商业传播策划/${category}/${data.cover}`} 
                    alt={category} 
                  />
                  <div className="photo-overlay">
                    <FaFilePdf />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProject && (
        <div className="photo-lightbox" onClick={() => setSelectedProject(null)}>
          <button className="lightbox-close" onClick={() => setSelectedProject(null)}>
            <FaTimes />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="pdf-container">
              <object 
                data={`/分类/商业传播策划/${selectedProject.category}/${selectedProject.data.pdf}#view=FitH`}
                type="application/pdf"
                className="pdf-preview"
              >
                <div className="pdf-fallback">
                  <p>您的浏览器不支持直接预览PDF文件</p>
                  <a href={`/分类/商业传播策划/${selectedProject.category}/${selectedProject.data.pdf}`} download className="pdf-fallback-link">
                    <FaDownload />
                    <span>点击下载查看</span>
                  </a>
                </div>
              </object>
            </div>
            <a 
              href={`/分类/商业传播策划/${selectedProject.category}/${selectedProject.data.pdf}`}
              download
              className="pdf-download-btn"
            >
              <FaDownload />
              <span>下载策划案</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
