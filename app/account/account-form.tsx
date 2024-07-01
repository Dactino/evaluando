"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile_created, setProfile] = useState(false);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [last_name, setLastname] = useState<string | null>(null);
  const [avatar, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`first_name, last_name, avatar`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFirstname(data.first_name);
        setLastname(data.last_name);
        setAvatarUrl(data.avatar);
      }
      setProfile(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    last_name,
    avatar,
  }: {
    last_name: string | null;
    firstname: string | null;
    avatar: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        first_name: firstname,
        last_name,
        avatar,
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  async function createProfile({
    firstname,
    last_name,
    avatar,
  }: {
    last_name: string | null;
    firstname: string | null;
    avatar: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").insert({
        id: user?.id,
        first_name: firstname,
        last_name,
        avatar,
      });
      if (error) throw error;
      alert("Profile created!");
    } catch (error) {
      alert("Error creating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget bg-white text-black p-6 rounded-lg ">
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          value={user?.email}
          disabled
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={firstname || ""}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="last_name"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          id="last_name"
          type="text"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={last_name || ""}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <button
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-600"
          onClick={() =>
            profile_created
              ? createProfile({ firstname, last_name, avatar })
              : updateProfile({ firstname, last_name, avatar })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
      <div>
        <form action="/auth/signout" method="post">
          <button
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
