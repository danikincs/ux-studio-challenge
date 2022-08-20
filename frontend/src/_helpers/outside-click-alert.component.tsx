import React, { useEffect, RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref:RefObject<HTMLDivElement>, showSettingDetails:string, setShowSettingDetails:(data:string) => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event:any) {
            console.log('haha', showSettingDetails, ref)
            if (ref.current && !ref.current.contains(event.target) && showSettingDetails.length) {
                setShowSettingDetails('');
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [ref]);
}