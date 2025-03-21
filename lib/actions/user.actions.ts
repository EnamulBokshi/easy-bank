'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import path from "path"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"



export const signIn = async ({email,password}:signInProps)=>{
    try {
        const {account} = await createAdminClient();
        const session = await account.createEmailPasswordSession(email,password);
        (await cookies()).set("appwrite-session",session.secret,{
            
                path:'/',
                httpOnly:true,
                sameSite:'strict',
                secure:true
            
        })

        return parseStringify(session)
    } catch (error) {
        // console.log(error)
        return null

    }
}

export const signUp = async (userData:SignUpParams)=>{
    const {email,password,firstName,lastName} = userData;
    try {
        const {account} = await createAdminClient();
        const newUserAccount = await account.create(ID.unique(),email,password,`${firstName} ${lastName}`);

        const session = await account.createEmailPasswordSession(email,password);

        (await cookies()).set("appwrite-session",session.secret,{
            path:'/',
            httpOnly:true,
            sameSite:'strict',
            secure:true
        })
        
        return parseStringify(newUserAccount)
    } catch (error) {
        console.log(error)
    }
}

export async function getLoggedUser(){
    try {
     
        const {account} = await createSessionClient();
        const user = await account.get();
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function logoutUser(){
    try {
        const {account} = await createSessionClient();
        (await cookies()).delete("appwrite-session")
        await account.deleteSession('current')
    } catch (error) {
        return null
    }
}