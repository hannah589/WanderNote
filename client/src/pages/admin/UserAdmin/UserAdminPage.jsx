import AddUser from "./AddUser";
import UsersTable from "./UsersTable";

function UserAdminPage() {
  return (
    <>
      <h2>User Management</h2>
      <AddUser />
      <UsersTable />
    </>
  );
}

export default UserAdminPage;
