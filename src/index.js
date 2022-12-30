import apiFetch from '@wordpress/api-fetch';
import { registerPlugin } from '@wordpress/plugins';
import { Button, TextControl } from '@wordpress/components';
import {
  dispatch,
  select,
  useSelect,
} from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import WarningMessage from './components/WarningMessage';
import Value from './components/Value';

const setGutenbergOvenTemp = (newOvenTemp) => {
  dispatch('core/editor')
    .editPost(
      {
        meta: {
          salcode_oven_temp: newOvenTemp
        }
      }
    );
};

registerPlugin(
  'too-many-cooks', // Unique identifier for our plugin.
  {
    render: () => {
      const postMetaOvenTemp = select('core/editor')
        .getCurrentPostAttribute('meta')
        .salcode_oven_temp;
      const dbValueOnLoad = postMetaOvenTemp === '' ? 0 : postMetaOvenTemp;

      const [
        dbValue,
        setDbValue,
      ] = useState(dbValueOnLoad);
      const [
        isUpdating,
        setIsUpdating,
      ] = useState(false);

      const fetchDatabaseOvenTemp = async () => {
        setIsUpdating(true);
        const ovenTemp = (await apiFetch({
          path: `/wp/v2/posts/${select('core/editor').getCurrentPostId()}`,
        }))?.meta?.salcode_oven_temp;
        setIsUpdating(false);
        setDbValue(ovenTemp);
      };

      const setDatabaseOvenTemp = async (newOvenTemp) => {
        setIsUpdating(true);
        const updatedOvenTemp = (await wp.apiFetch({
          data: {
            meta: { salcode_oven_temp: newOvenTemp },
          },
          method: 'POST',
          path: `/wp/v2/posts/${select('core/editor').getCurrentPostId()}`,
        }))?.meta?.salcode_oven_temp;
        setDbValue(updatedOvenTemp);
        setIsUpdating(false);
      }

      const modifiedValue = useSelect(
        (select) => {
          return select('core/editor')
            .getEditedPostAttribute('meta')
            .salcode_oven_temp;
        }
      );

      return (
        <PluginDocumentSettingPanel
          title={__('Oven Temp', 'too-many-cooks')}
        >
          <Value
            help="The value currently in the database"
            isUpdating={isUpdating}
            label="Database Value"
            value={dbValue}
          >
            <Button
              onClick={() => setDatabaseOvenTemp(dbValue + 1)}
            >+</Button>
            /
            <Button
              onClick={() => setDatabaseOvenTemp(dbValue - 1)}
            >-</Button>
            /
            <Button
              onClick={() => fetchDatabaseOvenTemp()}
            >Fetch</Button>
          </Value>
          <Value
            help="Gutenberg saved value based on last communication with the database"
            label="Saved Value (Gutenberg)"
            value={dbValueOnLoad}
          />
          <Value
            help="Gutenberg editable in memory value"
            label="Edited Value (Gutenberg)"
            value={modifiedValue}
          >
            <Button
              onClick={() => setGutenbergOvenTemp(modifiedValue + 1)}
            >+</Button>
            /
            <Button
              onClick={() => setGutenbergOvenTemp(modifiedValue - 1)}
            >-</Button>
          </Value>
          <WarningMessage
            dbValue={dbValue}
            dbValueOnLoad={dbValueOnLoad}
            modifiedValue={modifiedValue}
          />
        </PluginDocumentSettingPanel>
      );
    },
  },
);
