"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltips";

export const NavigationAction = () => {
    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a Server">
                
                <button className="group flex items-center">
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px]
                    group-hover:rounded-[16px] transition-all overflow-hidden 
                    items-center justify-center bg-background dark:bg-neutral-700
                    group-hover:bg-emerald-500">
                        <Plus className="group-hover:text-white transition text-emerald-500"
                        size={25}>

                        </Plus>
                    </div>
                </button>
                {/* Action */}
                {/* the error " Uncaught Error: React.Children.only expected to receive a single React element child."
                means only one object goes inside this reactnode tooltip component made by us */}
            </ActionTooltip>
            </div>
    )
}