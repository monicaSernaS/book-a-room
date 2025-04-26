export default function Button({ text, onClick, type = "button", isLoading = false }) {
    return (
      <button
        className="btn btn-primary w-100"
        onClick={onClick}
        type={type}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          text
        )}
      </button>
    );
  }
  