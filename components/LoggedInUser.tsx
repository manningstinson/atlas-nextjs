import { auth } from "@/auth";
import Image from "next/image";
import userAvatar from "@/public/placeholder.svg";

export async function LoggedInUser() {
  const session = await auth();
  
  if (!session?.user) return null;

  return (
    <div className="flex items-center space-x-3 p-3">
      {session.user.image.includes('github') ? (
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
          src={userAvatar}
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