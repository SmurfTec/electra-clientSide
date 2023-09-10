export type Notification = {
  id: number;
  created_on: string;
  updated_on: string;
  message: string;
  is_active: boolean;
  resource_name: string;
  resource_id: number;
  from_user_id: number;
  from_user_name: string;
  type: string;
};


export type NotificationResponse = {
    
}