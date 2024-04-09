import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import EachEmp from './comp/EachEmp';
import { fetchEmployees } from '../services/supabase';

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const employeeData = await fetchEmployees();
      if (employeeData) {
        setEmployees(employeeData);
      }
    };
    fetchData();
  }, []);

  console.log(employees);

  return (
    <div>
      <div>
        <button type='button' style={{margin:'25px'}} onClick={()=>navigate('/addemployee')}>+ Add New Employee</button>
      </div>
      {employees.length > 0 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 4fr 3fr 3fr 1fr 1fr', backgroundColor: '#f0f0f0' }}>
            <div>Index</div>
            <div>Name</div>
            <div>Email</div>
          </div>
          {employees.map((data, index) => (
            <EachEmp emp={data} index={index} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeePage;