import { useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

export const useFetch = <T,>(url: string): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller; // extraemos `signal` del controller

    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal }); // pasamos `signal` aquí

        if (!response.ok) {
          throw new Error("Error en la petición");
        }

        const jsonData: T = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          // verificamos que el error no sea debido a la cancelación
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // cancela la petición cuando el componente se desmonta
    };
  }, [url]);

  return { data, loading, error };
};
