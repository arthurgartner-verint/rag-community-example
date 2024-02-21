import { motion } from "framer-motion";
import colors from "~/styles/colors";
import { IoMdSettings } from "react-icons/io";

interface MenuToggleProps {
    toggle: () => void;
}

const variants = {
    open: {
        rotate: 180,
        color: colors.verintBlue,
        scale: 2
    },
    closed: {
        rotate: 0,
        color: "initial",
        scale: 2
    }
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle }) => {
    return (
        <button onClick={toggle}>
            <motion.div variants={variants}>
                <div>
                    <IoMdSettings />
                </div>
            </motion.div>
        </button>
    );
};

export default MenuToggle;
