import  { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
   
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default Home;
