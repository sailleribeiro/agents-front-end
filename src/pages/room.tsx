import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
  id: string;
};
export function Room() {
  const { id } = useParams<RoomParams>();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div>Room Page {id}</div>
    </>
  );
}
