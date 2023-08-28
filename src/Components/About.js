import React from "react";

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">About Kanban App</h1>
        <p className="text-gray-700 mb-4">Welcome to the Kanban App! This app helps you organize your tasks and notes using a Kanban board. You can create tasks, Update them between different stages, and prioritize your work.</p>
        <p className="text-gray-700 mb-4">The Kanban board consists of Progress Button representing different stages of work, such as "To Do," "Doing," and "Completed." You can  keep track of your tasks effectively.</p>
        <p className="text-gray-700 mb-4">Start by adding tasks, sort them according to your priority, and enjoying a more organized and productive way of managing your work!</p>
        <p className="text-gray-700">Thank you for using the Kanban App. We hope it enhances your productivity and helps you stay on top of your tasks.</p>
      </div>
    </div>
  );
}

export default About;
