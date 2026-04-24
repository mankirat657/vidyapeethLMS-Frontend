import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { MoveLeft, NotebookPen } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPrevTest } from '../../store/actions/TestAction';
import PrevTestCard from '../../components/admin/PrevTestCard';
import CreateSujectTest from './Modals/CreateSujectTest';

const SubjectTest = () => {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    console.log(data);
    const dispatch = useDispatch();
    const[option,setOption] = useState('Create Test');
    const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/create-test");
    }
  };
  console.log(data.id);
  
  const{tests,loading,error} = useSelector((state) => state.test);

  useEffect(() => {
    const getTest = async() => {
        await dispatch(getPrevTest(data?.id));
    }
    getTest();
  },[dispatch])
  console.log(tests);
  
  return (
    <AdminLayout>
    <div className='subjectTestWrapper'>
        <h1 className='flex items-center gap-2 text-2xl'><MoveLeft onClick={handleBack} className='cursor-pointer' /><NotebookPen color='blue' /><span className='text-blue-700'>{data.name}</span> - Start by creating a test</h1>
        <div className="TestOptions flex items-center gap-2 padding-2">
            {["Previous Test","Create Test"].map((item,index) => <div onClick={() => setOption(item)} className='border border-[#d7d7d7] hover:bg-blue-600 hover:text-white ease-linear transition-all cursor-pointer hover:border-blue-600 padd rounded-lg ' key={index}>{item}</div>)}
        </div>
        <div className="wrapper  h-[70vh] overflow-y-auto">
            {option == 'Create Test' ? <div><CreateSujectTest /></div> : 
                <div><PrevTestCard tests={tests} / ></div>
            }
        </div>
    </div>
    </AdminLayout>
  )
}

export default SubjectTest