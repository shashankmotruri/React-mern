import React, { useContext ,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

import {  Table } from "semantic-ui-react";

export default function Home() {
  const { userData ,setUserData} = useContext(UserContext);

  const  [name,setname] = useState();
  const [age,setage] = useState();
  const [salary,setsalary] = useState();
  const [phoneNumber  ,setphoneNumber] = useState();

  const [showEmployees,setshowEmployees] = useState(false);

  const [error, setError] = useState();

  const [allEmployees,setallEmployees] = useState([]);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const newEmployee = {name, age,salary,phoneNumber};
      await Axios.post("http://localhost:5000/employees",newEmployee);
      
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);      
    }


  }
  if(showEmployees) {
      try {
       Axios
        .get("http://localhost:5000/employees/allemp")
        .then((response) => {
          setallEmployees(response.data);
        })
      } catch (error) {
        console.log(error);
      }
  }
  useEffect(() => {
    console.log(showEmployees);
    console.log(allEmployees);
   
  });
    
    
  


  return (
    <div className="page">
      {userData.user ? (
        <div className="home-container">
          <h1>Welcome {userData.user.displayName}</h1>
          <button onClick={logout}>Log out</button>

                <div className="Addemp">
                    {error && (
                      <ErrorNotice message={error} clearError={() => setError(undefined)} />
                    )}
                  <form className="form" onSubmit={submitHandler}>

                    <label htmlFor="register-name">Name</label>
                    <input
                      id="register-name"
                      type="text"
                      onChange={(e) => setname(e.target.value)}
                    />
                    <label htmlFor="register-age">Age</label>
                    <input
                      id="register-age"
                      type="text"
                      onChange={(e) => setage(e.target.value)}
                    />

                    <label htmlFor="register-salary">Salary</label>
                    <input
                      id="register-salary"
                      type="number"
                      onChange={(e) => setsalary(e.target.value)}
                    />

                    <label htmlFor="register-phone">phoneNumber</label>
                    <input
                      id="register-phone"
                      type="tel"
                      onChange={(e) => setphoneNumber(e.target.value)}
                    />


                    <input type="submit" value="Add Employee" />
                  </form>
        
                </div>

                <button id="empl-list" type="submit" onClick={() => setshowEmployees(!showEmployees)}>Show Employee List</button>

                {showEmployees? 
                
                <div className="Table-Wrapper">

                    <h1>Employes List</h1>
                          <Table singleLine>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Age</Table.HeaderCell>
                                <Table.HeaderCell>Salary</Table.HeaderCell>
                                <Table.HeaderCell>Phone Number</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {allEmployees.map(el => {
                                return (
                                  <Table.Row>
                                    <Table.Cell>{el.name}</Table.Cell>
                                    <Table.Cell>{el.age}</Table.Cell>
                                    <Table.Cell>{el.salary}</Table.Cell>
                                    <Table.Cell>{el.phoneNumber}</Table.Cell>
                                  </Table.Row>
                                );
                              })}
                            </Table.Body>
                          </Table>

                </div> : null}
        </div>
        
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
