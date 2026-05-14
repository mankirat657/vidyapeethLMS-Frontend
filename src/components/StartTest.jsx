import React from 'react'
import StudentLayout from '../layouts/StudentLayout'
import { useLocation } from 'react-router-dom'

const StartTest = () => {
    const location = useLocation();
    const state = location.state;
    console.log(state);
    
  return (
    <StudentLayout>StartTest</StudentLayout>
  )
}

export default StartTest