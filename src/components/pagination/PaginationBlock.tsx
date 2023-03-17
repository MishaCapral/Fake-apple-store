import Pagination from '@mui/material/Pagination';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setPage } from '../../redux/slices/filterSlice';

function PaginationBlock() {
  const { page, caregoryId } = useSelector((state: any) => state.filter);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // * update URL when change category
  useEffect(() => {
    setSearchParams((searchParams) => {
      searchParams.set('page', page);
      return searchParams;
    });
  }, [page, caregoryId, setSearchParams]);

  // * Read query params from URL and update data
  useEffect(() => {
    const queryParams = searchParams.get('page');
    queryParams && dispatch(setPage(+queryParams));
  }, [searchParams, dispatch, page, caregoryId]);

  const handleChange = (_, value) => {
    dispatch(setPage(value));
  };
  return (
    <div>
      <Pagination count={3} page={page} onChange={handleChange} />
    </div>
  );
}

export default PaginationBlock;