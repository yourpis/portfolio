import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const project = await prisma.project.findFirst({
    where: { url: { not: null } }
  })
  if (project) {
    await prisma.project.update({
      where: { id: project.id },
      data: {
        livePreviewOnHome: true,
        livePreviewOnProject: true,
      },
    })
    console.log(`Updated project "${project.title}" to show Live Previews.`)
  } else {
    console.log("No project with a URL found.")
  }
}

main()
  .catch(e => console.error(e))
