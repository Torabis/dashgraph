import "./productlist.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Datatable from "../../components/producttable/Producttable"
import Table from "../../components/producttable/Producttable"
const ProductList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Table/>
      </div>
    </div>
  )
}

export default ProductList