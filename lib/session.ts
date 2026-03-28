import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function Session() {
  return await getServerSession(authOptions);
}
