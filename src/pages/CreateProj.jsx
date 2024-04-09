import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { createProject } from 'src/services/supabase'


const CreateProj = () => {

  const[title, setTitle] = useState('')
  const[desc, setDesc] = useState('')
  const navigate = useNavigate()

  async function createProjectHandler (){
    console.log("sdfsdf")
    const projectData = {
      title,
      description : desc
    }
    const res = await createProject(projectData)
    console.log(res)
    setTitle("")
    setDesc("")
    navigate('/projects')
  }

  return(
  <div style={{textAlign:'center'}}>
    <h1>Create New Project</h1>
    <div>
      <input style={{fontSize:'20px', margin: '20px'}} placeholder='Project Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
    </div>

    <div>
      <input style={{fontSize:'20px'}} placeholder='Description' value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
    </div>
    <button style={{fontSize:'25px' , margin: '20px'}} type='submit' onClick={createProjectHandler}>Submit</button>
  </div>
);}

export default CreateProj
