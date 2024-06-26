"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

import Image from "next/image";

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
  console.log(avatar);

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
    <div className="form-widget bg-white text-black">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="firstName">Full Name</label>
        <input
          id="firstName"
          type="text"
          className="text-black"
          value={firstname ? firstname : ""}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          type="text"
          value={last_name || ""}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <Image
        width="100"
        height="100"
        src={avatar || ""}
        alt="Avatar"
        className="avatar image"
        style={{ height: 100, width: 100 }}
      />
      <div>
        <button
          className="button primary block"
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
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
