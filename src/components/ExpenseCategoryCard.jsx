import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {
    getBackgroundColor, getBgNeutral10Color,
    getHoverBgNeutral50Color,
    getTextColor, getTextErrorColor,
    getBorderNeutralColor,
    getShadowColor
} from '../css/color';

import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {FaPencilAlt, FaEye, FaEyeSlash, FaTrashAlt} from 'react-icons/fa';

export default function ExpenseCategoryCard(props) {
    const {category, openCategoryModal, openDeleteModal, hide} = props;

    const theme = useSelector((state) => state.web.theme);

    return (
        <div onClick={() => openCategoryModal(category)} className={`w-full px-6 py-4 relative flex flex-col gap-2 ${category.hidden && getBgNeutral10Color(theme)} border ${getBorderNeutralColor(theme)} rounded-xl ${getHoverBgNeutral50Color(theme)} cursor-pointer`}>
            {category.hidden && <FaEyeSlash className="absolute top-4 left-4" />}
            <Menu>
                <MenuButton onClick={e => e.stopPropagation()} className="p-1 absolute top-3 right-2">
                    <BsThreeDotsVertical />
                </MenuButton>
                <MenuItems transition anchor="bottom end" className={`w-36 mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                    <MenuItem>
                        <button className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                            <FaPencilAlt className="flex-shrink-0 text-lg" />
                            Edit
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button onClick={(e) => hide(e, category)} className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                            {
                                category.hidden
                                ? <>
                                    <FaEye className="flex-shrink-0 text-lg" />
                                    Unhide
                                </>
                                : <>
                                    <FaEyeSlash className="flex-shrink-0 text-lg" />
                                    Hide
                                </>
                            }
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button onClick={(e) => openDeleteModal(e, category)} className={`px-4 py-2 flex items-center gap-2 text-start ${getTextErrorColor(theme)} ${getHoverBgNeutral50Color(theme)}`}>
                            <FaTrashAlt className="flex-shrink-0 text-lg" />
                            Delete
                        </button>
                    </MenuItem>
                </MenuItems>
            </Menu>
            <div className="p-3 mx-auto rounded-full" style={{backgroundColor: `#${category.color}`}}>
                <img src={`${process.env.EXPENSE_CATEGORY_URI}/${category.icon}`} alt={category.name} className="w-10 h-10" />
            </div>
            <span className="truncate overflow-hidden">{category.name}</span>
        </div>
    );
}

ExpenseCategoryCard.propTypes = {
    category: PropTypes.object,
    openCategoryModal: PropTypes.func,
    openDeleteModal: PropTypes.func,
    hide: PropTypes.func,
};