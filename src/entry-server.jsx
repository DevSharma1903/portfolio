import { renderToString } from 'react-dom/server';
import { renderRoute } from './App.jsx';

export function render(path) {
  return renderToString(renderRoute(path));
}
