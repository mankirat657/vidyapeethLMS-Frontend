import React, { useEffect, useState } from 'react';
import StudentLayout from '../layouts/StudentLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getSubject } from '../store/actions/subjectAction';
import { 
  BookOpen, 
  Search, 
  GraduationCap, 
  FileText, 
  Layers,
  Eye,
  BookMarked,
  TrendingUp,
  Clock
} from 'lucide-react';
import './StudentKnowledgeBank.css';
import { Link } from 'react-router-dom';

const StudentKnowledgeBank = () => {
  const { subject } = useSelector(state => state.subject);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  useEffect(() => {
    const getSubjects = async () => {
      await dispatch(getSubject());
    };
    getSubjects();
  }, [dispatch]);

  useEffect(() => {
    if (subject && subject.subjects) {
      const filtered = subject.subjects.filter(sub => 
        sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.subjectCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubjects(filtered);
    }
  }, [searchTerm, subject]);

  const handleViewMaterial = (subjectId) => {
    console.log('View material for subject:', subjectId);
    // Navigate to material page or open modal
  };

  const getSubjectIcon = (index) => {
    const icons = [
      <GraduationCap size={32} />,
      <BookOpen size={32} />,
      <Layers size={32} />,
      <BookMarked size={32} />,
      <TrendingUp size={32} />
    ];
    return icons[index % icons.length];
  };

  return (
    <StudentLayout>
      <div className="studentdash-container">
        <div className="studentdash-header">
          <div className="studentdash-header-content">
            <h1 className="studentdash-title">
              <BookOpen className="title-icon" />
              Knowledge Bank
            </h1>
            <p className="studentdash-subtitle">
              Explore your subjects and access learning materials
            </p>
          </div>
          
          <div className="studentdash-search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="studentdash-search"
              placeholder="Search by subject name, code or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="studentdash-stats">
          <div className="studentdash-stat-card">
            <div className="studentdash-stat-icon purple">
              <GraduationCap size={24} />
            </div>
            <div className="studentdash-stat-info">
              <h3>Total Subjects</h3>
              <p>{subject?.subjects?.length || 0}</p>
            </div>
          </div>
          <div className="studentdash-stat-card">
            <div className="studentdash-stat-icon blue">
              <BookOpen size={24} />
            </div>
            <div className="studentdash-stat-info">
              <h3>Enrolled</h3>
              <p>{subject?.subjects?.length || 0}</p>
            </div>
          </div>
          <div className="studentdash-stat-card">
            <div className="studentdash-stat-icon green">
              <Clock size={24} />
            </div>
            <div className="studentdash-stat-info">
              <h3>In Progress</h3>
              <p>In Development</p>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="studentdash-grid">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((sub, index) => (
              <div key={sub._id} className="subject-card">
                <div className="card-header">
                  <div className="card-icon">
                    {getSubjectIcon(index)}
                  </div>
                  <div className="card-code">
                    <span className="code-label">Code:</span>
                    <span className="code-value">{sub.subjectCode}</span>
                  </div>
                </div>

                <h3 className="subject-name">{sub.name}</h3>
                <p className="subject-description">{sub.description}</p>

                <div className="subject-stats">
                  <div className="stat-item">
                    <Layers size={16} />
                    <span>{sub.modules || 0} Modules</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <FileText size={16} />
                    <span>{sub.lesson || 0} Lessons</span>
                  </div>
                </div>
                <Link to={"/student/question-bank/materials"} state={sub}>
                <button 
                  className="view-material-btn"
                  onClick={() => handleViewMaterial(sub._id)}
                  >
                  <Eye size={18} />
                  View Material
                </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="no-results">
              <BookOpen size={64} />
              <h3>No subjects found</h3>
              <p>Try searching with different keywords</p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentKnowledgeBank;