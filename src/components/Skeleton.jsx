import {useSelector} from 'react-redux';
import themes from '../../config/theme';
import Skel, {SkeletonTheme} from 'react-loading-skeleton';

export default function Skeleton(props) {
    const theme = useSelector((state) => state.web.theme);

    return (
        <SkeletonTheme baseColor={themes[theme].skeletonBase} highlightColor={themes[theme].skeletonHighlight}>
            <Skel {...props} />
        </SkeletonTheme>
    );
}