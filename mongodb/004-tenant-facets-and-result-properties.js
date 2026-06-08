const TENANT_DB = "tenant-a";
const DATASET_NAME = "{dataset_name}";

const tenantDb = db.getSiblingDB(TENANT_DB);

// ---------- FACETS ----------
const facets = [
    { name: "Content type", property: "metadata.Content-Type.keyword", type: "text", order: 0 },
    { name: "Creator", property: "metadata.dc:creator.keyword", type: "text", order: 1 },
    { name: "File path", property: "filepath", type: "tree", order: 2, tree_separator: "/" }
];

for (const facet of facets) {
    tenantDb.facets.updateOne(
        { dataset_name: DATASET_NAME, name: facet.name },
        { $set: { dataset_name: DATASET_NAME, ...facet } },
        { upsert: true }
    );
}

// ---------- RESULT PROPERTIES ----------
tenantDb.result_properties.createIndex({ dataset_name: 1, order: 1 }, { unique: true });

const resultProperties = [
    { name: "id", path: "$._id", type: "text", order: 0 },
    { name: "title", path: "$.metadata['title', 'dc:title']", type: "text", order: 1 },
    { name: "description", path: "$.metadata['description', 'dc:description']", type: "text", order: 2 },
    { name: "filepath", path: "$.filepath", type: "text", order: 3 },
    { name: "tags", path: "$.metadata['dc:subject']", type: "text", order: 4 },

];

for (const prop of resultProperties) {
    tenantDb.result_properties.updateOne(
        { dataset_name: DATASET_NAME, order: prop.order },
        { $set: { dataset_name: DATASET_NAME, ...prop } },
        { upsert: true }
    );
}