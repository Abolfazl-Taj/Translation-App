import { IoLanguage } from "react-icons/io5";
import { ImBooks } from "react-icons/im";
import { IoLibrarySharp } from "react-icons/io5";

const Navbar_Data = [
  { id: 1, name: "Tranlation", path: "/", icon: IoLanguage },
  {
    id: 2,
    name: "Manage Words",
    path: "/words-managment",
    icon: ImBooks,
  },
  {
    id: 3,
    name: "Words",
    path: "/words",
    icon: IoLibrarySharp,
  },
];
export default Navbar_Data;
