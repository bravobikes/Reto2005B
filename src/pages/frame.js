export default function Frame() {
    return (
        <div className="wrapper" style={{width: "70%", height: "50vh"}}>
            <iframe style={{
                transformOrigin: "top left",
                border: 0,
                borderRadius: "2em"
            }} width="100%" height="100%" className="frame" src="http://localhost:5173/videogame"></iframe>
        </div>
    )
}