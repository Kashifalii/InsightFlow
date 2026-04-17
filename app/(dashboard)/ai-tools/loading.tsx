import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AIToolsLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex h-16 items-center border-b border-border bg-card px-6">
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-72 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-72 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-9 w-36" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
