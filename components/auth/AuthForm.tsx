"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
    onAuthSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
    const [tab, setTab] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleAuth = async (type: "login" | "signup") => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        if (!email || !password) {
            setError("נא למלא אימייל וסיסמה");
            setLoading(false);
            return;
        }
        try {
            if (type === "login") {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                setSuccess("התחברת בהצלחה!");
                if (onAuthSuccess) onAuthSuccess();
            } else {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setSuccess("נרשמת בהצלחה! בדוק את האימייל לאימות.");
                if (onAuthSuccess) onAuthSuccess();
            }
        } catch (err: any) {
            setError(err.message || "שגיאה לא ידועה");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto p-6 bg-white rounded-xl shadow-md border mt-10">
            <Tabs value={tab} onValueChange={v => setTab(v as "login" | "signup")} className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                    <TabsTrigger value="login">כניסה</TabsTrigger>
                    <TabsTrigger value="signup">הרשמה</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleAuth("login");
                        }}
                        className="space-y-4"
                    >
                        <Input
                            type="email"
                            placeholder="אימייל"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                            dir="ltr"
                        />
                        <Input
                            type="password"
                            placeholder="סיסמה"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            dir="ltr"
                        />
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>שגיאה</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert variant="default">
                                <AlertTitle>הצלחה</AlertTitle>
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "כניסה"}
                        </Button>
                    </form>
                </TabsContent>
                <TabsContent value="signup">
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            handleAuth("signup");
                        }}
                        className="space-y-4"
                    >
                        <Input
                            type="email"
                            placeholder="אימייל"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                            dir="ltr"
                        />
                        <Input
                            type="password"
                            placeholder="סיסמה (לפחות 6 תווים)"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                            minLength={6}
                            dir="ltr"
                        />
                        {error && (
                            <Alert variant="destructive">
                                <AlertTitle>שגיאה</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {success && (
                            <Alert variant="default">
                                <AlertTitle>הצלחה</AlertTitle>
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "הרשמה"}
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AuthForm; 