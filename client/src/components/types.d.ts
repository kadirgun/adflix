export interface IErrorMessageResponse {
  [key: string]: Array<string> | string
}

export interface IHeaderActionProps {
  links: { link: string; label: string; links?: { link: string; label: string }[] }[];
}

export interface ILinksGroupProps {
  icon: React.FC<any>;
  label: string;
  color: string;
  initiallyOpened?: boolean;
  route: string;
  links?: { label: string; route: string }[];
}

export type Link = {
  id: number;
  key: string;
  name: string;
  favicon: string;
  domain: number;
  type: number;
  target: string;
  password: string;
  earnings: number;
  clicks: number;
  excludes: number[];
  created_at: string;
  updated_at: string;
}

export interface ILinkCardProps {
  value: Link;
}