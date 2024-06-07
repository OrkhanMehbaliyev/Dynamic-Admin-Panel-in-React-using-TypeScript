import { useEffect, useState } from "react";
import { HTTP_METHODS, defaultFetchOption } from "../constants/staticVariables";
import axios, { AxiosError, AxiosResponse } from "axios";
import { IFetchOptions, IFetchedData } from "../utils/types";

const useFetch = <T,>(
  url: string,
  method: HTTP_METHODS = HTTP_METHODS.GET,
  reqData?: T[],
  options: IFetchOptions = defaultFetchOption
): {
  data: T | null;
  loading: boolean;
  error: string;
  fetchData: () => void;
} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchData = async (
    fetchUrl?: string,
    fetchMethod?: HTTP_METHODS,
    fetchReqData?: T,
    fetchOptions?: IFetchOptions
  ) => {
    setLoading(true);
    setError("");
    try {
      const finalUrl = fetchUrl || url;
      const finalMethod = fetchMethod || method;
      const finalReqData = fetchReqData || reqData;
      const finalOptions = fetchOptions || options;

      let response: AxiosResponse<IFetchedData<T>>;

      switch (finalMethod) {
        case HTTP_METHODS.GET:
          response = await axios.get(finalUrl);
          setData(response.data.data);
          break;
        case HTTP_METHODS.POST:
          await axios.post(
            finalUrl,
            JSON.stringify(finalReqData),
            finalOptions
          );
          break;
        case HTTP_METHODS.PUT:
          await axios.put(finalUrl, JSON.stringify(finalReqData), finalOptions);
          break;
        case HTTP_METHODS.PUT:
          await axios.patch(
            finalUrl,
            JSON.stringify(finalReqData),
            finalOptions
          );
          break;
        case HTTP_METHODS.DELETE:
          await axios.delete(finalUrl);
          break;
        default:
          throw new Error("Unsupported method ->" + method);
      }

      if (finalMethod !== HTTP_METHODS.GET) {
        response = await axios.get(url);
        setData(response.data.data);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, method]);

  return { data, loading, error, fetchData };
};

export default useFetch;
