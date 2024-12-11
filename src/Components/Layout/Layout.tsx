import { ReactNode } from "react";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <Header />
      <main className="container">
        <SearchBar onSearch={handleSearch} />
        {children}
      </main>
    </>
  );
}
