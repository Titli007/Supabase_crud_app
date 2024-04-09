import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {createEmployee } from 'src/services/supabase'

const CreateEmpPage = () => {
const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const navigate = useNavigate()

  async function addEmpHandler (){
    const employeeData = {
        name,
        email
    }
    console.log("sdfsdf")
    const res = await createEmployee(employeeData)
    console.log("doiasjnduasdijanij",res)
    setName("")
    setEmail("")
    navigate('/employees')
  }

  return(
    <div style={{textAlign:'center'}}>
    <h1>Add New Employee</h1>
    <div>
      <input style={{fontSize:'20px', margin: '20px'}} placeholder='Employee Name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
    </div>

    <div>
      <input style={{fontSize:'20px'}} placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
    </div>
    <button style={{fontSize:'25px' , margin: '20px'}} type='submit' onClick={addEmpHandler}>Submit</button>
  </div>
  )}


export default CreateEmpPage
