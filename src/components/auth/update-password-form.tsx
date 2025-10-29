import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/lib/client";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      location.href = "/protected";
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen">
      <div className="w-full text-center mb-6 " style={{ color: "#fafafa" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "xxx-large" }}>
          Quint Accounting
        </h1>
        <p style={{ color: "#D9D9D9" }}>Tu mejor elección contable</p>
      </div>

      <div
        className={cn(
          "w-full max-w-[500px] min-w-[300px] flex flex-col gap-6 px-4",
          className
        )}
        {...props}
      >
        <Card
          style={{ backgroundColor: "#171717", color: "#fafafa" }}
          className="m-3"
        >
          <CardHeader>
            <CardTitle className="text-2xl">
              Restablecer tu contraseña
            </CardTitle>
            <CardDescription>
              Por favor, ingresa tu nueva contraseña a continuación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nueva contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button
                  variant={"default"}
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  style={{ backgroundColor: "#e5e5e5", color: "black" }}
                >
                  {isLoading ? "Saving..." : "Save new password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
