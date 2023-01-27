import apiFetch from '@wordpress/api-fetch';
import { Button } from '@wordpress/components';
import {
  dispatch as wpDispatch,
  select
} from '@wordpress/data';
import {
  useEffect,
  useReducer
} from '@wordpress/element';

import ShowBool from './ShowBool';
import ShowTemp from './ShowTemp';
import WarningMessage from './WarningMessage';
import reducer from '../reducer';

export default function TooManyCooks({
  currentValue,
  editedValue,
}) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      databaseValue: currentValue,
      isDirty: false,
      setUpdatingDatabase: true,
    },
  );
  useEffect(
    () => {
      (async () => {
        // Starting update.
        dispatch({
          type: 'setUpdatingDatabase',
          value: true,
        });

        // Fetch value from database.
        const newDatabaseValue = (await apiFetch({
          path: `/wp/v2/posts/${select('core/editor').getCurrentPostId()}`,
        }))?.meta?.salcode_oven_temp;
        dispatch({
          type: 'setDatabaseValue',
          value: newDatabaseValue,
        });

        dispatch({
          type: 'setIsDirty',
          value: false,
        });

        dispatch({
          type: 'setUpdatingDatabase',
          value: false,
        });
      })();
    },
    [ currentValue ]
  );
  return <>
    <ul>
      <li key="database">
        <ShowTemp value={state.databaseValue} />:
        Database Value
        {state.isUpdatingDatabase ? 'updating...' : ''}
        <Button className="is-primary too-many-cooks__toggle" onClick={
          async () => {
            // Starting update.
            dispatch({
               type: 'setUpdatingDatabase',
               value: true,
            });
            const newDatabaseValue = (await wp.apiFetch({
              data: {
                meta: { salcode_oven_temp: state.databaseValue + 10 },
              },
              method: 'POST',
              path: `/wp/v2/posts/${select('core/editor').getCurrentPostId()}`,
            }))?.meta?.salcode_oven_temp;

            dispatch({
              type: 'setDatabaseValue',
              value: newDatabaseValue,
            });

            // Done updated.
            dispatch({
               type: 'setUpdatingDatabase',
               value: false,
            });
          }
        }>Toggle</Button>
      </li>
      <li key="currentValue">
        <ShowTemp value={currentValue} />:
        Current (Gutenberg)
      </li>
      <li key="editedValue">
        <ShowTemp value={editedValue} />:
        Edited (Gutenberg)
        <Button className="is-primary too-many-cooks__toggle" onClick={() => {
          wpDispatch('core/editor').editPost({
            meta: {salcode_is_oven_on: ! editedValue},
          });
          dispatch({
            type: 'setIsDirty',
            value: true,
          });
        }}>Toggle</Button>
      </li>
    </ul>
    <p>
      <Button
        className="is-primary"
        onClick={() => wp.data.dispatch('core/editor').savePost()}
      >
        Save Post
      </Button>
    </p>

    <WarningMessage
      currentValue={currentValue}
      databaseValue={state.databaseValue}
      editedValue={editedValue}
      isDirty={state.isDirty}
    />
  </>;
}
