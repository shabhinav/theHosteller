import { gql } from "apollo-boost";

export const TRIPS_SEARCH_LIST = gql`
  query getTripList {
    getTripList {
      name
      _id
    }
  }
`;

export const TRIPS_DETAILS = gql`
  query getTrip($id: ID!) {
    getTrip(id: $id) {
      _id
      name
      displayName
      shortDesc
      description
      heroImage {
        url
        key
      }
      aminities {
        name
        icon
      }
      durationDays
      durationNights
      paxGroup
      minAge
      altitude
      level
      services {
        name
        icon
      }
      location {
        region
        timeToVisit
        startPoint
        endPoint
      }
      startPoint {
        name
        price
        _id
      }
      roomBookings {
        checkInDay
        checkOutDay
        roomId
        roomName
        hotelName
        hotelId
      }
      amount
      taxInPercentage
      status
      overview {
        heading
        content
      }
      images {
        url
        key
      }
      videos {
        url
        key
      }

      itinerary {
        heading
        content
        image {
          imageUrl
          position
          metatext
          url
          key
        }
      }
      itineraryDetails {
        url
        key
      }
      otherInfo {
        heading
        icon
        textlist
      }
      cancellationPolicy {
        heading
        textlist
      }
      frequentQuestions {
        question
        answer
      }
      tripMap
      reviews {
        userName
        dateTime
        avatar
        content
      }
      rating
      totalReviews
      reportingManagers
    }
  }
`;
