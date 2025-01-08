import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import months from '../../config/months';

import {setYear, setMonth, prevMonth, nextMonth} from '../redux/expensePageSlice';

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
    const {arrow, smallGap} = props;

    const theme = useSelector((state) => state.web.theme);
    const year = useSelector((state) => state.expensePage.year);
    const month = useSelector((state) => state.expensePage.month);

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
                                    <button onClick={() => dispatch(setYear(year))} className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{year}</button>
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
                                    <button onClick={() => dispatch(setMonth(i))} className={`px-4 py-2 text-start ${getHoverBgNeutral50Color(theme)}`}>{month.slice(0, 3)}</button>
                                </MenuItem>
                            ))
                        }
                    </MenuItems>
                </Menu>
            </div>
            {
                arrow &&
                <div className={`flex items-center ${smallGap ? 'gap-4' : 'gap-8'}`}>
                    <span onClick={() => dispatch(prevMonth())} className={`p-1 text-2xl ${year === +process.env.START_YEAR && month === 0 && getTextNeutralColor(theme)} cursor-pointer`}><RiArrowLeftSLine /></span>
                    <span onClick={() => dispatch(nextMonth())} className={`p-1 text-2xl ${year === new Date().getFullYear() && month === 11 && getTextNeutralColor(theme)} cursor-pointer`}><RiArrowRightSLine /></span>
                </div>
            }
        </>
    );
}

CalendarSetting.propTypes = {
    arrow: PropTypes.bool,
    smallGap: PropTypes.bool
};