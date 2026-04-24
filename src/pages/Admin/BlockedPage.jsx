import React from 'react';
import { 
  Ban, 
  Lock, 
  AlertTriangle, 
  Shield, 
  BookOpen, 
  FileText, 
  Users,
  Calendar,
  Mail,
  UserX,
  Clock,
  HelpCircle,
  MessageCircle,
  XCircle
} from 'lucide-react';
import './BlockedPage.css';

const BlockedPage = ({ user }) => {
  console.log(user);

  const getFullName = () => {
    if (user?.fullName?.firstName) {
      return user.fullName.firstName;
    }
    return 'User';
  };

  const getEmail = () => {
    return user?.email || 'No email provided';
  };

  const getBlockedDate = () => {
    if (user?.updatedAt) {
      const date = new Date(user.updatedAt);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Recently';
  };

  return (
    <div className="blockedpage-container">
      <div className="blockedpage-bg">
        <div className="blockedpage-bg-blob1"></div>
        <div className="blockedpage-bg-blob2"></div>
        <div className="blockedpage-bg-blob3"></div>
      </div>

      <div className="blockedpage-content">
        <div className="blockedpage-icon-wrapper">
          <div className="blockedpage-icon-bg">
            <Ban size={64} />
          </div>
          <div className="blockedpage-icon-pulse"></div>
        </div>

        <div className="blockedpage-alert-badge">
          <AlertTriangle size={16} />
          <span>Account Restricted</span>
        </div>

        <h1 className="blockedpage-title">Your Account Has Been Blocked</h1>
        <p className="blockedpage-subtitle">
          You no longer have access to the platform's features and resources
        </p>

        <div className="blockedpage-user-card">
          <div className="blockedpage-user-avatar">
            {user?.picture ? (
              <img src={user.picture} alt={getFullName()} />
            ) : (
              <div className="blockedpage-user-avatar-placeholder">
                {getFullName().charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="blockedpage-user-info">
            <h3>{getFullName()}</h3>
            <p><Mail size={14} /> {getEmail()}</p>
            <p><Clock size={14} /> Blocked on: {getBlockedDate()}</p>
          </div>
        </div>

        <div className="blockedpage-restrictions">
          <h4>
            <Lock size={18} />
            You Can No Longer Access
          </h4>
          <div className="blockedpage-restrictions-grid">
            <div className="blockedpage-restriction-item">
              <BookOpen size={20} />
              <span>Course Materials</span>
            </div>
            <div className="blockedpage-restriction-item">
              <FileText size={20} />
              <span>Tests & Assessments</span>
            </div>
            <div className="blockedpage-restriction-item">
              <Users size={20} />
              <span>Community Access</span>
            </div>
            <div className="blockedpage-restriction-item">
              <Calendar size={20} />
              <span>Live Sessions</span>
            </div>
          </div>
        </div>

        <div className="blockedpage-reasons">
          <h4>
            <Shield size={18} />
            Possible Reasons for Block
          </h4>
          <ul>
            <li>Violation of community guidelines</li>
            <li>Multiple policy violations</li>
            <li>Unusual account activity detected</li>
            <li>Administrative decision</li>
          </ul>
        </div>

        <div className="blockedpage-support">
          <div className="blockedpage-support-icon">
            <HelpCircle size={24} />
          </div>
          <div className="blockedpage-support-content">
            <h4>Need Assistance?</h4>
            <p>If you believe this is a mistake, please contact our support team for review.</p>
            <button className="blockedpage-support-btn">
              <MessageCircle size={16} />
              Contact Support
            </button>
          </div>
        </div>

        <div className="blockedpage-footer-note">
          <XCircle size={14} />
          <span>This decision is subject to review by the administration</span>
        </div>
      </div>
    </div>
  );
};

export default BlockedPage;