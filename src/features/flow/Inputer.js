import { uuseRef, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../../theme/theme';
import { findRecommendedWordAsync, nodes, selectedId, selectedId as selId, SetTextFunc, SetTextSelectFunction, updateNode } from './flowSlice';

const InputerContainer = styled(theme.ShadowBox)`
    position: fixed;
    width: min(calc(100vw - 40px), 465px);
    box-sizing: border-box;
    bottom: 107px;
    right: 20px;
    margin-left: 20px;
    background-color: white;
    padding: 14px 20px 10px 20px;
    border-radius: 20px;
    z-index: 20000;
`;

const InputerInput = styled.input`
    font-size: 18px;
    width: 100%;
    min-width: 30px;
    max-width: 413px;
    padding: 0 6px 4px 6px;
    border: 0;
    &::placeholder {
        color: #bbd4c7;
    }
    &:focus {
        outline: 0;
    }
`;

function Inputer({ data }) {
    const dispatch = useDispatch();

    const selId = useSelector(selectedId);

    const [text, setText] = useState("");

    const textSelectFunction = (text_) => {
        setText(text_);
    };

    dispatch(SetTextSelectFunction(textSelectFunction));

    const udtNode = () => {
        dispatch(updateNode({ id: selId, label: text }));
        dispatch(findRecommendedWordAsync(text));
    }

    return (
        <InputerContainer>
            <InputerInput
                placeholder='Enter Something'
                value={text}
                onChange={e => { setText(e.target.value) }}
                onKeyDown={e => {
                    console.log(e.key);
                    if (e.key == "Enter")
                        udtNode();
                }}
            />

            <div style={{
                width: "100%",
                height: 4,
                backgroundColor: "#73D6AC",
                borderRadius: 10,
            }}></div>
        </InputerContainer>
    );
}

export default Inputer;
