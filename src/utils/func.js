
export const prepareSelect = (data, param, filtBy = false) =>{
    let changedData = data
    let x = []

    if (param === 'Холдинг'){
        changedData = changedData.filter((i)=> i.Холдинг !== '' )
    }

    changedData.forEach(i => {
        if (!x.includes(i[param])){
            x.push(i[param])
        }
    } )
    x.sort()
    return x
}
