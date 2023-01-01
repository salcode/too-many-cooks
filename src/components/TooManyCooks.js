import { Button } from '@wordpress/components';
import {
  dispatch as wpDispatch,
  select
} from '@wordpress/data';
import { useReducer } from '@wordpress/element';

import reducer from '../reducer';

export default function TooManyCooks({
  currentValue,
  editedValue,
}) {
  const [state, dispatch] = useReducer(
    reducer,
    {
      databaseValue: false,
    },
  );
  return <>
    <h2>Too Many Cooks</h2>
    {state.databaseValue ? 'true' : 'false'}/
    {currentValue ? 'true' : 'false'}/
    {editedValue ? 'true' : 'false'}
    <ul>
      <li key="database">
        { state.databaseValue ? 'true' : 'false' }: 
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
        {currentValue ? 'true' : 'false'}: 
        Current (Gutenberg)
      </li>
      <li key="editedValue">
        {editedValue ? 'true' : 'false'}: 
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
