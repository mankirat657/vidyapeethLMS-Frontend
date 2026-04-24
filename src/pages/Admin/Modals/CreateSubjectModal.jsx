import React, { useEffect, useState } from 'react'
import { IoClose, IoCodeSlash, IoDocumentTextOutline, IoLibraryOutline, IoCreateOutline } from 'react-icons/io5'
import { MdOutlineSubject, MdOutlineDescription } from 'react-icons/md'
import './modal.css'
import { useDispatch } from 'react-redux'
import { createSubject, getSubject, updateSubject } from '../../../store/actions/subjectAction'
import { toast } from 'react-toastify'
const CreateSubjectModal = ({ id, action, setIsModalClicked, title, name, description, subjectCode, modules, lesson, subtitle }) => {
    const disptach = useDispatch();
    const [inputDetails, setInputDetails] = useState({
        name: "",
        description: "",
        subjectCode: "",
        modules: "",
        lesson: "",

    })
    console.log(id);
    
    useEffect(() => {
        setInputDetails({
            name: name || "",
            description: description || "",
            subjectCode: subjectCode || "",
            modules: modules || "",
            lesson: lesson || "",
        });
    }, [name, description, subjectCode, modules, lesson])

    const handleInputChange = (field, value) => {
        setInputDetails((prev) => ({
            ...prev,
            [field]: value
        }))
    }
    console.log(inputDetails);
    const handleCreation = async() => {
        const res = await disptach(createSubject(inputDetails));
         if (res?.error) {
            toast.error(res.error);
            return;
        }
        await disptach(getSubject());
        toast.success(res.message || "subject created successfully");
        setIsModalClicked(false);
    };

    const handleUpdate = async () => {
        const updatedData = {};

        Object.keys(inputDetails).forEach((key) => {
            if (inputDetails[key] !== "") {
                updatedData[key] = inputDetails[key];
            }
        });

        if (Object.keys(updatedData).length === 0) {
            toast.error("Please update at least one field");
            return;
        }

        const res = await disptach(updateSubject(id, updatedData));
        if (res?.error) {
            toast.error(res.error);
            return;
        }
        console.log(res);
        await disptach(getSubject());

        toast.success(res.message || "subject udpated successfully");
        setIsModalClicked(false);
    };

    return (
        <>
            <div className='modal-backdrop'></div>

            <div className='modal-container'>
                <div className='modal-header'>
                    <div className='header-content'>
                        <div className='header-icon-wrapper'>
                            <IoCreateOutline className='header-icon' />
                        </div>
                        <div>
                            <h2 className='modal-title'>{title ? title : "Create New Subject"}</h2>
                            <p className='modal-subtitle'>{subtitle ? subtitle : "Add"} a new subject to the knowledge bank</p>
                        </div>
                    </div>
                    <button className='close-button' onClick={() => { setIsModalClicked(false) }}>
                        <IoClose className='close-icon' />
                    </button>
                </div>

                <div className='modal-body'>
                    <div className='form-group'>
                        <label className='form-label'>
                            <MdOutlineSubject className='label-icon' />
                            Subject Name <span className='required-star'>*</span>
                        </label>
                        <input
                            value={inputDetails.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            type='text'
                            placeholder='e.g., Discrete Structures, Data Structures, Calculus'
                            className='form-input'
                        />
                        <p className='form-hint'>3-30 characters, must be unique</p>
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>
                            <IoCodeSlash className='label-icon' />
                            Subject Code <span className='required-star'>*</span>
                        </label>
                        <input
                            value={inputDetails.subjectCode}
                            onChange={(e) => handleInputChange("subjectCode", e.target.value)}
                            type='text'
                            placeholder='e.g., CS201, MATH101, PHY301'
                            className='form-input'
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>
                            <MdOutlineDescription className='label-icon' />
                            Description
                        </label>
                        <textarea
                            value={inputDetails.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            rows='3'
                            placeholder='Provide a brief description of the subject...'
                            className='form-textarea'
                        />
                    </div>

                    <div className='form-row'>
                        <div className='form-group-half'>
                            <label className='form-label'>
                                <IoLibraryOutline className='label-icon' />
                                Total Modules
                            </label>
                            <input
                                value={inputDetails.modules}
                                onChange={(e) => handleInputChange("modules", e.target.value)}
                                type='text'
                                placeholder='e.g., 8'
                                min='0'
                                className='form-input'
                            />
                        </div>

                        <div className='form-group-half'>
                            <label className='form-label'>
                                <IoDocumentTextOutline className='label-icon' />
                                Total Lessons
                            </label>
                            <input
                                onChange={(e) => handleInputChange("lesson", e.target.value)}
                                type='text'
                                value={inputDetails.lesson}
                                placeholder='e.g., 100'
                                min='0'
                                className='form-input'
                            />
                        </div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button className='btn-cancel' onClick={() => { setIsModalClicked(false) }}>Cancel</button>
                    <button onClick={action === "update" ? handleUpdate : handleCreation} className='btn-create'>{title ? title : "Create Subject"}</button>
                </div>
            </div>
        </>
    )
}

export default CreateSubjectModal