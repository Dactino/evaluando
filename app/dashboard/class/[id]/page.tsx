import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Sidebar from "@/components/private-sidebar";

const ClassPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [className, setClassName] = useState("");
  const supabase = createClient();

  useEffect(() => {
    if (id) {
      const fetchClassName = async () => {
        const { data } = await supabase
          .from("class")
          .select("name")
          .eq("id", id)
          .single();
        setClassName(data.name);
      };

      fetchClassName();
    }
  }, [id]);

  return (
    <div className="flex">
      <div className="ml-64 p-5">
        <h1 className="text-2xl">{className}</h1>
        {/* Contenido de la clase */}
      </div>
    </div>
  );
};

export default ClassPage;
