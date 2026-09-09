import { useNavigate, Link } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-1  items-center justify-center px-6 py-20 min-h-[65vh]">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12 max-w-2xl">
        <img
          src="https://s.alicdn.com/@img/imgextra/i2/O1CN01ZmHGiP1ueS2bI1q6v_!!6000000006062-2-tps-240-240.png"
          alt="Error Illustration"
          className="w-44 sm:w-52 h-auto object-contain select-none"
          loading="eager"
        />

        <div className="flex flex-col items-center sm:items-start text-center sm:text-start gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            An error occurred
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground">
            The page you're looking for is currently unavailable
          </p>

          <div className="flex items-center gap-4 mt-3">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover shadow-xs transition-colors cursor-pointer"
            >
              Back
            </button>

            <Link
              to="/"
              className="px-6 py-2 rounded-full border border-foreground/30 text-foreground font-semibold text-sm hover:bg-muted transition-colors"
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
