import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [token]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;