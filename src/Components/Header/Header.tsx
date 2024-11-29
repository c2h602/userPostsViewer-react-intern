import Button from "../Button/Button";

export default function Header() {

    function onChangeTheme() {

        const root = document.querySelector<HTMLElement>(':root');
        const themeToggle = document.querySelector<HTMLElement>('.themeToggle');

        root?.classList.toggle('dark');
        
        if (themeToggle?.textContent === '🌙') {
            themeToggle.textContent = '🔆'
        } else {
            themeToggle!.textContent = '🌙'
        }

    }

    return(
        <header className="header">
            <Button onClick={onChangeTheme} className="themeToggle">🔆</Button>
        </header>
        
    )
}