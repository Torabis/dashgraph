import { gql } from "@apollo/client";

export const ALL_PRODUCTS = gql`
  query allProducts {
    products {
      id
      productName
      productCategory
      description
      image
      price
      inStock
    }
  }
`;
