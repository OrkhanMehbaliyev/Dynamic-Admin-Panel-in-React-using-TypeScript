import { useEffect, useRef, useState } from "react";
import { ITableProps } from "../utils/types";
import {
  ALLOWED_TAGS_DYNAMIC_TABLE,
  HTTP_METHODS,
  defaultFetchOption,
} from "../constants/staticVariables";

const useTableDAO = <T extends object, D extends object>({
  data,
  dependent,
  fetchData,
  reqOptions,
}: ITableProps<T, D>) => {
  const [isEdit, setIsEdited] = useState<boolean>(false);
  const [editableData, setEditableData] = useState<T[]>([]);
  const tblRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tblRef.current)
      tblRef.current.addEventListener("click", handleClickInside);
    document.addEventListener("click", handleOutsideClick);

    setEditableData(data);
    return () => {
      if (tblRef.current)
        tblRef.current.removeEventListener("click", handleClickInside);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [data]);

  const handleEdit = (index: number, field: string, value: string | number) => {
    setEditableData(
      editableData.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async () => {
    await fetchData(
      reqOptions.updateEndpoint,
      HTTP_METHODS.PUT,
      {
        ...dependent,
        [reqOptions.DB_KEY]: editableData,
      } as T,
      defaultFetchOption
    );
  };

  const handleAdd = () => {
    const newRow: T = {} as T;
    Object.keys(data[0] || {}).forEach((key) => {
      newRow[key as keyof T] = "" as any;
    });
    setEditableData([...editableData, newRow]);
    setTimeout(() => {
      setIsEdited(true);
    }, 0);
  };

  const handleDelete = (idx: number | string) => {
    setEditableData(editableData.filter((_, i) => i != idx));
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!ALLOWED_TAGS_DYNAMIC_TABLE.includes(target.tagName)) {
      setIsEdited(false);
    }
  };

  const handleClickInside = () => {
    setIsEdited(true);
  };

  const headings = Object.keys(editableData[0] || {}) as (keyof T)[];

  return {
    tblRef,
    isEdit,
    editableData,
    headings,
    handleEdit,
    handleSubmit,
    handleAdd,
    handleDelete,
  };
};

export default useTableDAO;
