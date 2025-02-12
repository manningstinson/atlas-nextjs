import { auth } from "@/auth";
import Image from "next/image";

export async function LoggedInUser() {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

  // Debug log (you can remove this later)
  console.log('Session:', JSON.stringify(session, null, 2));

  return (
    <div className="flex items-center space-x-3 p-3">
      <div className="relative h-10 w-10">
        <Image
          src={session.user.image || "/assets/placeholder.svg"}
          alt={session.user.name || "User avatar"}
          fill
          className="rounded-full object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div>
        <p className="text-sm font-medium">
          {session.user.name || session.user.email?.split('@')[0]}
        </p>
        <p className="text-xs text-gray-500">{session.user.email}</p>
      </div>
    </div>
  );
}