import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle,
  AlertCircle,
  Loader2,
  CloudUpload,
  FileUp,
  Zap
} from 'lucide-react';
import './PdfUploadModal.css';
import { useDispatch } from 'react-redux';
import { getQuestionAnswerss, uploadPdfFile } from '../../../store/actions/QuestionAnswerAction';
import { toast } from 'react-toastify';

const PdfUploadModal = ({ subjectId, subjectName, onClose, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
    console.log(selectedFile);
    const dispatch = useDispatch()
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a PDF file');
      return;
    }
    const res = await dispatch(uploadPdfFile(subjectId,selectedFile));
    if(res?.error){
        toast.error(res?.error || "error occured try again later")
        setIsUploading(false);
        return;
    }

    toast.success(res?.message || "pdf upload successfully")
    await dispatch(getQuestionAnswerss(subjectId))
    setIsUploading(true);
    onClose()
  };

  return (
    <div className="pdf-upload-overlay" onClick={onClose}>
      <div className="pdf-upload-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="pdf-upload-header">
          <div className="pdf-upload-header-left">
            <div className="pdf-upload-icon-wrapper">
              <CloudUpload size={24} />
            </div>
            <div>
              <h2 className="pdf-upload-title">Upload PDF</h2>
              <p className="pdf-upload-subtitle">
                Add study material for {subjectName || 'your subject'}
              </p>
            </div>
          </div>
          <button className="pdf-upload-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="pdf-upload-body">
          {/* Drag and Drop Area */}
          <div
            className={`pdf-drop-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="pdf-upload-input"
              accept=".pdf"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            
            {!selectedFile ? (
              <div className="pdf-drop-content">
                <FileUp className="pdf-drop-icon" size={48} />
                <h3>Drag & Drop your PDF here</h3>
                <p>or</p>
                <button 
                  className="pdf-browse-btn"
                  onClick={() => document.getElementById('pdf-upload-input').click()}
                >
                  Browse Files
                </button>
                <span className="pdf-file-hint">Only PDF files up to 20MB</span>
              </div>
            ) : (
              <div className="pdf-file-preview">
                <FileText className="pdf-preview-icon" size={40} />
                <div className="pdf-file-info">
                  <h4>{selectedFile.name}</h4>
                  <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  className="pdf-remove-file"
                  onClick={() => setSelectedFile(null)}
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Upload Tips */}
          <div className="pdf-upload-tips">
            <div className="pdf-tip-item">
              <Zap size={16} />
              <span>Supports PDF format only</span>
            </div>
            <div className="pdf-tip-item">
              <CheckCircle size={16} />
              <span>Maximum file size: 10MB</span>
            </div>
            <div className="pdf-tip-item">
              <AlertCircle size={16} />
              <span>Make sure content is relevant to the subject</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pdf-upload-footer">
          <button className="pdf-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="pdf-upload-btn" 
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="pdf-spinner" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfUploadModal;