export default function Cube() {
    return (
        <div className="cube" style={{ "--size": "400px" }}>
            <div className="top"></div>
            <div>
                <span style={{ "--index": 0 }}></span>
                <span style={{ "--index": 1 }}></span>
                <span style={{ "--index": 2 }}></span>
                <span style={{ "--index": 3 }}></span>
            </div>
        </div>
    );
}
