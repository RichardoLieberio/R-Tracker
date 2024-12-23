import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {format} from 'date-fns';

import {setOrder, setOrderBy, setPage, setRowsPerPage, setUser} from '../redux/userPageSlice';

import {
    getBackgroundColor, getBgNeutral10Color,
    getHoverBgNeutral50Color,
    getTextColor, getTextNeutralColor,
    getBorderNeutralColor,
    getFocusBorderPrimaryColor, getFocusBorderHighlightColor,
    getShadowColor,
    getScrollbarTrackBackground, getScrollbarThumbText
} from '../css/color';

import {Menu, MenuButton, MenuItems, MenuItem} from '@headlessui/react';
import {IoDocumentText} from 'react-icons/io5';
import {TiArrowSortedUp, TiArrowSortedDown} from 'react-icons/ti';
import {RiArrowLeftSLine, RiArrowRightSLine, RiArrowLeftDoubleFill, RiArrowRightDoubleFill} from 'react-icons/ri';

export default function UserTable(props) {
    const users = [...props.users];
    const {setUserModal} = props;

    const theme = useSelector((state) => state.web.theme);
    const order = useSelector((state) => state.userPage.order);
    const orderBy = useSelector((state) => state.userPage.orderBy);
    const page = useSelector((state) => state.userPage.page);
    const rowsPerPage = useSelector((state) => state.userPage.rowsPerPage);
    const rowsOption = useSelector((state) => state.userPage.rowsOption);

    const dispatch = useDispatch();

    useEffect(function() {
        const max = Math.ceil(users.length / rowsPerPage);
        if (max < page) dispatch(setPage(max));
    }, [users, rowsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

    function sortHandler(sortBy) {
        if (sortBy === orderBy) {
            dispatch(setOrder(order === 'asc' ? 'desc' : 'asc'))
        } else {
            dispatch(setOrder('asc'));
            dispatch(setOrderBy(sortBy));
        }
    }

    function skipToFirst() {
        dispatch(setPage(1));
    }

    function skipToLast() {
        dispatch(setPage(Math.ceil(users.length / rowsPerPage)));
    }

    function prev() {
        dispatch(setPage(page - 1));
    }

    function next() {
        const max = Math.ceil(users.length / rowsPerPage);
        dispatch(setPage(page + 1 > max ? max : page + 1));
    }

    function pageHandler(e) {
        const input = e.target.value;
        const max = Math.ceil(users.length / rowsPerPage);
        if (/^\d*$/.test(input)) dispatch(setPage(+input > max ? max : +input));
    }

    function rowHandler(user) {
        dispatch(setUser(user));
        setUserModal(true);
    }

    const header = {
        'email': {title: 'Email', cls: 'w-64'},
        'name': {title: 'Name', cls: 'w-48'},
        'role': {title: 'Role', cls: 'w-20'},
        'created_at': {title: 'Created At', cls: 'w-64', date: true}
    };

    const newDisplayUsers = users.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
        if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    }).slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);

    return (
        <section className={`desktop:flex-1 desktop:whitespace-nowrap desktop:overflow-hidden w-full desktop:w-auto h-fit flex flex-col border ${getBorderNeutralColor(theme)} rounded-xl overflow-hidden`}>
            <div className={`w-full relative flex flex-col overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`}>
                <header className={`w-max px-6 py-3 sticky top-0 flex items-center gap-12 ${getBackgroundColor(theme)} border-b ${getBorderNeutralColor(theme)}`}>
                    {
                        Object.entries(header).map(([key, {title, cls}]) => (
                        <span onClick={() => sortHandler(key)} key={key} className={`${orderBy === key ? 'flex items-center gap-2' : ''} font-semibold ${cls} truncate cursor-pointer`}>
                            {title}
                            {orderBy === key && (order === 'asc' ? <TiArrowSortedUp /> : <TiArrowSortedDown />)}
                        </span>
                    ))
                    }
                </header>
                {
                    users.length
                    ? <main className="w-full min-h-12 max-h-96 flex flex-col">
                        {
                            newDisplayUsers.map((user, index) => (
                                <div onClick={() => rowHandler(user)} key={index} className={`w-max px-6 py-3 flex items-center gap-12 ${index % 2 === 0 ? getBgNeutral10Color(theme) : getBackgroundColor(theme)} ${getHoverBgNeutral50Color(theme)} cursor-pointer`}>
                                    {
                                        Object.entries(header).map(([key, {cls, date}]) => <span key={key + index} className={`${cls} truncate`}>{date ? format(new Date(user[key]), 'MMMM dd, yyyy HH:mm:ss') : user[key]}</span>)
                                    }
                                </div>
                            ))
                        }
                    </main>
                    : <main className={`w-full py-3 sticky left-0 flex items-center justify-center gap-1 text-center ${getBgNeutral10Color(theme)} ${getTextNeutralColor(theme)}`}>
                        <IoDocumentText /> No data
                    </main>
                }
            </div>
            <div className={`px-6 py-3 flex items-center justify-between gap-24 ${getBackgroundColor(theme)} border-t ${getBorderNeutralColor(theme)} overflow-x-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`}>
                <Menu>
                    <div className="flex items-center gap-2">
                        <span className="text-nowrap">Rows per page</span>
                        <MenuButton className="p-1 flex items-center gap-1">{rowsPerPage} <TiArrowSortedDown /></MenuButton>
                        <MenuItems transition anchor="top center" className={`w-20 mt-2 py-1 flex flex-col ${getTextColor(theme)} ${getBackgroundColor(theme)} shadow-lg ${getShadowColor(theme)} rounded-lg origin-top-right transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                            {
                                rowsOption.map(rows => (
                                    <MenuItem key={rows}>
                                        <span onClick={() => dispatch(setRowsPerPage(rows))} className={`px-4 py-2 ${getHoverBgNeutral50Color(theme)} cursor-pointer`}>{rows}</span>
                                    </MenuItem>
                                ))
                            }
                        </MenuItems>
                    </div>
                </Menu>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <RiArrowLeftDoubleFill onClick={skipToFirst} className={`text-xl font-bold ${page === 1 ? getTextNeutralColor(theme) : 'cursor-pointer'}`} />
                        <RiArrowLeftSLine onClick={prev} className={`text-xl font-bold ${page === 1 ? getTextNeutralColor(theme) : 'cursor-pointer'}`} />
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="text-nowrap">Page</span>
                        <input type="text" value={users.length ? page : 0} onChange={pageHandler} className={`w-16 max-w-72 px-2 py-1 text-right ${getBackgroundColor(theme)} border ${getBorderNeutralColor(theme)} rounded-md outline-none ${theme === 'dark' ? getFocusBorderHighlightColor(theme) : getFocusBorderPrimaryColor(theme)}`} autoCapitalize="off" autoComplete="off" spellCheck="false" />
                        <span className="text-nowrap">of {Math.ceil(users.length / rowsPerPage)}</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <RiArrowRightSLine onClick={next} className={`text-xl font-bold ${page === Math.ceil(users.length / rowsPerPage) || !users.length ? getTextNeutralColor(theme) : 'cursor-pointer'}`} />
                        <RiArrowRightDoubleFill onClick={skipToLast} className={`text-xl font-bold ${page === Math.ceil(users.length / rowsPerPage) || !users.length ? getTextNeutralColor(theme) : 'cursor-pointer'}`} />
                    </span>
                </div>
                <span className="text-nowrap">({users.length ? `${(page - 1) * rowsPerPage + 1} - ${Math.min(page * rowsPerPage, users.length)}. ` : ''}Total {users.length})</span>
            </div>
        </section>
    );
}

UserTable.propTypes = {
    users: PropTypes.array,
    setUserModal: PropTypes.func
};