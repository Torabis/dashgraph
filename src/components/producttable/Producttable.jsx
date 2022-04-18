import "./producttable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductColumns } from "../../datatablesource";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { ALL_PRODUCTS } from "../../utils/queries";

const Producttable = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const { data, loading, error } = useQuery(ALL_PRODUCTS);
  if (loading) {
    return <h3> DATA IS LOADING...</h3>;
  }

  if (error) return `Error! ${error.message}`;

  const detailsRows = data.products.map((item) => {
    return {
      id: item.id,
      productName: item.productName,
      productCategory: item.productCategory,
      price: item.price,
      inStock: item.inStock,
    };
  });

  const handleDelete = async (id) => {
    try {
      
      setDataProduct(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={detailsRows}
        columns={ProductColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Producttable;
