export interface IErrorMessageResponse {
  [key: string]: Array<string> | string
}


export interface IHeaderActionProps {
  links: { link: string; label: string; links?: { link: string; label: string }[] }[];
}