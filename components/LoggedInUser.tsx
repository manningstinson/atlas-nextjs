import { auth } from "@/auth";
import Image from "next/image";

export async function LoggedInUser() {
  const session = await auth();
  
  if (!session?.user) return null;

  return (
    <div className="flex items-center space-x-3 p-3">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name || "User"}
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
      ) : (
        <Image
          src="/placeholder.svg"
          alt={session.user.name || "User"}
          width={40}
          height={40}
          className="rounded-full"
          priority
        />
      )}
      <div>
        <p className="text-sm font-medium">{session.user.name}</p>
        <p className="text-xs text-gray-500">{session.user.email}</p>
      </div>
    </div>
  );
}