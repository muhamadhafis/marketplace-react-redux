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

const LoginPage = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [inputUsernameMessage, setInputUsernameMessage] = useState("");
  const [inputPasswordMessage, setInputPasswordMessage] = useState("");
  const handleLogin = () => {
    alert(inputUsername + inputPassword);
  };

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
            <Input
              onChange={(e) => {
                if (e.target.value.length < 3) {
                  setInputUsernameMessage(
                    "Username must be at least 3 characters long"
                  );
                } else {
                  setInputUsernameMessage("");
                }
                setInputUsername(e.target.value);
              }}
              id="username"
            />
            <p className="text-red-400 text-xs">{inputUsernameMessage}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => {
                if (e.target.value.length < 8) {
                  setInputPasswordMessage(
                    "Password must be at least 8 characters long"
                  );
                } else {
                  setInputPasswordMessage("");
                }
                setInputPassword(e.target.value);
              }}
              type={isChecked ? "text" : "password"}
              id="password"
            />
            <p className="text-red-400 text-xs">{inputPasswordMessage}</p>
          </div>
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
            <Button
              disabled={inputUsername.length < 3 || inputPassword.length < 8}
              onClick={handleLogin}
            >
              Log in
            </Button>
            <Button variant="link">Sign up as guest</Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
