import { createClient } from "@/utils/supabase/client";

export default async function getUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .eq("id", user?.id);

  if (error) {
    console.error(error);
  }

  return data;
}
