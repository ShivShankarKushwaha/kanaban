import React, {useEffect, useState} from "react";
function Tasks() {
  const [task, settask] = useState({heading: "", text: "", Date: "", priority: false, progress: 0});
  const [noteerror, setnoteerrror] = useState("");
  const [allnotes, setnotes] = useState([]);
  const [checknote, setchecknote] = useState(false);
  const [checkdate, setcheckdate] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("date");
  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSortOption(selectedValue);

    if (selectedValue === "priority") {
      sortpriority();
    } else if (selectedValue === "date") {
      sortdate();
    } else if (selectedValue === "status") {
      sortprogress();
    }
  };
  useEffect(() => {
    settask({...task, Date: new Date()});
    console.log(task);
  }, []);
  useEffect(() => {
    console.log("note error removed");
    setnoteerrror("");
  }, [task]);
  useEffect(() => {
    async function getdata() {
      try {
        let response = await fetch("http://localhost:5500/getnotes", {credentials: "include"});
        let data = await response.json();
        setnotes(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getdata();
  }, [checknote]);
  function prioritytext(e) {
    if (e.target.style.backgroundColor == "red") {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "black";
      settask({...task, priority: false});
    } else {
      e.target.style.color = "white";
      e.target.style.backgroundColor = "red";
      settask({...task, priority: true});
    }
  }
  function handleDateTimeChange(event) {
    const currentDate = new Date();
    const selectedDate = new Date(event.target.value);
    if (selectedDate <= currentDate) {
      setnoteerrror("*Please choose a date and time in the future.");
    } else {
      setnoteerrror("");
      console.log(selectedDate);
      settask({...task, Date: selectedDate});
    }
  }
  async function addnote() {
    if (!task.heading) {
      setnoteerrror("Heading Is required");
      return;
    }
    // console.log(task.Date);
    // if(task.Date<new Date() && task.Date!='')
    // {
    //   setnoteerrror('*Please choose a date and time in future');
    //   return;
    // }
    if (!checkdate) {
      task.Date = "";
    }
    try {
      task.progress = "0";
      const response = await fetch("http://localhost:5500/addnote", {
        method: "POST",
        credentials: "include",
        body: new URLSearchParams(task),
      });

      if (response.status !== 200) {
        setnoteerrror("Document Not saved");
      } else {
        const data = await response.json();
        setchecknote(!checknote);
        // alert("data saved successfully");
        console.log(data);
        settask({heading: "", Date: "", priority: false, text: ""});
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
  async function deletenote(id) {
    console.log("deleting ", id);
    let data = await fetch("http://localhost:5500/deletenote", {method: "POST", credentials: "include", body: new URLSearchParams({id: id})});
    data = await data.json();
    console.log(data);
    setchecknote(!checknote);
  }
  async function editnote(id) {
    console.log("Editing ", id);

    // Fetch existing note data
    let existingData = await fetch("http://localhost:5500/getnote", {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({id: id}),
    });
    existingData = await existingData.json();

    let heading =prompt('Enter Heading');
    let text =prompt('Enter Text');
    if(!heading)
    {
      heading =existingData.heading;
    }
    if(!text)
    {
      text=existingData.text;
    }
    // Send the updated data to the server
    let data = await fetch("http://localhost:5500/editnote", {
      method: "POST",
      credentials: "include",
      body: new URLSearchParams({id: id,heading:heading,text:text}),
    });
    data = await data.json();
    console.log(data);
    setchecknote(!checknote);
  }

  async function editprogress(id) {
    let progress = prompt("Enter Progress out of 10");
    if (!progress) {
      return;
    }
    let data = await fetch("http://localhost:5500/editprogress", {method: "POST", credentials: "include", body: new URLSearchParams({id: id, progress: progress})});
    if (data.status != 200) {
      alert("Status not edited");
      return;
    }
    data = await data.json();
    console.log(data);
    setchecknote(!checknote);
  }
  async function sortpriority() {
    let data = await fetch("http://localhost:5500/sortpriority", {credentials: "include"});
    if (data.status != 200) {
      return console.log("not sorted");
    }
    data = await data.json();
    console.log("priority sorted data ", data);
    setnotes(data);
  }
  async function sortdate() {
    let data = await fetch("http://localhost:5500/sortdate", {credentials: "include"});
    if (data.status != 200) {
      return console.log("not sorted");
    }
    data = await data.json();
    console.log("date sorted data ", data);
    setnotes(data);
  }
  async function sortprogress() {
    let data = await fetch("http://localhost:5500/sortprogress", {credentials: "include"});
    if (data.status != 200) {
      return console.log("not sorted");
    }
    data = await data.json();
    console.log("progress sorted data ", data);
    setnotes(data);
  }
  return (
    <div>
      <div id="addtask" className="lg:w-1/2 mx-auto flex flex-col justify-center items-center border-2 lg:my-3">
        <h1 className="my-5 text-xl font-bold text-center">Add a Note</h1>
        <input
          className="border-2 outline-none lg:w-3/4 w-full m-2 p-2 font-semibold"
          type="text"
          placeholder="Enter Heading"
          value={task.heading}
          onChange={(e) => {
            settask({...task, heading: e.target.value});
          }}
        />
        <textarea
          className="resize-y lg:w-3/4 w-full lg:h-20 h-40 border-2 outline-none p-2 mb-2"
          placeholder="Enter Text"
          value={task.text}
          onChange={(e) => {
            settask({...task, text: e.target.value});
          }}></textarea>
        <div className="w-full justify-center p-3 flex flex-col lg:flex-row items-center">
          <span>Due Date</span>
          <input
            type="datetime-local"
            onChange={(e) => {
              handleDateTimeChange(e);
              setcheckdate(true);
            }}
            min={new Date().toISOString().slice(0, 16)}
            className="outline-none border-2 m-2 p-2"
          />
          <button className="mx-5 p-2 border-2" onClick={(e) => prioritytext(e)}>
            Priority
          </button>
          <button onClick={addnote} className="w-1/2 md:w-1/3 m-2 border-2 p-2 bg-gradient-to-br from-slate-600 to bg-slate-800 text-white shadow-sm shadow-slate-700 active:shadow-none">
            Add
          </button>
        </div>
        <span className="w-fit text-[red] text-center m-1">{noteerror}</span>
      </div>
      <div className="flex justify-center items-center h-20">
        {/* <h1 className="text-xl font-serif m-3">Sort According to</h1> */}
        <select className="border-2 outline-none p-2" onChange={handleSortChange}>
          <option value="">Sort</option>
          <option value="date">Date</option>
          <option value="priority">Priority</option>
          <option value="status">Progress</option>
        </select>
      </div>
      <div className="w-full border-0  flex justify-center items-center flex-wrap ">
        {/* <div className="w-1/3  p-3 border-2">
          <h1 className="text-xl font-medium">Heading Lorem, ipsum dolor.</h1>
          <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, eius asperiores dolor saepe corporis nostrum id consequuntur recusandae!</p>
          <div className="m-2">
            <input className="outline-none border-2 p-1" type="datetime-local" />
            <span className="p-2 border-2 m-1">Status</span>
            <span className="p-2 border-2 m-1 bg-blue-600 text-white cursor-pointer">Edit</span>
            <span className="p-2 border-2 m-1 bg-[red] cursor-pointer text-white">Delete</span>
          </div>
        </div> */}
        {allnotes.length == 0 ? <h1 className="text-xl m-10">No Data Found</h1> : null}
        {allnotes.map((note, index) => (
          <div key={note._id} className="lg:w-1/3 md:w-1/2 w-full flex flex-col  p-3 border-2 lg:min-h-[12rem]" style={{display: "flex", flexDirection: "column"}}>
            <h1 className="text-xl font-medium">{note.heading}</h1>
            <p className="text-justify">{note.text}</p>
            <div className="w-full flex justify-center items-center" style={{margin: "1rem", display: "flex", flexDirection: "column"}}>
              {/* <input readOnly className="outline-none border-2 p-1" type="datetime-local" value={format(parse(note.Date, "EEE MMM dd yyyy HH:mm:ss", new Date()), "yyyy-MM-dd HH:mm")} /> */}
              <input className={note.Date ? "w-full" : "w-0"} type="text" value={note.Date == "Invalid Date" ? "No date" : note.Date.slice(0, 25)} readOnly />
              <div className="flex justify-center items-center">
                <span className="p-2 border-2 m-1 ">{note.priority !== "false" ? "Priority" : "Not Priority"}</span>
                <span
                  className="p-2 border-2 m-1 bg-blue-600 text-white cursor-pointer"
                  onClick={() => {
                    editnote(note._id);
                  }}>
                  Edit
                </span>
                <span
                  className="p-2 border-2 m-1 bg-[red] cursor-pointer text-white"
                  value={note._id}
                  onClick={(e) => {
                    deletenote(note._id);
                  }}>
                  Delete
                </span>
                {note.progress == 10 ? (
                  <span className="p-2 border-2 bg-green-800 text-white cursor-pointer">Completed</span>
                ) : (
                  <span
                    className="p-2 border-2 bg-cyan-500 text-white cursor-pointer"
                    onClick={() => {
                      editprogress(note._id);
                    }}>
                    {note.progress==0?"To Do":'Doing'} {note.progress}/10
                  </span>
                )}
                {/* <span className="p-2 border-2 bg-cyan-500 text-white cursor-pointer" onClick={()=>{editprogress(note._id)}}>progress {note.progress}/10</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
