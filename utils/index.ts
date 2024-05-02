export const delay = (n:number) => {
    return new Promise<void>((res)=> {
        setTimeout(() => {
            res()
        }, n)
    })
}