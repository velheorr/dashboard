

export const prepareSelect = (data, param, filtBy = false) =>{
    let changedData = data
    if (filtBy) {
        changedData = data.filter((i)=> i.Холдинг === filtBy )
    }
    let x = []
    changedData?.forEach(i => {
        if (!x.includes(i[param])){
            x.push(i[param])
        }
    } )
    x.sort()
    return x
}
