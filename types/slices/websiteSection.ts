export type WebsiteSectionImage = {
  id: number;
  url: string;
  filename: string;
  mime_type: string;
  size: number;
};

export type Section = {
  section: string;
  images: WebsiteSectionImage[];
};

export type WebsiteSection = {
  id?: number;
  created_on?: string;
  updated_on?: string;
  name?: string;
  sections?: Section[];
};
