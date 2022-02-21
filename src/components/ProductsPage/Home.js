import Axios from "axios";
import { useState, useEffect } from "react";
import Product from "./Product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./Home.module.css";
import Footer from "../Footer";
import { Link } from "react-router-dom";
const Home = (props) => {
  const [products, setProducts] = useState();
  var checkboxes = [];
  // const [checkboxes, setCheckboxes] = useState();
  const [change, setChange] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      const getProducts = await Axios.get(
        "http://localhost/phpApi/getProducts"
      );
      setProducts(getProducts.data);
      if(getProducts.data)
         checkboxes = new Array(getProducts.data.length).fill(false);
    };

    fetchProducts();
    setChange();
  }, [change]);
  const changeCheckboxes = (index) => {
    checkboxes[index] = !checkboxes[index];
  };
  const selectItems = async () => {
    var arr = [];
    for (var i in checkboxes) {
      if (checkboxes[i]) {
        arr.push(products[i].sku);
      }
    }
    for (var j in arr) {
      Axios.get(
        `http://localhost/phpApi/deleteProduct?id=${arr[j]}`
      );
    }
    if(arr)
    {
      setChange(1);
    }
  };

  return (
    <div>
      <div className={styles.title}>
        <h1>Product list</h1>
        <div className={styles.buttons}>
          <Link to="add-product">
            <button>ADD</button>
          </Link>
          <button onClick={selectItems} className="">
            MASS DELETE
          </button>
        </div>
      </div>
      <hr />
      <Container className={styles.products}>
        <Row>
          {products &&
            products.map((product, index) => (
              <Col className={styles.product} xs="3" key={product.sku}>
                <Product
                  product={product}
                  index={index}
                  checkboxHandler={changeCheckboxes}
                />
              </Col>
            ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
