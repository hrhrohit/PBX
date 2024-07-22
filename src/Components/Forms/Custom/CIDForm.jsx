import React, { useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createDialRule } from '../../../redux/slice';
import { useForm } from 'react-hook-form';

const CIDForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const domainName = location.state?.domainName;
  const dispatch = useDispatch();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      matchrule: '',
      from_user: '',
    }
  });

  const matchrule = watch('matchrule');

  const generatePostData = useCallback((formData, isSecondRule = false) => {
    const matchruleBase = `sip:[*]${formData.matchrule}`;
    const matchrule = `${matchruleBase}${isSecondRule ? '1' : ''}[2-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]@*`;
    const mark = '!'.repeat(formData.matchrule.length);
    const to_user = `[${mark}${isSecondRule ? '!' : ''}*]`;

    return {
      enable: 'yes',
      matchrule,
      match_from: '*',
      dow: '*',
      tod_from: '*',
      tod_to: '*',
      valid_from: '*',
      valid_to: '*',
      responder: 'sip:start@to-connection',
      parameter: '',
      to_scheme: 'sip:',
      to_user,
      to_host: '<OwnDomain>',
      from_name: '[*]',
      from_scheme: 'sip:',
      from_user: formData.from_user,
      from_host: '<OwnDomain>',
      dialplan: domainName,
      domain: domainName,
      plan_description: '',
      dialrule_domain: ''
    };
  }, [domainName]);

  const onSubmit = useCallback(async (formData) => {
    try {
      const postData1 = generatePostData(formData);
      const postData2 = generatePostData(formData, true);

      console.log("First rule:", postData1);
      console.log("Second rule:", postData2);

      await Promise.all([
        dispatch(createDialRule(postData1)).unwrap(),
        dispatch(createDialRule(postData2)).unwrap()
      ]);

      navigate('/domains/domainDetails', { state: { domainName } });
    } catch (error) {
      console.error('Error creating CID campaign rule:', error);
      alert('Failed to create CID campaign rule. Please try again.');
    }
  }, [dispatch, generatePostData, navigate, domainName]);

  const cancelHandler = useCallback(() => {
    navigate('/domains/domainDetails', { state: { domainName } });
  }, [navigate, domainName]);

  const formTitle = useMemo(() => `Add CID Campaign Rule for ${domainName}`, [domainName]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{formTitle}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="matchrule" className="block text-sm font-medium text-gray-700">Destination (match_rule):</label>
          <input
            {...register('matchrule', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="from_user" className="block text-sm font-medium text-gray-700">Source User Translation (from_user):</label>
          <input
            {...register('from_user', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={cancelHandler}
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
  );
};

export default CIDForm;