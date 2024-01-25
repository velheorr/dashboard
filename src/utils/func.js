export const prepareSelect = (data, param, filter = '') =>{
    let changedData = data
    if (filter) {
        changedData = data.filter((i)=>{
            return i !== filter
        })
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
