"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"
import { error } from "console";

interface FileUploadProps {
    onChange: (url? : string) => void;
    value: string;
    endpoint : "serverImage" | "messageFile"
}


export const FileUpload = ({
    onChange,
    value,
    endpoint
} : FileUploadProps) => {

    const fileType = value?.split(".").pop();
    // if an image value exists, we render image preview to show the selected image to be uploaded
    if( value && fileType != 'pdf'){
        return (
            <div className="relative h-20 w-20">
                <Image 
                    src={value}
                    fill alt ="Upload"
                    className=" rounded-full"
                />

                <button
                onClick={ () => onChange("")} 
                className="bg-rose-500 text-white p-1 rounder-full absolute
                 top-0 right-0 shadow-sm" 
                 type="button">
                    < X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    if( value && fileType === "pdf"){
        return(
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline" >
                    {value}
                </a> 
                
                <button
                onClick={ () => onChange("")} 
                className="bg-rose-500 text-white p-1 rounder-full absolute
                 -top-2 -right-2 shadow-sm" 
                 type="button">
                    < X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return ( 
        <div>
            <UploadDropzone 
                endpoint = {endpoint}
                onClientUploadComplete = { (res) => {
                    onChange( res?.[0].url)
                }}

                onUploadError = {  (error: Error) => {
                    console.log(error);
                }} 
            />
        </div>
     );
}
 