import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.css';
import Input from '../../atoms/Input';
import FlexContainer from '../../../layouts/FlexContainer';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import ResultItem from '../../atoms/ResultItem';
import request from '../../../assets/controllers/request';
import CustomText from '../../atoms/CustomText';

let throttle = null;
const searchDelay = 1000;

const getResults = (value, setResults, setLoading) => {
  request.post('global_search_ar', {
    value,
  }).then((res) => {
    setLoading(false);
    setResults(res?.data?.data);
  });
};

function LoadResults({ results }) {
  return (
    results.length > 0
      ? results?.map((item) => <ResultItem key={item.pk_id} data={item} />)
      : <CustomText text="No se encontraron resultados" />
  );
}

const onInputKeyUp = (setResults, setLoading) => (event) => {
  const { value } = event.target;
  if (value.length > 0) {
    setLoading(true);
    clearTimeout(throttle);
    throttle = setTimeout(() => {
      getResults(value, setResults, setLoading);
    }, searchDelay);
  }
};

function InputSearch() {
  const leftIcon = <FaSearch className={styles.inputIcon} />;
  const input = useRef();
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.current) {
      input.current.onkeyup = onInputKeyUp(setResults, setLoading);
    }
  }, [input.current]);

  return (
    <FlexContainer column className={styles.container}>
      <Input reference={input} type="search" leftIcon={leftIcon} />
      <FlexContainer className={styles.resultsContainer} column>
        {!loading && results
          ? <LoadResults results={results} />
          : <LoadingSpinner size="medium" />}
      </FlexContainer>
    </FlexContainer>
  );
}

export default InputSearch;
