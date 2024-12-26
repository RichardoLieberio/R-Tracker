import {Helmet} from 'react-helmet-async';

export default function ExpenseCategoryHead() {
    return (
        <Helmet>
            <title>R Tracker - Expense Category Management</title>
            <meta name="description" content="Create new categories, edit their details, or delete outdated categories to maintain an organized expense tracking system." />
            <meta name="robots" content="noindex, nofollow" />
        </Helmet>
    );
}