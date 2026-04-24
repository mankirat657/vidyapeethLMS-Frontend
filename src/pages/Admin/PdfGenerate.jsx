import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Download, 
  Trash2, 
  Eye, 
  Clock,
  User,
  Calendar,
  File,
  Loader2
} from 'lucide-react';
import PdfUploadModal from './Modals/PdfUploadModal'; 
import './Modals/PdfGenerate.css';
import { useSelector } from 'react-redux';
import DeleteQuestionAnswerModal from './Modals/DeleteQuestionAnswerModal';

const PdfGenerate = ({ subjectId, subjectName }) => {
  const { questionAnswers, loading, error } = useSelector(
    (state) => state.questionAnswer
  );
  const [pdfs, setPdfs] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const[deleteModalClicked,setDeleteModalClicked] = useState(false);
  const[deleteQuestionId,setDeleteQuestionId] = useState('');
  const[paQuesId,setpaQuestId] = useState('')
  console.log(deleteQuestionId);
  console.log(pdfs);
  console.log(questionAnswers?.questionAnswers);
  
  useEffect(() => {
    console.log('Raw questionAnswers:', questionAnswers);
    console.log('Type of questionAnswers:', Array.isArray(questionAnswers));
    
    let dataArray = questionAnswers;
    
    if (questionAnswers?.questionAnswers && Array.isArray(questionAnswers.questionAnswers)) {
      dataArray = questionAnswers.questionAnswers;
    }
    
    if (Array.isArray(dataArray) && dataArray.length > 0) {
      const extractedPdfs = dataArray
        .filter(item => item?.pdf && typeof item.pdf === 'string' && item.pdf.trim() !== '' && item.pdf !== 'null')
        .map((item, index) => {
          let fileName = '';
          if (item.pdf) {
            const urlParts = item.pdf.split('/');
            let rawFileName = urlParts[urlParts.length - 1];
            rawFileName = rawFileName.split('?')[0];
            rawFileName = decodeURIComponent(rawFileName);
            
            if (rawFileName.length > 30 || (rawFileName.includes('-') && rawFileName.length > 25)) {
              fileName = `PDF_Document_${index + 1}`;
            } else {
              fileName = rawFileName;
            }
          }
          
          return {
            id: item._id,
            name: fileName,
            url: item.pdf,
            size: '—',
            pages: '—',
            uploadedBy: item.admin || 'Unknown',
            uploadedAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'Unknown date',
            fullDate: item.createdAt
          };
        });
      
      console.log('Extracted PDFs:', extractedPdfs);
      setPdfs(extractedPdfs);
      setIsLoading(false);
    } else {
      console.log('No valid data array found');
      setPdfs([]);
      setIsLoading(false);
    }
  }, [questionAnswers]);
  console.log(pdfs);
  


  const handleDownload = (pdf) => {
    if (pdf.url && pdf.url !== '#') {
      window.open(pdf.url, '_blank');
    }
  };

  const handleView = (pdf) => {
    if (pdf.url && pdf.url !== '#') {
      window.open(pdf.url, '_blank');
    }
  };

  return (
    <div className="pdf-container">
      <div className="pdf-header">
        <div className="pdf-header-left">
          <FileText className="pdf-header-icon" size={28} />
          <div>
            <h1 className="pdf-title">PDF Resources</h1>
            <p className="pdf-subtitle">{subjectName || 'Subject'} - Study Materials</p>
          </div>
        </div>
        <div className="pdf-stats">
          <div className="pdf-stat-item">
            <File size={16} />
            <span>{pdfs.length} Documents</span>
          </div>
        </div>
      </div>

      <div className="pdf-list-container">
        {isLoading ? (
          <div className="pdf-loading">
            <Loader2 className="pdf-spinner" size={40} />
            <p>Loading PDFs...</p>
          </div>
        ) : pdfs.length > 0 ? (
          <div className="pdf-grid">
            {pdfs.reverse().map((pdf, idx) => (
              <div key={pdf.id || idx} className="pdf-card">
                <div className="pdf-card-header">
                  <div className="pdf-icon-wrapper">
                    <FileText size={24} />
                  </div>
                  <div className="pdf-actions">
                    <button 
                      className="pdf-action-btn view"
                      onClick={() => handleView(pdf)}
                      title="View PDF"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      className="pdf-action-btn download"
                      onClick={() => handleDownload(pdf)}
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                    <button 
                      className="pdf-action-btn delete"
                      title="Delete"
                      onClick={() => {
                        setDeleteModalClicked(true),
                        setDeleteQuestionId(pdf?.id)
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="pdf-card-body">
                  <h3 className="pdf-card-title" title={pdf.name}>
                    {subjectName + ` Notes ${idx+1}`}
                  </h3>
                  
                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pdf-empty-state flex flex-col items-center text-center   ">
            <FileText size={64} />
            <h3>No PDFs Available</h3>
            <p>Click the + button to upload your first PDF</p>
          </div>
        )}
      </div>

      <button 
        className="pdf-add-button"
        onClick={() => setIsUploadModalOpen(true)}
      >
        <Plus size={24} />
      </button>

      {isUploadModalOpen && (
        <PdfUploadModal 
          subjectId={subjectId}
          subjectName={subjectName}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadSuccess={() => {
            setIsLoading(true);
            // Trigger a refetch of questionAnswers here if needed
            setTimeout(() => setIsLoading(false), 1000);
          }}
        />
      )}
      {deleteModalClicked && <DeleteQuestionAnswerModal ispdf={true} id={deleteQuestionId}  question={deleteQuestionId} deletePdf={true} subjectId={subjectId}   setHandleDeleteClick={() => setDeleteModalClicked(false)}  />}
    </div>
  );
};

export default PdfGenerate;