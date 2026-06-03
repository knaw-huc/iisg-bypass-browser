const TENANT_NAME = "bypass";

const TENANT_DOMAIN = "{tenant_domain}";

const mainDb = db.getSiblingDB("main");
mainDb.tenants.createIndex({ domain: 1 }, { unique: true });
mainDb.tenants.updateOne(
    { domain: TENANT_DOMAIN },
    { $set: { name: TENANT_NAME, domain: TENANT_DOMAIN } },
    { upsert: true }
);