import { IconType } from "react-icons";
import { HTTP_METHODS } from "../constants/staticVariables";

export interface IFetchOptions {
  headers?: Record<string, string>;
}

export interface IFetchedData<T> {
  data: T;
  success: boolean;
  message: string;
}

export interface IUseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string;
  fetchData: (
    url: string,
    method?: HTTP_METHODS,
    reqData?: T,
    options?: IFetchOptions
  ) => void;
}

export interface ISidebarItem {
  icon: IconType;
  path: string;
  isOpen: boolean;
  text: string;
}

export interface ISidebarHeader {
  children: React.ReactNode;
  isOpen: boolean;
}

export interface ITableProps<T extends object, D extends object> {
  data: T[];
  dependent: D | null;
  fetchData: (
    url: string,
    method?: HTTP_METHODS,
    reqData?: T,
    options?: IFetchOptions
  ) => void;
  reqOptions: {
    DB_KEY: string;
    updateEndpoint: string;
    pushEndpoint?: string;
    deleteEndpoint?: string;
  };
}

export interface IHomeData {
  welcomeMessage: string;
  abilities: string[];
  socialAccounts: ISocialAccount[];
}

export interface ISocialAccount {
  platform: string;
  icon: string;
  url: string;
}

export interface IPortfolioWork {
  type: string;
  img: string;
  heading: string;
}

export interface IPortfioStatistics {
  type: string;
  count: number;
}

export interface IPortfolioData {
  works: IPortfolioWork[];
  statistics: IPortfioStatistics[];
}

export interface IService {
  id: string;
  title: string;
  icon: string;
  description: string;
  readMoreData: {
    heading: string;
    img: string;
    description: string;
    website: string;
    servicesIncluded: string;
  };
}

export type IServicesData = IService[];
