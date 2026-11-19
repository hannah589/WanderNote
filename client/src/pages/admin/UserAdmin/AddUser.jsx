// import from react
import { useState } from "react";
// need action from userSlice
import { useUser } from "../../../context/UserContext";
// import validation
import { is_Empty } from "../../../utils/validation";
import Button from "../../../components/Button";

function AddUser() {
  //deconstruct addUser function from useUser context hook
  const { addUser } = useUser();

  // Set up state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    password: "",
    passwordCompare: "",
    admin: "",
    errors: {},
  });

  // Set up state to show the status of saving a new user
  const [loading, setLoading] = useState(false);

  // On Change function.
  function onChange(e){
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Destructure the state.
  const { firstName, lastName, email, image, password, passwordCompare, errors } = formData;

  // Set up, if we can save or not.
  const canSave = firstName !== "" && email !== "" && setLoading(false);

  // The handleSubmit function
  function handleSubmit(e){
    e.preventDefault();
    console.log("HandleSubmit - add new user page");

    // Validation.
    // First name
    if (is_Empty(firstName)) {
      setFormData({
        ...formData,
        errors: { firstName: "First Name is required" },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { firstName: "" } });
    }
    // last name
    if (is_Empty(lastName)) {
      setFormData({
        ...formData,
        errors: { lastName: "Last Name is required" },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { lastName: "" } });
    }
    // email
    if (is_Empty(email)) {
      setFormData({ ...formData, errors: { email: "Email is required" } });
      return;
    } else {
      setFormData({ ...formData, errors: { email: "" } });
    }
    // password
    if (is_Empty(password)) {
      setFormData({
        ...formData,
        errors: { password: "Password is required" },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { password: "" } });
    }
    // passwordCompare
    if (is_Empty(passwordCompare)) {
      setFormData({
        ...formData,
        errors: { passwordCompare: "You haven't retyped your password" },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { passwordCompare: "" } });
    }
    // Test that the passwords match
    if (password !== passwordCompare) {
      setFormData({
        ...formData,
        errors: { password: "Passwords do not match" },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { password: "" } });
    }

    // image errors
    // Set up a default flower image
    let defaultImage =
      "https://images.pexels.com/photos/632363/pexels-photo-632363.jpeg";
    if (is_Empty(image)) {
      console.log(defaultImage);
      setFormData({ ...formData, image: defaultImage });
    } else {
      defaultImage = image;
      console.log(`image: ${defaultImage}`);
    }

    // if we can save the user.
    try {
      if (canSave) {
        setLoading(true)
        addUser({firstName, lastName, email, image, password});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Add a new user</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : "is-valid"}`}
              id="firstName"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={onChange}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : "is-valid"}`}
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={onChange}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : "is-valid"}`}
              id="email"
              placeholder="email@somewhere.com"
              name="email"
              value={email}
              onChange={onChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="image">Image</label>
            <input
              className={`form-control ${errors.image ? "is-invalid" : "is-valid"}`}
              id="image"
              placeholder="image"
              name="image"
              value={image}
              onChange={onChange}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image}</div>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : "is-valid"}`}
              id="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            {/* Error message rendering */}
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="passwordCompare">Re-enter Password</label>
            <input
              type="password"
              className={`form-control ${errors.passwordCompare ? "is-invalid" : "is-valid"}`}
              id="passwordCompare"
              placeholder="passwordCompare"
              name="passwordCompare"
              value={passwordCompare}
              onChange={onChange}
            />
            {/* Error message rendering */}
            {errors.passwordCompare && (
              <div className="invalid-feedback">{errors.passwordCompare}</div>
            )}
          </div>

          <Button type="submit" value="Add User">
            Add User
          </Button>
        </form>
      </div>
    </>
  );
}
export default AddUser;
