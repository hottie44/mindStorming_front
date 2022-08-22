import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { store } from "../../app/store";

/* ---------- WebSocket ---------- */
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export const uuid = uuidv4();

const ws = new WebSocket("wss://hottie.winty.io/connect/" + uuid);

ws.onopen = function (event) {
    console.log(event);
};

window.addEventListener('beforeunload', () => {
    ws.close();
});

/* ---------- Slice ---------- */
var initialState = {
    nodes: [],
    edges: [],
    selectedId: 0,
    recommendedWords: [],
    createNodeFunction: () => { },
    selectedColor: "#FFFFFF",
    changeColorFunction: () => { },
    updatable: true,
    textSelectFunction: () => { },
};


export const findRecommendedWordAsync = createAsyncThunk(
    "flow/findRecommendedWordAsync",
    async word => {
        console.log("findRecommendedWordAsync", word);
        let res = await fetch('https://hottie.winty.io/word', {
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word: word ? word : "" }),
        });

        let json = await res.json();
        console.log(json);

        return json;
    }
);

export const createNewNode = createAsyncThunk(
    "flow/createNewNode",
    async data => {
        await fetch('https://hottie.winty.io/node/create', {
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "parent": parseInt(data.parentId),
                "label": data.label,
                "color": data.color
            }),
        });
    }
);

export const updateNode = createAsyncThunk(
    "flow/updateNode",
    async data => {
        console.log("updateNode", data);

        let body = { id: data.id };
        if (data.label) body.label = data.label;
        if (data.color) body.color = data.color;

        await fetch('https://hottie.winty.io/node/update', {
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
);

export const removeNode = createAsyncThunk(
    "flow/removeNode",
    async data => {
        await fetch('https://hottie.winty.io/node/remove', {
            method: 'POST', // 또는 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: data }),
        });
    }
);

export const flowSlice = createSlice({
    name: "flow",
    initialState,
    reducers: {
        SetTextSelectFunction: (state, action) => {
            state.textSelectFunction = action.payload;
        },
        SetChangeColor: (state, action) => {
            state.changeColorFunction = action.payload;
        },
        SetColor: (state, action) => {
            state.selectedColor = action.payload;
            state.changeColorFunction(action.payload);
        },
        SetCreateNodeFunction: (state, action) => {
            state.createNodeFunction = action.payload;
        },
        SelectNode: (state, action) => {
            console.log("SelectNode", parseInt(action.payload));
            state.selectedId = parseInt(action.payload);
        },
        updateNodes: (state, action) => {
            state.nodes = action.payload;
        },
        updateEdges: (state, action) => {
            console.log(action.payload);
            state.edges = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(findRecommendedWordAsync.pending, state => {
                // state.recommendedWords = [];
            })
            .addCase(findRecommendedWordAsync.fulfilled, (state, action) => {
                state.recommendedWords = action.payload;
            })
            .addCase(findRecommendedWordAsync.rejected, (state, action) => {
                console.log("asdfasdf");
                console.log(state, action);
                state.recommendedWords = action.payload;
            })
            .addCase(createNewNode.pending, state => {
                state.updatable = false;
            })
            .addCase(createNewNode.fulfilled, (state, action) => {
                state.updatable = true;
            })
            .addCase(createNewNode.rejected, (state, action) => {
                state.updatable = true;
            })
            .addCase(updateNode.pending, state => {
                state.updatable = false;
            })
            .addCase(updateNode.fulfilled, (state, action) => {
                state.updatable = true;
            })
            .addCase(updateNode.rejected, (state, action) => {
                state.updatable = true;
            })
            .addCase(removeNode.pending, state => {
                state.updatable = false;
            })
            .addCase(removeNode.fulfilled, (state, action) => {
                state.updatable = true;
            })
            .addCase(removeNode.rejected, (state, action) => {
                state.updatable = true;
            });;
    },
});

export const { SetTextSelectFunction, SetTextFunc, updateNodes, updateEdges, SelectNode, SetCreateNodeFunction, SetColor, SetChangeColor, } = flowSlice.actions;

export const nodes = state => state.flow.nodes;
export const edges = state => state.flow.edges;
export const selectedId = state => state.flow.selectedId;
export const recommendedWords = state => state.flow.recommendedWords;
export const selectedColor = state => state.flow.selectedColor;
export const createNodeFunction = state => state.flow.createNodeFunction;
export const textSelectFunction = state => state.flow.textSelectFunction;

let init = false;
ws.onmessage = function (event) {

    let data = JSON.parse(event.data);

    console.log("ws.onMsg", data);

    store.dispatch(updateNodes(data.nodes));
    store.dispatch(updateEdges(data.edges));
    // store.dispatch(SetTextFunc(data.nodes));

    if (!init) {
        store.dispatch(findRecommendedWordAsync(data.nodes[0].data.label));
        store.dispatch(textSelectFunction(data.nodes[0].data.label));
        init = true;
    }
}

export default flowSlice.reducer;
