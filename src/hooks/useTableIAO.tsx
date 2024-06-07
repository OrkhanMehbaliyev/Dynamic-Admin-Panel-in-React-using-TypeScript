import { useEffect, useState } from "react";

interface ITableIAO<T> {
  data: T[];
  fetchData: () => void;
  reqOptions: {
    DB_KEY: string;
    updateEndpoint: string;
    pushEndpoint?: string;
    deleteEndpoint?: string;
  };
}

const useTableIAO = <T,>({ data, fetchData, reqOptions }: ITableIAO<T>) => {
  const [editableData, setEditableData] = useState<T[]>([]);

  useEffect(() => {
    setEditableData(data);
  }, [data]);

  const headings = Object.keys(editableData[0] || {}) as (keyof T)[];

  return {
    editableData,
    headings,
  };
};

export default useTableIAO;
