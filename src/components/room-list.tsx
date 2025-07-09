import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { formatRelativeDate } from "@/utils/format-relative-date";
import { useRooms } from "@/http/user-rooms";

export function RoomList() {
  const { data, isLoading } = useRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Rooms</CardTitle>
        <CardDescription>
          Quick access to recently created rooms
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex items-center justify-center h-32">
            <span>Loading...</span>
          </div>
        )}

        {!isLoading &&
          data?.map((room) => (
            <Link
              key={room.id}
              className="flex items-center justify-between p-2  rounded-md border hover:bg-accent transition-colors"
              to={`/room/${room.id}`}
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {room.questionCount} questions
                  </Badge>

                  <Badge variant="secondary" className="text-xs">
                    {formatRelativeDate(room.createdAt)}
                  </Badge>
                </div>
              </div>

              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                Enter the room
                <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
      </CardContent>
    </Card>
  );
}
