import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoCart, IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";

export const Header = () => {
  const userSelector = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("current-user");

    dispatch({
      type: "USER_LOGOUT",
    });
  };

  return (
    <header className="min-h-16 border-b flex items-center justify-between px-6">
      {/* BRAND */}
      <Link to={"/"}>
        <p className="text-2xl font-bold hover:cursor-pointer font-mono tracking-tighter">
          Oktav00
        </p>
      </Link>

      {/* SEARCH BAR */}
      <Input className={"max-w-[600px]"} placeholder="Search product.." />

      {/* BUTTONS*/}
      <div className="flex gap-4 h-5 items-center">
        <div className="flex">
          <Link to={"/cart"}>
            <Button size={"icon"} variant={"ghost"}>
              <IoCart className="w-6 h-6" />
            </Button>
          </Link>
          <Button size={"icon"} variant={"ghost"}>
            <IoHeart className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          {userSelector.id === "" ? (
            <>
              <Button>Log In</Button>
              <Button variant={"outline"}>Sign In</Button>
            </>
          ) : (
            <>
              <p>Hello {userSelector.username}</p>
              <Button onClick={handleLogout} variant={"outline"}>
                <LogOut />
                Log out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
