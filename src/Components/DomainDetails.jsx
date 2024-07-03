import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchDomainDetails } from '../redux/slice';
import { CSVLink } from "react-csv";
import debounce from 'lodash/debounce';

const DomainDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const domainName = location.state?.domainName;
  const { domainDetails, status, error } = useSelector((state) => state.domains);
  const [searchField, setSearchField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDetails, setFilteredDetails] = useState([]);

  useEffect(() => {
    if (domainName) {
      dispatch(fetchDomainDetails(domainName));
    }
  }, [dispatch, domainName]);

  const headers = [
    { key: 'enable', label: 'Enable' },
    { key: 'matchrule', label: 'Destination\n(match_rule)' },
    { key: 'match_from', label: 'Source\n(match_from)' },
    { key: 'dow', label: 'DOW' },
    { key: 'tod_from', label: 'TOD From' },
    { key: 'tod_to', label: 'TOD To' },
    { key: 'valid_from', label: 'Valid From' },
    { key: 'valid_to', label: 'Valid To' },
    { key: 'responder', label: 'Application\n(responder)' },
    { key: 'parameter', label: 'Application\nParameter' },
    { key: 'to_scheme', label: 'Destination Scheme\nTranslation\n(to_scheme)' },
    { key: 'to_user', label: 'Destination User\nTranslation\n(to_user)' },
    { key: 'to_host', label: 'Destination Host\nTranslation\n(to_host)' },
    { key: 'from_name', label: 'Source Name\nTranslation\n(from_name)' },
    { key: 'from_scheme', label: 'From Scheme' },
    { key: 'from_user', label: 'Source User\nTranslation\n(from_user)' },
    { key: 'from_host', label: 'Source Host\nTranslation\n(from_host)' },
    { key: 'dialplan', label: 'Dialplan' },
    { key: 'domain', label: 'Domain' },
    { key: 'plan_description', label: 'Description' },
    { key: 'dialrule_domain', label: 'Dialrule Domain' }
  ];

  const filterResults = useCallback(
    debounce((field, query) => {
      if (domainDetails && (field || query)) {
        const filtered = domainDetails.filter(detail => 
          !field || String(detail[field]).toLowerCase().includes(query.toLowerCase())
        );
        setFilteredDetails(filtered);
      } else {
        setFilteredDetails(domainDetails || []);
      }
    }, 300),
    [domainDetails]
  );

  useEffect(() => {
    filterResults(searchField, searchQuery);
  }, [searchField, searchQuery, filterResults]);

  const handleEditRule = (rule) => {
    navigate('/domains/editrule', { state: { rule, domainName } });
  };

  const handleAddRule = () => {
    navigate('/domains/add-rule', { state: { domainName } });
  };

  if (!domainName) {
    return <div className="text-center mt-8 text-red-600">Error: Domain name not provided</div>;
  }

  if (status === 'loading') {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Domain Details: {domainName}</h1>
        <div className="flex mb-4 justify-between">
          <div className="flex">
            <select 
              className="mr-2 p-2 border rounded"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            >
              <option value="">Select field</option>
              {headers.map(header => (
                <option key={header.key} value={header.key}>{header.label.replace(/\n/g, ' ')}</option>
              ))}
            </select>
            <input 
              type="text" 
              className="mr-2 p-2 border rounded flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
            />
          </div>
          <button 
            onClick={handleAddRule}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add Rule
          </button>
        </div>
        <CSVLink 
          data={filteredDetails} 
          headers={headers}
          filename={`${domainName || 'domain'}_details.csv`}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Download CSV
        </CSVLink>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header.key} className="py-2 px-4 text-left">
                  {header.label.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < header.label.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((detail, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => handleEditRule(detail)}>
                {headers.map((header) => (
                  <td key={header.key} className="py-2 px-4">{detail[header.key] || '-'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DomainDetails;