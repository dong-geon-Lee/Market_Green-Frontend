import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteProduct } from "../redux-toolkit/productSlice";

export const Container = styled.div`
  /* display: flex; */
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Right = styled.div``;

export const ImgBox = styled.div`
  display: flex;

  & img {
    display: block;
    width: 100%;
    height: 20rem;
  }
`;

export const InfoBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  justify-items: start;
  align-items: center;
  row-gap: 1rem;
  padding: 1.6rem 0;

  & h1 {
    grid-row: 1 / 2;
    grid-column: 1 / 4;
    color: darkblue;
    margin: 0;
    padding: 0.6rem 1.6rem;
    justify-self: start;
  }

  & h3 {
    grid-column: 1 / 5;
    grid-row: 2 / 3;
    width: 100%;
    color: green;
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
  }

  & p {
    font-size: 1.8rem;
    font-weight: 900;
    grid-column: 3 / 5;
    grid-row: 1 / 2;
    color: black;
    justify-self: center;
  }

  & h2 {
    grid-column: 4 / 6;
    grid-row: 1 / 2;
    font-size: 1.8rem;
    color: red;
    margin: 0;
  }

  & h4 {
    grid-column: 4 / 6;
    grid-row: 3 / 4;
    font-size: 1.4rem;
    color: yellowgreen;
    margin: 0;
    padding: 0;
  }

  & h2 {
    grid-column: 4 / 6;
    grid-row: 3 / 4;
  }

  & button {
    border: none;
    color: red;
    padding: 0.8rem 0rem;
    background-color: #fff;
    display: flex;
    border-radius: 6px;
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    font-size: 1.4rem;
    cursor: pointer;
    letter-spacing: 0.5px;
    font-weight: 500;
    cursor: pointer;
    justify-self: center;

    & + button {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
      color: green;
      justify-items: center;
    }

    & + button + a {
      grid-row: 2 / 3;
      grid-column: 4 / 5;
      color: black;
      text-decoration: none;
      font-size: 1.4rem;
      font-weight: 600;
      justify-items: center;
    }
  }
`;

const ProductItems = ({
  _id,
  title,
  desc,
  price,
  img,
  inStock,
  categories,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <Left>
        <ImgBox>
          <img src={`http://localhost:5000/${img}`} alt="img" />
        </ImgBox>

        <InfoBox>
          <h1>제품명: {title}</h1>
          <p>가격: {price}원</p>
          {/* <h2>재고: {inStock}개</h2> */}
          <button onClick={() => dispatch(deleteProduct({ id: _id }))}>
            삭제
          </button>
          <button
            onClick={() =>
              navigate("/productEdit", {
                state: {
                  id: _id,
                  title,
                  desc,
                  price,
                  inStock,
                  img,
                  categories,
                },
              })
            }
          >
            수정
          </button>
          <Link to={`/product/${_id}`}>자세히</Link>
        </InfoBox>
      </Left>
    </Container>
  );
};

export default ProductItems;
