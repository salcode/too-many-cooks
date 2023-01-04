import apiFetch from '@wordpress/api-fetch';
import { registerPlugin } from '@wordpress/plugins';
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

import TooManyCooks from './components/TooManyCooks';

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

      const currentValue = useSelect(
        (select) => select('core/editor')
          .getCurrentPostAttribute('meta')
          .salcode_is_oven_on
      );
      const editedValue = useSelect(
        (select) => select('core/editor')
          .getEditedPostAttribute('meta')
          .salcode_is_oven_on
      );

      return (
        <PluginDocumentSettingPanel
          title={__('Oven Temp', 'too-many-cooks')}
        >
          <TooManyCooks
            currentValue={currentValue}
            editedValue={editedValue}
          />
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
