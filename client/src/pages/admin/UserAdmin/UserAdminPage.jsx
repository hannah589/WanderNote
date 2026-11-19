import { useState } from "react"
import AddUser from "./AddUser";
import Button from "../../../components/Button";
import UsersTable from "./UsersTable";
import styles from "../admin.module.css";

function UserAdminPage() {
  const [showForm, setShowForm] = useState(false);

  function handleAddNew() {
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
  }

  return (
    <>
      <div className="headingContainer">
        <h2>Users</h2>
        <Button onClick={handleAddNew}>
          + Add New User
        </Button>
      </div>

      <div className={styles.content}>
        {showForm && <AddUser onClose={handleClose} />}
        <UsersTable />
      </div>
    </>
  );
}

export default UserAdminPage;
