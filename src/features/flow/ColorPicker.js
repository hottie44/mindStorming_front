
import { useCallback, useRef, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { CreateNode, nodes, recommendedWords, selectedColor, selectedId, selectedId as selId, SelectNode, SetColor, updateNode } from './flowSlice';
import styled from "styled-components";
import theme from '../../theme/theme';

const ColorPickperRootContainer = styled(theme.ShadowBox, theme.UI)`
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    width: 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    background-color: white;
    z-index: 2000;
    border-radius: 50px;
`;

const ColorItem = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-color: ${props => props.color};
    margin-top: 10px;
    cursor: pointer;
    box-sizing: content-box;
    border: ${props =>
        props.selected
            ? `3px ${theme.colors.Primary} solid !important`
            : "0"
    };
    &:first-child {
        border: 1px gray solid;
        margin-top: 0;
    }
`;

const colors = ["#FFFFFF", "#FFC6E0", "#FFCFA8", "#FFF5A7", "#BFFFE4", "#C2F7FF"];

function ColorPicker() {
    const dispatch = useDispatch();

    const currentColor = useSelector(selectedColor);

    const selectedId = useSelector(selId);

    return (
        <ColorPickperRootContainer>
            {
                colors.map((val, idx) => {
                    console.log(val);
                    return <ColorItem
                        onClick={() => {
                            dispatch(SetColor(val));
                            dispatch(updateNode({
                                id: selectedId,
                                color: val
                            }));
                        }}
                        color={val}
                        selected={currentColor == val}
                    />
                })
            }
        </ColorPickperRootContainer>
    );
}

export default ColorPicker;