import Header from "../component/Header";
import ProductsPage from "../component/ProductsPage";
import IndexHame from "../component/IndexHame";  // ✅ Capitalized name

function Home() {
  return (
    <>
      <Header />
      <ProductsPage />
      <IndexHame />
    </>
  );
}

export default Home;
