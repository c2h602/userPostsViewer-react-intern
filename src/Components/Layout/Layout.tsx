import { ReactElement } from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import { useUsers } from "../../context/useUsers";

interface LayoutProps {
  children: ReactElement;
}

export const Layout = ({ children }: LayoutProps) => {
  const { handleSearch } = useUsers();
  
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
