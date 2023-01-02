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
import reducer from '../reducer';

export default function TooManyCooks({
  currentValue,
  editedValue,
}) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      databaseValue: currentValue,
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
        }))?.meta?.salcode_is_oven_on;
        dispatch({
          type: 'setDatabaseValue',
          value: newDatabaseValue,
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
    <h2>Too Many Cooks</h2>
    <ul>
      <li key="database">
        <ShowBool value={state.databaseValue} />:
        Database Value
        {state.isUpdatingDatabase ? 'updating...' : ''}
        <Button className="is-primary" onClick={
          async () => {
            // Starting update.
            dispatch({
               type: 'setUpdatingDatabase',
               value: true,
            });
            const newDatabaseValue = (await wp.apiFetch({
              data: {
                meta: { salcode_is_oven_on: ! state.databaseValue },
              },
              method: 'POST',
              path: `/wp/v2/posts/${select('core/editor').getCurrentPostId()}`,
            }))?.meta?.salcode_is_oven_on;

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
        <ShowBool value={currentValue} />:
        Current (Gutenberg)
      </li>
      <li key="editedValue">
        <ShowBool value={editedValue} />:
        Edited (Gutenberg)
        <Button className="is-primary" onClick={() =>
           wpDispatch('core/editor').editPost({
             meta: {salcode_is_oven_on: ! editedValue},
          })
        }>Toggle</Button>
      </li>
    </ul>
  </>;
}
