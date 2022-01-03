import { useEffect } from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  decreaseCurrentPage,
  increaseCurrentPage,
  setTotalPage,
} from "../features/pagination.slice";
import { RootState } from "../features/store";
import axiosInstance from "../helper/axiosInstance";
import { fetchProductList } from "../service/fetchProductList";

function ProductPagination() {
  const { totalPage, currentPage } = useSelector(
    (state: RootState) => state.pagination
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (totalPage !== 0) return;
    async function setPages() {
      try {
        const response = await axiosInstance.get("/product/countPage");
        dispatch(setTotalPage(response.data.pages));
      } catch (error) {}
    }
    setPages();
  }, []);
  useEffect(() => {
    dispatch(fetchProductList());
  }, [currentPage, dispatch]);

  const handleDecrease = () => {
    dispatch(decreaseCurrentPage());
  };
  const handleIncrease = () => {
    dispatch(increaseCurrentPage());
  };

  const handlePageChange = (e: any) => {
    dispatch(changePage(parseInt(e.target.innerHTML)));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ButtonToolbar
        aria-label="Toolbar with button groups"
        style={{ display: "block" }}
      >
        <ButtonGroup className="me-2" aria-label="First group">
          <Button onClick={handleDecrease}>Prev</Button>
          <Button onClick={handlePageChange}>
            {currentPage - 1 === 0 ? totalPage : currentPage - 1}
          </Button>
          <Button onClick={handlePageChange}>{currentPage}</Button>
          <Button onClick={handlePageChange}>
            {currentPage + 1 > totalPage ? 1 : currentPage + 1}
          </Button>
          <Button onClick={handleIncrease}>Next</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

export default ProductPagination;
