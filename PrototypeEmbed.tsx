import { addPropertyControls, ControlType } from "framer"

/**
 * Blinkit AI — prototype embed
 *
 * Wraps the hosted prototype in an iframe that actually carries the
 * permissions it needs. Framer's stock Embed component can't set `allow`,
 * so the mic (Web Speech API) is blocked inside it — that's the whole
 * reason this component exists.
 *
 * Sizing decides the presentation, because the prototype reads its own
 * viewport width:
 *   frame narrower than 560  → the app fills the frame, edge to edge,
 *                              at whatever height you give it
 *   frame 560 or wider       → the 390 × 844 device with bezel, scaled
 *                              down to fit the frame's height
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function PrototypeEmbed(props) {
    const { url, title, radius, allowMic, background, style } = props

    if (!url) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: radius,
                    background: "#F2F2F0",
                    color: "#77796F",
                    font: "500 13px/1.4 Inter, sans-serif",
                    textAlign: "center",
                    padding: 16,
                    ...style,
                }}
            >
                Add the prototype URL in the properties panel
            </div>
        )
    }

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: radius,
                background,
                ...style,
            }}
        >
            <iframe
                src={url}
                title={title}
                allow={allowMic ? "microphone; clipboard-write" : "clipboard-write"}
                loading="lazy"
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    border: 0,
                    background,
                }}
            />
        </div>
    )
}

PrototypeEmbed.defaultProps = {
    url: "",
    title: "Blinkit assistant prototype",
    radius: 0,
    allowMic: true,
    background: "#EDEDEB",
}

addPropertyControls(PrototypeEmbed, {
    url: {
        type: ControlType.String,
        title: "URL",
        placeholder: "https://…/blinkit-ai-prototype-responsive.html",
    },
    title: {
        type: ControlType.String,
        title: "Title",
        description: "Read by screen readers and search engines.",
    },
    radius: {
        type: ControlType.Number,
        title: "Radius",
        min: 0,
        max: 48,
        step: 1,
        unit: "px",
        displayStepper: true,
    },
    allowMic: {
        type: ControlType.Boolean,
        title: "Mic",
        enabledTitle: "Allow",
        disabledTitle: "Block",
        description: "Off and the voice input silently falls back to the suggestion chips.",
    },
    background: {
        type: ControlType.Color,
        title: "Backdrop",
        description: "Shows behind the device at 560px and wider.",
    },
})
