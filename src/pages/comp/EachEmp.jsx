import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { fetchProjects , deleteEmployee, addEmployeeToProject } from 'src/services/supabase';


const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '40px 4fr 3fr 1fr 1fr 1fr',
    gridGap: theme.spacing(1),
    alignItems: 'center',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  checkbox: {
    justifySelf: 'center',
  },
}));


const EachEmp = ({ emp, index, selected, onSelect }) => {
  const classes = useStyles();
  const [projects, setProjects] = useState('')
  const [projectId,setProjectId] = useState(0)

  async function deleteEmpHandler(){
    await deleteEmployee(emp.id)
  }

  useEffect(()=>{
      const fetchData = async () => {
        const projectsData = await fetchProjects();
        if (projectsData) {
            setProjects(projectsData);
        }
    };
    fetchData();
    },[])

    async function addToProjHandler(){
      await addEmployeeToProject(projectId, emp.id)
    }

  return (
    <div className={classes.gridContainer}>
      
      <div>{index}</div>
      <div>{emp.name}</div>
      <div>{emp.email}</div>
      <select onChange={(e)=>setProjectId(e.target.value)}>
          <option value="">Select Project</option>
          {projects&&(
          projects.map((data) => (
            <option key={data.id} value={data.id}>
              {data.title}
            </option>
          )))}
      </select>
      <button type='button' onClick={addToProjHandler} >
        Add To Project
      </button>
      <button type='button' onClick={deleteEmpHandler}>
        Delete
      </button>
    </div>
  );
};

EachEmp.propTypes = {
  emp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id:PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default EachEmp;