import { useState } from "react"
import AddDestination from "./AddDestination";
import Button from "../../../components/Button";
import styles from "../admin.module.css";

function DestAdminPage() {
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
        <h2>Destination</h2>
        <Button onClick={handleAddNew}>
          + Add New Destination
        </Button>
      </div>

      <div className={styles.content}>
        {showForm && <AddDestination onClose={handleClose} />}
      </div>
    </>
  );
}

export default DestAdminPage;
