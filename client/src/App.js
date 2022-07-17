import axios from 'axios'
import React, { useState,useEffect} from 'react'

//This is a new line of code
// Another line of code


/* download */
//git fetch
//git pull origin main
// onemorelane

const Name = (props) =>{

  return(
    <div>
      <p>
        {props.name}: {props.number}
        
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
  console.log(props.personstoshow);
  return(
    <div>{props.personstoshow.map(person => <Name key = {person.name} name = {person.name} number = {person.number}/>)}</div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number,setnumber] = useState('')
  const [filter, setFilter] = useState('')
  const addName = (event) =>{
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to numberbook`)
    }
    else{
      const newperson = {
        name:newName,
        number:number,
        id:persons.length+1
      }
      setPersons(persons.concat(newperson))
      setNewName("")
      setnumber("")
    }
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
      <Person personstoshow = {personstoshow}/>
    </div>
  )
}

export default App
