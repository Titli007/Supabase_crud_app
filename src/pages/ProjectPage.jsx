import { useNavigate } from 'react-router-dom';
import React, { useState , useEffect} from 'react';

import { fetchProjects } from '../services/supabase'; // Adjust the path based on your file structure
import EachProj from './comp/EachProj';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const projectsData = await fetchProjects();
            if (projectsData) {
                setProjects(projectsData);
            }
        };
        fetchData();
    }, []);


    console.log(projects)

    function createProjectHandler(){
        navigate('/createproject')
    }

    

    return (
        <div>
            <div style={{margin:"30px"}}>
                <button type='submit' style={{fontSize: '25px', background: "pink", }} onClick={createProjectHandler}>+ Create New Project</button>
            </div>
        {
            projects.length > 0 &&(
                <div style={{display : 'flex', flexDirection: 'column', marginLeft:'28px', marginTop: '30px'}}>
                    {projects.map((data, index) => (
                        <div key={index}>
                            <EachProj project={data} />
                        </div>
                    )
                    )}
                </div>
                )
        }
        </div>
    );
};


export default ProjectPage;