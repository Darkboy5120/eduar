import { useState } from 'react';

const useSubmit = () => {
  const [loading, setLoading] = useState();
  const [ok, setOk] = useState();
  const [forceError, setForceError] = useState(false);
  return {
    loading, setLoading, ok, setOk, forceError, setForceError,
  };
};

export default useSubmit;
