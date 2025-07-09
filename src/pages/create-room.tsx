import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsResponse = Array<{
  id: string;
  name: string;
  createdAt: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result: GetRoomsResponse = await response.json();
      return result;
    },
  });

  return (
    <>
      <div>Create Room</div>

      {isLoading && <p>Loading...</p>}

      {data && (
        <ul>
          {data.map((room) => (
            <li key={room.id}>
              <Link to={`/room/${room.id}`} className="underline">
                Go to {room.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
