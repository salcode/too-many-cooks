export default function TooManyCooks({
  currentValue,
  editedValue,
}) {
  return <>
    <h2>Too Many Cooks</h2>
    {currentValue} / {editedValue}
  </>
}
