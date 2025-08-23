import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de login
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Bem-vindo de volta</h1>
            <p className="text-muted-foreground mt-2">
              Faça login para acessar sua conta
            </p>
          </div>
          
          <Card className="border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Digite suas credenciais para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="rounded border-border"
                    />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Lembrar de mim
                    </Label>
                  </div>
                  <Button variant="link" className="px-0 text-sm">
                    Esqueceu a senha?
                  </Button>
                </div>
                
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Button variant="link" className="px-0 text-sm">
                    Cadastre-se
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Right side - Image with effect */}
      <div className="flex-1 relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/15 rounded-full animate-pulse delay-500" />
        
        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-white">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded-full" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              Gerencie suas atividades
            </h2>
            <p className="text-xl text-white/80 max-w-md">
              Organize seu tempo, acompanhe seu progresso e alcance seus objetivos com nossa plataforma.
            </p>
            
            <div className="flex space-x-4 mt-8">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-300" />
              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-600" />
            </div>
          </div>
        </div>
        
        {/* Decorative wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-20 fill-white/10"
          >
            <path d="M0,120L48,110C96,100,192,80,288,70C384,60,480,60,576,70C672,80,768,100,864,105C960,110,1056,100,1152,90L1200,80L1200,120L0,120Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};