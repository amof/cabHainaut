export interface Event {
  _id: string;
  user_id: string;
  createdAt: any;
  updatedAt: any;
  event_date_start: string;
  event_date_end: string;

  title: string;
  description: string;
  img: any;
  event_location: string;
  register: string;

  contact_mail: string;
  contact_phone: string;
}
