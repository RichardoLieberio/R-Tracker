import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';
import {setOrder, setOrderBy} from '../redux/categoryPageSlice';

import contr from '../controllers/expenseCategory';

import {
    getBgPrimaryColor, getBackgroundColor, getBgNeutral10Color,
    getHoverBgNeutral50Color, getHoverBgHighlightColor,
    getTextColor, getOppositeTextColor, getTextErrorColor,
    getHoverTextHighlightColor,
    getBorderNeutralColor,
    getHoverBorderHighlightColor,
    getShadowColor
} from '../css/color';

import {HelmetProvider} from 'react-helmet-async';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {FaPencilAlt, FaEye, FaEyeSlash, FaSortAlphaDown, FaSortAlphaUp} from 'react-icons/fa';
import ExpenseCategoryHead from '../head/ExpenseCategoryHead';
import AddCategoryModal from '../components/AddCategoryModal';
import CategoryModal from '../components/CategoryModal';

const orderOption = {
    'name': 'Name',
    'created_at': 'Created at',
    'hidden': 'Hidden'
};

export default function ExpenseCategory() {
    const [csrfToken, setCSRFToken] = useState('');
    const [passCategory, setPassCategory] = useState(null);
    const [category, setCategory] = useState({});
    const [categoryModal, setCategoryModal] = useState(false);

    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [addName, setAddName] = useState('');
    const [addColor, setAddColor] = useState('');
    const [addIcon, setAddIcon] = useState('');
    const [addIconText, setAddIconText] = useState('');
    const [addError, setAddError] = useState({});
    const [isAdding, setIsAdding] = useState(false);

    const theme = useSelector((state) => state.web.theme);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);
    const order = useSelector((state) => state.categoryPage.order);
    const orderBy = useSelector((state) => state.categoryPage.orderBy);

    const location = useLocation();
    const dispatch = useDispatch();

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    const fullLayout = useMediaQuery('(min-width: 1200px)');

    useEffect(function() {
        getToast();
        dispatch(changePage(location.pathname));

        getCSRFToken(setCSRFToken);
        !expenseCategories && contr.getCategories(accessToken);

        return function() {
            axiosController && axiosController.abort();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        expenseCategories && setPassCategory([...expenseCategories].sort((a, b) => {
            if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
            if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
        }));
    }, [expenseCategories, order, orderBy]);

    function openCategoryModal(category) {
        setCategory(category);
        setCategoryModal(true);
    }

    async function addCategory() {
        if (!isAdding) {
            setIsAdding(true);
            setAddError({});
            await contr.addCategory(addName, setAddName, addColor, setAddColor, addIcon, setAddIcon, csrfToken, accessToken, setAddCategoryModal, setAddError);
            setIsAdding(false);
        }
    }

    return (
        <HelmetProvider>
            <ExpenseCategoryHead />
            <section className="w-2/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 mx-auto py-8 pb-16 flex flex-col gap-8">
                <header className="flex flex-col-reverse items-end gap-8 tablet:flex-row tablet:items-center tablet:justify-between">
                    <section className="w-full tablet:w-auto flex items-center justify-between phone:justify-start gap-4">
                        <label htmlFor="sort">{phoneBreakpoint ? 'Sort by' : 'Sort'}</label>
                        <Menu>
                            <MenuButton id="sort" className={`w-28 phone:w-40 tablet:w-48 h-10 px-4 text-start border ${getBorderNeutralColor(theme)} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>{orderOption[orderBy]}</MenuButton>
                            <MenuItems transition anchor="bottom start" className={`py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg z-[99999] origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                                {
                                    Object.entries(orderOption).map(([key, value]) => (
                                        <MenuItem key={key}>
                                            <button onClick={() => dispatch(setOrderBy(key))} className={`w-28 phone:w-40 tablet:w-48 px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{value}</button>
                                        </MenuItem>
                                    ))
                                }
                            </MenuItems>
                        </Menu>
                        <button onClick={() => dispatch(setOrder(order === 'desc' ? 'asc' : 'desc'))} className={`w-10 h-10 flex items-center justify-center border ${getBorderNeutralColor(theme)} rounded-md ${getHoverTextHighlightColor(theme)} ${getHoverBorderHighlightColor(theme)}`}>
                            {order === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />}
                        </button>
                    </section>
                    <button onClick={() => setAddCategoryModal(true)} className={`w-fit py-1 px-8 relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)}`}>Add category</button>
                    <AddCategoryModal modal={addCategoryModal} setModal={setAddCategoryModal} name={addName} setName={setAddName} color={addColor} setColor={setAddColor} icon={addIcon} setIcon={setAddIcon} iconText={addIconText} setIconText={setAddIconText} error={addError} processing={isAdding} submit={addCategory} />
                </header>
                <main className={`grid ${fullLayout ? 'grid-cols-5' : 'phone:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4'} gap-4 text-center`}>
                    {
                        passCategory?.map(category => (
                            <div onClick={() => openCategoryModal(category)} key={category._id} className={`w-full px-6 py-4 relative flex flex-col gap-2 ${category.hidden && getBgNeutral10Color(theme)} border ${getBorderNeutralColor(theme)} rounded-xl ${getHoverBgNeutral50Color(theme)} cursor-pointer`}>
                                {category.hidden && <FaEyeSlash className="absolute top-4 left-4" />}
                                <Menu>
                                    <MenuButton onClick={e => e.stopPropagation()} className="absolute top-4 right-3">
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
                                            <button className={`px-4 py-2 flex items-center gap-2 text-start ${!category.hidden && getTextErrorColor(theme)} ${getHoverBgNeutral50Color(theme)}`}>
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
                                    </MenuItems>
                                </Menu>
                                <div className="p-3 mx-auto rounded-full" style={{backgroundColor: `#${category.color}`}}>
                                    <img src={`${process.env.EXPENSE_CATEGORY_URI}/${category.icon}`} alt={category.name} className="w-10 h-10" />
                                </div>
                                <span className="truncate overflow-hidden">{category.name}</span>
                            </div>
                        ))
                    }
                </main>
                <CategoryModal modal={categoryModal} setModal={setCategoryModal} category={category} />
            </section>
        </HelmetProvider>
    );
}