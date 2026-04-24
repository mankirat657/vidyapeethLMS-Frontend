import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout"
import { SiMaterialformkdocs } from "react-icons/si";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { FaFilePdf } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import "./Material.css"
import { useEffect, useState } from "react";
import QuestionAnswers from "./QuestionAnswers";
import PdfGenerate from "./PdfGenerate";
const Material = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjectId, subjectName } = location.state || {};
  const [clickedOption, setClickedOption] = useState('questions');
  console.log(subjectId, subjectName);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/question-bank");
    }
  };

  return (
    <AdminLayout>
      <div className="material-header">
        <div className="flex items-center gap-9">

          <BsFillArrowLeftCircleFill
            size={30}
            className="cursor-pointer"
            onClick={handleBack}
          />

          <h2 className="text-3xl text-blue font-bold flex items-center gap-2">
            <SiMaterialformkdocs color="#4f39f6" size={30} />
            {subjectName ? subjectName : "Material"}
          </h2>
        </div>
        <div className="filterOptions w-full flex items-center justify-between  padd-2">
          <div className="flex items-center gap-4">

            <div onClick={() => setClickedOption("pdf")} className="border cursor-pointer hover:bg-[#f0f0f0] transition-all ease-in-out hover:scale-105  border-[#d4d4d4] flex items-center rounded-lg padd"><FaFilePdf size={30} color="#4f39f6" /><p className="text-lg">Pdf</p></div>
            <div onClick={() => setClickedOption("questions")} className="border cursor-pointer hover:bg-[#f0f0f0] transition-all ease-in-out hover:scale-105  border-[#d4d4d4] flex items-center rounded-lg padd"><RiQuestionAnswerFill size={30} color="#4f39f6" /><p className="text-lg">Questions/Answers</p></div>
          </div>
         
        </div>
        {clickedOption === "pdf" && (
          <div className="padd-2">
            <PdfGenerate subjectId={subjectId} subjectName={subjectName} />
          </div>
        )}
        {clickedOption === "questions" && (
          <div className="padd-2">
            <QuestionAnswers subjectId={subjectId} subjectName={subjectName} />
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Material