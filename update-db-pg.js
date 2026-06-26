const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_K2TFIXqNg9ti@ep-twilight-rice-aolgl2d4-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full",
  });

  try {
    await client.connect();
    
    // Find a project with a URL
    const res = await client.query('SELECT id, title FROM "Project" WHERE url IS NOT NULL LIMIT 1');
    
    if (res.rows.length > 0) {
      const project = res.rows[0];
      
      // Update it
      await client.query('UPDATE "Project" SET "livePreviewOnHome" = true, "livePreviewOnProject" = true WHERE id = $1', [project.id]);
      
      console.log(`Successfully updated project: "${project.title}" to enable live preview!`);
    } else {
      console.log('Could not find any projects with a valid URL.');
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
