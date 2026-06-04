const TENANT_DB = "bypass";
const DATASET_NAME = "{dataset_name}";

const tenantDb = db.getSiblingDB(TENANT_DB);
tenantDb.detail_properties.updateOne(
    { dataset_name: DATASET_NAME, name: "bypass-item-view" },
    {
        $set: {
            dataset_name: DATASET_NAME,
            name: "bypass-item-view",
            type: "screen",
            path: "$",
            order: 1,
            config: {
                "id": "bypass-item-view",
                "screenType": "normal",
                "tabs": [],
                "links": [],
                "actions": [],
                "form": {
                    "rows": [
                        {
                            "displayType": "group",
                            "groupId": "summary",
                            "tabId": "tab-file",
                            "elements": [
                                { "type": "label", "value": "$data#$.filepath" },
                                { "type": "label", "value": "$data#$.metadata.Content-Type" },
                                { "type": "label", "value": "$data#$.metadata.title" },
                                { "type": "label", "value": "$data#$.metadata.description" }
                            ]
                        }
                    ]
                }
            }
        }
    },
    { upsert: true }
);