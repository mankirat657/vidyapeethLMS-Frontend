import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { FaNoteSticky } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { getSubject } from '../../store/actions/subjectAction';
import TestCards from './TestCards';
import { IoSearchOutline } from 'react-icons/io5';

const CreateTest = () => {
    const { subject } = useSelector(state => state.subject);
    const [sub, setSub] = useState([]);
    const[searchTerm,setSearchTerm] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSubject())
    }, [dispatch])
    useEffect(() => {
        setSub(subject?.subjects)
    }, [subject])
    console.log(sub);
    const filteredSubjects = sub.filter((item) => item?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(filteredSubjects);
    
    return (
        <div className='relative'>
            <AdminLayout>
                <div className="createTestWrapper">
                    <div className="questionBankHeader flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        <FaNoteSticky size={30} color='#2563eb' />
                        <h2 className='text-3xl font-bold'>Start by creating some test</h2>
                        </div>
                        <div className="relative ">
                            <IoSearchOutline size={20} className='absolute top-1/2 -translate-y-1/2 left-2' />
                            <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} name='search'  type="text" placeholder='Search the questions' className='outline-none border border-gray-300 w-[22vw] h-[5vh] rounded-full' style={{ padding: "0 1.5vw" }} />
                        </div>
                    </div>
                    <div className="subjectWrapper flex-wrap flex  gap-4 h-[70vh] overflow-y-auto">
                        {Array.isArray(filteredSubjects) && filteredSubjects.map((item, index) => {
                            return <TestCards key={index} id={item?._id} name={item?.name} description={item?.description} admin={item?.admin} subjectCode={item?.subjectCode} modules={item?.modules} lesson={item?.lesson} />
                        })}
                    </div>
                </div>


            </AdminLayout>
        </div>
    )
}

export default CreateTest