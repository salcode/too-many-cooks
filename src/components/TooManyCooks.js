import { Button } from '@wordpress/components';
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
    {state.databaseValue ? 'true' : 'false'} / {currentValue} / {editedValue}
    <Button onClick={() => dispatch({
      type: 'setDatabaseValue',
      value: ! state.databaseValue,
    })}>Toggle state</Button>
  </>
}
