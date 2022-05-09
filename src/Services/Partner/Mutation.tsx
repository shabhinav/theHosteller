import { gql } from "apollo-boost";

export const POST_PARTNER_DATA = gql`
  mutation createPartner($partnerInput: PartnerInput) {
    createPartner(partnerInput: $partnerInput) {
      partnerId
    }
  }
`;
