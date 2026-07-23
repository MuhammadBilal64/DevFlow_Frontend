import { Link } from "react-router-dom";

function AuthFooter({
  text,
  linkText,
  to,
}) {
  return (
    <div className="mt-6 text-center text-sm text-slate-400">
      <span>{text} </span>

      <Link
        to={to}
        className="font-medium text-sky-400 transition hover:text-sky-300"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default AuthFooter;