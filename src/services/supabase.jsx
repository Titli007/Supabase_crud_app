import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yfpphysaghkbhgmlyqxn.supabase.co';
const public_api_Key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcHBoeXNhZ2hrYmhnbWx5cXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMTE3MzAsImV4cCI6MjAyNzg4NzczMH0.RloCw0e0_O0Y_ZIMl7E2FSoX6CiZoEczk-OuI2E4YhE';

const supabase = createClient(supabaseUrl, public_api_Key);


export const fetchProjects = async () => {
    try {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        return null;
    }
};

export const fetchEmployees = async () => {
    try {
        const { data, error } = await supabase.from('employees').select('*');
        if (error) {
            console.log(error)
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        return null;
    }
};



export const fetchEmployeeProjectData = async () => {
  try {
    const { data, error } = await supabase.from('employee_project').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching employee-project data:', error.message);
    return null;
  }
};

// export const fetchEmployeeAndProjectJoinData = async () => {
//     try {
//       const { data: employeeProjectData, error: employeeProjectError } = await supabase.from('employee_project').select('*');
//       if (employeeProjectError) {
//         throw employeeProjectError;
//       }
  
//       const { data: employeeData, error: employeeError } = await supabase.from('employees').select('*');
//       if (employeeError) {
//         throw employeeError;
//       }
  
//       const { data: projectData, error: projectError } = await supabase.from('projects').select('*');
//       if (projectError) {
//         throw projectError;
//       }
  
//       // Join the data
//       const joinedData = employeeProjectData.map((epp) => ({
//         ...epp,
//         employee: employeeData.find((e) => e.id === epp.employee_id),
//         project: projectData.find((p) => p.id === epp.project_id),
//       }));
  
//       return joinedData;
//     } catch (error) {
//       console.error('Error fetching employee-project data:', error.message);
//       return null;
//     }
//   };
  

  // fetch empid data using projectid

  export const getEmployeeDataByProjectId = async (projectId) => {
    try {
      // Validate projectId
      if (!projectId || Number.isNaN(projectId)) {
        throw new Error('Invalid project ID');
      }
  
      // Retrieve employee-project data for the given project ID
      const { data: employeeProjectData, error: employeeProjectError } = await supabase
        .from('employee_project')
        .select('*')
        .eq('project_id', projectId);
  
      if (employeeProjectError) {
        console.error('Error retrieving employee-project data:', employeeProjectError.message);
        return employeeProjectError.message;
      }
  
      // Retrieve employee data
      const { data: employeeData, error: employeeError } = await supabase
        .from('employees')
        .select('*');
  
      if (employeeError) {
        console.error('Error retrieving employee data:', employeeError.message);
        return employeeError.message;
      }
  
      // Join the data
      const joinedData = employeeProjectData.map((epp) => ({
        ...epp,
        employee: employeeData.find((e) => e.id === epp.employee_id),
      }));
  
      console.log('Employee data retrieved successfully:', joinedData);
      return joinedData;
    } catch (err) {
      console.error('Error retrieving employee data by project ID:', err.message);
      return err.message;
    }
  };


  export const getEmployeeAndProjectData = async () => {
    try {
      // Retrieve employee-project data
      const { data: employeeProjectData, error: employeeProjectError } = await supabase
        .from('employee_project')
        .select('employee_id, project_id');
  
      if (employeeProjectError) {
        console.error('Error retrieving employee-project data:', employeeProjectError.message);
        return employeeProjectError.message;
      }
  
      // Group the data by project_id
      const projectData = employeeProjectData.reduce((acc, epp) => {
        if (!acc[epp.project_id]) {
          acc[epp.project_id] = {
            project_id: epp.project_id,
            employee_ids: [],
          };
        }
        acc[epp.project_id].employee_ids.push(epp.employee_id);
        return acc;
      }, {});
  
      console.log('Employee and project data retrieved successfully:', Object.values(projectData));
      return Object.values(projectData);
    } catch (err) {
      console.error('Error retrieving employee and project data:', err.message);
      return err.message;
    }
  };
  



// create new project

// projectData = {
//     title :
//     description :
//     created_At :now ()
// }

export const createProject = async (projectData) => {
    try {
        const { data, error } = await supabase.from('projects').insert(projectData);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error creating project:', error.message);
        return null;
    }
};

export const deleteProject = async (projectId) => {
    try {
        const { data, error } = await supabase.from('projects').delete().eq('id', projectId);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error deleting project:', error.message);
        return null;
    }
};





export const addEmployeeToProject = async (projectId, employeeId) => {
  try {
    // Validate projectId and employeeId
    if (!projectId || Number.isNaN(projectId)) {
      throw new Error('Invalid project ID');
    }
    if (!employeeId || Number.isNaN(employeeId)) {
      throw new Error('Invalid employee ID');
    }

    const empid = parseInt(employeeId, 10);
    console.log(projectId, employeeId, empid);

    const { data, error } = await supabase
      .from('employee_project')
      .insert([{ employee_id: empid, project_id: projectId }]);

    if (error) {
      console.error('Error inserting data:', error.message);
      return error.message;
    }

    console.log('Data inserted successfully:', data);
    return data;
  } catch (err) {
    console.error('Error adding employee to project:', err.message);
    return err.message;
  }
};


// Function to remove an employee from a project
export const removeEmployeeFromProject = async (projectId, employeeId) => {
    try {
        const { data, error } = await supabase.from('employee_project').delete().eq('project_id', projectId).eq('employee_id', employeeId);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error removing employee from project:', error.message);
        return null;
    }
};




// Function to create a new employee
export const createEmployee = async (employeeData) => {
    try {
        const { data, error } = await supabase.from('employees').insert(employeeData);
        if (error) {
            throw error;
        }
        console.log("data os ", data)
        return data;
    } catch (error) {
        console.error('Error creating employee:', error.message);
        return null;
    }
};

// Function to delete an employee
export const deleteEmployee = async (employeeId) => {
    try {
        const { data, error } = await supabase.from('employees').delete().eq('id', employeeId);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error deleting employee:', error.message);
        return null;
    }
};



// Auth

// Sign up a new user
export const signUp = async (email, password, retryCount = 0, maxRetries = 5, initialDelay = 1000, backoffFactor = 2) => {
  try {
    console.log('1')
    console.log(email, password)
    const { data, error } = await supabase.auth.signUp({
      email ,
      password 
    });

    console.log(data)

    if (error) {
      // if (error.status === 429 && retryCount < maxRetries) {
      //   const delay = initialDelay * backoffFactor ** retryCount;
      //   console.log(`Rate limit exceeded, retrying in ${delay / 1000} seconds...`);
      //   await new Promise((resolve) => setTimeout(resolve, delay));
      //   return signUp(email, password, retryCount + 1, maxRetries, initialDelay, backoffFactor);
      // }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error signing up:', error.message);
    return null;
  }
};

// Sign in a user
export const signIn = async (email, password) => {
  console.log('2')
  console.log(email, password)
  try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) {
          throw error;
      }
      return user;
  } catch (error) {
      console.error('Error signing in:', error.message);
      return null;
  }
};

// Sign out the current user
export const signOut = async () => {
  try {
      const { error } = await supabase.auth.signOut();
      if (error) {
          throw error;
      }
      return true;
  } catch (error) {
      console.error('Error signing out:', error.message);
      return false;
  }
};

// Get the current user session
export const getCurrentUser = () => {
  const user = supabase.auth.user();
  return user;
};