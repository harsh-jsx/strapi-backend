const fs = require("fs");

async function seed() {
  const strapi = await require("@strapi/strapi").createStrapi();
  await strapi.start();

  // Example: Creating a "product" entry
  await strapi.documents("api::service.service").create({
    data: {
      name: "Haircut",
      description: "Basic haircut for men",
      price: 15,
      category: 1, // existing category ID
      gender: 1, // existing gender ID
    },
  });

  console.log("✅ Dummy data added");
  process.exit(0);
}

seed();
