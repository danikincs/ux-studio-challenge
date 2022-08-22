import { useEffect, RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref:RefObject<HTMLDivElement>, showSettingDetails:string, setShowSettingDetails:(data:string) => void ) {
    useEffect(() => {
        /**
         * Set popup to empty string if clicked outside
         */
        function handleClickOutside(event:any) {
            if (ref.current && !ref.current.contains(event.target) && !showSettingDetails.length) {
                setShowSettingDetails('');
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
}