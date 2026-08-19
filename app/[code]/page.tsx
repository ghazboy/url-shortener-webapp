import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default async function RedirectPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  const { data, error } = await supabase
    .from("urls")
    .select("long_url")
    .eq("code", code)
    .single();

  if (error || !data) {
    return <p>Short URL not found.</p>;
  }

  redirect(data.long_url);
}