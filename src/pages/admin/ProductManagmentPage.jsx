import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";

const ProductManagmentPage = () => {
  return (
    <div>
      <AdminLayout
        title={"Product Managment"}
        description={"Managing our product"}
        rightSection={
          <Button>
            <IoAdd className="w-6 h-6" />
            Add Product
          </Button>
        }
      >
        <h1>Product Managment page content</h1>
      </AdminLayout>
    </div>
  );
};
export default ProductManagmentPage;
