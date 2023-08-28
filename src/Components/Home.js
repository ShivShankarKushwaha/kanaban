import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate =useNavigate();
  return (
    <div>
      <div className="w-full lg:h-[40rem] h-[35rem] flex flex-col lg:flex-row justify-around p-5 bg-[#00669f]">
        <div className="lg:w-1/2 w-full h-1/2 flex flex-col justify-start items-center">
          <h1 className="text-xl lg:text-4xl font-serif text-white lg:text-right text-center start-0 lg:mt-40 ">Stay Organized, Get Things Done</h1>
          <p className="lg:text-center text-justify text-white lg:px-20 py-2 lg:mt-5 lg:text-lg">Tired of juggling multiple tasks and projects? Look no further! Kanban is here to simplify your life and help you stay on top of your tasks. Whether you're a busy professional, a student, or someone who just loves to plan, our user-friendly todo list manager is designed to streamline your workflow and boost your productivity.</p>
        </div>
        <div className="lg:w-1/2 h-1/2 lg:h-full w-full overflow-hidden flex justify-center items-center ">
          <img className="hover:scale-110 transition-all duration-1000 " src="https://app.orangescrum.com/img/features/The-smartest-way-to-stay.png" alt="TODO List" />
        </div>
      </div>
      <div className="w-full lg:h-96 flex flex-col-reverse lg:flex-row justify-center p-5">
        <div className="lg:w-1/3 w-full overflow-hidden">
          <img className="hover:scale-125 transition-all duration-1000" src="./home1.png" alt="TODO List" />
        </div>
        <div className="lg:w-1/3 h-full flex flex-col justify-center items-start lg:ml-10">
          <h1 className="lg:text-4xl text-xl font-serif lg:text-left text-center p-0 m-0">Effortless Task Management</h1>
          <p className="text-left">Easily add, edit, and delete tasks. Organize them into categories, projects, or tags for a clear overview.</p>
        </div>
      </div>
      <div className="w-full lg:h-96 flex flex-col lg:flex-row justify-center p-5">
        <div className="lg:w-1/2 h-full flex flex-col justify-center items-center lg:items-end lg:mr-10">
          <h1 className="lg:text-4xl text-xl font-serif lg:text-right text-center">Track Your Progress</h1>
          <p className="lg:text-right text-center lg:w-2/3">Break down larger tasks into manageable subtasks. Watch your accomplishments grow as you check off each item.</p>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center items-center mt-5 lg:my-0 h-60 lg:h-auto overflow-hidden">
          <img className="hover:scale-125 transition-all duration-1000" src="./home2.png" alt="TODO List" />
        </div>
      </div>
      <div className="w-full lg:h-96 flex lg:flex-row flex-col-reverse justify-center p-5">
        <div className="lg:w-1/3 w-full overflow-hidden flex justify-center items-center">
          <img className="hover:scale-125 transition-all duration-1000 w-52 " src="./home3.png" alt="TODO List" />
        </div>
        <div className="lg:w-1/3 h-full flex flex-col justify-center lg:items-start lg:ml-10">
          <h1 className="lg:text-4xl text-xl font-serif lg:text-left text-center p-0 m-0">Search and Filter</h1>
          <p className="text-left">Quickly locate tasks using powerful search filters, helping you find what you need in no time.</p>
        </div>
      </div>
      <div className="w-full lg:h-60 flex flex-col justify-start items-center  py-10 px-2 lg:px-0">
        <h1 className="lg:text-2xl text-xl font-serif font-semibold">Start Organizing Your Life Today</h1>
        <p className="lg:w-3/4 text-justify p-2">Sign up now to embark on a journey of efficiency and organization. Take control of your tasks, focus on what truly matters, and experience the satisfaction of checking off completed items. Join the Kanban community today and turn your to-dos into accomplishments.</p>
        <button
          onClick={() => {
            navigate("/tasks");
          }}
          className="bg-gradient-to-br text-white from-blue-600 to-blue-800 p-2 text-xl m-5"
          id="getstartedbtn">
          Get Started
        </button>
      </div>
      <div className="w-full h-60 flex flex-col justify-start items-center bg-slate-100 py-10">
        <h1 className="text-2xl font-serif font-semibold">Why Choose Kanban</h1>
        <ul>
          <li>User Friendly Design &#10004;</li>
          <li>Track Status of a Task &#10004; </li>
          <li>Add, Update, Remove Tasks &#10004;</li>
          <li>Boost Productivity &#10004;</li>
          <li>24 X 7 Available Support &#10004;</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;