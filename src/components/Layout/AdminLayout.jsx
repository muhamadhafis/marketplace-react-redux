import { IoCart, IoPerson, IoPricetag } from "react-icons/io5";
import { Button } from "../ui/button";

const SideBarItem = (props) => {
  const { children } = props;
  return (
    <Button variant={"ghost"} size={"lg"} className={"w-full rounded-none"}>
      {children}
    </Button>
  );
};

export const AdminLayout = (props) => {
  const { title, description, rightSection, children } = props;
  return (
    <div className="flex">
      <aside className="w-72 border-r h-screen">
        <div className="h-16 flex-col flex items-center justify-center border-b">
          <h1 className="font-semibold text-3xl">Admin Dashboard</h1>
        </div>
        <div className="flex flex-col py-4">
          <SideBarItem>
            <IoPricetag className="w-6 h-6 mr-2" />
            Product Managment
          </SideBarItem>
          <SideBarItem>
            <IoCart className="w-6 h-6 mr-2" />
            Order Managment
          </SideBarItem>
        </div>
      </aside>
      <div className="flex-1">
        <header className="h-16 border-b w-full flex justify-end items-center px-8">
          <Button size={"icon"} className={"rounded-full"}>
            <IoPerson className="w-6 h-6"></IoPerson>
          </Button>
        </header>
        <main className="flex flex-col p-4">
          <div className="flex justify-between items-center pb-4 border-b mb-8 w-full">
            <div>
              <h1 className="font-bold text-4xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            {rightSection}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};
