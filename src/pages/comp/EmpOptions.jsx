import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import EmployeeList from './EmployeeList';
import { fetchEmployees, addEmployeeToProject, getEmployeeDataByProjectId } from '../../services/supabase';


const EmpOptions = ({ project_id }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeInProj, setEmployeeInProj] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
  const [isClick, setIsClick] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const employeeData = await fetchEmployees();
      if (employeeData) {
        setEmployees(employeeData);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const employeeJoinData = await getEmployeeDataByProjectId(project_id);
      if (employeeJoinData) {
        setEmployeeInProj(employeeJoinData);
      }
    };
    fetchData();
  }, [isClick, project_id]);

  const handleEmployeeSelect = (e) => {
    setSelectedEmployeeId(e.target.value);
  };

  const handleAddEmployeeToProject = async () => {
    setIsClick(true)
    if (selectedEmployeeId && project_id) {
      const response = await addEmployeeToProject(project_id, selectedEmployeeId);
      console.log('Employee added to project:', response);
    }
  };


  console.log("jhgug",employeeInProj)
  return (
    <div>
      <div>
        <select onChange={handleEmployeeSelect}>
          <option value="">Select Employee</option>
          {employees.map((data) => (
            <option key={data.id} value={data.id}>
              {data.name}
            </option>
          ))}
        </select>
        <button type='submit' onClick={handleAddEmployeeToProject}>Add Employee to Project</button>
      </div>
      <div>
      {employeeInProj.map((data, index) => (
          <ol key={index}>
              <EmployeeList employeeInProj = {data} />
          </ol>
      )
      )}
      </div>
    </div>
  );
};

EmpOptions.propTypes = {
  project_id: PropTypes.number.isRequired,
};

export default EmpOptions;