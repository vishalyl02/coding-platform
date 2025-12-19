import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Please login</p>;

  return (
    <div>
      <h2>Student Profile</h2>
      <p><b>Username:</b> {user.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
