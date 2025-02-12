import { auth } from "@/auth";
import Image from "next/image";

export async function LoggedInUser() {
  const session = await auth();
  if (!session?.user) return null;
  
  const userImage = session.user.image ?? "/assets/placeholder.svg";
  
  return (
    <div className="flex items-center space-x-3 p-3">
      <Image
        src={userImage}
        alt={session.user.name ?? "User"}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div>
        <p className="text-sm font-medium">{session.user.name}</p>
        <p className="text-xs text-gray-500">{session.user.email}</p>
      </div>
    </div>
  );
}