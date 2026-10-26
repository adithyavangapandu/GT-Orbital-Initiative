import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { AboutPage } from '../pages/AboutPage';
import { ArticlePage } from '../pages/ArticlePage';
import { ComponentDetailPage } from '../pages/ComponentDetailPage';
import { ComponentExplorerPage } from '../pages/ComponentExplorerPage';
import { CurriculumPage } from '../pages/CurriculumPage';
import { HomePage } from '../pages/HomePage';
import { LabDetailPage } from '../pages/LabDetailPage';
import { LabPage } from '../pages/LabPage';
import { LearnPage } from '../pages/LearnPage';
import { MissionPage } from '../pages/MissionPage';
import { ModulePage } from '../pages/ModulePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ResourcesPage } from '../pages/ResourcesPage';

// basename follows Vite's base so the same build works at "/" (Netlify etc.)
// and under a sub-path like GitHub Pages' "/<repo>/ambasat/".
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/learn', element: <LearnPage /> },
        { path: '/learn/:articleSlug', element: <ArticlePage /> },
        { path: '/curriculum', element: <CurriculumPage /> },
        { path: '/curriculum/:moduleSlug', element: <ModulePage /> },
        { path: '/explore/components', element: <ComponentExplorerPage /> },
        { path: '/explore/components/:componentSlug', element: <ComponentDetailPage /> },
        { path: '/lab', element: <LabPage /> },
        { path: '/lab/:labSlug', element: <LabDetailPage /> },
        { path: '/mission', element: <MissionPage /> },
        { path: '/resources', element: <ResourcesPage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename },
);
