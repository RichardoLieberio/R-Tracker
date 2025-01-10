import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useMediaQuery} from '@mui/material';

import breakpoints from '../../config/breakpoints';

import {getBgErrorColor, getOppositeTextColor} from '../css/color';

import {PieChart} from '@mui/x-charts/PieChart';
import Skeleton from './Skeleton';
import Tooltip from './Tooltip';

export default function ExpensePieChart(props) {
    const {chart, total} = props;

    const theme = useSelector((state) => state.web.theme);

    const phoneBreakpoint = useMediaQuery(`(min-width: ${breakpoints.phone})`);
    const desktopBreakpoint = useMediaQuery(`(min-width: ${breakpoints.desktop})`);

    const size = desktopBreakpoint ? 224 : phoneBreakpoint ? 192 : 160;

    return (
        <section className="flex flex-col tablet:flex-row items-center justify-center gap-8 tablet:gap-20">
            {
                chart
                ? <div className="w-fit relative">
                    <PieChart series={[{data: chart, innerRadius: size / 3, outerRadius: size / 2, cx: desktopBreakpoint ? 108 : phoneBreakpoint ? 92 : 76}]} width={size + 2} height={size + 2} slotProps={{legend: {hidden: true}}} />
                    <span className="max-w-24 phone:max-w-28 desktop:max-w-36 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 truncate">{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
                : <Skeleton className="w-40 min-w-40 max-w-40 h-40 min-h-40 max-h-40 phone:w-48 phone:min-w-48 phone:max-w-48 phone:h-48 phone:min-h-48 phone:max-h-48 desktop:w-56 desktop:min-w-56 desktop:max-w-56 desktop:h-56 desktop:min-h-56 desktop:max-h-56" />
            }
            <div className="w-full max-w-80 flex flex-col gap-4">
                {
                    chart
                    ? Object.values(chart).map(({color, label, value}, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="w-64 flex items-center gap-2">
                                <Tooltip title={(total === 0 ? 0 : value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} placement="top-start" posY={-8} className={`w-fit max-w-32 phone:max-w-40 tablet:max-w-48 desktop:max-w-56 px-4 py-1 text-sm ${getOppositeTextColor(theme)} ${getBgErrorColor(theme)} rounded-md`}>
                                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: color}}></div>
                                </Tooltip>
                                <span className="truncate">{label}</span>
                            </span>
                            <span className="w-16 text-end">{!isFinite(((value / total) * 100).toFixed(2)) ? 0 : ((value / total) * 100).toFixed(2)}%</span>
                        </div>
                    ))
                    : <>
                        <Skeleton className="min-w-full max-w-80 h-6" />
                        <Skeleton className="min-w-full max-w-80 h-6" />
                        <Skeleton className="min-w-full max-w-80 h-6" />
                        <Skeleton className="min-w-full max-w-80 h-6" />
                    </>
                }
            </div>
        </section>
    );
}

ExpensePieChart.propTypes = {
    chart: PropTypes.array,
    total: PropTypes.number
};