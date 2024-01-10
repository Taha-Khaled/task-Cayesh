import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { usersData } from "./mocks/usersData";
import { itemsData } from "./mocks/itemsData";

const handelLogin = async (body: { username: string; password: string }) => {
  const { username, password } = body;
  if (
    usersData.data.find((item) => item.username === username)?.password ===
    password
  )
    return { data: { message: "successfully login" } };
  throw new Error("wrong username or password!");
};
const handelGetItems = async () => {
  return { data: itemsData };
};

export const awardsApis = createApi({
  reducerPath: "awardsApis",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      queryFn: handelLogin,
    }),
    getItems: builder.query({
      queryFn: handelGetItems,
    }),
  }),
});

export const { useLoginUserMutation, useGetItemsQuery } = awardsApis;
