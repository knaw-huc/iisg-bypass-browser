import {type Block, usePanoptes} from "@knaw-huc/panoptes-react";
import {useActionContext, useScreenContext} from "@knaw-huc/panoptes-react-blocks";
import * as React from "react";
import {Button, Menu, MenuItem, MenuTrigger, Popover} from "react-aria-components";
import exportMetadataStyles from './ExportMetadataAction.module.css';
import {MARC21, MIME_TYPE_MARC21, MIME_TYPE_RIS, type MetadataRecord, RIS} from "./types.ts";
import mapBypassRecord from "./mapping/mapBypassRecord.ts";
import toMARC21Record from "./marc21/exportMARC21.ts";
import toRIS from "./ris/exportRIS.ts";
import {downloadFile, safeFilename} from "./mapping/exportHelpers.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExportMetadataAction = (_: { block: Block }) => {
    const { label, isEnabled, isExecuting, execute } = useActionContext();
    const { data } = useScreenContext();
    const { translateFn } = usePanoptes();
    const t = (key: string) => translateFn ? translateFn(key) : key;

    const handleAction = (key: React.Key) => {
        execute(async () => {
            const record = data as unknown as MetadataRecord;
            const name = safeFilename(data);
            if (key === RIS) {
                downloadFile(`${name}.ris`, toRIS(mapBypassRecord(record, {})), MIME_TYPE_RIS);
            } else if (key === MARC21) {
                downloadFile(`${name}.marc21`, toMARC21Record(mapBypassRecord(record)), MIME_TYPE_MARC21);
            }
        });
    };


    return (
        <MenuTrigger>
            <Button isDisabled={!isEnabled} className={exportMetadataStyles.button}>
                {isExecuting ? '...' : label}
                <span aria-hidden="true">▾</span>
            </Button>
            <Popover>
                <Menu onAction={handleAction} className={exportMetadataStyles.menu}>
                    <MenuItem id="ris" className={exportMetadataStyles.menuItem}>
                        {t('screens.bypass-item-view.actions.export-metadata.ris')}
                    </MenuItem>
                    <MenuItem id="marc21" className={exportMetadataStyles.menuItem}>
                        {t('screens.bypass-item-view.actions.export-metadata.marc21')}
                    </MenuItem>
                    <MenuItem id="marc21" className={exportMetadataStyles.menuItem}>
                        {t('screens.bypass-item-view.actions.export-metadata.marc21')}
                    </MenuItem>
                </Menu>
            </Popover>
        </MenuTrigger>
    );
}

export default ExportMetadataAction;
