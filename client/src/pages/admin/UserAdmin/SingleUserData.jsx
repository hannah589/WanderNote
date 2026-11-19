// Import icons and Link 
import { Pencil, Trash } from 'lucide-react';
import { Link } from 'react-router';
//delete function from api, context or redux
import { useUser } from '../../../context/UserContext';
import styles from "./Users.module.css";

function SingleUserData({ user }){

  //deconstruct delete function from userContext
  const { deleteUser } = useUser();

  // Create onDelete function.
  async function onDelete(id){
    console.log('Delete user click');
    console.log(`ID clicked is: ${id}`);

    try {
      await deleteUser(id);
    } catch (err) {
      console.log('Failed to delete user', err.message);
    }
  }

  // create the user information in a table row.
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.isAdmin ? 'Yes' : 'No'}</td>
      <td>
        {user.image ? (
          <img
            src={user.image}
            alt={user.city || "user image"}
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "100%",
            }}
          />
        ) : (
          <span className={styles.textMuted}>No image</span>
        )}
      </td>
      <td>
        {/* 26. Create the link for editing users */}
        <Link to={`/admin/users/edit/${user.id}`}>
          <Pencil
            className='text-primary'
            style={{ cursor: 'pointer'}}
          />
        </Link>
      </td>
      <td>
      {/* 27. Create the onClick for the delete */}
        <Trash 
          onClick={e => onDelete(user.userId, e)}
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  )
}
// 28. Open App.jsx
export default SingleUserData;