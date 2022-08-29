import { Route, Routes } from 'react-router-dom';
import Dashboard from '../component/Dashboard_Column';
import NotFound from '../component/NotFound';
import Post from '../component/Post/Post';

function RouterScreen() {
  return (
    <Routes>
      <Route path="/" element={<Post />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/posts" element={<Post />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

export default RouterScreen;
