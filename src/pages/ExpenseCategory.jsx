import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {axiosController} from '../services/axios';
import getCSRFToken from '../services/getCSRFToken';
import {getToast} from '../services/toastService';

import {changePage} from '../redux/webSlice';
import {setOrder, setOrderBy, addProcess, deleteProcess} from '../redux/categoryPageSlice';

import contr from '../controllers/expenseCategory';

import {
    getBgPrimaryColor, getBackgroundColor,
    getHoverBgNeutral50Color, getHoverBgHighlightColor,
    getTextColor, getOppositeTextColor,
    getHoverTextHighlightColor,
    getBorderNeutralColor,
    getHoverBorderHighlightColor,
    getShadowColor
} from '../css/color';

import {HelmetProvider} from 'react-helmet-async';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {FaSortAlphaDown, FaSortAlphaUp} from 'react-icons/fa';
import ExpenseCategoryHead from '../head/ExpenseCategoryHead';
import ExpenseCategoryCard from '../components/ExpenseCategoryCard';
import AddCategoryModal from '../components/AddCategoryModal';
import CategoryModal from '../components/CategoryModal';
import ConfirmDeleteCategory from '../components/ConfirmDeleteCategory';

const orderOption = {
    'name': 'Name',
    'created_at': 'Created at',
    'updated_at': 'Updated at',
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

    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const theme = useSelector((state) => state.web.theme);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);
    const order = useSelector((state) => state.categoryPage.order);
    const orderBy = useSelector((state) => state.categoryPage.orderBy);
    const processing = useSelector((state) => state.categoryPage.processing);

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

    useEffect(function() {
        if (expenseCategories) {
            categoryModal && setCategory(expenseCategories.filter(cat => cat._id === category._id)[0]);
            deleteCategoryModal && !expenseCategories.some(cat => cat._id === category._id) && setDeleteCategoryModal(false);
        }
    }, [expenseCategories]); // eslint-disable-line react-hooks/exhaustive-deps

    function openCategoryModal(category) {
        setCategory(category);
        setCategoryModal(true);
    }

    async function openDeleteModal(e, category) {
        e.stopPropagation();
        setCategory(category);
        setDeleteCategoryModal(true);
    }

    async function addCategory() {
        if (!isAdding) {
            setIsAdding(true);
            setAddError({});
            await contr.addCategory(addName, setAddName, addColor, setAddColor, addIcon, setAddIcon, csrfToken, accessToken, setAddCategoryModal, setAddError);
            setIsAdding(false);
        }
    }

    async function hideHandler(e, category) {
        e.stopPropagation();

        if (!processing.includes(category._id)) {
            dispatch(addProcess(category._id));
            category.hidden
            ? await contr.unhideCategory(category._id, csrfToken, accessToken)
            : await contr.hideCategory(category._id, csrfToken, accessToken);
            dispatch(deleteProcess(category._id));
        }
    }

    async function deleteHandler() {
        if (!processing.includes(category._id)) {
            dispatch(addProcess(category._id));
            await contr.deleteCategory(category._id, csrfToken, accessToken);
            dispatch(deleteProcess(category._id));
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
                        passCategory?.map(category => <ExpenseCategoryCard key={category._id} category={category} openCategoryModal={openCategoryModal} openDeleteModal={openDeleteModal} hide={hideHandler} />)
                    }
                </main>
                <CategoryModal modal={categoryModal} setModal={setCategoryModal} category={category} />
                <ConfirmDeleteCategory modal={deleteCategoryModal} setModal={setDeleteCategoryModal} deleteCategory={deleteHandler} disabled={processing.includes(category._id)} />
            </section>
        </HelmetProvider>
    );
}