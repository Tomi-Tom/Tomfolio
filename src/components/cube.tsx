export default function Cube({size}: { size: string }) {
    if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--size', size);
    }
    return (
        <div className="cube">
            <div className="top"></div>
            <div>
                <span className={`i1`}/>
                <span className={`i2`}/>
                <span className={`i3`}/>
                <span className={`i4`}/>
            </div>
        </div>
    );
}
