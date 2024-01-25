

export const prepareSelect = (data, param, filtBy = false) =>{
    let changedData = data
    console.log(param, filtBy)
    if (filtBy) {
        changedData = data.filter((i)=> i.Холдинг == filtBy )
    }
    console.log(changedData)
    let x = []
    changedData?.forEach(i => {
        if (!x.includes(i[param])){
            x.push(i[param])
        }
    } )
    x.sort()
    return x
}
