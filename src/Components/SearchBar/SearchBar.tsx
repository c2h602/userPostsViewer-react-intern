import { ChangeEvent, useState } from "react";
import Button from "../Button/Button";

interface ISearchBarProps {
    onSearch: (username: string) => void;
}

export default function SearchBar({onSearch}: ISearchBarProps) {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    function handleSearch() {
        onSearch(inputValue.trim()); // введенный текст передается в родительский компонент
        setInputValue(''); // Очистка поля ввода после поиска
    }

    return(
        <div className='search'>
            <input 
                type="search"
                placeholder="Find a user..." 
                className="search__input"
                value={inputValue} // связь поля ввода с состоянием 
                onChange={handleInputChange} // обработчик ищменений
            />

            <Button onClick={handleSearch} className="searchBtn">Search</Button>

        </div>
    )
}