import NavbarComponent from "./navbar";

export default function Layout(props) {
   return (
      <div>
         <NavbarComponent />
         <main>{props.children}</main>
      </div>
   );
}
