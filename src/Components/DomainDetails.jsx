import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchDomainDetails } from '../redux/slice';

const DomainDetails = () => {
  const dispatch = useDispatch();
  const { domainName } = useParams();
  const { domainDetails, status, error } = useSelector((state) => state.domains);

  useEffect(() => {
    dispatch(fetchDomainDetails(domainName));
  }, [dispatch, domainName]);

  if (status === 'loading') {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
  }

  const headers = [
    'enable', 'matchrule', 'match_from', 'dow', 'tod_from', 'tod_to', 'valid_from', 'valid_to',
    'responder', 'parameter', 'to_scheme', 'to_user', 'to_host', 'from_name', 'from_scheme',
    'from_user', 'from_host', 'dialplan', 'domain', 'plan_description', 'dialrule_domain'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Domain Details: {domainName}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header} className="py-2 px-4 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {domainDetails.map((detail, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                {headers.map((header) => (
                  <td key={header} className="py-2 px-4">{detail[header] || '-'}</td>
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
