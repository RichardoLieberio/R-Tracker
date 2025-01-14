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
    getTextColor, getTextPrimaryColor, getTextNeutralColor, getTextLinkColor, getTextErrorColor, getOppositeTextColor,
    getHoverTextHighlightColor,
    getShadowColor,
    getScrollbarTrackBackground, getScrollbarThumbText
} from '../css/color';
import css from '../css/expense';

import {Modal, Box} from '@mui/material';
import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {MdErrorOutline} from 'react-icons/md';
import DatePicker from 'react-datepicker';
import {IoIosCloseCircle} from 'react-icons/io';
import Tooltip from './Tooltip';
import ButtonSpinner from './ButtonSpinner';

export default function EditExpenseModal(props) {
    const {modal, setModal, expense, error, removeError, submit} = props;

    const theme = useSelector((state) => state.web.theme);
    const expenseCategories = useSelector((state) => state.data.expenseCategories);
    const processing = useSelector((state) => state.expensePage.processing);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState({});

    const [nameLabelClass, setNameLabelClass] = useState(css(theme).labelMiddle);
    const [nameInputClass, setNameInputClass] = useState(css(theme).defaultInput);
    const [amountLabelClass, setAmountLabelClass] = useState(css(theme).labelMiddle);
    const [amountInputClass, setAmountInputClass] = useState(css(theme).defaultInput);
    const [dateLabelClass, setDateLabelClass] = useState(css(theme).labelMiddle);
    const [dateInputClass, setDateInputClass] = useState(css(theme).nonFocusInput);
    const [categoryLabelClass, setCategoryLabelClass] = useState(css(theme).labelMiddle);
    const [categoryInputClass, setCategoryInputClass] = useState(css(theme).nonFocusInput);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [categoryWidth, setCategoryWidth] = useState('auto');

    const categoryButtonRef = useRef(null);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);

    useEffect(function() {
        contr.inputErrorHandler(theme, error.expense?.msg, name, setNameLabelClass, setNameInputClass);
        contr.inputErrorHandler(theme, error.amount?.msg, amount, setAmountLabelClass, setAmountInputClass);
        contr.inputErrorHandler(theme, error.expenseDate?.msg, date, setDateLabelClass, setDateInputClass, true);
        contr.inputErrorHandler(theme, error.category?.msg, category?._id, setCategoryLabelClass, setCategoryInputClass, true);
    }, [error, modal, theme]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(function() {
        if (modal) {
            const category = expenseCategories?.reduce((obj, cat) => {
                if (cat._id === expense?.category_id || cat._id === error.category?.value) return {_id: cat._id, name: cat.name};
                return obj;
            }, {});

            setName(error.expense?.value ?? expense?.expense);
            setAmount(error.amount?.value ?? expense?.amount);
            setDate(error.expenseDate?.value ?? expense?.expense_date.split('T')[0]);
            setCategory(category);

            contr.inputErrorHandler(theme, error.expense?.msg, error.expense?.value ?? expense?.expense, setNameLabelClass, setNameInputClass);
            contr.inputErrorHandler(theme, error.amount?.msg, error.amount?.value ?? expense?.amount, setAmountLabelClass, setAmountInputClass);
            contr.inputErrorHandler(theme, error.expenseDate?.msg, error.expenseDate?.value ?? expense?.expense_date, setDateLabelClass, setDateInputClass, true);
            contr.inputErrorHandler(theme, error.category?.msg, error.category?.value ?? expense?.category_id, setCategoryLabelClass, setCategoryInputClass, true);
        }
    }, [modal]); // eslint-disable-line react-hooks/exhaustive-deps

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
        if (error.expense?.msg) setNameLabelClass(css(theme).labelTopError)
        else setNameLabelClass(css(theme).labelTopFocus);
    }

    function nameInputBlur() {
        if (error.expense?.msg) setNameLabelClass(name ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setNameLabelClass(name ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function amountInputFocus() {
        if (error.amount?.msg) setAmountLabelClass(css(theme).labelTopError)
        else setAmountLabelClass(css(theme).labelTopFocus);
    }

    function amountInputBlur() {
        if (error.amount?.msg) setAmountLabelClass(amount ? css(theme).labelTopError : css(theme).labelMiddleError)
        else setAmountLabelClass(amount ? css(theme).labelTopBlur : css(theme).labelMiddle);
    }

    function dateHandler(date) {
        setOpenDatePicker(false);
        if (!processing.includes(expense?._id)) {
            setDateLabelClass(error.expenseDate?.msg
                ? date ? css(theme).labelTopError : css(theme).labelMiddleError
                : date ? css(theme).labelTopBlur : css(theme).labelMiddle);
            setDate(date);
        }
    }

    function categoryHandler(category) {
        setCategoryLabelClass(error.category?.msg ? css(theme).labelTopError : css(theme).labelTopBlur)
        setCategory(category);
    }

    function reset() {
        if (processing.includes(expense?._id)) return;
        setName(expense.expense);
        setAmount(expense.amount.toString());
        setDate(expense.expense_date);
        setCategory({
            _id: expense.category_id,
            name: expense.category.name
        });
        removeError(expense._id);
    }

    function enterKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            submit(expense?._id, name, amount, date, category?._id);
        }
    }

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Add Expense Modal" aria-describedby="Add new expense">
            <Box className={`w-1/3 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 h-auto p-7 phone:p-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <header className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Edit Expense</h2>
                    <small className="text-sm">Edit the expense details below. Remember to save your changes when you&apos;re done. <span onClick={reset} className={processing.includes(expense?._id) ? theme === 'dark' ? getTextNeutralColor(theme) : getTextLinkColor(theme) : `${theme == 'dark' ? getTextLinkColor(theme) : getTextPrimaryColor(theme)} cursor-pointer hover:underline`}>Reset</span></small>
                </header>
                <main>
                    <form onKeyDown={enterKeyDown} className="flex flex-col gap-8" autoCapitalize="off" autoComplete="off" spellCheck="false">
                        <section className="flex flex-col gap-4">
                            <div className="relative">
                                {
                                    error.expense?.msg
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.expense?.msg} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="name" className={nameLabelClass}>Name</label>
                                <input type="text" id="name" value={name} disabled={processing.includes(expense?._id)} onChange={(e) => setName(e.target.value)} onFocus={nameInputFocus} onBlur={nameInputBlur} className={nameInputClass} />
                            </div>
                            <div className="relative">
                                {
                                    error.amount?.msg
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.amount?.msg} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="amount" className={amountLabelClass}>Amount</label>
                                <input type="number" id="amount" value={amount} disabled={processing.includes(expense?._id)} onChange={(e) => setAmount(e.target.value)} onFocus={amountInputFocus} onBlur={amountInputBlur} className={amountInputClass} />
                            </div>
                            <div className="relative">
                                {
                                    error.expenseDate?.msg
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md z-10">
                                            <Tooltip title={error.expenseDate?.msg} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="date" className={`${dateLabelClass} z-10 ${processing.includes(expense?._id) ? '!cursor-text' : '!cursor-pointer'}`}>Date</label>
                                <DatePicker id="date" open={openDatePicker} readOnly disabled={processing.includes(expense?._id)} selected={date} popperPlacement="top" onInputClick={() => setOpenDatePicker(true)} onClickOutside={() => setOpenDatePicker(false)} onChange={dateHandler} customInput={<input type="text" className={`${dateInputClass} cursor-pointer`} />} todayButton={<span>Today</span>} minDate={new Date(process.env.START_YEAR, 0, 1)} maxDate={new Date(new Date().getFullYear(), 12, 0)} wrapperClassName="w-full" />
                                {date && <IoIosCloseCircle onClick={() => dateHandler('')} className={`absolute top-1/2 -translate-y-1/2 right-2 text-xl ${processing.includes(expense?._id) ? 'cursor-not-allowed' : 'cursor-pointer'}`} />}
                            </div>
                            <div className="relative">
                                {
                                    error.category?.msg
                                    &&  <div className="px-3 py-3 absolute left-0 top-0 rounded-tr-md rounded-br-md">
                                            <Tooltip title={error.category?.msg} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                                <MdErrorOutline className={`text-lg ${getTextErrorColor(theme)}`} />
                                            </Tooltip>
                                        </div>
                                }
                                <label htmlFor="category" className={`${categoryLabelClass} ${processing.includes(expense?._id) ? '!cursor-text' : '!cursor-pointer'}`}>Category</label>
                                <Menu>
                                    <MenuButton id="category" ref={categoryButtonRef} disabled={processing.includes(expense?._id)} className={`min-h-[42px] text-start truncate ${categoryInputClass}`}>
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
                    <button onClick={() => submit(expense?._id, name, amount, date, category?._id)} disabled={processing.includes(expense?._id)} className={`py-1 ${phoneBreakpoint ? 'px-8' : 'px-4'} relative ${getOppositeTextColor(theme)} ${getBgPrimaryColor(theme)} rounded-md ${getHoverBgHighlightColor(theme)} ${getDisabledBgNeutralColor(theme)} disabled:cursor-not-allowed`}>
                        {processing.includes(expense?._id) && <ButtonSpinner />}
                        <span className={processing.includes(expense?._id) ? 'opacity-0' : ''}>Submit</span>
                    </button>
                </footer>
            </Box>
        </Modal>
    );
}

EditExpenseModal.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    expense: PropTypes.object,
    error: PropTypes.object,
    removeError: PropTypes.func,
    submit: PropTypes.func
};