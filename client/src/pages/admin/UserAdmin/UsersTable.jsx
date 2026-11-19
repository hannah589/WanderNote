import { useEffect } from "react";
import { useUser } from "../../../context/UserContext";
import SingleUserData from "./SingleUserData";
import styles from "../admin.module.css";

function UsersTable() {
  // get the userList state and getAllUsers from Context
  const { userList, getAllUsers } = useUser();

  // fetch all users when the component/page loads
  useEffect(() => {
    getAllUsers();
  }, []);
  console.log('Users from context:', userList);

  // create the table heading for the user data.
  return (
    <>
      <div className={styles.container}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            { /* 21. Send a single user to the SingleUserData component */}
            <tbody>
              {userList.map(user => (
                <SingleUserData key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UsersTable;
