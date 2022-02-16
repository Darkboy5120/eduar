import { useState } from 'react';

const useSubmit = () => {
  const [loading, setLoading] = useState();
  const [ok, setOk] = useState();
  return {
    loading, setLoading, ok, setOk,
  };
};

export default useSubmit;
