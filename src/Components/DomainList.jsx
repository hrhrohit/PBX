import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchDomains } from '../redux/slice';

const DomainList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { domains, status, error } = useSelector((state) => state.domains);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDomains, setFilteredDomains] = useState({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDomains());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (domains) {
      const filtered = Object.entries(domains).reduce((acc, [key, domain]) => {
        if (domain.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
            domain.description.toLowerCase().includes(searchQuery.toLowerCase())) {
          acc[key] = domain;
        }
        return acc;
      }, {});
      setFilteredDomains(filtered);
    }
  }, [domains, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDomainClick = (domainName) => {
    navigate(`/domains/${domainName}`);
  };

  if (status === 'loading') {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Domains</h1>
        <input
          type="text"
          placeholder="Search domains..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 text-left">Domain</th>
            <th className="py-2 px-4 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(filteredDomains).map(([key, domain]) => (
            <tr 
              key={key} 
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleDomainClick(domain.domain)}
            >
              <td className="py-2 px-4 text-blue-600">{domain.domain}</td>
              <td className="py-2 px-4">{domain.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainList;