export interface Invitation {
  id: number;
  name: string;
  invitation_date: Date;
  expiration_date: Date;
  user_id: number;
}

export interface Invitations {
  [key: number]: Invitation;
}
