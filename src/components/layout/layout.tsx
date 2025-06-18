import MenuList from "components/Menu";

interface LauoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LauoutProps) => {
  return <div className="layout">{children} <MenuList /></div>;
};
