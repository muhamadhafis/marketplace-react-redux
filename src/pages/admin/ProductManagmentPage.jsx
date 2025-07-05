import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";

const ProductManagmentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [productName, setProductName] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);

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
  const handleDeleteProduct = async () => {
    const shouldDelete = confirm(
      `Are you sure you want to delete ${selectedProductIds.length} products?`
    );

    if (!shouldDelete) return;

    const deletePromieses = selectedProductIds.map((productId) => {
      return axiosInstance.delete("/products/" + productId);
    });

    try {
      await Promise.all(deletePromieses);
      alert(`Sucsessfully deleted ${selectedProductIds.length} products!`);

      searchParams.set("page", Number(1));
      setSearchParams(searchParams);
      setSelectedProductIds([]);
    } catch (err) {
      console.log(er);
    }
  };
  const handleOnCheckedProduct = (productId, checked) => {
    if (checked) {
      const prevSelectedProductIds = [...selectedProductIds];
      prevSelectedProductIds.push(productId);

      setSelectedProductIds(prevSelectedProductIds);
    } else {
      const productIdIndex = selectedProductIds.findIndex((id) => {
        return id == productId;
      });

      const prevSelectedProductIds = [...selectedProductIds];
      prevSelectedProductIds.splice(productIdIndex, 1);

      setSelectedProductIds(prevSelectedProductIds);
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
          <div className={"gap-2 flex"}>
            {selectedProductIds.length ? (
              <Button variant={"destructive"} onClick={handleDeleteProduct}>
                <Trash className="w-6 h-6" />
                Delete {selectedProductIds.length} product
              </Button>
            ) : null}

            <Link to={"/admin/products/create"}>
              <Button>
                <IoAdd className="w-6 h-6" />
                Add Product
              </Button>
            </Link>
          </div>
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
              <TableHead></TableHead>
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
                  <TableCell>
                    <Checkbox
                      onCheckedChange={(checked) =>
                        handleOnCheckedProduct(product.id, checked)
                      }
                      checked={selectedProductIds.includes(product.id)}
                    />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>
                    Rp {product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Link to={"/admin/products/edit/" + product.id}>
                      <Button size-={"icon"} variant={"ghost"}>
                        <Edit className="w-6 h-6" />
                      </Button>
                    </Link>
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
