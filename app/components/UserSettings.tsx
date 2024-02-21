import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import MenuToggle from "./MenuToggle";
import UserSettingsList from "./UserSettingsList";

const UserSettings: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                event.target instanceof Node &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        // Add event listeners
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef]);

    const sidebar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
            },
            boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            opacity: 2,
        }),
        closed: {
            clipPath: "circle(30px at 335px 8px)",
            transition: {
                delay: 0,
                type: "spring",
                stiffness: 400,
                damping: 40,
            },
            boxShadow: "none",
            opacity: 0,
        },
    };

    return (
        <div>
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                custom={"1000px"}
                ref={containerRef}
                className="relative inline w-[60px]"
            >
                <div className="text-end h-full flex justify-end ">
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} />
                </div>
                <motion.div
                    className={`absolute w-fit h-auto top-[40px] right-0 bg-background-light rounded-2xl overflow-hidden`}
                    variants={sidebar}
                >
                    <UserSettingsList />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default UserSettings