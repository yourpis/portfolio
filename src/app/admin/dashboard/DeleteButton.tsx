"use client";

import { useTransition } from "react";
import { deleteProject } from "@/app/actions/project";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to terminate this protocol? This cannot be undone.")) {
      startTransition(async () => {
        const result = await deleteProject(id);
        if (!result.success) alert("Error terminating protocol.");
      });
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-400 hover:text-red-300 font-medium transition-colors disabled:opacity-50"
    >
      {isPending ? "Terminating..." : "Delete"}
    </button>
  );
}