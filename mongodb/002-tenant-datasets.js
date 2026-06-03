const DATA_TYPE_ELASTIC = "elasticsearch";
const TENANT_DB = "bypass";
const DATA_TYPE = DATA_TYPE_ELASTIC;

/** Template for filling in dataset_name and es_index */
const DATASET_NAME = "{dataset_name}";
const ES_INDEX = "{es_index}";
const dataConfiguration = {
    id_property: "",
    base_url: "",
    description: "{description}",
    type: "{type}",
    title: "{title}",
    item_count: "{item_count}"
};
/** End of template */


const tenantDb = db.getSiblingDB(TENANT_DB);
tenantDb.datasets.updateOne(
    {
        tenant_name: TENANT_DB,
        name: DATASET_NAME
    },
    {
        $set: {
            tenant_name: TENANT_DB,
            name: DATASET_NAME,
            es_index: ES_INDEX,
            data_type: DATA_TYPE,
            data_configuration: dataConfiguration,
            detail_id: "_id"
        }
    },
    { upsert: true }
);