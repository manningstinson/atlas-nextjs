import Image from "next/image";
import { signIn } from "@/auth";
import placeholder from "@/assets/placeholder.svg";
import { FaGithub } from "react-icons/fa";

export default function Page() {
  return (
    <main className="w-screen py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="flex lg:flex-row flex-col gap-4 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl">
              Unlock the Power of the Web
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Discover our suite of tools and services to build, deploy, and
              scale your web applications with ease.
            </p>
            <div className="space-y-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("github", { redirectTo: "/ui" });
                }}
              >
                <button 
                  type="submit"
                  className="inline-flex items-center gap-2 h-10 px-8 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                  Sign in with GitHub
                </button>
              </form>

              {/* Optional: Keep existing credentials sign-in or add more providers */}
              <details className="text-sm text-gray-600">
                <summary>Other sign-in methods</summary>
                <form
                  action={async () => {
                    "use server";
                    await signIn("default", { redirectTo: "/ui" });
                  }} 
                >
                  <button className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors">
                    Sign In with Credentials
                  </button>
                </form>
              </details>
            </div>
          </div>
          <Image
            src={placeholder}
            alt="Hero"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover w-full max-w-[550px]"
          />
        </div>
      </div>
    </main>
  );
}