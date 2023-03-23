import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectFilter, setPage } from '../../redux/slices/filterSlice';

function PaginationBlock() {
  const { page, categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // * update URL when change category
  useEffect(() => {
    setSearchParams((searchParams) => {
      searchParams.set('page', String(page));
      return searchParams;
    });
  }, [page, categoryId, setSearchParams]);

  // * Read query params from URL and update data
  useEffect(() => {
    const queryParams = searchParams.get('page');
    queryParams && dispatch(setPage(+queryParams));
  }, [searchParams, dispatch, page, categoryId]);

  const handleChange = (_, value: number) => {
    dispatch(setPage(value));
  };
  return (
    <div>
      <Pagination count={3} page={page} onChange={handleChange} />
    </div>
  );
}

export default PaginationBlock;
