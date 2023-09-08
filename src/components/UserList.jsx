import React, { useState, useEffect } from 'react';
import userData from './users.json';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [ageRangeFilter, setAgeRangeFilter] = useState({ min: '', max: '' });
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    setUsers(userData.users);
    setFilteredUsers(userData.users);
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => {
      const age = parseInt(user.age);
      const location = user.location ? user.location.toLowerCase() : '';

      const ageInRange =
        (!ageRangeFilter.min || age >= parseInt(ageRangeFilter.min)) &&
        (!ageRangeFilter.max || age <= parseInt(ageRangeFilter.max));

      const locationMatch =
        !locationFilter || location.includes(locationFilter.toLowerCase());

      return ageInRange && locationMatch;
    });

    setFilteredUsers(filtered);
  }, [users, ageRangeFilter, locationFilter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">User Profiles</h1>

      {/* Filter by Age Range */}
      <div className="mb-4">
        <label className="block text-gray-600">Age Range:</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="border rounded px-2 py-1"
            value={ageRangeFilter.min}
            onChange={(e) =>
              setAgeRangeFilter({ ...ageRangeFilter, min: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="border rounded px-2 py-1"
            value={ageRangeFilter.max}
            onChange={(e) =>
              setAgeRangeFilter({ ...ageRangeFilter, max: e.target.value })
            }
          />
        </div>
      </div>

      {/* Filter by Location */}
      <div className="mb-4">
        <label className="block text-gray-600">Location:</label>
        <input
          type="text"
          placeholder="Location"
          className="border rounded w-full px-2 py-1"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      <ul>
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="border rounded p-4 my-2 flex items-center hover:bg-gray-100 transition duration-300"
          >
            <img
              src={user.profile}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">Location: {user.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
