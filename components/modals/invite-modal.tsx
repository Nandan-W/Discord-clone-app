"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import axios, { Axios } from "axios";

import {Dialog, DialogContent, DialogDescription,DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";


import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";



export const InviteModal = () => {

    const {onOpen , isOpen , onClose, type,data}= useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const {server} = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

   const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);

        setCopied(true);

        setTimeout( () => {
            setCopied(false);
        }, 2000);
    }

    const onNew = async() =>{
        try{
            setIsLoading(true);
        
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
        
            onOpen("invite", {server:response.data});
        }
        catch(err){
            console.log(err);
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite Friends!
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 
                    dark:text-secondary/70" >
                        Server Invite Link
                    </Label>
                    <div
                        className="flex itemscenter mt-2 gap-x-2"
                    >
                        <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0
                        text-black focus-visible:ring-offset-0"
                        value={inviteUrl}
                        >
                        </Input>
                        <Button disabled={isLoading} onClick={onCopy} size="icon">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}                          
                        </Button>
                        

                    </div>
                    <Button disabled={isLoading }
                        variant="link"
                        size="sm"
                        onClick={onNew}
                        className="text-xs text-zinc-500 mt-4"
                    >
                        Generate a New Link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>
                </div>

              Invite Modal!!
            </DialogContent>

        </Dialog>
    );
}