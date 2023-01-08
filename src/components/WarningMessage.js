export default function WarningMessage({
  currentValue,
  databaseValue,
  editedValue,
  isDirty,
}) {
  if (currentValue !== editedValue) {
    return <p className="components-notice is-success">{`Gutenberg has modified the value since it was last loaded. Saving will set all values to the Edited value (${editedValue})`}</p>;
  }

  if (
    isDirty &&
    databaseValue !== currentValue
  ) {
    return <p className="components-notice is-error">{`Gutenberg has modified the value but since it matches the value it "thinks" is in the database, it will not be saved. Saving will set all values to the Database value (${databaseValue})`}</p>;
  }

  if (databaseValue !== currentValue) {
    return <p className="components-notice is-success">{`Gutenberg has not modified the value. Saving will set all values to the Database value (${databaseValue})`}</p>;
  }

  return null;
}
