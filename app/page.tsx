import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

const contractCategories = [
  {
    title: "דירה",
    description: "חוזי שכירות, קנייה ומכירה של דירות",
    icon: "🏠"
  },
  {
    title: "רכב",
    description: "חוזי מכירה, שכירות ותחזוקה של רכבים",
    icon: "🚗"
  },
  {
    title: "עבודה",
    description: "חוזי העסקה, פרילנס וקבלן",
    icon: "💼"
  },
  {
    title: "כללי",
    description: "חוזים כלליים למגוון שימושים",
    icon: "📄"
  }
];

export default function Home() {
  return (
    <>Home</>
  );
}
