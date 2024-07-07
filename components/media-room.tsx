"use client";

import { use, useEffect , useState } from "react";
import {LiveKitRoom , VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Channel } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";


interface MediaRoomProps{
    chatId: string;
    video: boolean;
    audio: boolean;
}

export const MediaRoom = ({
    chatId,
    video,
    audio,
} : MediaRoomProps ) => {
    const { user } = useUser();
    const [token, setToken ] = useState("");

    useEffect( () => {
        if( !user?.firstName || !user?.lastName )
            return;

        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try{
                const response = await fetch(`/api/livekit?room=${chatId}&username=${name}`);

                const data = await response.json();
                setToken(data.token);

            }
            catch(err){
                console.log(err);
            }
        })()
        // this last empty bracket outside this above async function is to execute it
    } , [user?.firstName, user?.lastName , chatId]);

    if(token === ""){
        // means we still fetching the token

        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 
                    className="h-7 w-7 text-zinc-500 animate-spin my-4"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading......
                </p>

            </div>
        )
    }

    return (
        <LiveKitRoom 
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}