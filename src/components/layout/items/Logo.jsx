import { Link } from "react-router-dom";
export default function Logo({ textSize = "text-3xl" }) {
  return (
    <Link to="/" className={`${textSize} font-black text-primary`}>
      NexusTrade
    </Link>
  );
}
