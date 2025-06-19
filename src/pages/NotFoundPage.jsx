import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-2 h-[80vh]">
      <p className="text-7xl font-bold">404</p>
      <p className="text-lg">Page not found</p>
      <Link to={"/"}>
        <Button className={"mt-4"}>Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
