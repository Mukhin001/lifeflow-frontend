"use client";

import { useGetGreetingServerQuery } from "@/src/api/baseApi";

export default function Home() {
  const { data, isLoading, error } = useGetGreetingServerQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <main>
      <h1>main Page</h1>
      <div>
        <p>status: {data?.status}</p>
        <p>message: {data?.message}</p>
        <p>time: {data?.time}</p>
      </div>
    </main>
  );
}
