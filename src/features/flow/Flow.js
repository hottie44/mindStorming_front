import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { nodes, findRecommendedWordAsync, selectedColor, selectedId, selectedId as selId, SelectNode, SetCreateNodeFunction, updateNodes, createNewNode, edges, removeNode, SetColor, textSelectFunction } from './flowSlice';
import MyNode from './MyNode';
import RootNode from './RootNode';

const nodeTypes = {
    rootNode: RootNode,
    myNode: MyNode
};

var index = 1;


let useForceUpdate = () => {
    console.log("dfasd");
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}

function Flow() {
    const dispatch = useDispatch();

    const selectedId = useSelector(selId);
    const currentColor = useSelector(selectedColor);

    const currentNodes = useSelector(nodes);
    const currentEdges = useSelector(edges);

    const textSelectFunc = useSelector(textSelectFunction);

    const createNode = (label) => {
        console.log("createNode");
        let data = {
            parentId: selectedId,
            label: label ? label : "",
            color: currentColor
        };
        dispatch(createNewNode(data));
    }

    dispatch(SetCreateNodeFunction(createNode));

    /* 노드 상태 변경 */
    const onNodesChange = (changes) => {
        for (let index in changes) {
            let change = changes[index];

            // 노드 선택
            if (change.type == "select" && change.selected || change.type == "position") {
                dispatch(SelectNode(change.id));
                console.log(currentNodes);
                for (let idx in currentNodes) {
                    let node = currentNodes[idx];
                    console.log(change.id, node.data.id);
                    if (parseInt(change.id) == node.data.id && selectedId != parseInt(change.id)) {
                        textSelectFunc(node.data.label);
                        dispatch(findRecommendedWordAsync(node.data.label));
                        dispatch(SetColor(node.data.color));
                        break;
                    }
                }

                if (change.type == "position")
                    return applyNodeChanges(changes, nodes);
                else
                    return currentNodes;
            }

            // 노드 삭제
            else if (change.type == "remove") {
                console.log(selectedId)
                dispatch(removeNode(selectedId));

                return currentNodes;
            }

        }

        console.log("changes:", changes, "Nds:", nodes);
        return applyNodeChanges(changes, nodes);
    };

    /*
    const onEdgesChange = (changes) => {
        // remove 체크 (안지워지게)
        for (let index in changes) {
            let change = changes[index];
            if (change.type == "remove")
                return eds;
        }

        console.log("changes:", changes);
        return applyEdgeChanges(changes, eds);
    };
*/

    return (<div style={{ height: "90vh" }}>
        <ReactFlow
            tabIndex={index}
            nodeTypes={nodeTypes}
            nodes={currentNodes}
            edges={currentEdges}
            onNodesChange={onNodesChange}
            onNodeClick={() => { }}
            fitView
        // onEdgesChange={onEdgesChange}
        />
    </div>);
}

export default Flow;