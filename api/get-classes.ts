import { createClient } from "@/utils/supabase/client";
import getUser from "./get-user";

export default async function getClasses() {
  const supabase = createClient();

  const user = await getUser();

  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("id", user?.id);

  if (error) {
    console.error(error);
  }

  return data;
}
