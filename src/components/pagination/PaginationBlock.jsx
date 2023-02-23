import Pagination from '@mui/material/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/slices/paginationSlice';

function PaginationBlock() {
  const { page } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(setPage(value));
  };
  return (
    <div>
      <Pagination count={3} page={page} onChange={handleChange} />
    </div>
  );
}

export default PaginationBlock;
