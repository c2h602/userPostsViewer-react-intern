import { useEffect } from "react";
import { UsersList } from '../Components/UsersList/UsersList';
import { useUsersStore } from "../useUsersStore";

export const MainPage = () => {
  const fetchData = useUsersStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <UsersList/>
    </>
  )
}