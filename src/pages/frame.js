export default function Frame() {
    return (
        // height: 66.6666667, original: width: 70%, height: 50vh
        <div className="wrapper" style={{width: "100%", height: "100%"}}>
            <iframe style={{
                transformOrigin: "top left",
                border: 0,
                borderRadius: "2em"
            }} width="100%" height="100%" className="frame" src="http://localhost:5173/videogame"></iframe>
        </div>
    )
}