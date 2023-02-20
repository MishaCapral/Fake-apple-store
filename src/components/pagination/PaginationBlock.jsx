import Pagination from '@mui/material/Pagination';

function PaginationBlock({ page, setPage }) {
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div>
      <Pagination count={3} page={page} onChange={handleChange} />
    </div>
  );
}

export default PaginationBlock;
