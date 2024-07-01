import { UUID } from "crypto";

export type Class = {
  id: UUID;
  created_at: Date;
  name: string | null;
  tutor: UUID;
  center: UUID;
};

export type Center = {
  id: UUID;
  created_at: Date;
  name: string | null;
};

export type Profile = {
  id: UUID;
  created_at: Date;
  first_name: string | null;
  last_name: string | null;
  avatar: string | null;
  is_teacher: boolean | null;
  class: UUID;
  center: UUID;
};

export type Subject = {
  id: UUID;
  created_at: Date;
  name: string | null;
  class: UUID;
  teacher: UUID;
};
