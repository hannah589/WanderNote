import { useEffect } from "react";
import { useDestinations } from "../../../context/DestinationsContext";
import styles from "../Table.module.css";

function DestTable() {
  const {
    destinationsList,
    getAllDestinations,
    deleteDestination,
    updateDestination,
  } = useDestinations();

  useEffect(() => {
    getAllDestinations();
  }, []);

  // Delete destination
  async function onDelete(id) {
    if (!window.confirm("Are you sure you want to delete this destination?")) {
      return;
    }

    try {
      await deleteDestination(id);
      console.log("Destination deleted successfully");
    } catch (err) {
      console.error("Failed to delete destination:", err.message);
    }
  }

  // Edit destination
  async function onEdit(item) {
    const updatedCity = window.prompt("Enter new city:", item.city);

    if (!updatedCity || updatedCity.trim() === "") {
      return;
    }

    try {
      await updateDestination(item.id, {
        ...item,
        city: updatedCity.trim(),
      });

      console.log("Destination updated successfully");
    } catch (err) {
      console.error("Failed to update destination:", err.message);
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Country</th>
            <th>Continent</th>
            <th>Category</th>
            <th>Description</th>
            <th>Image</th>
            <th>Tourism URLs</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {destinationsList?.length > 0 ? (
            destinationsList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.city}</td>
                <td>{item.country}</td>
                <td>{item.continent || "—"}</td>
                <td>{item.category || "—"}</td>
                <td>{item.description || "—"}</td>

                <td>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.city || "Destination"}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <span className={styles.textMuted}>No image</span>
                  )}
                </td>

                <td>
                  {Array.isArray(item.tourismUrls)
                    ? item.tourismUrls.map((url, index) => (
                        <div key={index}>
                          <a href={url} target="_blank" rel="noreferrer">
                            Link {index + 1}
                          </a>
                        </div>
                      ))
                    : item.tourismUrls || "—"}
                </td>

                <td>
                  <div>
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(item.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No destinations found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DestTable;
