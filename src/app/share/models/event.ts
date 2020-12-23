export interface Event {
  _id: string;
  userId: string;
  createdAt: any;
  updatedAt: any;
  eventDateStart: any;
  eventDateEnd: any;

  title: string;
  description: string;
  imgUrl: any;
  eventLocation: string;
  register: string;

  contactMail: string;
  contactPhone: string;
}
