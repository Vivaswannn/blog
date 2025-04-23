import React from 'react';
import ResourceCard from './ResourceCard';
import './ResourceList.css';

const ResourceList = ({ resources }) => {
  // Sort resources by likes (most liked first)
  const sortedResources = [...resources].sort((a, b) => b.likes - a.likes);

  return (
    <div className="resource-list">
      {sortedResources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

export default ResourceList;