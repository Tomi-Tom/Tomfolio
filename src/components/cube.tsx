export default function Cube() {
    return (
        <div className="cube" style={{ "--s": "400px" }}>
            <div className="top"></div>
            <div>
                <span style={{ "--i": 0 }}></span>
                <span style={{ "--i": 1 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 3 }}></span>
            </div>
        </div>
    );
}
