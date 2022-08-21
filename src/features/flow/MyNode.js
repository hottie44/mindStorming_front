import { useCallback, useEffect, useRef, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { nodes, selectedId as selId, SetTextFunc, updateNode } from './flowSlice';

import "./myNode.css"

function MyNode({ data }) {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const currentNodes = useSelector(nodes);

    const selectedId = useSelector(selId);
    const id = data.id;
    const childs = data.childs;
    const label = data.label;
    const color = data.color;

    const [text, setText] = useState(label);

    const onChange = (e) => {
        // console.log("asdfasdfasdfasdfasdfas");
        let newTxt = e.target.value;
        setText(inputRef.current.value);
        dispatch(updateNode({ id, label: inputRef.current.value ? inputRef.current.value : "" }));
    }

    // let setTextByNodes = (nds) => {
    //     for (let idx in nds) {
    //         let node = nds[idx];
    //         if (node.data.id == id)
    //             setText(node.data.label);
    //         // setText(node.data.label);
    //     }
    // }

    // dispatch(SetTextFunc(setTextByNodes));

    return (
        <div className={`text-updater-node ${selectedId == id ? "selected" : ""}`} style={{ backgroundColor: color, }}>
            {/* <div>{(selectedId == id) ? "선택됨" : "선택안됨"}</div>
            <div >{id}, {JSON.stringify(childs)}</div> */}
            <div className='label'>{label}</div>

            <Handle type="source" position={Position.Right} style={{ opacity: 0 }} id="a" />
            <Handle type="target" position={Position.Left} style={{ opacity: 0 }} id="b" />
        </div >
    );
}

export default MyNode;
