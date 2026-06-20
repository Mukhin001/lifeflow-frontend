import Link from "next/link";

const NAV = [
  { href: "/", label: "Домой" },
  { href: "/currency", label: "Курс валюты" },
  { href: "/map", label: "Карта" },
  { href: "/taskboard", label: "Список дел" },
];

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
