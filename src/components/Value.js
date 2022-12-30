import { Button } from '@wordpress/components';

export default function Value({
  children,
  help,
  isUpdating,
  label,
  value,
}) {
  return (<>
    <h4>{label}</h4>
    <p className="too-many-cooks__help">{help}</p>
    <p>
      <code>{value}</code>
      {isUpdating ? <Button disabled>Updating</Button> : children}
    </p>
  </>);
}
