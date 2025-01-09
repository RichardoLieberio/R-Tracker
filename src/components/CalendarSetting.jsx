import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import months from '../../config/months';

import {setYear as expenseSetYear, setMonth as expenseSetMonth, prevMonth as expensePrevMonth, nextMonth as expenseNextMonth} from '../redux/expensePageSlice';
import {setYear as chartSetYear, setMonth as chartSetMonth, prevMonth as chartPrevMonth, nextMonth as chartNextMonth} from '../redux/chartPageSlice';

import {
    getBackgroundColor,
    getTextColor, getTextNeutralColor,
    getHoverBgNeutral50Color,
    getShadowColor,
    getScrollbarTrackBackground, getScrollbarThumbText
} from '../css/color';

import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {TiArrowSortedDown} from 'react-icons/ti';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri';

export default function CalendarSetting(props) {
    const {arrow, smallGap, chartPage} = props;

    const theme = useSelector((state) => state.web.theme);
    const year = useSelector((state) => chartPage ? state.chartPage.year : state.expensePage.year);
    const month = useSelector((state) => chartPage ? state.chartPage.month : state.expensePage.month);

    const dispatch = useDispatch();

    return (
        <>
            <div className={`flex items-center ${smallGap ? 'gap-4' : 'gap-8'}`}>
                <Menu>
                    <MenuButton className="flex items-center gap-2 cursor-pointer">{year} <TiArrowSortedDown /></MenuButton>
                    <MenuItems transition anchor="bottom center" className={`w-28 ${new Date().getFullYear() - +process.env.START_YEAR + 1 > 7 && `h-72 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`} mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                        {
                            Array.from({length: new Date().getFullYear() - +process.env.START_YEAR + 1}, (_, i) => new Date().getFullYear() - i).map(year => (
                                <MenuItem key={year}>
                                    <button onClick={() => dispatch(chartPage ? chartSetYear(year) : expenseSetYear(year))} className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{year}</button>
                                </MenuItem>
                            ))
                        }
                    </MenuItems>
                </Menu>
                <Menu>
                    <MenuButton className="flex items-center gap-2 cursor-pointer">{months[month].slice(0, 3)} <TiArrowSortedDown /></MenuButton>
                    <MenuItems transition anchor="bottom center" className={`w-28 h-72 mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)} origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                        {
                            months.map((month, i) => (
                                <MenuItem key={month}>
                                    <button onClick={() => dispatch(chartPage ? chartSetMonth(i) : expenseSetMonth(i))} className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{month.slice(0, 3)}</button>
                                </MenuItem>
                            ))
                        }
                    </MenuItems>
                </Menu>
            </div>
            {
                arrow &&
                <div className={`flex items-center ${smallGap ? 'gap-4' : 'gap-8'}`}>
                    <span onClick={() => dispatch(chartPage ? chartPrevMonth() : expensePrevMonth())} className={`p-1 text-2xl ${year === +process.env.START_YEAR && month === 0 && getTextNeutralColor(theme)} cursor-pointer`}><RiArrowLeftSLine /></span>
                    <span onClick={() => dispatch(chartPage ? chartNextMonth() : expenseNextMonth())} className={`p-1 text-2xl ${year === new Date().getFullYear() && month === 11 && getTextNeutralColor(theme)} cursor-pointer`}><RiArrowRightSLine /></span>
                </div>
            }
        </>
    );
}

CalendarSetting.propTypes = {
    arrow: PropTypes.bool,
    smallGap: PropTypes.bool,
    chartPage: PropTypes.bool
};