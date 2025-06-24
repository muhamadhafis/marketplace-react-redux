import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";

const ProductManagmentPage = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _limit: 5,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts(), [];
  });
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
        <Table className={"p-4 border rounded-md"}>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>
                    Rp {product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Button size-={"icon"} variant={"ghost"}>
                      <Ellipsis className="w-6 h-6" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </AdminLayout>
    </div>
  );
};
export default ProductManagmentPage;
