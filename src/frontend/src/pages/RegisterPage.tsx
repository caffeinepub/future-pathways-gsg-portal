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
import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Loader2, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useInternetIdentity();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login();
    navigate({ to: "/dashboard" });
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-background py-12">
      <div className="page-container w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/gsg-logo.dim_120x120.png"
                alt="GSG"
                className="h-12 w-12 rounded-lg"
              />
              <div>
                <div className="font-display text-primary text-xl">
                  Future Pathways
                </div>
                <div className="text-xs text-muted-foreground">
                  Global Schools Group
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-card border-border">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">
                <div className="bg-primary/10 rounded-full p-3">
                  <UserPlus className="h-5 w-5 text-primary" />
                </div>
              </div>
              <CardTitle className="font-display text-2xl text-primary">
                Create your account
              </CardTitle>
              <CardDescription>Join the Future Pathways portal</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="reg-name"
                    data-ocid="auth.name.input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    data-ocid="auth.email.input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@school.com"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="reg-password"
                    type="password"
                    data-ocid="auth.password.input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isLoggingIn}
                  data-ocid="auth.submit.button"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating
                      account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
              <div className="mt-5 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700 text-center">
                  <GraduationCap className="inline h-3 w-3 mr-1" />
                  Secure authentication powered by Internet Identity
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
