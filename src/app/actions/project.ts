"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// This function runs entirely on the server
export async function createProject(formData: FormData, content: string) {
  try {
    const title = formData.get("title") as string;
    
    // Auto-generate a slug (e.g., "F1 Race Game" -> "f1-race-game")
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    await prisma.project.create({
      data: {
        title,
        slug,
        type: formData.get("type") as string,
        subcategory: formData.get("subcategory") as string,
        status: formData.get("status") as string,
        dateStart: formData.get("dateStart") as string || null,
        dateEnd: formData.get("dateEnd") as string || null,
        role: formData.get("role") as string || null,
        organization: formData.get("organization") as string || null,
        url: formData.get("url") as string || null,
        credentialId: formData.get("credentialId") as string || null,
        compensation: formData.get("compensation") as string || null,
        achievement: formData.get("achievement") as string || null,
        media: formData.get("media") as string || null,
        content: content, // The raw markdown text
      },
    });

    // Clear the cache so your live website updates instantly
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to save project." };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    
    // Clear caches so the dashboard and home page update instantly
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project." };
  }
}