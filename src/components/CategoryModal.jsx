import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';

import {
    getBackgroundColor,
    getTextPrimaryColor, getTextColor, getTextNeutralColor,
    getHoverTextHighlightColor,
    getBorderNeutralColor,
    getScrollbarTrackBackground,
    getScrollbarThumbText
} from '../css/color';

import {Modal, Box} from '@mui/material';
import {FaEyeSlash} from 'react-icons/fa';

export default function CategoryModal(props) {
    const {modal, setModal, category} = props;

    const theme = useSelector((state) => state.web.theme);

    return (
        <Modal open={modal} onClose={() => setModal(false)} aria-labelledby="Expense Category Modal" aria-describedby="Expense category information">
            <Box className={`w-1/2 min-w-56 phone:min-w-72 tablet:min-w-80 desktop:min-w-96 max-w-max h-auto py-7 phone:py-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-8 rounded-lg tablet:rounded-xl ${getBackgroundColor(theme)} ${getTextColor(theme)}`}>
                <main className={`max-h-96 px-7 phone:px-8 flex flex-col gap-8 overflow-auto scrollbar-thin ${getScrollbarTrackBackground(theme)} ${getScrollbarThumbText(theme)}`}>
                    <section className="flex flex-col gap-8">
                        <header className="flex items-center justify-between text-xl font-semibold">
                            Expense Category
                            {category.hidden && <span className={`flex items-center justify-center gap-2 text-xl font-semibold ${getTextNeutralColor(theme)}`}><FaEyeSlash />Hidden</span>}
                        </header>
                        <main className="flex flex-col desktop:flex-row gap-8">
                            <div className="desktop:px-4">
                                <img src={`${process.env.EXPENSE_CATEGORY_URI}/${category.icon}`} alt={category.name} className="mx-auto w-20 h-20 phone:w-24 phone:h-24 tablet:w-28 tablet:h-28 desktop:w-32 desktop:h-32" />
                            </div>
                            <section className="desktop:w-96 flex flex-col gap-4">
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Name</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{category?.name}</span>
                                </div>
                                <div className="relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Hex Color</span>
                                    <span className={`px-3 py-2 flex items-center gap-2 border ${getBorderNeutralColor(theme)} rounded-md break-words`}>
                                        <div className="w-4 h-4 rounded-sm" style={{backgroundColor: `#${category?.color}`}}></div>
                                        #{category?.color}
                                    </span>
                                </div>
                                <div className="flex-1 relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Created By</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{category?.created_by?.name}</span>
                                </div>
                                <div className="flex-1 relative flex flex-col">
                                    <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Created At</span>
                                    <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{category?.created_at && format(new Date(category.created_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                </div>
                                {
                                    category?.updated_by &&
                                    <div className="flex-1 relative flex flex-col">
                                        <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Updated By</span>
                                        <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{format(new Date(category?.updated_by), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                    </div>
                                }
                                {
                                    category?.updated_at &&
                                    <div className="flex-1 relative flex flex-col">
                                        <span className={`px-2 absolute left-1 -top-3 text-sm ${getBackgroundColor(theme)}`}>Updated At</span>
                                        <span className={`px-3 py-2 text-wrap border ${getBorderNeutralColor(theme)} rounded-md break-words`}>{format(new Date(category?.updated_at), 'MMMM dd, yyyy HH:mm:ss')}</span>
                                    </div>
                                }
                            </section>
                        </main>
                    </section>
                </main>
                <footer className="px-7 phone:px-8 flex items-center justify-end gap-4">
                    <button onClick={() => setModal(false)} className={`py-1 px-4 ${theme !== 'dark' ? getTextPrimaryColor(theme) : ''} rounded-md ${getHoverTextHighlightColor(theme)}`}>Close</button>
                </footer>
            </Box>
        </Modal>
    );
}

CategoryModal.propTypes = {
    modal: PropTypes.bool,
    setModal: PropTypes.func,
    category: PropTypes.object
};