const SurveyButton = () => {
    return (
        <button
            onClick={() => window.location.href = "https://1887-84-66-90-227.ngrok-free.app/limesurvey/index.php/641746?lang=en"}
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
