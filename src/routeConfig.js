import routeConstants from './routeConstants';
import ArchivesContainer from './containers/ArchivesContainer/Loadable';
import NotesContainer from './containers/NotesContainer/Loadable';

export const routeConfig = {
  Archives: {
    component: ArchivesContainer,
    ...routeConstants.Archives
  },
  Notes: {
    component: NotesContainer,
    ...routeConstants.Notes
  }
};
