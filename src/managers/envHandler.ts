const envHandler = (envName:string) =>{
    const env = process.env[`REACT_APP_${envName}`];
    if(!env){
        throw new Error(`ENV ${envName} is not defined.`)
    }
    return env
}

export default envHandler