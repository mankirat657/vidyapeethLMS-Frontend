import React from 'react'
import {Link} from "react-router-dom"
const TestCards = ({ id, name, description, admin, subjectCode, modules, lesson }) => {
  
  
  return (
    <div className="group !h-[30vh] !overflow-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition-all w-[25vw] duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 padding">
        <div className="flex justify-between items-center">
          <span className="text-white text-xs font-mono bg-white/20 padding-2 rounded">
            {subjectCode || "SUB-001"}
          </span>
          <span className="text-white/80 text-xs">📝 Test</span>
        </div>
      </div>

      <div className="padding flex-1 flex flex-col gap-1">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {name || "Untitled Test"}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {description.slice(20)+"..." || "No description available"}
        </p>

        <div className="flex margintop items-center gap-2 mb-4 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 text-sm">👨‍🏫</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Created by</p>
            <p className="text-sm font-medium text-gray-700 truncate">
              {admin?.fullName?.firstName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-blue-600 text-sm">📚</span>
              <span className="text-xs text-gray-600">Modules</span>
            </div>
            <p className="text-lg font-bold text-blue-700">{modules || 0}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-green-600 text-sm">📖</span>
              <span className="text-xs text-gray-600">Lessons</span>
            </div>
            <p className="text-lg font-bold text-green-700">{lesson || 0}</p>
          </div>
        </div>

        <div className="flex margintop gap-2 mt-auto">
          <Link to={"/admin/create-test/subjectTest"} state={{id,name,description,admin,subjectCode}}>
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
            Create Test
          </button>
          </Link>
          <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
            <span className="text-sm">📋</span>
          </button>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  )
}

export default TestCards