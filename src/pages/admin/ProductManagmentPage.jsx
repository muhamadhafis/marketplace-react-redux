import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const ProductManagmentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [productName, setProductName] = useState("");

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);
    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);
    setSearchParams(searchParams);
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          productName: searchParams.get("search"),
        },
      });
      console.log(response.data);
      setHasNextPage(Boolean(response.data.next));
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = () => {
    if (productName) {
      searchParams.set("search", productName);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      fetchProducts();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, []);

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
        <div className="mb-4">
          <Label className={"mb-2"}>Search Product Name</Label>
          <div className="flex gap-2">
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className={"max-w-96"}
              placeholder={"Search product..."}
            />
            <Button onClick={searchProduct}>Search</Button>
          </div>
        </div>
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
        <Pagination className={"mt-6"}>
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={searchParams.get("page") === "1"}
                variant={"ghost"}
                onClick={handlePreviousPage}
              >
                <ChevronLeft className="w-6 h-6" />
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem className={"mx-4 font-semibold"}>
              Page {searchParams.get("page")}
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={!hasNextPage}
                variant={"ghost"}
                onClick={handleNextPage}
              >
                Next
                <ChevronRight className="w-6 h-6" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </AdminLayout>
    </div>
  );
};
export default ProductManagmentPage;
