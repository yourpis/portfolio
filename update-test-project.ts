import prisma from './src/lib/prisma'

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
    console.log(`Updated project ${project.title} for live preview test.`)
  } else {
    console.log("No project with a URL found.")
  }
}

main()
  .catch(e => console.error(e))
