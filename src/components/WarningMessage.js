export default function WarningMessage({
  currentValue,
  databaseValue,
  editedValue,
}) {
  if (currentValue !== editedValue) {
    return <p className="components-notice is-success">{`Gutenberg has modified the value since it was last loaded. Saving will set all values to the editedValue in Gutenberg (${editedValue})`}</p>;
  }

  if (databaseValue !== currentValue) {
    return <p className="components-notice is-success">{`Gutenberg has not modified the value. Saving will set all values to the Database value (${databaseValue})`}</p>;
  }

  return null;
}
