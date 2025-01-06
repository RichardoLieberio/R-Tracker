import PropTypes from 'prop-types';
import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import contr from '../controllers/expense';

import {
    getBackgroundColor, getBgPrimaryColor, getBgErrorColor,
    getHoverBgNeutral50Color, getHoverBgHighlightColor,
    getDisabledBgNeutralColor,
    getTextColor, getTextPrimaryColor, getTextErrorColor, getOppositeTextColor,
    getHoverTextHighlightColor,
    getShadowColor,
    getScrollbarTrackBackground, getScrollbarThumbText
} from '../css/color';
import css from '../css/expense';

import {Modal, Box} from '@mui/material';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {MdErrorOutline} from 'react-icons/md';
import Tooltip from './Tooltip';
import ButtonSpinner from './ButtonSpinner';

export default function AddExpenseModal(props) {
    const {modal, setModal, name, setName, amount, setAmount, date, setDate, category, setCategory, error, processing, submit} = props;

    const theme = useSelector((state) => state.web.theme);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);

    const [nameLabelClass, setNameLabelClass] = useState(css(theme).labelMiddle);
    const [nameInputClass, setNameInputClass] = useState(css(theme).defaultInput);
    const [amountLabelClass, setAmountLabelClass] = useState(css(theme).labelMiddle);
    const [amountInputClass, setAmountInputClass] = useState(css(theme).defaultInput);
    const [dateLabelClass, setDateLabelClass] = useState(css(theme).labelTopBlur);
    const [dateInputClass, setDateInputClass] = useState(css(theme).nonFocusInput);
    const [categoryLabelClass, setCategoryLabelClass] = useState(css(theme).labelMiddle);
    const [categoryInputClass, setCategoryInputClass] = useState(css(theme).nonFocusInput);
    const [categoryWidth, setCategoryWidth] = useState('auto');

    const categoryButtonRef = useRef(null);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        contr.inputErrorHandler(theme, error.expense, name, setNameLabelClass, setNameInputClass);
        contr.inputErrorHandler(theme, error.amount, amount, setAmountLabelClass, setAmountInputClass);
        contr.inputErrorHandler(theme, error.expenseDate, date, setDateLabelClass, setDateInputClass, true, true);
        contr.inputErrorHandler(theme, error.category, category?._id, setCategoryLabelClass, setCategoryInputClass, false, true);
    }, [error, modal, theme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        function updateCategoryWidth() {
            categoryButtonRef.current && setCategoryWidth(`${categoryButtonRef.current.offsetWidth}px`);
        };

        updateCategoryWidth();
        window.addEventListener('resize', updateCategoryWidth);

        return function() {
            window.removeEventListener('resize', updateCategoryWidth);
        }
    }, [categoryButtonRef?.current, categoryButtonRef?.current?.offsetWidth]); // eslint-disable-line react-hooks/exhaustive-deps

    function nameInputFocus() {
        if (error.expense) setNameLabelClass(css(theme).labelTopError)
        else setNameLabelClass(css(theme).labelTopFocus);
    }

    function nameInputBlur() {
        if (error.expense) setNameLabelClass(name ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setNameLabelClass(name ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function amountInputFocus() {
        if (error.amount) setAmountLabelClass(css(theme).labelTopError)
        else setAmountLabelClass(css(theme).labelTopFocus);
    }

    function amountInputBlur() {
        if (error.amount) setAmountLabelClass(amount ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setAmountLabelClass(amount ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function categoryHandler(category) {
        setCategoryLabelClass(error.category ? css(theme).labelTopError : css(theme).labelTopBlur)
        setCategory(category);
    }

    function enterKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            submit();
        }
    }

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Add Expense Modal" aria-describedby="Add new expense">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Add Expense</h2>
                    <small className="text-sm">Please fill in the details below to add a new expense to your records.</small>
                </header>
                <main>
                    <form onKeyDown={enterKeyDown} className="flex flex-col gap-8" autoCapitalize="off" autoComplete="off" spellCheck="false">
                        <section className="flex flex-col gap-4">
                            <div className="relative">
                                {
                                    error.expense
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.expense} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="name" className={nameLabelClass}>Name</label>
                                <input type="text" id="name" value={name} disabled={processing} autoFocus onChange={(e) => setName(e.target.value)} onFocus={nameInputFocus} onBlur={nameInputBlur} className={nameInputClass} />
                            </div>
                            <div className="relative">
                                {
                                    error.amount
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.amount} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="amount" className={amountLabelClass}>Amount</label>
                                <input type="number" id="amount" value={amount} disabled={processing} onChange={(e) => setAmount(e.target.value)} onFocus={amountInputFocus} onBlur={amountInputBlur} className={amountInputClass} />
                            </div>
                            <div className="relative">
                                {
                                    error.expenseDate
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.expenseDate} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="date" className={dateLabelClass}>Date</label>
                                <input type="date" id="date" value={date} disabled={processing} onChange={(e) => setDate(e.target.value)} className={dateInputClass} />
                            </div>
                            <div className="relative">
                                {
                                    error.category
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.category} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="category" className={categoryLabelClass}>Category</label>
                                <Menu>
                                    <MenuButton id="category" ref={categoryButtonRef} disabled={processing} className={`min-h-[42px] text-start ${categoryInputClass}`}>
                                        {category?.name}
                                    </MenuButton>
                                    <MenuItems transition anchor="top start" style={{width: categoryWidth}} className={`h-64 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)} rounded-lg z-[99999] origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                                        {
                                            expenseCategories?.map(category => (
                                                <MenuItem key={category._id}>
                                                    <button onClick={() => categoryHandler(category)} className={`px-4 py-2 flex items-center gap-2 text-start ${getHoverBgNeutral50Color(theme)}`}>
                                                        <div className="p-2 rounded-full flex-shrink-0" style={{backgroundColor: `#${category.color}`}}>
                                                            <img src={`${process.env.EXPENSE_CATEGORY_URI}/${category.icon}`} alt={category.name} className="w-4 h-4" />
                                                        </div>
                                                        <span className="truncate">{category.name}</span>
                                                    </button>
                                                </MenuItem>
                                            ))
                                        }
                                    </MenuItems>
                                </Menu>
                            </div>
                        </section>
                    </form>
                </main>
                <footer className="flex items-center justify-end gap-4">
                    <button onClick={() => setModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                    <button onClick={submit} disabled={processing} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                        {processing && <ButtonSpinner />}
                        <span className={processing ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </footer>
            </Box>
        </Modal>
    );
}

AddExpenseModal.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    name: PropTypes.string,
    setName: PropTypes.func,
    amount: PropTypes.string,
    setAmount: PropTypes.func,
    date: PropTypes.string,
    setDate: PropTypes.func,
    category: PropTypes.object,
    setCategory: PropTypes.func,
    error: PropTypes.object,
    processing: PropTypes.bool,
    submit: PropTypes.func
};