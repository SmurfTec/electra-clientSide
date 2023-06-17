export type User = {
  id: string;
  email: string;
  is_active: boolean;
  has_logged_in: boolean;
  created_by?: null;
  created_at: string;
  updated_by?: null;
  updated_at: string;
  last_login: string;
  hach_refresh_token: string;
  is_banned: boolean;
  code_2fa?: null;
  permissions?: null[] | null;
  roles?: null[] | null;
};
