import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateDialRule } from '../../redux/slice';

const EditRuleForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { rule, domainName } = location.state || {};

  const [formData, setFormData] = useState({
    enable: rule?.enable || 'yes',
    matchrule: rule?.matchrule || '',
    match_from: rule?.match_from || '*',
    responder: rule?.responder || '',
    parameter: rule?.parameter || '',
    to_scheme: rule?.to_scheme || 'sip:',
    to_user: rule?.to_user || '[*]',
    to_host: rule?.to_host || '',
    from_name: rule?.from_name || '[*]',
    from_scheme: rule?.from_scheme || 'sip:',
    from_user: rule?.from_user || '[*]',
    from_host: rule?.from_host || '',
    plan_description: rule?.plan_description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      ...formData,
      dialplan: domainName,
      domain: domainName,
      matchrule: rule.matchrule // Ensure matchrule is included and unchanged
    };
    try {
      await dispatch(updateDialRule(updateData)).unwrap();
      // Navigate back to the domain details page after successful update
      navigate('/domains/domainDetails', { state: { domainName } });
    } catch (error) {
      console.error('Error updating dial rule:', error);
      alert('Failed to update dial rule. Please try again.');
    }
  };

  const dropdownOptions = {
    enable: ['yes', 'no'],
    responder: [
      'To Device',
      'To Device Add Header',
      'To Device w/ VMail',
      'To Device w/ VMail - Add Header',
      'To Device w/VMail Residential',
      'To DevResi w/ VM - Add Header',
      'To Owned Device',
      'To Owned Device Add Header',
      'To User',
      'To User Add Header',
      'To Domain',
      'To User One Shot',
      'To User Residential',
      'To User Residential Add Header',
      'To User w/Privacy',
      'Own Account',
      'Set-Forward',
      'Set-Forward-Busy',
      'To Connection w/ Privacy',
      'Call Return',
      'To V-Mail',
      'Tapping',
      'Call Pickup'
    ],
    to_scheme: ['sip:', '[*]', ''],
    to_host: ['', '', ''],
    from_host: ['', '', '']
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Dial Rule for {domainName}</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
            </label>
            {dropdownOptions[key] ? (
              <select
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {dropdownOptions[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => navigate('/domains/domainDetails', { state: { domainName } })}
            className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRuleForm;