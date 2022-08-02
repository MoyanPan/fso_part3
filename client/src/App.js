import axios from 'axios'
import React, { useState,useEffect} from 'react'

//This is a new line of code
// Another line of code


/* download */
//git fetch
//git pull origin main
// onemorelane

const Name = (props) =>{
  const Deletefunc = (name) =>{
    var data = JSON.stringify({
      "name": name
    });
    //After the build, the API is "/api/deletePerson"
    //Before the build, the API is "http://localhost:3000/api/deletePerson"
    var config = {
      method: 'post',
      url: '/api/deletePerson',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      props.hook()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return(
    <div>
      <p>
        {props.name}: {props.number}<button type="submit" onClick={() => Deletefunc(props.name)}>delete</button>
      </p>
    </div>
  )
}
const Filter = (props) => {
  return (
    <form>
    <div>
      filter shown with: <input value = {props.filter} onChange={props.function}/>
    </div>
  </form>
  )
}
const Addnew = (props) => {
  return(
    <form onSubmit={props.addName}>
    <div>
      name: <input value = {props.newName} onChange={props.handleNameChange}/>
    </div>
    <div>number: <input value = {props.number} onChange={props.handlenumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
const Person = (props) => {
  return(
    <div>{props.personstoshow.map(person => <Name key = {person.name} name = {person.name} number = {person.number} hook = {props.hook}/>)}</div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number,setnumber] = useState('')
  const [filter, setFilter] = useState('')
  const addName = (event) =>{
    event.preventDefault()
    // http://localhost:3000/api/updatePerson || http://localhost:3000/api/persons
    let curl = persons.some(person => person.name === newName)? '/api/updatePerson' : '/api/persons'
    if (number.length === 0) {
      window.alert(`number cannot be null`)
      return;
    }
      const data = JSON.stringify({
        "id" : Math.floor(Math.random() * 100000),
        "name": newName,
        "number": number
      });
      //After the build, the API is "/api/persons"
      //Before the build, the API is "http://localhost:3000/api/persons"
      const config = {
        method: 'post',
        url: curl,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        hook()
      })
      .catch(function (error) {
        console.log(error);
      });
      setNewName("")
      setnumber("")
  }
   const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handlenumberChange = (event) =>{
    setnumber(event.target.value)
  }
  const personstoshow = filter.length === 0
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }
  //After the build, the API is "/api/persons"
  //Before the build, the API is "http://localhost:3000/api/persons"
  const baseurl = "/api/persons"
  const hook = () =>{
    axios.get(baseurl)
    .then(response => {
      setPersons(response.data)
    })
  }
  useEffect(hook,[])
  return (
    <div>
      <h2>numberbook</h2>
      <Filter filter = {filter} function = {handleFilterChange}/>
      <h2>add new</h2>
      <Addnew addName = {addName} newName = {newName} handleNameChange = {handleNameChange} number = {number}
      handlenumberChange = {handlenumberChange}/> 
      <h2>Numbers</h2>
      <Person personstoshow = {personstoshow} hook={hook}/>
    </div>
  )
}

export default App
