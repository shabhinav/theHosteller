import { gql } from "apollo-boost";

export const GET_PROPERTY_LIST = gql`
  query propertyTypeList {
    propertyAndProfessionList {
      propertyType
      professionList
    }
  }
`;
