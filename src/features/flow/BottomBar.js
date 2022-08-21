
import { useCallback, useRef, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { createNewNode, CreateNode, createNodeFunction, recommendedWords, selectedId as selId, SelectNode } from './flowSlice';
import styled from "styled-components";
import MyNode from './MyNode';
import RootNode from './RootNode';
import theme from '../../theme/theme';

const RecommendedButton = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    white-space: nowrap;
    border-radius: 50px;
    margin-right: 10px;
    padding: 10px 20px;
    background-color: ${theme.colors.Secondary};
    cursor: pointer;
`;

function BottomBarItem(props) {
    const itemName = props.name;

    return (
        <RecommendedButton onClick={props.onClick}>
            <span>+ {itemName}</span>
        </RecommendedButton>
    );
}

const BottomBarRootContainer = styled.div`
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    right: 0;
    bottom: 0;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: hidden;
    z-index: 2000;
`;

const BottomBarContainer = styled(theme.ShadowBox, theme.UI)`
    display: flex;
    border-radius: 40px;
    display: flex;
    padding: 3px 20px;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: white;
`;

const ScrollContainer = styled.div`
    flex-grow: 1;
    display: flex;
    min-height: 47.5px;
    padding: 5px 0px;
    overflow-y: hidden;
    overflow-x: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-left: 15px;
    align-items: center;
`;

const Bar = styled.div`
    
`;

const ScrollButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const PlusButton = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 100%;
    background-color: ${theme.colors.Primary};
    cursor: pointer;
    width: 49px;
    height: 49px;
    margin-left: 20px;
`;

function BottomBar() {
    const dispatch = useDispatch();

    const createFunc = useSelector(createNodeFunction);

    // const selectedId = useSelector(selId);

    const itemNames = useSelector(recommendedWords);

    const horizontalScrollRef = useRef();
    const handleNextButtonClick = (nextType) => {
        console.log(nextType);
        if (!horizontalScrollRef.current) return;
        if (nextType === 'prev') {
            horizontalScrollRef.current.scrollTo({
                left: horizontalScrollRef.current.scrollLeft - horizontalScrollRef.current.offsetWidth,
                behavior: 'smooth',
            });
        } else {
            horizontalScrollRef.current.scrollTo({
                left: horizontalScrollRef.current.scrollLeft + horizontalScrollRef.current.offsetWidth,
                behavior: 'smooth',
            });
        }
    };

    return (
        <BottomBarRootContainer>
            <BottomBarContainer  >
                <ScrollContainer ref={horizontalScrollRef}>
                    {
                        itemNames.map((val, idx) => {
                            return (<BottomBarItem onClick={() => createFunc(val)} name={val} />);
                        })
                    }
                </ScrollContainer>
                <ButtonsContainer>
                    <ScrollButton style={{ marginRight: 12 }} onClick={() => handleNextButtonClick("prev")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19.9201L8.48 13.4001C7.71 12.6301 7.71 11.3701 8.48 10.6001L15 4.08008" stroke="#6D7A79" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </ScrollButton>
                    <ScrollButton style={{ marginRight: 20 }} onClick={() => handleNextButtonClick("next")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.91 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91 4.08008" stroke="#6D7A79" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </ScrollButton>
                    <div></div>
                    <PlusButton onClick={() => createFunc("")}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 18V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </PlusButton>
                </ButtonsContainer>
            </BottomBarContainer>
        </BottomBarRootContainer >
    );
}

export default BottomBar;