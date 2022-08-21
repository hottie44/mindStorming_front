import { useCallback, useRef } from 'react';
import { Handle, Position } from 'react-flow-renderer';

import "./myNode.css"

const handleStyle = { transform: "translate(-4.5px, -50%)", top: "50%" };

function RootNode({ data }) {
    console.log(data);

    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div className="text-updater-node">
            <input
                className="text"
                name="text"
                onChange={onChange}
                spellCheck={false}
            />
            <Handle type="source" position={Position.Bottom} id="a" style={{ left: 0, ...handleStyle }} />
            <Handle type="source" position={Position.Bottom} id="b" style={{ left: "100%", ...handleStyle }} />
        </div>
    );
}

export default RootNode;
