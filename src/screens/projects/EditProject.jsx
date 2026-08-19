import React from 'react';

import ProjectForm from './ProjectForm';

const EditProject = props => {
  return (
    <ProjectForm
      {...props}
      mode="edit"
    />
  );
};

export default EditProject;