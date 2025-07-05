import { AdminLayout } from "@/components/Layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/forms/ProductForm";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (values) => {
    try {
      await axiosInstance.post("/products", {
        productName: values.productName,
        price: values.price,
        stock: values.stock,
        imageUrl: values.imageUrl,
      });

      alert("Product created successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout title={"Create Product"} description={"Add new product"}>
      <ProductForm
        cardTitle="Add a new product"
        onSubmit={handleCreateProduct}
      />
    </AdminLayout>
  );
};

export default CreateProductPage;
