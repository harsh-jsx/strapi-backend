const fs = require("fs");
const axios = require("axios");

// ==== CONFIG ====
const STRAPI_URL = "http://localhost:1337/api";
const API_TOKEN =
  "f47dda83cc09fe2a65f39b8bd7ae110e0ad1818ae69c8985770bcdb4cfc868c6294142696a39dc05bdffc1d84ea2037860b8143899390b5ffd733607e939d02cb695bd2fe1622754065ce3bdbcaa5313095544b6a820221348a058c2aa0ae9147b5cbcae28fd915a6f92004c3b961a3977e52219207b012f1f9223cd2374625a"; // From Strapi settings
const JSON_FILE = "./services.json"; // path to your JSON file
const CATEGORY_ID = 1; // the category this subcategory belongs to

// ==== STRAPI REQUEST HELPER ====
const strapi = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

async function main() {
  try {
    const subcategoryData = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));

    // Step 1: Create subcategory
    const subcategoryRes = await strapi.post("/subcategories", {
      data: {
        name: subcategoryData.name,
        category: CATEGORY_ID,
      },
    });

    const subcategoryId = subcategoryRes.data.data.id;
    console.log(
      `✅ Subcategory created: ${subcategoryData.name} (ID: ${subcategoryId})`
    );

    // Step 2: Create each service
    for (const service of subcategoryData.services) {
      await strapi.post("/services", {
        data: {
          name: service.name,
          price: service.price,
          duration: service.duration,
          description: service.description,
          subcategory: subcategoryId, // or an array if it’s many-to-many
        },
      });
      console.log(`   ➕ Service added: ${service.name}`);
    }

    console.log("🎉 Import complete!");
  } catch (err) {
    console.error(
      "❌ Error importing data:",
      err.response?.data || err.message
    );
  }
}

main();
