import { useState } from "react";
import { UserContext } from "./UserContext.jsx";
import axios from 'axios';

export const UserProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);

 
  async function addUser(newUserData){
    console.log('Add user - UserProvider.jsx', newUserData);

    try {
      const res = await axios.post('http://localhost:3001/api/users/add', newUserData);
      console.log('CONTEXT - Add User:', res.data);
      const newUser = [...userList, res.data];
      setUserList(newUser);
      return res.data;
    } catch (error) {
      console.error('Error adding User:', error);
      throw error;
    }
  };

  // READ/GET all
  const getAllUsers = async () => {
    console.log('GET all Users - UserProvider.jsx');

    try {
      //get req to hit get all api endpoint
      const res = await axios.get('http://localhost:3001/api/users'
      );
      //log data to console
      console.log('Get all Users:', res.data);
      //set and add all the data to the UserList state
      setUserList(res.data);
      return res.data
    } catch (error) {
      console.error('Error getting all Users:', error);
      throw error;
    }
  };

  // READ/GET by id
  const getUserById = async (id) => {
    console.log('getUsersById - UsersProvider.jsx');

    try {
      const res = await axios.get(`http://localhost:3001/api/users/${id}`);
      console.log('Get User by ID:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error getting User by id:', error);
      throw error;
    }
  };

  const getUserByName = async (name) => {
    console.log('getUsersByName - UserProvider.jsx');

    try {
      //encodeURIComponent, to contain spaces in the url
      const res = await axios.get(
        `http://localhost:3001/api/users/name/${encodeURIComponent(name)}`
      );
      console.log('Get User by name:', res.data);
      return res.data;
    } catch (error) {
      console.error('Error getting User by name:', error);
      throw error;
    }
  };

  // UPDATE existing User
  const updateUser = async (updatedUser) => {
    console.log('updateUser - UserProvider.jsx', updatedUser);
    const id = Number(updatedUser.id);

    try {
      const res = await axios.put(`http://localhost:3001/api/users/edit/${id}`, updatedUser);
      console.log('User updated:', res.data);

      // Update the User in state
      //set the User list to the new upadted list
      //map function to create a new array with the updated data , if id dont match use and keep the current state value
      // Update User in the list
      setUserList((prevList) =>
        prevList.map((user) =>
          Number(user.id) === id ? res.data : user
        )
      );

      return res.data;
    } catch (error) {
      console.error('Error updating User:', error);

       console.error('Error updating User:', error.response?.data);
      console.error('Status:', error.response?.status);
      console.error('Updated user:', updatedUser);

      throw error;
    }
  };

  // DELETE User
  const deleteUser = async (id) => {
    id = Number(id);
    console.log('deleteUser - UserProvider.jsx', id);

    try {
      //send request to api
      await axios.delete(`http://localhost:3001/api/users/delete/${id}`);

      // Remove User from state using filter to create a new array without the the product that has the matching id
      setUserList((prevList) =>
        prevList.filter((User) => User.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete User:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userList,
        addUser,
        getAllUsers,
        getUserById,
        getUserByName,
        updateUser,
        deleteUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};