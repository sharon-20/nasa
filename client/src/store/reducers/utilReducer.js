

function convertTypeToNameAction(typeAction){
    return typeAction.toLowerCase().replace(/_(\w)/g,v=>v[1].toUpperCase())
}
export default function createReducer(state,action,handlers){
    const key=convertTypeToNameAction(action.type)
    const handler=handlers[key]
    if(handler){
        handler(state,action)
    }
}