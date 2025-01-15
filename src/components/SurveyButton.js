const SurveyButton = () => {
    return (
        <button
            onClick={() => window.location.href = "https://www.klps.co.uk/survey"}
            style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
            }}
        >
            Take the Survey
        </button>
    );
};

export default SurveyButton;
