import "./styles.css";

import React, { useState, useEffect } from "react";

const PAGE_SIZE = 10;

const ProductCard = ({ image, title }) => {
  return (
    <div className="pcard-container">
      <img alt={image} src={image} classname="product-img"></img>
      <span> {title}</span>
    </div>
  );
};

export default function App() {
  // get dummy data and show 10 info per page
  // get all data at once then load it

  const [products, setProducts] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);

  const fetchData = async function () {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;

  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);

  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = currentPage * PAGE_SIZE + PAGE_SIZE;

  return !products.length ? (
    <h1>No Products Found </h1>
  ) : (
    <div className="App">
      <div className="pagination-container">
        {[...Array(noOfPages).keys()].map((n) => (
          <span
            className={"pagination" + (n === currentPage ? "active" : "")}
            key={n}
            onClick={() => setcurrentPage(n)}
          >
            {n}
          </span>
        ))}

        <div className="container">
          {products.slice(startIndex, endIndex).map((item) => (
            <ProductCard image={item.thumbnail} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
