import ArchiveIcon from './Images/archive.svg';
import KeepIcon from './Images/keep.svg';
export default {
  Notes: {
    route: '/',
    exact: true,
    props: {
      icon: KeepIcon,
      title: 'Notes'
    }
  },
  Archives: {
    route: '/archives',
    exact: true,
    props: {
      icon: ArchiveIcon,
      title: 'Archives'
    }
  }
};
