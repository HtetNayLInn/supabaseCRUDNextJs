import React,{ useState,useEffect } from 'react'
import { supabase } from './createClient'
import './App.css'

const App = () => {

  const [users,setUsers] = useState([])
  
  const [user,setUser] = useState({
    name:'',age:''
  })

  const [user2,setUser2] = useState({
    id:'',name:'',age:''
  })


  useEffect(() => {
    fetchUsers()
  }, []);

  
  async function fetchUsers(){
    const  {data} = await supabase
      .from('users')
      .select('*')
      setUsers(data)
  }
 

  function handleChange(event){
    setUser(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  function handleChange2(event){
    setUser2(prevFormData=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function createUser(){
    await supabase
  .from('users')
  .insert({ name: user.name, age: user.age })

  fetchUsers()
  }
  
  async function deleteUser(userId){
    await supabase
  .from('users')
  .delete()
  .eq('id', userId)

  fetchUsers()
  }

  function displayUser(userId){
    users.map((user)=>{
      
      if(user.id == userId){
        setUser2({id:userId,name:user.name,age:user.age})
      }
    
    })
  }

  async function updateUser(){
    await supabase
    .from('users')
    .update({ name: user2.name,age: user2.age })
    .eq('id', user2.id)

  fetchUsers()
  }

  return (
      <div>
        <form onSubmit={createUser}>
          <input type='text' placeholder='Name' name='name' 
            onChange={handleChange}
          />
           <input type='number' placeholder='Age' name='age' 
            onChange={handleChange}
          />
          <button type='submit'>create</button>
        </form>

        <form onSubmit={updateUser}>
          <input type='text' defaultValue={user2.name} name='name' 
            onChange={handleChange2}
          />
           <input type='number' defaultValue={user2.age} name='age' 
            onChange={handleChange2}
          />
          <button type='submit'>Save Changes</button>
        </form>

        
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
              {users.map((user)=>
               <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>
                    <button onClick={()=>{deleteUser(user.id)}}>Delete</button>
                    <button onClick={()=>{displayUser(user.id)}}>Edit</button>
                  </td>
               </tr>
              )}
          </tbody>
        </table>
      </div>
    )
}

export default App