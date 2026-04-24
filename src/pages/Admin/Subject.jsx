import React, { useState, useRef, useEffect } from 'react';
import { IoEyeOutline, IoBookOutline, IoChevronForward, IoEllipsisVertical } from 'react-icons/io5';
import { MdAdminPanelSettings, MdOutlineSchool, MdOutlineTimer, MdEdit, MdDelete } from 'react-icons/md';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import CreateSubjectModal from './Modals/CreateSubjectModal';
import { useDispatch } from 'react-redux';
import { deleteSubject, getSubject } from '../../store/actions/subjectAction';
import { toast } from 'react-toastify';
import { Delete } from 'lucide-react';
import DeleteSubjectModal from './Modals/DeleteSubjectModal';
import { Link } from 'react-router-dom';

const Subject = ({ setIsModalClicked, id, name, description, admin, subjectCode, modules, lesson, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef(null);

  const [deleteClick, setDeleteClick] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdate = () => {
    setIsMenuOpen(false);
    setIsModalOpen(true)
  };

  const handleDelete = async () => {
    setDeleteClick(true);
  };

  return (
    <div
      className="relative w-[31.2rem]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-blue-400/60 via-purple-400/60 to-blue-400/60 rounded-2xl transition duration-500 ${isHovered ? 'opacity-100 blur-xl' : 'opacity-0'}`} />

      <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">

        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`} />
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border border-blue-200 transition-all duration-300 ${isHovered ? 'scale-110 shadow-md' : ''}`}>
                <MdOutlineSchool className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-mono tracking-wide">Subject Code</p>
                <p className="text-sm font-semibold text-gray-700">{subjectCode}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {admin && (
                <div title={admin ? admin : "admin"} className="flex padding-2 cursor-pointer items-center gap-1.5 bg-gradient-to-r from-purple-50 to-purple-100 px-3 py-1.5 rounded-full border border-purple-200 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  <MdAdminPanelSettings className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-xs  font-semibold text-purple-700">{admin ? admin : ""}</span>
                </div>
              )}
              <div className="relative" ref={menuRef}>
                <div
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="padding rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                >
                  <IoEllipsisVertical className="w-5 h-5" />
                </div>

                {isMenuOpen && (
                  <div className="absolute cursor-pointer right-0 top-8 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div
                      onClick={handleUpdate}
                      className="w-full padding flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                    >
                      <MdEdit className="w-4 h-4" />
                      <span>Update Subject</span>
                    </div>
                    <div
                      onClick={handleDelete}
                      className="w-full cursor-pointer padding flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                    >
                      <MdDelete className="w-4 h-4" />
                      <span>Delete Subject</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-3 padding">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold text-gray-800 leading-tight line-clamp-2">
                {name.length > 20 ? name.slice(0, 20) + "..." : name}
              </h3>

            </div>
            <div className="flex gap-1 mt-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
              <div className="w-3 h-0.5 bg-purple-300 rounded-full" />
              <div className="w-2 h-0.5 bg-blue-300 rounded-full" />
            </div>
          </div>

          <div className="relative mb-5" style={{ paddingLeft: ".4vw" }}>
            <div className="absolute -top-1 -left-1 text-gray-200">
              <HiOutlineSparkles className="w-4 h-4" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 pl-3 border-l-2 border-gray-200">
              {description ? description.slice(0, 45) : "No description available"}...
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">
              <MdOutlineTimer className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-gray-600">{modules || 0} Modules</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">
              <IoBookOutline className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-gray-600">{lesson || 0} Lessons</span>
            </div>
          </div>
          <Link to="/admin/question-bank/material

" state={{ subjectId: id, subjectName: name }}>
            <button className="group w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-100 text-gray-800 font-semibold border border-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white hover:border-transparent transition-all duration-300">
              <span className="flex items-center gap-2">

                <IoEyeOutline className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span>View or Create Material</span>
              </span>
              <IoChevronForward className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1" />
            </button>
          </Link>

          <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-50/30 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
      {isModalOpen && <CreateSubjectModal id={id} action="update" setIsModalClicked={setIsModalOpen} title="Update Subject" description={description} lesson={lesson} name={name} modules={modules} subjectCode={subjectCode} subtitle="update" />}
      {deleteClick && <DeleteSubjectModal subjectName={name} setIsMenuOpen={setIsMenuOpen} isOpen={deleteClick} onClose={() => setDeleteClick(false)} id={id} onConfirm={handleDelete} />}
    </div>
  );
};

export default Subject;