import { UnstyledButtonProps } from "@mantine/core";

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
  links?: { label: string; link: string }[];
}