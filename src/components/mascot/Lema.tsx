import welcome from "@/assets/lema_welcome.mp4";
import idle from "@/assets/lema_idle.mp4";
import supportive from "@/assets/lema_supportive.mp4";
import encouraging from "@/assets/lema_encouraging.mp4";
import celebrating from "@/assets/lema_celebrating.mp4";

type LemaState =
  | "welcome"
  | "idle"
  | "supportive"
  | "encouraging"
  | "celebrating";

type Props = {
  state?: LemaState;
  message?: string;
};

export default function Lema({
  state = "idle",
}: Props) {

  /**
   * Select correct animation
   */

  const getVideo = () => {

    switch (state) {

      case "welcome":
        return welcome;

      case "supportive":
        return supportive;

      case "encouraging":
        return encouraging;

      case "celebrating":
        return celebrating;

      case "idle":
      default:
        return idle;

    }

  };

  const videoSrc = getVideo();

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <video
        key={videoSrc}
        src={videoSrc}

        autoPlay
        loop
        muted
        playsInline

        style={{

          width: "220px",
          height: "220px",

          objectFit: "contain",

          pointerEvents: "none"

        }}

      />

    </div>

  );

}