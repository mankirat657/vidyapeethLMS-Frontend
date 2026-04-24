import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { RiBankCardFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { getSubject } from '../../store/actions/subjectAction';
import Subject from './Subject';
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import CreateSubjectModal from './Modals/CreateSubjectModal';
import { Outlet } from 'react-router-dom';
const QuestionBank = () => {
    const [modalClick, setIsModalClicked] = useState(false);
    const { subject } = useSelector(state => state.subject);
    const [sub, setSub] = useState([]);
    const [searchSubject, setSearchSubject] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSubject())
    }, [dispatch])
    useEffect(() => {
        setSub(subject?.subjects)
    }, [subject])
    console.log(sub);
    console.log(searchSubject);
    const filteredSubjects = subject?.subjects?.filter((item) =>
        item?.name?.toLowerCase().includes(searchSubject.toLowerCase())
    );

    return (
        <div className="relative">

            <AdminLayout>

                <div className='questionBankWrapper'>
                    <div className="flex items-center justify-between">
                        <div className="questionBankHeader flex items-center gap-2">
                            <RiBankCardFill size={30} color='#2563eb' />
                            <h2 className='text-3xl font-bold'>Knowledge Bank</h2>

                        </div>
                        <div className="relative">
                            <IoSearchOutline size={20} className='absolute top-1/2 -translate-y-1/2 left-2' />
                            <input name='search' onChange={(e) => setSearchSubject(e.target.value)} value={searchSubject} type="text" placeholder='Search the subjects' className='outline-none border border-gray-300 w-[22vw] h-[5vh] rounded-full' style={{ padding: "0 1.5vw" }} />
                        </div>
                    </div>
                    <div className="subjectWrapper h-[70vh] overflow-y-auto flex items-center gap-4 flex-wrap">
                        {Array.isArray(filteredSubjects) && filteredSubjects.map((item, index) => (
                            <Subject
                                key={index}
                                id={item?._id}
                                name={item?.name}
                                description={item?.description}
                                admin={item?.admin?.fullName?.firstName}
                                subjectCode={item?.subjectCode}
                                modules={item?.modules}
                                lesson={item?.lesson}
                            />
                        ))}

                    </div>
                </div>
            </AdminLayout>
            <div onClick={() => { setIsModalClicked(true) }} className="createSubject rounded-xl hover:bg-blue-700 transition-all ease-linear cursor-pointer bg-blue-500 absolute bottom-5 right-6">
                <IoMdAdd size={30} color='#fff' />
            </div>
            {modalClick && <CreateSubjectModal setIsModalClicked={setIsModalClicked} />}

        </div>
    )
}

export default QuestionBank