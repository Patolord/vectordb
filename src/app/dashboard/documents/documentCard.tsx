import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DocumentCard({
  document,
}: {
  document: Doc<"documents">;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription>
          <div>
            {!document.description ? (
              <div className="flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              document.description
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button asChild className="flex items-center gap-2">
          <Link href={`/dashboard/documents/${document._id}`}>
            <Eye className="size-4" /> View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
