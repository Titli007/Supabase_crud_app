import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

import { deleteProject } from 'src/services/supabase';

import EmpOptions from './EmpOptions';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    backgroundColor: (props) => props.backgroundColor,
  },
}));

const EachProj = ({ project }) => {
  const createdAt = new Date(project.created_at);
  const formattedDate = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')}`;
  const formattedTime = `${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')}:${String(createdAt.getSeconds()).padStart(2, '0')}`;

  // Generate light color
  const randomLightColor = () => {
    const r = Math.floor(Math.random() * 156) + 100; // R value between 100 and 255
    const g = Math.floor(Math.random() * 156) + 100; // G value between 100 and 255
    const b = Math.floor(Math.random() * 156) + 100; // B value between 100 and 255
    return `rgb(${r},${g},${b})`;
  };

  const classes = useStyles({ backgroundColor: randomLightColor() });

  async function deleteButtonHandler () {
    const res= await deleteProject(project.id)
    console.log(res)
  }

  return (
    <Grid item xs={12} sm={10}>
      <Paper className={classes.container}>
        <Typography variant="h6">{project.title}</Typography>
        <Typography variant="body1">{project.description}</Typography>
        <Typography variant="body1">Date: {formattedDate}</Typography>
        <Typography variant="body1">Time: {formattedTime}</Typography>
        <button type='submit' onClick={deleteButtonHandler}>Delete</button>
      </Paper>
      <EmpOptions project_id = {project.id}/>
    </Grid>
  );
};

EachProj.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    id:PropTypes.number.isRequired,
  }).isRequired,
};

export default EachProj;
