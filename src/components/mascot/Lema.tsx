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
      className="relative isolate flex items-center justify-center overflow-hidden rounded-[24px] bg-white"
    >

      <div className="absolute inset-0 bg-white" />

      <video
        key={videoSrc}
        src={videoSrc}

        autoPlay
        loop
        muted
        playsInline

        className="relative block h-[220px] w-[220px] bg-white object-contain"
        style={{
          pointerEvents: "none"
        }}

      />

    </div>

  );

}
