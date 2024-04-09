import PropTypes from 'prop-types';
import React, { useState } from 'react'

import { removeEmployeeFromProject } from 'src/services/supabase';


const EmployeeList = ({employeeInProj}) => {
    const[newEmpData, setNewEmpData] = useState([])
    
    async function deleteEmp (){
        const res = await removeEmployeeFromProject(employeeInProj.project_id , employeeInProj.employee_id)
        setNewEmpData(res)
    }
    console.log(newEmpData)
    return(
    <div>
      <ul style={{display: 'flex', justifyContent: "space-between", fontSize : "25px", width : '50%'}}>
        <li>{employeeInProj.employee.name}</li>
        <button type='submit' style={{cursor: 'pointer'}} onClick={deleteEmp}>x</button>
      </ul>
    </div>
  )}

  EmployeeList.propTypes = {
    employeeInProj: PropTypes.shape({
      employee: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
      project_id: PropTypes.number.isRequired,
      employee_id: PropTypes.number.isRequired,
    }).isRequired,
  };

export default EmployeeList
