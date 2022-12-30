export default function WarningMessage({
  dbValue,
  dbValueOnLoad,
  modifiedValue,
}) {
  if (dbValue === dbValueOnLoad) {
    // The database value matches the value Gutenberg thinks is in the database.
    if (dbValueOnLoad !== modifiedValue) {
      return <p className="components-notice is-success">{`Saving will set all values to ${modifiedValue}`}</p>;
    }
    return null;
  }
  if (dbValue === modifiedValue) {
      return <p className="components-notice is-success">{`Saving will set all values to ${modifiedValue}`}</p>;
  }
  const dbGutenbergMismatchMessage = `The database value has been changed to ${dbValue} but Gutenberg is unaware of this change and thinks the database still has a value of ${dbValueOnLoad}.`;

  if (dbValueOnLoad !== modifiedValue) {
    return <>
      <p className="components-notice is-warning">{`Saving will set all values to ${modifiedValue}`}</p>
      <p className="components-notice">{dbGutenbergMismatchMessage}</p>
      <p className="components-notice">{`If you save now, Gutenberg will prioritize the modified Gutenberg value (${modifiedValue}) and overwrite the database with that value.`}</p>
    </>;
  }
  return <>
      <p className="components-notice is-error">{`Saving will set all values to ${dbValue}`}</p>
      <p className="components-notice">{dbGutenbergMismatchMessage}</p>
      <p className="components-notice">{`Gutenberg will prioritize the database value (${dbValue}) because Gutenberg thinks the value in Gutenberg (${modifiedValue}) is unmodified. This works well most of the time, but if you actually want to set the value in the database to ${modifiedValue} you are out of luck.`}</p>
  </>;
}
