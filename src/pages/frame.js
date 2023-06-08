export default function Frame() {
    return (
        <div className="wrapper" style={{width: "770px", height: "434px"}}>
            <iframe style={{
                transform: "scale(0.4)",
                transformOrigin: "top left",
                border: 0,
                borderRadius: "2em"
            }} width="1920px" height="1080px" className="frame" src="http://localhost:5173/videogame"></iframe>
        </div>
    )
}