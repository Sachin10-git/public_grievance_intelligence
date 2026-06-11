import React from 'react';

export default function ComplaintCard({ complaint }) {
  return (
    <div className="complaint-card">
      <h4>{complaint?.title || 'Untitled'}</h4>
      <p>{complaint?.description || 'No description'}</p>
    </div>
  );
}
