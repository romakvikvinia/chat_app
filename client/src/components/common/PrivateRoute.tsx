import React from "react";
import { useGetMeQuery } from "../../api/chat.api";
import { useLocation, useNavigate } from "react-router-dom";

type PrivateRouteProps = {
  children: string | JSX.Element | JSX.Element[] | any;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const { isSuccess, data, isLoading } = useGetMeQuery();

  if (isLoading && !isSuccess) return;
  return data ? children : navigation("/login", { state: { form: location } });
};
