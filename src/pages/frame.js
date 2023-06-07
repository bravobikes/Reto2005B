export default function Frame() {
    return (
        <div className="wrapper" style={{width: "50%"}}>
            <iframe style={{
                transform: "scale(0.4)",
                transformOrigin: "top left",
                border: 0
            }} width="1920px" height="1080px" className="frame" src="http://localhost:3000/videogame"></iframe>
        </div>
    )
}