import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import FilterButton from '../../molecules/FilterButton';
import FlexContainer from '../../../layouts/FlexContainer';
import styles from './styles.module.css';

function FilterPagination({ apps, page, form }) {
  page = parseInt(page, 10);
  if (!apps || !apps?.aplications?.length) {
    return null;
  }
  const { limit } = apps;
  const appItems = [];
  const backItem = apps.before.slice(0, -(limit * 2));
  const backItemsFoo = [apps.before.slice(-limit), apps.before.slice(-(limit * 2), -limit)];
  appItems.push(...backItemsFoo);
  appItems.push(apps.aplications);
  appItems.push(apps.after.slice(0, limit));
  appItems.push(apps.after.slice(limit, (limit * 2)));
  const frontItem = apps.after.slice((limit * 2));
  let currentPage = page - backItemsFoo.filter((fo) => fo.length).length;
  const items = [];
  const backItemKey = backItem.length ? backItem[0].pk_id : Math.random();
  items.push(
    <FilterButton disabled={!backItem.length} key={backItemKey} className={styles.filterButton} icon={<FaArrowLeft />} href={`/?p=searchar&category=${form.category.value}&page=${currentPage - 1}`} />,
  );
  items.push(
    ...appItems.map((item) => {
      if (item.length) {
        const selectedPageStyle = currentPage === page ? styles.filterButtonActive : null;
        const href = `/?p=searchar&category=${form.category.value}&page=${currentPage}`;
        currentPage += 1;
        return (
          <FilterButton key={item[0].pk_id} className={`${styles.filterButton} ${selectedPageStyle}`} title={currentPage} href={href} />
        );
      }
      return null;
    }),
  );
  const frontItemKey = frontItem.length ? frontItem[0].pk_id : Math.random();
  items.push(
    <FilterButton disabled={!frontItem.length} key={frontItemKey} className={styles.filterButton} icon={<FaArrowRight />} href={`/?p=searchar&category=${form.category.value}&page=${currentPage}`} />,
  );
  return (
    <FlexContainer>
      {items}
    </FlexContainer>
  );
}

export default FilterPagination;
