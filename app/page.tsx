import { auth } from "@clerk/nextjs/server";
import { AgendaInput } from "./components/AgendaInput";
import { getOrCreateUser } from "./actions/user";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    // Initialize user if needed
    await getOrCreateUser(userId);
  }

  return (
    <main className="flex justify-center">
      <div className="w-full px-2 max-w-xl py-10">
        <h1 className="font-bold">agenda</h1>
        <AgendaInput />
      </div>
    </main>
  );
}
