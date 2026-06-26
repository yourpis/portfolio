"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob"; // Import the Vercel Blob upload function
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createProject(formData: FormData, content: string) {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session) {
      throw new Error("Unauthorized action.");
    }

    const title = formData.get("title") as string;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // Handle Image Upload to Vercel Blob
    const mediaFile = formData.get("mediaFile") as File;
    let mediaUrl = null;

    if (mediaFile && mediaFile.size > 0) {
      // Upload the file securely to Vercel's global CDN
      const blob = await put(mediaFile.name, mediaFile, {
        access: "public",
      });
      mediaUrl = blob.url; // Save the secure URL Vercel gives us back
    }

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
        media: mediaUrl, // Save the Vercel Blob URL to Neon!
        content: content,
        livePreviewOnHome: formData.get("livePreviewOnHome") === "on",
        livePreviewOnProject: formData.get("livePreviewOnProject") === "on",
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create project:", error);
    return { success: false, error: error.message || "Failed to save project." };
  }
}

export async function deleteProject(id: string) {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session) {
      throw new Error("Unauthorized action.");
    }

    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project." };
  }
}