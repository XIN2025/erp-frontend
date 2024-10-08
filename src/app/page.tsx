"use client";
import { apiClient } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ApiResponse {
  status: string;
}

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await apiClient.get<ApiResponse>("/isWorking");
        console.log("rsponse", response);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching Data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>...laoding</p>;
  if (error) return <p>...errrorrr</p>;

  return (
    <div>
      <h1>Data form back</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
