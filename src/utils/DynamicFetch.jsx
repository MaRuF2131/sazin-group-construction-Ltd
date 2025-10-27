import { useInfiniteQuery } from '@tanstack/react-query';
import axiosInstance from "./axios";
function DynamicFetch(path, ky = "", value = "",isFeature='') {

 const fetch = async (pageParam = 1) => {
  if(!path) return
  const limit = 5;
  // query params build
  const params = new URLSearchParams({
    page: pageParam,
    limit,
  });

 if (value && ky) {
    params.append(ky, value);
  }
  if(isFeature){
    params.append("isFeature",true);
  }

  // API call (axios auto json parse kore)
  const res = await axiosInstance.get(
    `/${path}?${params.toString()}`
  );

  const json = res.data; // ✅ ekhane data ashbe
  console.log("res",json.data);
  
  if (!json.success) {
    throw new Error(json.message || "Failed to fetch products");
  }

  return {
    data: json.data,
    nextPage:
      json.pagination.page < json.pagination.totalPages
        ? pageParam + 1
        : undefined,
  };
};


 const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ["user",path,ky,value,isFeature],
    queryFn: ({ pageParam = 1 }) => fetch(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
     // 🔹 Performance Tunings
    staleTime: 1000 * 60 * 5, // 5 minutes → reduce refetching
    cacheTime: 1000 * 60 * 30, // 30 minutes cache in memory
    refetchOnWindowFocus: false, // don’t refetch unnecessarily
    refetchOnReconnect: false, // no refetch if net reconnects
    retry: 1, // retry only once if fails
  });

  return (
     {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }
  )
}

export default DynamicFetch