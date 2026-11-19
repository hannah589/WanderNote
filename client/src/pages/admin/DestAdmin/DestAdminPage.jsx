import { useState, useEffect } from "react";
import { useDestinations } from "../../../context/DestinationsContext";
import DestForm from "./DestForm";
import DestTable from "./DestTable";
import Button from "../../../components/Button";
import styles from "../AdminDashboard.module.css";

function DestAdminPage() {
  //get dest state and function from useContext
  const { destinationsList, getAllDestinations, deleteDestination } =
    useDestinations();

  //form states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDest, setCurrentDest] = useState(null);

  // Fetch all destinations from api server
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        await getAllDestinations();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Add new product
  function handleAddNew() {
    setCurrentDest(null);
    setIsEditing(false);
    setShowForm(true);
  }

  // Edit product
  function handleEdit(item) {
    setCurrentDest(item);
    setIsEditing(true);
    setShowForm(true);
  }

  // Close form
  function handleCancel() {
    setShowForm(false);
    setCurrentDest(null);
    setIsEditing(false);
  }

  // Delete product
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this destination?")) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteDestination(id);

      setSuccess(`Destination ID: ${id} deleted`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  }

  if (loading) return <p>Loading destinations...</p>;

  return (
    <>
      <div className={styles.dashboardHeader}>
        <h2>Destination Management</h2>
        <Button onClick={handleAddNew} className={styles.btnPrimary}>
          + Add New Destination
        </Button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {showForm && (
        <DestForm
          dest={currentDest}
          isEditing={isEditing}
          onCancel={handleCancel}
        />
      )}

      <DestTable
        data={destinationsList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

export default DestAdminPage;
