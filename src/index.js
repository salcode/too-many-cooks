import apiFetch from '@wordpress/api-fetch';
import { registerPlugin } from '@wordpress/plugins';
import {
  select,
  useSelect,
} from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import WarningMessage from './components/WarningMessage';

import TooManyCooks from './components/TooManyCooks';

registerPlugin(
  'too-many-cooks', // Unique identifier for our plugin.
  {
    render: () => {
      const currentValue = useSelect(
        (select) => select('core/editor')
          .getCurrentPostAttribute('meta')
          .salcode_oven_temp
      );
      const editedValue = useSelect(
        (select) => select('core/editor')
          .getEditedPostAttribute('meta')
          .salcode_oven_temp
      );

      return (
        <PluginDocumentSettingPanel
          title={__('Oven Temp', 'too-many-cooks')}
        >
          <TooManyCooks
            currentValue={currentValue}
            editedValue={editedValue}
          />
        </PluginDocumentSettingPanel>
      );
    },
  },
);
