const envHandler = (envName:string) =>{
    const env = process.env[envName];
    console.log(process.env['BACKEND_URL'])
    if(!env) throw new Error(`ENV ${envName} is not defined.`)
    return env
}

export default envHandler