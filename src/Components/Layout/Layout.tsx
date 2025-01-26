import { ReactNode } from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import { useUsersStore } from "../../useUsersStore";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const handleSearch = useUsersStore((state) => state.handleSearch);
  
  return (
    <>
      <Header />
      <main className="container">
        <SearchBar onSearch={handleSearch} />
        {children}
      </main>
    </>
  );
};
