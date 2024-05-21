import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Server } from "lucide-react";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function PATCH(
    req:Request,
    {params}: {params : {serverId : string}}
){
    try{
        const profile = await currentProfile();
        const { name, imageUrl} = await req.json();
        // we get the data to be updated from the incoming requst and parse it as a json

        if( !profile ){
            return new NextResponse("Unauthorised", {status:401});
        }

        const server = await db.server.update({
            where:{
                id:params.serverId,
                profileId: profile.id
                // we add profileid to ensure tht only admin can modify server 
            },
            data:{
                name:name,
                imageUrl:imageUrl
            }
        })

        return NextResponse.json(server);
    }
    catch (err){
        console.log("[SERVER_ID_PATCH]",err);
        return new NextResponse("Internal error", {status:500});
    }
}



// this file is for edit server/ server setting post function route