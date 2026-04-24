import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Loader2, Zap, Lightbulb, Brain } from 'lucide-react';
import './AiTestModal.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createAiTest, getPrevTest } from '../../../store/actions/TestAction';

const AiTestModal = ({ isOpen, onClose, onGenerate, subjectName, subjectId, testDuration }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.warning('Please enter a prompt to generate questions');
      return;
    }
    setIsGenerating(true);
    const res = await dispatch(createAiTest(subjectId, prompt, testDuration));
    if (res?.error) {
      toast.error(res?.error || "Something went wrong");
      setIsGenerating(false);
      return;
    }
    toast.success(res?.message || "Successfully created Test With AI");
    await dispatch(getPrevTest(subjectId));
    setIsGenerating(false);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!prompt.trim()) {
        toast.warning('Please enter a prompt before submitting');
        return;
      }
      if (!isGenerating) {
        handleGenerate();
      }
    }
  };

  const isButtonDisabled = !prompt.trim() || isGenerating;

  return (
    <div className="aitest-modal-overlay" onClick={onClose}>
      <div className="aitest-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Robot Animation Overlay when generating */}
        {isGenerating && (
          <div className="aitest-robot-overlay">
            <div className="aitest-robot-animation">
              <div className="aitest-robot-head">
                <div className="aitest-robot-eyes">
                  <div className="aitest-robot-eye left"></div>
                  <div className="aitest-robot-eye right"></div>
                </div>
                <div className="aitest-robot-mouth">
                  <div className="aitest-robot-teeth"></div>
                </div>
                <div className="aitest-robot-antenna">
                  <div className="aitest-antenna-signal"></div>
                </div>
              </div>
              <div className="aitest-robot-body">
                <div className="aitest-robot-heart">
                  <Brain size={24} />
                </div>
              </div>
              <div className="aitest-robot-arms">
                <div className="aitest-arm left-arm"></div>
                <div className="aitest-arm right-arm"></div>
              </div>
              <div className="aitest-robot-message">
                <h3>AI is creating intelligent questions...</h3>
                <p>Analyzing your prompt and generating the perfect test</p>
                <div className="aitest-robot-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Content */}
        <>
          <div className="aitest-modal-header">
            <div className="aitest-header-icon">
              <Sparkles size={24} />
            </div>
            <h2 className="aitest-modal-title">AI Test Generator</h2>
            <button className="aitest-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="aitest-modal-body">
            <p className="aitest-modal-subtitle">
              Generate questions for {subjectName || 'your subject'} using AI
            </p>
            
            <div className="aitest-prompt-container">
              <div className="aitest-prompt-label">
                <Lightbulb size={16} />
                <span>Enter your prompt</span>
              </div>
              
              <textarea
                ref={textareaRef}
                className="aitest-prompt-input"
                placeholder="Example: Generate 5 questions about React Hooks including theory and practical applications"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                rows="4"
                autoFocus
                disabled={isGenerating}
              />
              
              <div className="aitest-prompt-hint">
                <Zap size={12} />
                <span>Press <kbd>Enter</kbd> to submit, <kbd>Shift + Enter</kbd> for new line</span>
              </div>
            </div>
          </div>

          <div className="aitest-modal-footer">
            <button className="aitest-cancel-btn" onClick={onClose} disabled={isGenerating}>
              Cancel
            </button>
            <button 
              className={`aitest-generate-btn ${isButtonDisabled ? 'disabled' : ''}`}
              onClick={handleGenerate}
              disabled={isButtonDisabled}
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="aitest-spinner" />
                  Generating...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Generate Questions
                </>
              )}
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default AiTestModal;