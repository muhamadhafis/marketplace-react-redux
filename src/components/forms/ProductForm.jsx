import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const productFormSchema = z.object({
  productName: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(80, "Product name less than 80 characters"),
  price: z.coerce.number().min(10000, "Product price must be at least 10.000"),
  stock: z.coerce.number().min(1, "Product stock must be at least 1"),
  imageUrl: z.string().url("Invalid image URL"),
});

export const ProductForm = (props) => {
  const {
    onSubmit,
    cardTitle,
    defaultProductName,
    defaultPrice,
    defaultStock,
    defaultImageUrl,
  } = props;
  const form = useForm({
    defaultValues: {
      productName: defaultProductName || "",
      price: defaultPrice || 0,
      stock: defaultStock || 0,
      imageUrl: defaultImageUrl || "",
    },
    resolver: zodResolver(productFormSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"w-full max-w-lg"}
      >
        <Card>
          <CardHeader>
            <CardTitle className={"text-2xl"}>{cardTitle}</CardTitle>
          </CardHeader>
          <CardContent className={"flex flex-col gap-2"}>
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type={"number"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type={"submit"} className={"w-full"}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
