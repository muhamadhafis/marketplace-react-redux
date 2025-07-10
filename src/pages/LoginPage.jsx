import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { useDispatch } from "react-redux";
import { GuestPage } from "@/components/guard/GuestPage";
import { useNavigate } from "react-router-dom";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username less than 16 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onSubmit",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
          password: values.password,
        },
      });

      if (!userResponse.data.length) {
        alert("Invalid username or password");
        return;
      }

      alert(`Welcome back ${userResponse.data[0].username}!`);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data[0].username,
          id: userResponse.data[0].id,
          role: userResponse.data[0].role,
        },
      });

      localStorage.setItem("current-user", userResponse.data[0].id);

      form.reset();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GuestPage>
      <main className="flex justify-center items-center flex-col gap-2 h-[80vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className={"w-full max-w-lg"}
          >
            <Card>
              <CardHeader>
                <CardTitle className={"text-2xl font-bold tracking-tighter"}>
                  Welcome back
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
                        <Input
                          {...field}
                          type={isChecked ? "text" : "password"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="show-password"
                    onCheckedChange={(checked) => setIsChecked(checked)}
                  />
                  <Label htmlFor="show-password">Show Password</Label>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col w-full gap-4">
                  <Button type="submit">Log in</Button>
                  <Button variant="link">Sign up as guest</Button>
                </div>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};

export default LoginPage;
