import React, { useState, useEffect } from 'react';
import StudentLayout from '../layouts/StudentLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Shield, 
  Monitor, 
  MousePointer,
  Ban,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Lock,
  Eye,
  Chrome,
  Tablet,
  Smartphone,
  XCircle
} from 'lucide-react';
import './StartTest.css';

const StartTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [showRules, setShowRules] = useState(true);
  const [timeLeft, setTimeLeft] = useState(4);
  const [isAccepted, setIsAccepted] = useState(false);

  console.log(state);

   useEffect(() => {
     let timer;
     if (showRules && timeLeft > 0) {
       timer = setTimeout(() => {
         setTimeLeft(prev => prev - 1);
       }, 1000);
     } else if (timeLeft === 0) {
       setShowRules(false);
       navigate('/student/test-attempt', { state: state });
     }
     return () => clearTimeout(timer);
   }, [timeLeft, showRules, navigate, state]);

  const rules = [
    {
      icon: <Ban size={20} />,
      title: "No Tab Switching",
      description: "Switching tabs or windows will auto-submit your test",
      color: "#ef4444"
    },
    {
      icon: <Eye size={20} />,
      title: "Screen Monitoring",
      description: "Your screen activity will be monitored",
      color: "#f59e0b"
    },
    {
      icon: <MousePointer size={20} />,
      title: "No Right Click",
      description: "Copy-paste and inspect element are disabled",
      color: "#ef4444"
    },
    {
      icon: <Monitor size={20} />,
      title: "Full Screen Mode",
      description: "Stay in full-screen mode during the test",
      color: "#10b981"
    },
    {
      icon: <Lock size={20} />,
      title: "No Navigation",
      description: "Back/forward buttons will end your test",
      color: "#ef4444"
    },
    {
      icon: <AlertCircle size={20} />,
      title: "Auto-Submit",
      description: "Leaving the page auto-submits your answers",
      color: "#f59e0b"
    }
  ];

  return (
    <StudentLayout>
      <div className="starttest-container">
        <div className="starttest-timer-overlay">
          <div className="starttest-timer-circle">
            <span className="starttest-timer-number">{timeLeft}</span>
            <span className="starttest-timer-label">seconds</span>
          </div>
          <p className="starttest-timer-message">Test will begin automatically</p>
        </div>

        <div className="starttest-card">
          <div className="starttest-card-header">
            <div className="starttest-header-icon">
              <Shield size={40} />
            </div>
            <h1 className="starttest-title">Test Guidelines</h1>
            <p className="starttest-subtitle">Please follow these rules strictly</p>
          </div>

          <div className="starttest-rules-list">
            {rules.map((rule, index) => (
              <div key={index} className="starttest-rule">
                <div className="starttest-rule-icon" style={{ color: rule.color }}>
                  {rule.icon}
                </div>
                <div className="starttest-rule-content">
                  <h4>{rule.title}</h4>
                  <p>{rule.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="starttest-warning">
            <AlertTriangle size={18} />
            <span>Violations will result in immediate test termination</span>
          </div>

          <div className="starttest-progress">
            <div 
              className="starttest-progress-bar"
              style={{ width: `${(4 - timeLeft) * 25}%` }}
            />
          </div>

          <button className="starttest-cancel-btn" onClick={() => navigate('/student/tests')}>
            <XCircle size={18} />
            Cancel Test
          </button>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StartTest;