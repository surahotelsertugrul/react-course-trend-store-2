// import products from "../../productData";
import { useCallback, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import "./Products.css";
import FormInputs from "../Form/FormInputs";
import useHttp from "../../hooks/use-http";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { isLoading, error, sendRequest: fetchProducts } = useHttp();

  const productList = products
    .map((product) => <ProductItem key={product.id} product={product} />)
    .reverse();

  const transformProducts = (productArr) => {
    const newProducts = productArr.map((item) => {
      return {
        id: item._id,
        name: item.title,
        ...item,
      };
    });
    setProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts(
      {
        url: "https://my-pos-application-api.onrender.com/api/products/get-all",
      },
      transformProducts
    );
  }, [fetchProducts]);

  let content = <p>Found no products!</p>;

  if (products.length > 0) {
    content = productList;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  const fetchProductsHandler = () => {
    fetchProducts(
      {
        url: "https://my-pos-application-api.onrender.com/api/products/get-all",
      },
      transformProducts
    );
  };

  const productAddHandler = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { name: newProduct.title, img: newProduct.image, ...newProduct },
    ]);
  };

  return (
    <main className="products-wrapper">
      <FormInputs
        fetchProductsHandler={fetchProducts}
        onAddProduct={productAddHandler}
      />
      <ul className="products">{content}</ul>
      <button className="button" onClick={fetchProductsHandler}>
        Fetch Products
      </button>
    </main>
  );
};

export default Products;
