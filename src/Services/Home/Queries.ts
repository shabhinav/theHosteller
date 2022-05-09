import { gql } from "apollo-boost";

export const GET_HOME_PAGE_BANNER = gql`
  query homeBanner {
    homeBanner {
      images
    }
  }
`;

export const GET_HOSTEL_DATA = gql`
  query getHostelList {
    getHostelList {
      name
      _id
    }
  }
`;

export const GET_HOSTEL_DETAILS = gql`
  query hostelDetails($hostelId: ID!) {
    getHostel(hostelId: $hostelId) {
      hostelDetail
    }
  }
`;

export const IS_AUTH = gql`
  query isAuth {
    isAuth
  }
`;

export const GET_COUPON_LIST = gql`
  query getCouponList($searchType: searchType!) {
    getCouponList(searchType: $searchType) {
      couponStatus
      coupons
    }
  }
`;


export const GET_ALL_RECOMMENDATIONS = gql`
  query getAllRecommendations($filter: filter) {
    getAllRecommendations(filter: $filter) {
      data {
        _id
        name
        shortDesc
        image {
          url
          key
        }
        ancilaries {
          name
          icon
        }
        duration
        paxNumber
        price
        type
        hostelId
      }
      page
      limit
      count
    }
  }
`;

export const GET_RECOMMENDATIONS_BY_TYPE = gql`
  query getRecommendationByType($type: String) {
    getRecommendationByType(type: $type) {
      _id
      name
      shortDesc
      image {
        url
        key
      }
      ancilaries {
        name
        icon
      }
      duration
      paxNumber
      price
      type
      hostelId
    }
  }
`;

export const GET_RECOMMENDATIONS_BY_PRODUCT_TYPE = gql`
  query getRecommendationByProductType($productType: productTypeEnum) {
    getRecommendationByProductType(productType: $productType) {
      _id
      name
      shortDesc
      image {
        url
        key
      }
      ancilaries {
        name
        icon
      }
      duration
      paxNumber
      price
      type
      hostelId
      tripId
    }
  }
`;

export const GET_LANDING_PAGE_IMAGES = gql`
  query getLandingPageDetails($slug: SlugEnum!) {
    getLandingPageDetails(slug: $slug) {
      heroImage {
        url
        key
      }
    }
  }
`;

export const GET_SIMILAR_DATA = gql`
  query getSimilarProductByProductType($productType: productTypeEnum) {
    getSimilarProductByProductType(productType: $productType) {
      name
      shortDesc
      heroImage
      price
      id
    }
  }
`;

