import React from 'react';

function Admin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Books Donation Dashboard</h2>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-8">
        Here you can manage and track monthly leftover book donations from the college library. Add, view, and update donation records to help books find new homes.
      </p>
      {/* Add books donation management features here */}
    </div>
  );
}

export default Admin;
