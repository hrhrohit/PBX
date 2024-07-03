import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createDialRule } from '../../redux/slice';

const AddRuleForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const domainName = location.state?.domainName;
  const dispatch = useDispatch();
  // const { domainName } = useParams();

  const initialFormState = {
    enable: 'yes',
    matchrule: '',
    match_from: '*',
    dow: '*',
    tod_from: '*',
    tod_to: '*',
    valid_from: '*',
    valid_to: '*',
    responder: '',
    parameter: '',
    to_scheme: 'sip:',
    to_user: '[*]',
    to_host: '<OwnDomain>',
    from_name: '[*]',
    from_scheme: 'sip:',
    from_user: '[*]',
    from_host: '<OwnDomain>',
    plan_description: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      dialplan: domainName,
      domain: domainName,
      dialrule_domain: ''
    };
  
    try {
      await dispatch(createDialRule(postData)).unwrap();
      navigate('/domains/domainDetails', { state: { domainName } });
    } catch (error) {
      console.error('Error creating dial rule:', error);
      alert('Failed to create dial rule. Please try again.');
    }
  };

  const dropdownOptions = {
    enable: ['yes', 'no'],
    dow: ['*', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    responder: [
      'To Device', 'To Device Add Header', 'To Device w/ VMail', 'To Device w/ VMail - Add Header',
      'To Device w/VMail Residential', 'To DevResi w/ VM - Add Header', 'To Owned Device',
      'To Owned Device Add Header', 'To User', 'To User Add Header', 'To Domain', 'To User One Shot',
      'To User Residential', 'To User Residential Add Header', 'To User w/Privacy', 'Own Account',
      'Set-Forward', 'Set-Forward-Busy', 'To Connection w/ Privacy', 'Call Return', 'To V-Mail',
      'Tapping', 'Call Pickup'
    ],
    to_scheme: ['sip:', '[*]', ''],
    to_host: ['<OwnDomain>', '<OwnUser>', '<OwnName>'],
    from_host: ['<OwnDomain>', '<OwnUser>', '<OwnName>']
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Add New Dial Rule for {domainName}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="enable" className="block text-sm font-medium text-gray-700 mb-1">Enable:</label>
              <select
                id="enable"
                name="enable"
                value={formData.enable}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {dropdownOptions.enable.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="matchrule" className="block text-sm font-medium text-gray-700 mb-1">Destination (match_rule):</label>
              <input
                type="text"
                id="matchrule"
                name="matchrule"
                value={formData.matchrule}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="match_from" className="block text-sm font-medium text-gray-700 mb-1">Source (match_from):</label>
              <input
                type="text"
                id="match_from"
                name="match_from"
                value={formData.match_from}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="dow" className="block text-sm font-medium text-gray-700 mb-1">Days of Week:</label>
              <select
                id="dow"
                name="dow"
                value={formData.dow}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {dropdownOptions.dow.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tod_from" className="block text-sm font-medium text-gray-700 mb-1">Time of Day From:</label>
              <input
                type="time"
                id="tod_from"
                name="tod_from"
                value={formData.tod_from}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="tod_to" className="block text-sm font-medium text-gray-700 mb-1">Time of Day To:</label>
              <input
                type="time"
                id="tod_to"
                name="tod_to"
                value={formData.tod_to}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="valid_from" className="block text-sm font-medium text-gray-700 mb-1">Valid From:</label>
              <input
                type="date"
                id="valid_from"
                name="valid_from"
                value={formData.valid_from}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="valid_to" className="block text-sm font-medium text-gray-700 mb-1">Valid To:</label>
              <input
                type="date"
                id="valid_to"
                name="valid_to"
                value={formData.valid_to}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="responder" className="block text-sm font-medium text-gray-700 mb-1">Application (responder):</label>
              <select
                id="responder"
                name="responder"
                value={formData.responder}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select Application</option>
                {dropdownOptions.responder.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="parameter" className="block text-sm font-medium text-gray-700 mb-1">Application Parameter:</label>
              <input
                type="text"
                id="parameter"
                name="parameter"
                value={formData.parameter}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="to_scheme" className="block text-sm font-medium text-gray-700 mb-1">Destination Scheme Translation:</label>
              <select
                id="to_scheme"
                name="to_scheme"
                value={formData.to_scheme}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {dropdownOptions.to_scheme.map(option => (
                  <option key={option} value={option}>{option || 'null'}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="to_user" className="block text-sm font-medium text-gray-700 mb-1">Destination User Translation:</label>
              <input
                type="text"
                id="to_user"
                name="to_user"
                value={formData.to_user}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="to_host" className="block text-sm font-medium text-gray-700 mb-1">Destination Host Translation:</label>
              <select
                id="to_host"
                name="to_host"
                value={formData.to_host}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {dropdownOptions.to_host.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="from_name" className="block text-sm font-medium text-gray-700 mb-1">Source Name Translation:</label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="from_user" className="block text-sm font-medium text-gray-700 mb-1">Source User Translation:</label>
              <input
                type="text"
                id="from_user"
                name="from_user"
                value={formData.from_user}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="from_host" className="block text-sm font-medium text-gray-700 mb-1">Source Host Translation:</label>
              <select
                id="from_host"
                name="from_host"
                value={formData.from_host}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                {dropdownOptions.from_host.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="plan_description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
            <textarea
              id="plan_description"
              name="plan_description"
              value={formData.plan_description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/domains/${domainName}`)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRuleForm;
