import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";

const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(16, "Username less than 16 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    repeatPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["repeatPassword"],
      });
    }
  });

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(registerFormSchema),
    reValidateMode: "onSubmit",
  });

  const handleRegister = async (values) => {
    const userResponse = await axiosInstance.get("/users", {
      params: {
        username: values.username,
      },
    });

    if (userResponse.data.length > 0) {
      alert("Username already exists");
      return;
    }

    try {
      await axiosInstance.post("/users", {
        username: values.username,
        password: values.password,
      });

      alert("User created successfully");

      form.reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex justify-center items-center flex-col gap-2 h-[80vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className={"w-full max-w-lg"}
        >
          <Card>
            <CardHeader>
              <CardTitle className={"text-2xl font-bold tracking-tighter"}>
                Create an account!
              </CardTitle>
            </CardHeader>
            <CardContent className={"flex flex-col gap-4"}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type={"password"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repeat password</FormLabel>
                    <FormControl>
                      <Input {...field} type={"password"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col w-full gap-4">
                <Button type="submit">Register</Button>
                <Button variant="link">Log in as guest</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default RegisterPage;
