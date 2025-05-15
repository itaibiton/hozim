import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockContracts = [
    {
        id: "1",
        title: "הסכם שכירות דירה",
        category: "דירה",
        lastModified: "2024-05-01",
        status: "טיוטה"
    },
    {
        id: "2",
        title: "הסכם מכירת רכב",
        category: "רכב",
        lastModified: "2024-04-28",
        status: "מאושר"
    },
    {
        id: "3",
        title: "חוזה העסקה",
        category: "עבודה",
        lastModified: "2024-04-25",
        status: "טיוטה"
    }
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen w-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">החוזים שלי</h1>
                <Button>צור חוזה חדש</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockContracts.map((contract) => (
                    <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div>
                                <CardTitle className="text-xl">{contract.title}</CardTitle>
                                <CardDescription>{contract.category}</CardDescription>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        צפייה
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Edit className="h-4 w-4" />
                                        עריכה
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                        מחיקה
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>עודכן לאחרונה: {contract.lastModified}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${contract.status === "מאושר"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                    {contract.status}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 