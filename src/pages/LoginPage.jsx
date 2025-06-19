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

const LoginPage = () => {
  return (
    <main className="flex justify-center items-center flex-col gap-2 h-[80vh]">
      <Card className={"w-full max-w-lg"}>
        <CardHeader>
          <CardTitle className={"text-2xl font-bold tracking-tighter"}>
            Welcome back
          </CardTitle>
        </CardHeader>
        <CardContent className={"flex flex-col gap-4"}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="show-password" />
            <Label htmlFor="show-password">Show Password</Label>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full gap-4">
            <Button>Log in</Button>
            <Button variant="link">Sign up as guest</Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
