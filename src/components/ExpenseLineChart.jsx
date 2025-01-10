import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import themes from '../../config/theme';

import {LineChart} from '@mui/x-charts/LineChart';
import {axisClasses} from '@mui/x-charts/ChartsAxis';

export default function ExpenseLineChart(props) {
    const {size, dates, expenses, month} = props;

    const theme = useSelector((state) => state.web.theme);

    return (
        <LineChart
            xAxis={[{
                data: dates,
                min: 1,
                max: dates.length,
                label: month,
                labelStyle: {fill: themes[theme].text}
            }]}
            leftAxis={null}
            series={[{
                data: expenses,
                color: themes[theme][theme === 'dark' ? 'highlight' : 'primary'],
            }]}
            width={size}
            height={size / 5 * 4}
            sx={() => ({
                [`.${axisClasses.root}`]: {
                    [`.${axisClasses.tick}, .${axisClasses.line}`]: {
                        stroke: themes[theme].text
                    },
                    [`.${axisClasses.tickLabel}`]: {
                        fill: themes[theme].text
                    }
                },
                [`.${axisClasses.yAxis} .${axisClasses.tickLabel}`]: {
                    display: 'none'
                }
            })}
        />
    );
}

ExpenseLineChart.propTypes = {
    size: PropTypes.number,
    dates: PropTypes.array,
    expenses: PropTypes.array,
    month: PropTypes.string
};